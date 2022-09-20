import houmtiApi from '../../app/api';

export const getFeedPostsAction = async () => {
  const res = await houmtiApi.get('/posts');
  return res.data;
};

export const getProfilePostsAction = async () => {
  const res = await houmtiApi.get('/users/my-profile/posts');
  return res.data;
};
