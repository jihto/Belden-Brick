'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, LoginData, RegisterData, AuthContextType } from '@/types/auth';
import { apiClient } from '@/lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');
        const storedRememberMe = localStorage.getItem('remember_me') === 'true';

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setRememberMe(storedRememberMe);
          apiClient.setToken(storedToken);

          // Verify token is still valid
          try {
            const response = await apiClient.getCurrentUser();
            if (response.success && response.data && typeof response.data === 'object' && response.data !== null && 'id' in response.data) {
              setUser(response.data as User);
              localStorage.setItem('auth_user', JSON.stringify(response.data));
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            // Try to refresh token if remember me is enabled and refresh token exists
            const storedRefreshToken = localStorage.getItem('refresh_token');
            if (storedRememberMe && storedRefreshToken) {
              try {
                await refreshToken();
              } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                logout();
              }
            } else {
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginData & { rememberMe?: boolean }) => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(data.email, data.password);
      
      if (response.success && response.user && response.token && typeof response.user === 'object' && 'id' in response.user) {
        setUser(response.user as User);
        setToken(response.token);
        setRememberMe(data.rememberMe || false);
        apiClient.setToken(response.token);
        
        // Store in localStorage
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('remember_me', String(data.rememberMe || false));
        
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(data);
      
      if (response.success && response.user && response.token && typeof response.user === 'object' && 'id' in response.user) {
        setUser(response.user as User);
        setToken(response.token);
        apiClient.setToken(response.token);
        
        // Store in localStorage
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_token', response.token);
        
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      // Call logout API if token exists
      if (token) {
        await apiClient.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear auth state regardless of API call success
      setUser(null);
      setToken(null);
      setRememberMe(false);
      apiClient.setToken(null);
      
      // Clear localStorage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('remember_me');
    }
  }, [token]);

  const refreshToken = async () => {
    try {
      const response = await apiClient.refreshToken();
      
      if (response.success && response.token) {
        setToken(response.token);
        apiClient.setToken(response.token);
        localStorage.setItem('auth_token', response.token);
        
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        
        if (response.user && typeof response.user === 'object' && 'id' in response.user) {
          setUser(response.user as User);
          localStorage.setItem('auth_user', JSON.stringify(response.user));
        }
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // Clear all auth data on refresh failure
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('remember_me');
      setUser(null);
      setToken(null);
      setRememberMe(false);
      throw error;
    }
  };

  // Token refresh logic
  useEffect(() => {
    let intervalRef: NodeJS.Timeout | null = null;

    // Clear existing interval
    if (intervalRef) {
      clearInterval(intervalRef);
      intervalRef = null;
    }

    // Only set up auto-refresh if user is authenticated and remember me is enabled
    if (isAuthenticated && rememberMe && token) {
      // Refresh token every 6 hours (6 * 60 * 60 * 1000 ms)
      const refreshInterval = 6 * 60 * 60 * 1000;

      intervalRef = setInterval(async () => {
        try {
          await refreshToken();
          console.log('Token refreshed automatically');
        } catch (error) {
          console.error('Automatic token refresh failed:', error);
          // If refresh fails, the auth context will handle logout
        }
      }, refreshInterval);
    }

    // Cleanup function
    return () => {
      if (intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null;
      }
    };
  }, [isAuthenticated, rememberMe, token, refreshToken]);

  // Also refresh token when the page becomes visible (user comes back to tab)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isAuthenticated && rememberMe && token) {
        try {
          // Check if token is close to expiring (within 1 hour)
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          const timeUntilExpiry = tokenPayload.exp - currentTime;
          
          // If token expires within 1 hour, refresh it
          if (timeUntilExpiry < 3600) {
            await refreshToken();
            console.log('Token refreshed on page visibility change');
          }
        } catch (error) {
          console.error('Token refresh on visibility change failed:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, rememberMe, token, refreshToken]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    rememberMe,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
