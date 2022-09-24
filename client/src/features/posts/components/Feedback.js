import React, { useState, useRef } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import FeedbackRecap from './FeedbackRecap';
import FeedbackActions from './FeedbackActions';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import Comments from './Comments';

const Feedback = ({ likesCount, commentsCount, post }) => {
  const mode = useSelector((state) => state.posts.mode);
  const [commentIsOpen, setCommentIsOpen] = useState(false);

  return (
    <Box px={4}>
      <FeedbackRecap
        likesCount={likesCount}
        commentsCount={commentsCount}
        id={post._id}
      />
      <Divider />
      <FeedbackActions openComment={setCommentIsOpen} post={post} />
      {(commentIsOpen || mode === 'post') && <CommentForm postId={post._id} />}
      {mode === 'post' && <Comments postId={post._id} />}
    </Box>
  );
};

export default Feedback;
