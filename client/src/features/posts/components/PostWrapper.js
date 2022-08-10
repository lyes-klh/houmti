import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const PostWrapper = ({ children }) => {
  return (
    <Box
      pt={4}
      pb={2}
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius={4}
      mb={8}
      boxShadow='lg'
    >
      {children}
    </Box>
  );
};

export default PostWrapper;
