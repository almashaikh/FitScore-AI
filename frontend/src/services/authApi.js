// src/services/authApi.js
//
// Axios instance that points to the REAL backend (Express + MongoDB)
// for authentication-related requests.

import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:5000/api',  // our Node backend
  timeout: 15000
});

export default authApi;
