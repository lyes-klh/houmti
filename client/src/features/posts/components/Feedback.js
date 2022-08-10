import React, { useState } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import FeedbackRecap from './FeedbackRecap';
import FeedbackActions from './FeedbackActions';
import CommentForm from './CommentForm';

const Feedback = ({ likes, comments }) => {
  const [commentIsOpen, setCommentIsOpen] = useState(false);
  return (
    <Box px={4}>
      <FeedbackRecap likes={31} comments={42} />
      <Divider />
      <FeedbackActions openComment={setCommentIsOpen} />
      {commentIsOpen && <CommentForm />}
    </Box>
  );
};

export default Feedback;
