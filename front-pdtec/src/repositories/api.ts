import axios from "axios";
import { urlAPI } from "../enviroments";

export const api = axios.create({
  baseURL: urlAPI,
});

api.interceptors.request.use(
  (config) => {
    const tokenData = localStorage.getItem("token");
    config.headers.Authorization = tokenData ? `Bearer ${tokenData}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
