import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import AccordionComponent from '../components/ui/Accordion';
import date from '../utilities';
import LoadMoreButton from '../components/ui/LoadMoreButton';
import api from '../api';

const HomePage = () => {
  const [storyPosts, setStoryPosts] = useState([]);
  const [expandedId, setExpandedId] = useState(false);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * gets item id from array when accordion is expanded
   * @param {number} panelId
   */
  const handleChange = (panelId) => () => {
    setExpandedId(expandedId !== panelId ? panelId : false);
  };

  /**
   * gets full details from every post and shows them 10 by 10
   * @param {Array.<number>} postsId
   * @returns {Array.<Object>}
   */
  const getTopPosts = (postsId) => {
    Promise.all(postsId.splice(0, numberOfPosts).map((id) => api.getPostById(id)))
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

  /**
   * gets all top posts Id's
   * @returns {Array.<number>}
   */
  const getTopPostsId = () => {
    api.getTopPosts()
      .then((response) => {
        getTopPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
 * increase storyPosts array length
 * @returns {void}
 */
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
          <AccordionComponent
            accordionId={expandedId} // false -> 0
            expandedId={index} // 0
            handleChange={handleChange(index)}
            childrenSummary={(
              <div className="summary-accordion">
                <Typography className="post-tittle">{storyPost.title}</Typography>
                <Typography className="post-details">

                  <span className="post-creator-details">
                    {date(storyPost.time)}
                    <span className="divider-div" />
                    by
                    <span className="main-color">{storyPost.by}</span>
                  </span>

                  <Link className="post-interactions" to={`/${storyPost.id}`}>
                    <FavoriteIcon className="main-color" sx={{ fontSize: 20 }} />
                    <span>{`${storyPost.score} Likes`}</span>
                    <ChatBubbleIcon className="main-color" sx={{ marginLeft: '50px', fontSize: 20 }} />
                    <span>{`${(storyPost.kids) ? storyPost.kids.length : 0} Main comments`}</span>
                  </Link>

                </Typography>
              </div>
              )}
            childrenDetails={<Typography>{storyPost.url ? storyPost.url : 'There\'s no url in this story'}</Typography>}
          />
        </div>

      ))}
      <LoadMoreButton
        isLoading={isLoading}
        handleLoadingButton={() => handleLoadingButton()}
      >
        {!isLoading ? (<KeyboardArrowDownIcon sx={{ color: '#fdfdfd', fontSize: '30px' }} />) : null}
      </LoadMoreButton>
    </div>
  );
};

export default HomePage;
