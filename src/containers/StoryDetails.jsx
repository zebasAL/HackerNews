import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import date from '../utilities';
import Divider from '../components/ui/Divider';

const StoryDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getComments = (childrenComments) => {
    Promise.all(childrenComments.map((childId) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${childId}.json?print=pretty`)))
      .then((response) => {
        const newComments = [];
        response.forEach((item) => newComments.push(item.data));
        setComments(newComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = () => {
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then((response) => {
        getComments(response.data.kids);
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {(comments.length !== 0)
        ? (
          <div className="story-post-wrapper">
            <p>{post.title}</p>
            <p>{post.url && post.url}</p>
            <p className="post-details">
              <p>
                {date(post.time)}
                <div className="divider-div" />
                by
                <span className="main-color">{` ${post.by}`}</span>
              </p>
              <div className="post-interactions" to={`/${post.id}`}>
                <FavoriteIcon className="main-color" sx={{ fontSize: 20 }} />
                {`${post.score} Likes`}
                <ChatBubbleIcon className="main-color" sx={{ marginLeft: '50px', fontSize: 20 }} />
                {`${(post.kids) ? post.kids.length : 0} Main comments`}
              </div>
            </p>
            <div className="comments-container">
              {(comments.length !== 0) && comments.map((comment) => (
                <div key={comment.tittle}>
                  <Divider />
                  <p>{comment.text ? comment.text : 'No text'}</p>
                  <p>
                    {`${comment.type} by `}
                    <span className="main-color">
                      {comment.by}
                    </span>
                    {` ${date(comment.time)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
          </Box>

        )}
    </div>
  );
};

export default StoryDetails;
