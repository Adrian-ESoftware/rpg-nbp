import axios, { AxiosError } from 'axios';

// Criando uma instância do axios com configurações base
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper functions for cookies
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Se o erro for 401 (não autorizado), limpa o token e redireciona para login
    if (error.response?.status === 401) {
      deleteCookie('access_token');

      if(window.location.pathname !== '/login') {
        window.location.href = '/login?error=unauthorized';
      }
    }
    return Promise.reject(error);
  }
);

// Interface para o login
interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    subscriptionStatus: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

// Funções da API
export const authApi = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    setCookie('access_token', response.data.access_token);
    // Optionally store user data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: () => {
    deleteCookie('access_token');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    window.location.href = '/login';
  },
};