import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { createError } from './errorHandler';

// Validation schemas
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  role: Joi.string().valid('admin', 'user').optional(),
  isActive: Joi.boolean().optional()
});

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(2).max(50).required(),
  sku: Joi.string().min(3).max(50).required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.string().uri().optional().allow('').allow(null),
  images: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().min(2).max(100).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  specifications: Joi.object({
    dimensions: Joi.string().optional(),
    weight: Joi.string().optional(),
    strength: Joi.string().optional(),
    absorption: Joi.string().optional(),
    color: Joi.string().optional(),
    material: Joi.string().optional(),
    features: Joi.array().items(Joi.string()).optional()
  }).optional(),
  isActive: Joi.alternatives().try(
    Joi.boolean(),
    Joi.string().valid('true', 'false', '1', '0'),
    Joi.number().valid(1, 0)
  ).optional()
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validation middleware factory
const validate = (schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      throw createError(`Validation error: ${errorMessage}`, 400);
    }

    // Replace the original data with validated and sanitized data
    req[property] = value;
    next();
  };
};

// Export validation middleware
export const validateUser = validate(userSchema);
export const validateProduct = validate(productSchema);
export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);

// Custom validation middleware for specific cases
export const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page < 1) {
    throw createError('Page must be greater than 0', 400);
  }

  if (limit < 1 || limit > 100) {
    throw createError('Limit must be between 1 and 100', 400);
  }

  req.query.page = page.toString();
  req.query.limit = limit.toString();
  next();
};

// Smart validation middleware that handles both JSON and FormData
export const validateProductSmart = (req: Request, res: Response, next: NextFunction): void => {
  let productData;
  
  // Check if this is FormData (multipart/form-data)
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    // Parse FormData fields
    productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      category: req.body.category,
      sku: req.body.sku,
      stock: req.body.stock ? parseInt(req.body.stock) : undefined,
      imageUrl: req.body.imageUrl || null,
      images: req.body.images ? JSON.parse(req.body.images) : undefined,
      location: req.body.location || undefined,
      year: req.body.year ? parseInt(req.body.year) : undefined,
      specifications: req.body.specifications ? JSON.parse(req.body.specifications) : {},
      isActive: req.body.isActive === 'true' || req.body.isActive === true || req.body.isActive === '1' || req.body.isActive === 1 || req.body.isActive === 'on'
    };
  } else {
    // This is JSON data
    productData = req.body;
  }

  // Validate using the same schema
  const { error, value } = productSchema.validate(productData, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw createError(`Validation error: ${errorMessage}`, 400);
  }

  // Replace req.body with validated data
  req.body = value;
  next();
};

// Debug middleware to see what we receive
export const debugRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.log('=== DEBUG REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body keys:', Object.keys(req.body));
  console.log('Body values:', req.body);
  console.log('File:', req.file);
  console.log('=== END DEBUG ===');
  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    throw createError('Invalid ID parameter', 400);
  }

  req.params.id = id.toString();
  next();
};
