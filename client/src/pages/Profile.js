import React from 'react';
import PageWrapper from './PageWrapper';
import { Post } from '../features/posts';
import { Box } from '@chakra-ui/react';
import posts from '../data/posts.json';

const Profile = () => {
  return (
    <PageWrapper>
      <Box
        as='main'
        width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
        minH='100vh'
        borderRadius={4}
        w='full'
      >
        {posts.data.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Box>
    </PageWrapper>
  );
};

export default Profile;
