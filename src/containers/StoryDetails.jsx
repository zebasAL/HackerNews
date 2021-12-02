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
  const [post, setPost] = useState({ kids: [] });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapItem, setMapItem] = useState(NaN);
  const [isRotated, setIsRotated] = useState('');

  /**
   * gets children comments from story post
   * @param {Array.<number>} childrenComments
   * @returns {Array}
   */
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

  /**
   * gets main post using url params
   * @returns {object}
   */
  const getPost = () => {
    api.getPostById(id)
      .then((response) => {
        setPost(response.data);
        getComments([...response.data.kids]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
 * increase post comments array length
 */
  const handleLoadingButton = () => {
    setIsLoading(true);
    setNumberOfComments(numberOfComments + 20);
  };

  /**
   * set selected item from array and add style to it
   * @param {number} index
   */
  const toggleClass = (index) => {
    if (index === mapItem) {
      setMapItem(NaN);
      setIsRotated('rotate(0deg)');
    } else {
      setMapItem(index);
      setIsRotated('rotate(180deg)');
    }
  };

  useEffect(() => {
    getPost();
  }, [numberOfComments]);

  return (
    <div>
      {(post.kids ? comments.length !== 0 : true)
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
                {`${(post.kids) ? post.kids.length : 0} comments`}
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
                          <KeyboardArrowDownIcon sx={{ color: '#fdfdfd', fontSize: '10px', transform: isRotated }} />
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

      {((post.kids ? post.kids.length : 0) !== comments.length)
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
