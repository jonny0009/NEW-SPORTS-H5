// src/utils/axiosInstance.ts
import axios from 'axios';
const axiosInstance = axios.create({
    //   baseURL: process.env.VUE_APP_API_BASE_URL, // 从环境变量获取 API 基础 URL
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/api', // 从环境变量获取 API 基础 URL
    timeout: 10000, // 请求超时时间
});
export default axiosInstance;

// src/utils/axiosInstance.ts
// ...导入 axios...
// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 在这里设置请求头，例如添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // 在这里处理响应数据，例如只返回 data
        return response.data;
    },
    error => {
        // 在这里处理错误，例如统一的错误提示
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);
