import React, { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';
import { Post } from '../features/posts';
import { PostsWrapper, PostSkeleton } from '../features/posts';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, setModePost } from '../features/posts/postsSlice';
import { getPostAction } from '../features/posts/postsActions';
import { useParams, useNavigate } from 'react-router-dom';

const PostFull = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await getPostAction(currentUser._id, params.postId);
        dispatch(getPost(post));
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
        navigate('/not-found');
      }
    };

    dispatch(setModePost());
    fetchPosts();
  }, [dispatch, navigate, currentUser._id, params.postId]);

  const post = useSelector((state) => state.posts.post);

  return (
    <PageWrapper>
      <PostsWrapper>
        {isLoading ? (
          <>
            <PostSkeleton />
          </>
        ) : (
          <Post post={post} />
        )}
      </PostsWrapper>
    </PageWrapper>
  );
};

export default PostFull;
