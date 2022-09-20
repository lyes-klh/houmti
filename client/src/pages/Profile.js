import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import { Post } from '../features/posts';
import { Box } from '@chakra-ui/react';
import posts from '../data/posts.json';
import { PostsWrapper, PostSkeleton } from '../features/posts';
import { ProfileCard } from '../features/profiles';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilePostsAction } from '../features/posts/postsActions';
import { getProfilePosts } from '../features/posts/postsSlice';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getProfilePostsAction();
        dispatch(getProfilePosts(res.data));
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const profilePosts = useSelector((state) => state.posts.profilePosts);

  return (
    <PageWrapper>
      <ProfileCard />
      <PostsWrapper>
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          profilePosts.map((post) => <Post key={post._id} post={post} />)
          // <h1>posts here</h1>
        )}
      </PostsWrapper>
    </PageWrapper>
  );
};

export default Profile;
