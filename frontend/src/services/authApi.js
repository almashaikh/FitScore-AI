// src/services/authApi.js
//
// Axios instance that points to the REAL backend (Express + MongoDB)
// for authentication-related requests.

import axios from 'axios';

const authApi = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api',
  timeout: 15000
});

export default authApi;
