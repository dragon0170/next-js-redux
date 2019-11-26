import axios, { AxiosInstance } from 'axios';

export const serverAjax: AxiosInstance = axios.create({
  baseURL:
    process.env.API_SERVER_URL !== undefined ? process.env.API_SERVER_URL : '',
});

export const clientAjax: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_JS_URL !== undefined ? process.env.NEXT_JS_URL : '',
});
