import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Skeleton from '@mui/material/Skeleton';
import date from '../utilities';
import Divider from '../components/ui/Divider';
import LoadMoreButton from '../components/ui/LoadMoreButton';
import api from '../api';

const StoryDetails = () => {
  const { id } = useParams();
  const [numberOfComments, setNumberOfComments] = useState(20);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapItem, setMapItem] = useState(NaN);

  const getComments = (childrenComments) => {
    Promise.all(childrenComments.splice(0, numberOfComments)
      .map((childId) => api.getPostById(childId)))
      .then((response) => {
        const newComments = [];
        response.forEach((item) => newComments.push(item.data));
        setComments(newComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = () => {
    api.getPostById(id)
      .then((response) => {
        getComments(response.data.kids);
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoadingButton = () => {
    setIsLoading(true);
    setNumberOfComments(numberOfComments + 20);
  };

  const toggleClass = (index) => {
    if (index === mapItem) {
      setMapItem(NaN);
    } else {
      setMapItem(index);
    }
  };

  useEffect(() => {
    getPost();
  }, [numberOfComments]);

  return (
    <div>
      {(comments.length !== 0)
        ? (
          <div className="story-post-wrapper">
            <p>{post.title}</p>
            <p>{post.url && post.url}</p>
            <div className="post-details">
              <div>
                {date(post.time)}
                <p className="divider-div" />
                by
                <span className="main-color">{` ${post.by}`}</span>
              </div>
              <p className="post-interactions" to={`/${post.id}`}>
                <FavoriteIcon className="main-color" sx={{ fontSize: 20 }} />
                {`${post.score} Likes`}
                <ChatBubbleIcon className="main-color" sx={{ marginLeft: '50px', fontSize: 20 }} />
                {`${(post.kids) ? post.kids.length : 0} comments remaining`}
              </p>
            </div>

            <div className="comments-container">
              {(comments.length !== 0) && comments.map((comment, index) => {
                const textComment = (comment.text) ? comment.text : 'There is no comments';
                return (
                  <div key={comment.time}>
                    <Divider />
                    <p>{index === mapItem ? textComment : textComment.substring(0, 599)}</p>
                    <p>
                      {`${comment.type} by `}
                      <span className="main-color">
                        {comment.by}
                      </span>
                      {` ${date(comment.time)}`}
                    </p>

                    {textComment.length > 600
                      ? (
                        <LoadMoreButton
                          styles={{ height: '15px', marginTop: '15px' }}
                          isLoading={false}
                          handleLoadingButton={() => toggleClass(index)}
                        >
                          <KeyboardArrowDownIcon sx={{ color: '#fdfdfd', fontSize: '10px' }} />
                        </LoadMoreButton>
                      )
                      : null}
                  </div>
                );
              })}
            </div>
          </div>
        )
        : (
          <div>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
            <Skeleton variant="rectangular" height={118} />
            <Skeleton variant="text" width="33%" height={50} />
          </div>
        )}

      {(post !== 0)
      && (
      <LoadMoreButton
        isLoading={isLoading}
        handleLoadingButton={() => handleLoadingButton()}
      >
        {!isLoading ? (<KeyboardArrowDownIcon sx={{ color: '#fdfdfd', fontSize: '30px' }} />) : null}
      </LoadMoreButton>
      )}
    </div>
  );
};

export default StoryDetails;
