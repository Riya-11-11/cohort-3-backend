import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

const api = axios.create({
  baseURL: "http://localhost:5173/api", // Base URL for the API eg; http://localhost:5173/api/auth/login
  withCredentials: true, //refresh token will be stored in cookies, so we need to send cookies with every request
});

const useApi = () => {
  const { accessToken } = useAuth();

  api.interceptors.request.use(//
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // Add the access token to the Authorization header if it exists
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return api;
};

export default useApi;
