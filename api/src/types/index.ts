import { Request } from 'express';

// User types
export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  imageUrl?: string;
  images?: string[];
  location?: string;
  year?: number;
  specifications?: {
    dimensions?: string;
    weight?: string;
    strength?: string;
    absorption?: string;
    color?: string;
    material?: string;
    features?: string[];
  } | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  imageUrl?: string;
  images?: string[];
  location?: string;
  year?: number;
  specifications?: {
    dimensions?: string;
    weight?: string;
    strength?: string;
    absorption?: string;
    color?: string;
    material?: string;
    features?: string[];
  };
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  sku?: string;
  stock?: number;
  imageUrl?: string;
  images?: string[];
  location?: string;
  year?: number;
  specifications?: {
    dimensions?: string;
    weight?: string;
    strength?: string;
    absorption?: string;
    color?: string;
    material?: string;
    features?: string[];
  };
  isActive?: boolean;
}

// Auth types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
  refreshToken?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    message: string;
    statusCode: number;
    stack?: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database types
export interface DatabaseResult<T = any> {
  rows: T[];
  rowCount: number;
}

// JWT Payload
export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Request types with user
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

// Search and filter types
export interface ProductSearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

export interface UserSearchParams {
  q?: string;
  role?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'username' | 'email' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}
