import houmtiApi from '../../app/api';

export const getUserInfo = async (userId) => {
  const res = await houmtiApi.get(`/users/${userId}`);

  return res.data;
};
