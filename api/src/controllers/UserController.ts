import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { UserSearchParams, ApiResponse, AuthenticatedRequest } from '../types';
import { createError } from '../middleware/errorHandler';

export class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  // GET /api/users
  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const searchParams: UserSearchParams = {
        q: req.query.q as string,
        role: req.query.role as string,
        isActive: req.query.isActive ? req.query.isActive === 'true' : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: req.query.sortBy as 'username' | 'email' | 'createdAt',
        sortOrder: req.query.sortOrder as 'ASC' | 'DESC'
      };

      const { users, total } = await this.userModel.findAll(searchParams);
      
      const response: ApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        pagination: {
          page: searchParams.page || 1,
          limit: searchParams.limit || 10,
          total,
          totalPages: Math.ceil(total / (searchParams.limit || 10))
        }
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/users/:id
  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid user ID', 400);
      }

      const user = await this.userModel.findById(id);
      
      if (!user) {
        throw createError('User not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        message: 'User retrieved successfully',
        data: user
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/users/:id
  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid user ID', 400);
      }

      const userData = req.body;
      
      // Check if user exists
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        throw createError('User not found', 404);
      }

      // Check if email is being changed and if it already exists
      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await this.userModel.findByEmail(userData.email);
        if (emailExists) {
          throw createError('User with this email already exists', 409);
        }
      }

      // Check if username is being changed and if it already exists
      if (userData.username && userData.username !== existingUser.username) {
        const usernameExists = await this.userModel.findByUsername(userData.username);
        if (usernameExists) {
          throw createError('User with this username already exists', 409);
        }
      }

      const user = await this.userModel.update(id, userData);
      
      const response: ApiResponse = {
        success: true,
        message: 'User updated successfully',
        data: user
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/users/:id
  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid user ID', 400);
      }

      const deleted = await this.userModel.delete(id);
      
      if (!deleted) {
        throw createError('User not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        message: 'User deleted successfully'
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/users/profile
  getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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
        message: 'Profile retrieved successfully',
        data: user
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/users/profile
  updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const userData = req.body;
      const userId = req.user.userId;
      
      // Check if user exists
      const existingUser = await this.userModel.findById(userId);
      if (!existingUser) {
        throw createError('User not found', 404);
      }

      // Check if email is being changed and if it already exists
      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await this.userModel.findByEmail(userData.email);
        if (emailExists) {
          throw createError('User with this email already exists', 409);
        }
      }

      // Check if username is being changed and if it already exists
      if (userData.username && userData.username !== existingUser.username) {
        const usernameExists = await this.userModel.findByUsername(userData.username);
        if (usernameExists) {
          throw createError('User with this username already exists', 409);
        }
      }

      // Remove role and isActive from user data for profile updates
      delete userData.role;
      delete userData.isActive;

      const user = await this.userModel.update(userId, userData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Profile updated successfully',
        data: user
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
