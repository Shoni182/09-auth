//: lib/api.ts
// imports
import axios from 'axios';

// next server
export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});
