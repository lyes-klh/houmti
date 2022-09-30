import houmtiApi from '../../app/api';

export const getFeedPostsAction = async (userId) => {
  const res = await houmtiApi.get('/posts');
  return res.data;
};

export const getProfilePostsAction = async (userId) => {
  const res = await houmtiApi.get(`/posts`, {
    params: { creator: userId },
  });

  return res.data;
};

export const getPostAction = async (postId) => {
  const res = await houmtiApi.get(`/posts/${postId}`);
  return res.data.data;
};
