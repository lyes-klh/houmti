import houmtiApi from '../../app/api';

export const getNotificationsAction = async () => {
  const res = await houmtiApi.get('/users/my-profile/notifications');
  return res.data;
};
