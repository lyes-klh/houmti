import React from 'react';
import PageWrapper from './PageWrapper';
import { Post } from '../features/posts';
import { Box } from '@chakra-ui/react';
import posts from '../data/posts.json';
import { PostsWrapper } from '../features/posts';
import { ProfileCard } from '../features/profiles';

const Profile = () => {
  return (
    <PageWrapper>
      <ProfileCard />
      <PostsWrapper>
        {posts.data.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </PostsWrapper>
    </PageWrapper>
  );
};

export default Profile;
