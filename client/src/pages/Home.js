import React from 'react';
import { Box } from '@chakra-ui/react';
import { Post } from '../features/posts';
// import image1 from '../assets/images/image-1.jpg';
// import image2 from '../assets/images/image-2.jpg';
import posts from '../data/posts';

const Home = () => {
  return (
    <Box
      as='main'
      mt={24}
      width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
      minH='100vh'
      borderRadius={4}
      w='full'
    >
      {posts.data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default Home;
