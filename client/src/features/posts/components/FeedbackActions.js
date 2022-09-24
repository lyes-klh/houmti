import React, { useState } from 'react';
import { Button, Stack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import {
  createFeedbackAction,
  deleteFeedbackAction,
  getFeedbackAction,
} from '../feedbackActions';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../postsSlice';

const FeedbackActions = ({ openComment, post }) => {
  const handleComment = () => {
    openComment((prev) => !prev);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async (e) => {
    try {
      setIsLoading(true);

      if (post.liked) {
        const res = await getFeedbackAction(post._id, {
          user: currentUser._id,
          feedbackType: 'Like',
        });

        await deleteFeedbackAction(post._id, res.data[0]._id);
        dispatch(unlikePost(post._id));
      } else {
        await createFeedbackAction(post._id, {
          feedbackType: 'Like',
        });
        dispatch(likePost(post._id));
      }

      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Stack direction='row' mt={2}>
      <Button
        w='50%'
        variant='ghost'
        color={post.liked ? 'green.500' : 'gray.500'}
        size='sm'
        leftIcon={
          <Icon
            as={FiThumbsUp}
            fontSize='xl'
            rotate={1}
            fill={post.liked ? 'green.500' : 'none'}
          />
        }
        onClick={handleLike}
        isLoading={isLoading}
      >
        Like
      </Button>
      <Button
        w='50%'
        variant='ghost'
        color={useColorModeValue('gray.500', 'gray.500')}
        size='sm'
        onClick={handleComment}
        leftIcon={
          <Icon
            as={FiMessageSquare}
            fontSize='xl'
            position='relative'
            top={0.5}
          />
        }
      >
        Comment
      </Button>
      {/* {error && <ErrorFloat message={error} />} */}
    </Stack>
  );
};

export default FeedbackActions;
