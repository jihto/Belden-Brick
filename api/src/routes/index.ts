import { Router } from 'express';
import productRoutes from './products';
import userRoutes from './users';
import authRoutes from './auth';

const router = Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || 'v1';

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    version: API_VERSION,
    timestamp: new Date().toISOString()
  });
});

// Route modules
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// API info route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Belden Brick API',
    version: API_VERSION,
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      users: '/api/users',
      auth: '/api/auth'
    },
    documentation: 'API documentation coming soon'
  });
});

export default router;
