import axios from "axios";
import { urlAPI } from "../enviroments";

export const api = axios.create({
  baseURL: urlAPI,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${
      localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!).token : ""
    }`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
