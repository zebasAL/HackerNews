import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from 'react-router-dom';
import date from '../utilities';
import LoadMoreButton from '../components/ui/LoadMoreButton';

const HomePage = () => {
  const [storyPosts, setStoryPosts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getTopPosts = (postsId) => {
    Promise.all(postsId.splice(0, numberOfPosts).map((id) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)))
      .then((response) => {
        const post = [];
        response.forEach((item) => post.push(item.data));
        setStoryPosts(post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTopPostsId = () => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((response) => {
        getTopPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoadingButton = () => {
    setIsLoading(true);
    setNumberOfPosts(numberOfPosts + 10);
  };

  useEffect(() => {
    getTopPostsId();
  }, [numberOfPosts]);

  return (
    <div>
      <div className="story-posts-container">
        {storyPosts.map((storyPost, index) => (
          <div key={storyPost.title} className="story-posts-wrapper">
            <Accordion
              disableGutters
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary expandIcon={null} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography>{storyPost.title}</Typography>
                <Typography className="subject">
                  <p>
                    {date(storyPost.time)}
                    <div className="divider-div" />
                    by
                    <span className="main-color">{` ${storyPost.by}`}</span>
                  </p>
                  <Link className="post-interactions" to={`/${storyPost.id}`}>
                    <FavoriteIcon className="main-color" sx={{ fontSize: 20 }} />
                    {`${storyPost.score} Likes`}
                    <ChatBubbleIcon className="main-color" sx={{ marginLeft: '50px', fontSize: 20 }} />
                    {`${(storyPost.kids) ? storyPost.kids.length : 0} Main comments`}
                  </Link>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{storyPost.url ? storyPost.url : 'There\'s no url in this story'}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>

        ))}
      </div>
      <LoadMoreButton isLoading={isLoading} handleLoadingButton={() => handleLoadingButton()} />
    </div>
  );
};

export default HomePage;