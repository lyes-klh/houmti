import houmtiApi from '../../app/api';
import axios from 'axios';

export const getAllCities = async () => {
  const res = await houmtiApi.get('/cities');
  return res.data;
};

export const getAllNeiborhoods = async (cityId) => {
  const res = await houmtiApi.get('/neighborhoods', {
    params: { city: cityId },
  });
  return res.data;
};

export const updateUser = async (updatedInfo) => {
  const res = await houmtiApi.patch('/users/my-profile/updateMe', updatedInfo);
  return res.data;
};

export const updatePassword = async (updatedPassword) => {
  const res = await houmtiApi.post(
    '/users/my-profile/updatePassword',
    updatedPassword
  );
  return res.data;
};

export const updateAvatar = async (formData) => {
  const res = await axios.patch(
    process.env.REACT_APP_API + '/users/my-profile/updateMe',
    formData,
    { withCredentials: true }
  );

  return res.data;
};
