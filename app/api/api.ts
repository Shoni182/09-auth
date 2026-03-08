import axios from 'axios';

// екземпляр аксіос для серверного запиту
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
