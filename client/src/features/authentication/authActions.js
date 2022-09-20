import houmtiApi from '../../app/api';

export const loginAction = async (email, password) => {
  const res = await houmtiApi.post('/users/login', { email, password });
  return res.data;
};

export const logoutAction = async () => {
  const res = await houmtiApi.get('/users/logout');
  return res.data;
};
