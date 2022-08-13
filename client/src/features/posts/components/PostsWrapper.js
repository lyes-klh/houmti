import React from 'react';
import { Box } from '@chakra-ui/react';

const PostsWrapper = ({ children }) => {
  return (
    <Box
      as='main'
      width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
      minH='100vh'
      borderRadius={4}
      w='full'
      // display='flex'
      // flexDirection='column'
      // alignItems='center'
    >
      {children}
    </Box>
  );
};

export default PostsWrapper;
