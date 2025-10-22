import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWTPayload, AuthenticatedRequest } from '../types';
import { createError } from './errorHandler';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw createError('Access token is required', 401);
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw createError('Token has expired', 401);
        } else if (err.name === 'JsonWebTokenError') {
          throw createError('Invalid token', 401);
        } else {
          throw createError('Token verification failed', 401);
        }
      }

      req.user = decoded as JWTPayload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      if (!roles.includes(req.user.role)) {
        throw createError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireUserOrAdmin = requireRole(['user', 'admin']);
