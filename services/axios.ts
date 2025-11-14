/* eslint-disable @typescript-eslint/no-explicit-any */
// types/auth.ts
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

// api/advancedApi.ts
import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
} from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

class ApiService {
  private api: AxiosInstance;
  private baseConfig: ApiConfig = {
    baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
    timeout: 10000,

  };

  constructor() {
    this.api = axios.create(this.baseConfig);
    this.api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjhiOTA1MjgxYWQwZjAwZWE0YWU0ZDdjODUxYTI3ZSIsIm5iZiI6MTc2MzA3NzQ5NC4xNzIsInN1YiI6IjY5MTY2ZDc2ODQ0YjlhMzA4YzljNTRlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MDpQV3da14lkaVRVv3TfruQz1S58aNLrC8xSkG-psl4"}`;
    return config;
    });
}

  // Generic request methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data, config);
    return response.data;
  }
}

export const apiService = new ApiService();