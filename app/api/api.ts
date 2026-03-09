import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

// екземпляр аксіос для серверного запиту
export const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
