import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    withXSRFToken: true,
});

// For Sanctum routes (no /api prefix)
export const sanctumClient = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
});

export default axiosInstance;