import axios, { AxiosError, AxiosResponse } from "axios";
import { response } from "express";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  
  function (error: AxiosError) {
    if (error.response!.status === 404 && error.config!.url!.includes('/users/')){
        localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
