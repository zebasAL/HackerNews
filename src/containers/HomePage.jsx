import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from 'react-router-dom';
import AccordionContainer from '../components/ui/Accordion';
import date from '../utilities';
import LoadMoreButton from '../components/ui/LoadMoreButton';

const HomePage = () => {
  const [storyPosts, setStoryPosts] = useState([]);
  const [expandedId, setExpandedId] = useState(false);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (panelId) => () => {
    setExpandedId(expandedId !== panelId ? panelId : false);
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
      {storyPosts.map((storyPost, index) => (
        <div key={storyPost.title}>
          <AccordionContainer
            accordionId={expandedId} // false -> 0
            expandedId={index} // 0
            handleChange={handleChange(index)}
            childrenSummary={(
              <>
                <Typography className="post-tittle">{storyPost.title}</Typography>
                <Typography className="post-details">
                  <p className="post-creator-details">
                    {date(storyPost.time)}
                    <div className="divider-div" />
                    by
                    <span className="main-color">{storyPost.by}</span>

                  </p>
                  <Link className="post-interactions" to={`/${storyPost.id}`}>
                    <FavoriteIcon className="main-color" sx={{ fontSize: 20 }} />
                    <p>{`${storyPost.score} Likes`}</p>
                    <ChatBubbleIcon className="main-color" sx={{ marginLeft: '50px', fontSize: 20 }} />
                    <p>{`${(storyPost.kids) ? storyPost.kids.length : 0} Main comments`}</p>
                  </Link>
                </Typography>
              </>
              )}
            childrenDetails={<Typography>{storyPost.url ? storyPost.url : 'There\'s no url in this story'}</Typography>}
          />
        </div>

      ))}
      <LoadMoreButton isLoading={isLoading} handleLoadingButton={() => handleLoadingButton()} />
    </div>
  );
};

export default HomePage;
