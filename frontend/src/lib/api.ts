import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse, Post } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },
  register: async (credentials: RegisterCredentials): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>('/auth/register', credentials);
    return data;
  },
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const { data } = await api.get<{ message: string }>(`/auth/verify-email/${token}`);
    return data;
  },
};

export const posts = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  },
  getOne: async (id: string): Promise<Post> => {
    const { data } = await api.get<Post>(`/posts/${id}`);
    return data;
  },
  create: async (post: { title: string; content: string }): Promise<Post> => {
    const { data } = await api.post<Post>('/posts', post);
    return data;
  },
  update: async (id: string, post: { title: string; content: string }): Promise<Post> => {
    const { data } = await api.put<Post>(`/posts/${id}`, post);
    return data;
  },
  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/posts/${id}`);
    return data;
  },
};

export default api; 