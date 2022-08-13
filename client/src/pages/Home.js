import React from 'react';
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { Post } from '../features/posts';
import { CreatePost } from '../features/create';
import SideContent from '../layout/SideContent/SideContent';

// import image1 from '../assets/images/image-1.jpg';
// import image2 from '../assets/images/image-2.jpg';
import posts from '../data/posts';

const Home = () => {
  const [isMedium] = useMediaQuery('(min-width: 48rem)');
  // const [isLarge] = useMediaQuery('(min-width: 80rem)');

  return (
    <Flex
      mx={{ md: 4, lg: 8 }}
      justify='center'
      align='start'
      position='relative'
      mt={24}
    >
      <Box
        as='main'
        width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
        minH='100vh'
        borderRadius={4}
        w='full'
        position='relative'
      >
        <CreatePost />
        {posts.data.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Box>
      {isMedium && <SideContent />}
    </Flex>
  );
};

export default Home;
