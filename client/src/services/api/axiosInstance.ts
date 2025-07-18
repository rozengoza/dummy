import axios from 'axios';
import { DOMAIN } from '@/config/config';

const axiosInstance = axios.create({
    baseURL: DOMAIN,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;