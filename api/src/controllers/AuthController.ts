import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { LoginData, RegisterData, AuthResponse, ApiResponse, AuthenticatedRequest } from '../types';
import { createError } from '../middleware/errorHandler';

export class AuthController {
  private userModel: UserModel;
  private jwtSecret: string;
  private jwtExpiresIn: string;

  constructor() {
    this.userModel = new UserModel();
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
  }

  // Generate JWT token
  private generateToken(user: any): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn } as jwt.SignOptions);
  }

  // Generate refresh token
  private generateRefreshToken(user: any): string {
    const payload = {
      userId: user.id,
      email: user.email,
      type: 'refresh'
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '30d' } as jwt.SignOptions);
  }

  // POST /api/auth/register
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password, firstName, lastName }: RegisterData = req.body;

      // Check if user already exists
      const existingUserByEmail = await this.userModel.findByEmail(email);
      if (existingUserByEmail) {
        throw createError('User with this email already exists', 409);
      }

      const existingUserByUsername = await this.userModel.findByUsername(username);
      if (existingUserByUsername) {
        throw createError('User with this username already exists', 409);
      }

      // Create new user
      const user = await this.userModel.create({
        username,
        email,
        password,
        firstName,
        lastName,
        role: 'user'
      });

      // Generate tokens
      const token = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      const response: AuthResponse = {
        success: true,
        message: 'User registered successfully',
        user: userWithoutPassword,
        token,
        refreshToken
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/auth/login
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password }: LoginData = req.body;

      // Verify user credentials
      const user = await this.userModel.verifyPassword(email, password);
      if (!user) {
        throw createError('Invalid email or password', 401);
      }

      // Check if user is active
      if (!user.isActive) {
        throw createError('Account is deactivated', 401);
      }

      // Generate tokens
      const token = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      const response: AuthResponse = {
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        token,
        refreshToken
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/auth/logout
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // In a real application, you might want to blacklist the token
      // For now, we'll just return a success message
      const response: ApiResponse = {
        success: true,
        message: 'Logout successful'
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/auth/refresh
  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw createError('Refresh token is required', 400);
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as any;
      
      if (decoded.type !== 'refresh') {
        throw createError('Invalid refresh token', 401);
      }

      // Get user
      const user = await this.userModel.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw createError('User not found or inactive', 401);
      }

      // Generate new tokens
      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      const response: AuthResponse = {
        success: true,
        message: 'Token refreshed successfully',
        user: userWithoutPassword,
        token: newToken,
        refreshToken: newRefreshToken
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/auth/me
  getCurrentUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const user = await this.userModel.findById(req.user.userId);
      
      if (!user) {
        throw createError('User not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Current user retrieved successfully',
        data: user
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/auth/forgot-password
  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        throw createError('Email is required', 400);
      }

      // Check if user exists
      const user = await this.userModel.findByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not for security
        const response: ApiResponse = {
          success: true,
          message: 'If the email exists, a password reset link has been sent'
        };
        res.json(response);
        return;
      }

      // In a real application, you would:
      // 1. Generate a password reset token
      // 2. Store it in the database with expiration
      // 3. Send an email with the reset link
      
      // For now, we'll just return a success message
      const response: ApiResponse = {
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/auth/reset-password
  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        throw createError('Token and new password are required', 400);
      }

      // In a real application, you would:
      // 1. Verify the reset token
      // 2. Check if it's not expired
      // 3. Update the user's password
      // 4. Invalidate the reset token

      // For now, we'll just return a success message
      const response: ApiResponse = {
        success: true,
        message: 'Password reset successfully'
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
