import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api`;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
  refreshToken?: string;
  error?: {
    message: string;
    statusCode: number;
  };
}

class ApiClient {
  private axiosInstance: ReturnType<typeof axios.create>;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      if (this.token) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    }

    // Add request interceptor to include token
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for token refresh
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config as any;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await this.refreshToken();
            // Retry the original request with new token
            if (this.token) {
              originalRequest.headers.Authorization = `Bearer ${this.token}`;
            }
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Clear token and redirect to login
            this.setToken(null);
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(new Error('Session expired. Please login again.'));
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        localStorage.removeItem('auth_token');
        delete this.axiosInstance.defaults.headers.common['Authorization'];
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        ...options,
      });

      return response.data as ApiResponse<T>;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<ApiResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      data: userData,
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<ApiResponse> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') 
      : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.request('/auth/refresh', {
      method: 'POST',
      data: { refreshToken },
    });
  }

  async getCurrentUser(): Promise<ApiResponse> {
    return this.request('/auth/me');
  }

  // Products endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    q?: string;
    category?: string;
  }): Promise<ApiResponse> {
    return this.request('/products', {
      method: 'GET',
      params,
    });
  }

  async getProduct(id: number): Promise<ApiResponse> {
    return this.request(`/products/${id}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // Generic request method (public)
  async makeRequest<T = unknown>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, options);
  }


  async uploadProduct<T = unknown>(
    endpoint: string,
    formData: Object,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      return response.data as ApiResponse<T>;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  // File upload method
  async uploadFile<T = unknown>(
    endpoint: string,
    formData: FormData,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...options.headers,
        },
        ...options,
      });

      return response.data as ApiResponse<T>;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
