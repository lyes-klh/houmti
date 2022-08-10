import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const PostContent = ({ title, content }) => {
  return (
    <Box mb={2} px={4}>
      <Heading size='md' mb={2}>
        {title}
      </Heading>
      <Text>{content}</Text>
    </Box>
  );
};

export default PostContent;
