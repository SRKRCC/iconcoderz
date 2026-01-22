import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;

      if (status === 401) {
        localStorage.removeItem('admin_token');
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('login')) {
          window.location.href = '/admin-login';
        }
      }

      const errorMessage = data?.message || data?.error || 'Something went wrong';
      return Promise.reject(new Error(errorMessage));
    }

    // Network error or timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }

    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    return Promise.reject(error);
  }
);

// API Response type
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: any;
}

// Generic API request function
async function apiRequest<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.request<ApiResponse<T>>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}

// Convenience methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>('GET', url, undefined, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>('POST', url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>('PUT', url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiRequest<T>('PATCH', url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiRequest<T>('DELETE', url, undefined, config),
};

export default axiosInstance;
