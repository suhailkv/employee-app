import axios from "axios";
import CONSTANTS from "../constants";
const axiosInstance = axios.create({
  baseURL: CONSTANTS.BACKEND_URL,
});

// Adding an interceptor to include JWT in Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token"); // Retrieving the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default axiosInstance;
