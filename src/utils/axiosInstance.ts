import axios from 'axios';

export const instance = axios.create({
  // TODO: 나중에 실제 url로 변경
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
