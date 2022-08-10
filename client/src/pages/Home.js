import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Post from '../components/posts/Post';
import image1 from '../assets/images/image-1.jpg';
import image2 from '../assets/images/image-2.jpg';

const Home = () => {
  return (
    <Box
      as='main'
      mt={24}
      width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
      minH='100vh'
      // border='1px'
      borderRadius={4}
      w='full'
    >
      <Post />
      <Post image={image2} />
    </Box>
  );
};

export default Home;
