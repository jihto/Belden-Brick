import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/Product';
import { ProductSearchParams, ApiResponse } from '../types';
import { createError } from '../middleware/errorHandler';
import fs from 'fs';
import path from 'path';

export class ProductController {
  private productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel();
  }

  // Helper method to delete old image file
  private deleteImageFile(imageUrl: string): void {
    if (imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), 'uploads', 'products', path.basename(imageUrl));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }
  }

  // Helper method to get image URLs from uploaded files
  private getImageUrls(req: Request): string[] {
    if (req.files && Array.isArray(req.files)) {
      return req.files.map((file: Express.Multer.File) => `/uploads/products/${file.filename}`);
    }
    return [];
  }

  // Helper method to get single image URL (for backward compatibility)
  private getImageUrl(req: Request): string | undefined {
    const urls = this.getImageUrls(req);
    return urls.length > 0 ? urls[0] : undefined;
  }

  // GET /api/products
  getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const searchParams: ProductSearchParams = {
        q: req.query.q as string,
        category: req.query.category as string,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: req.query.sortBy as 'name' | 'price' | 'createdAt',
        sortOrder: req.query.sortOrder as 'ASC' | 'DESC'
      };

      const { products, total } = await this.productModel.findAll(searchParams);
      
      const response: ApiResponse = {
        success: true,
        message: 'Products retrieved successfully',
        data: products,
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

  // GET /api/products/:id
  getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid product ID', 400);
      }

      const product = await this.productModel.findById(id);
      
      if (!product) {
        throw createError('Product not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Product retrieved successfully',
        data: product
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/products
  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData = req.body;
      
      // Check if SKU already exists
      const existingProduct = await this.productModel.findBySku(productData.sku);
      if (existingProduct) {
        throw createError('Product with this SKU already exists', 409);
      } 

      const product = await this.productModel.create(productData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Product created successfully',
        data: product
      };

      res.status(201).json(response);
    } catch (error) {
      // If there's an error and files were uploaded, delete the uploaded files
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          this.deleteImageFile(`/uploads/products/${file.filename}`);
        });
      }
      next(error);
    }
  };


  createSingleImageProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      const imageUrl = this.getImageUrl(req);
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid product ID', 400);
      } 

      const product = await this.productModel.update(id, { imageUrl: imageUrl });

      if (!product) {
        throw createError('Product not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Product updated successfully',
        data: product
      };

      res.status(200).json(response);
    } catch (error) {
      // If there's an error and files were uploaded, delete the uploaded files
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          this.deleteImageFile(`/uploads/products/${file.filename}`);
        });
      }
      next(error);
    }
  };

  createMultipleImagesProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      const imageUrl: string[] = this.getImageUrls(req);
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid product ID', 400);
      } 

      const product = await this.productModel.update(id, { images: imageUrl });

      if (!product) {
        throw createError('Product not found', 404);
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Product updated successfully',
        data: product
      };

      res.status(200).json(response);
    } catch (error) {
      // If there's an error and files were uploaded, delete the uploaded files
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          this.deleteImageFile(`/uploads/products/${file.filename}`);
        });
      }
      next(error);
    }
  }

  // PUT /api/products/:id
  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid product ID', 400);
      }

      const productData = req.body;
      
      // Check if product exists
      const existingProduct = await this.productModel.findById(id);
      if (!existingProduct) {
        throw createError('Product not found', 404);
      }

      // Check if SKU is being changed and if it already exists
      if (productData.sku && productData.sku !== existingProduct.sku) {
        const skuExists = await this.productModel.findBySku(productData.sku);
        if (skuExists) {
          throw createError('Product with this SKU already exists', 409);
        }
      } 
      const product = await this.productModel.update(id, productData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Product updated successfully',
        data: product
      };

      res.json(response);
    } catch (error) {
      // If there's an error and files were uploaded, delete the uploaded files
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          this.deleteImageFile(`/uploads/products/${file.filename}`);
        });
      }
      next(error);
    }
  };

  // DELETE /api/products/:id
  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        throw createError('Invalid product ID', 400);
      }

      // Get product info before deletion to delete associated image
      const existingProduct = await this.productModel.findById(id);
      if (!existingProduct) {
        throw createError('Product not found', 404);
      }

      const deleted = await this.productModel.delete(id);
      
      if (!deleted) {
        throw createError('Product not found', 404);
      }

      // Delete associated image file
      if (existingProduct.imageUrl) {
        this.deleteImageFile(existingProduct.imageUrl);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Product deleted successfully'
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/products/category/:category
  getProductsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = req.params.category;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const products = await this.productModel.findByCategory(category, limit);
      
      const response: ApiResponse = {
        success: true,
        message: `Products in category '${category}' retrieved successfully`,
        data: products
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/products/search
  searchProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const searchParams: ProductSearchParams = {
        q: req.query.q as string,
        category: req.query.category as string,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: req.query.sortBy as 'name' | 'price' | 'createdAt',
        sortOrder: req.query.sortOrder as 'ASC' | 'DESC'
      };

      if (!searchParams.q && !searchParams.category) {
        throw createError('Search query or category is required', 400);
      }

      const { products, total } = await this.productModel.findAll(searchParams);
      
      const response: ApiResponse = {
        success: true,
        message: 'Search completed successfully',
        data: products,
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

  // Get all categories
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.productModel.getCategories();
      
      const response: ApiResponse = {
        success: true,
        message: 'Categories retrieved successfully',
        data: categories
      };

      res.json(response);
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }
}
