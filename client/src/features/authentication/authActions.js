import houmtiApi from "../../app/api";

export const loginAction = async (email, password) => {
  const res = await houmtiApi.post("/users/login", { email, password });
  return res.data;
};

export const signupAction = async (signupData) => {
  const res = await houmtiApi.post("/users/signup", signupData);
  return res.data;
};

export const logoutAction = async () => {
  const res = await houmtiApi.get("/users/logout");
  return res.data;
};

export const getCitiesAction = async () => {
  const res = await houmtiApi.get("/cities");
  return res.data;
};

export const getNeighborhoodsAction = async ({ cityId }) => {
  const res = await houmtiApi.get(`/neighborhoods?city=${cityId}`);
  return res.data;
};
