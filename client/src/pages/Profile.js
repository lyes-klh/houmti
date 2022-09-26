import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import { Post } from '../features/posts';
import { PostsWrapper, PostSkeleton } from '../features/posts';
import { ProfileCard } from '../features/profiles';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilePostsAction } from '../features/posts/postsActions';
import { getProfilePosts, setModeProfile } from '../features/posts/postsSlice';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const profilePosts = useSelector((state) => state.posts.profilePosts);

  const { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await getProfilePostsAction(userId, currentUser._id);
        dispatch(getProfilePosts(res.data));
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };

    dispatch(setModeProfile());
    fetchPosts();
  }, [dispatch, userId, currentUser._id]);

  return (
    <PageWrapper>
      <ProfileCard userId={userId} />
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
        )}
      </PostsWrapper>
    </PageWrapper>
  );
};

export default Profile;
