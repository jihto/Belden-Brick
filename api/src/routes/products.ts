import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/ProductController';
import { validateProduct, validateProductSmart } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { uploadSingleImage, uploadMultipleImages, handleUploadError } from '../middleware/upload';

const router = Router();
const productController = new ProductController();

// GET /api/products - Get all products
router.get('/', productController.getAllProducts.bind(productController));

// GET /api/products/categories - Get all categories (must be before /:id)
router.get('/categories', productController.getCategories.bind(productController));
// POST /api/products/single-image/:id - Create single image product (protected)
router.post('/single-image/:id', authenticateToken, uploadMultipleImages, handleUploadError, productController.createSingleImageProduct.bind(productController));
// POST /api/products/multiple-images/:id - Create multiple images product (protected)
router.post('/multiple-images/:id', authenticateToken, uploadMultipleImages, handleUploadError, productController.createMultipleImagesProduct.bind(productController));

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', productController.getProductsByCategory.bind(productController));

// GET /api/products/search - Search products
router.get('/search', productController.searchProducts.bind(productController));

// GET /api/products/:id - Get product by ID (must be last)
router.get('/:id', productController.getProductById.bind(productController));

// POST /api/products - Create new product (protected)
router.post('/', authenticateToken, handleUploadError, validateProductSmart, productController.createProduct.bind(productController));

// PUT /api/products/:id - Update product (protected)
router.put('/:id', authenticateToken, handleUploadError, validateProductSmart, productController.updateProduct.bind(productController));

// DELETE /api/products/:id - Delete product (protected)
router.delete('/:id', authenticateToken, productController.deleteProduct.bind(productController));

export default router;
