import houmtiApi from '../../app/api';

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
