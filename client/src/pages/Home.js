import React, { useEffect, useState } from 'react';
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import { Post } from '../features/posts';
import { CreatePost } from '../features/create';
import SideContent from '../layout/SideContent/SideContent';
import { PostSkeleton } from '../features/posts';

import { useDispatch, useSelector } from 'react-redux';
import { getFeedPostsAction } from '../features/posts/postsActions';
import { getFeedPosts, setModeFeed } from '../features/posts/postsSlice';

const Home = () => {
  const [isMedium] = useMediaQuery('(min-width: 48rem)');
  // const [isLarge] = useMediaQuery('(min-width: 80rem)');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getFeedPostsAction(currentUser._id);
        dispatch(getFeedPosts(res.data));
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };
    dispatch(setModeFeed());
    fetchPosts();
  }, [dispatch, currentUser._id]);

  const feedPosts = useSelector((state) => state.posts.feedPosts);

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

        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          feedPosts.map((post) => <Post key={post._id} post={post} />)
        )}
      </Box>
      {isMedium && <SideContent />}
    </Flex>
  );
};

export default Home;
