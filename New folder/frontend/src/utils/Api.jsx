import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  return await API.post("/api/users/register", userData);
};
export const loginUser = async (credentials) => {
  return await API.post("/api/users/login", credentials);
};
export const logoutUser = async () => {
  return await API.post("/api/users/logout");
};

export const requestPasswordReset = async (email) => {
  return await API.post("/api/users/forgot-password", { email });
};


export const resetPassword = async (token, newPassword) => {
  return await API.post(`/api/users/password-reset/${token}`, {
    newPassword,
  });
}
export const getUserDashboard = async () => {
  return await API.get("/api/users/dashboard");
};

export const googleLogin = async () => {
  return await API.get("/api/users/google");
};
export default API;









