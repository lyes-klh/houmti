import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import Feedback from './Feedback';

const Post = ({ image }) => {
  return (
    <Box pt={4} pb={2} bg='gray.900' borderRadius={4} my={4}>
      <PostHeader />
      <PostContent />
      <Image src={image} />
      <Feedback />
    </Box>
  );
};

export default Post;
