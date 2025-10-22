import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateLogin, validateRegister } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const authController = new AuthController();

// POST /api/auth/register - Register new user
router.post('/register', validateRegister, authController.register);

// POST /api/auth/login - Login user
router.post('/login', validateLogin, authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', authController.logout);

// POST /api/auth/refresh - Refresh token
router.post('/refresh', authController.refreshToken);

// GET /api/auth/me - Get current user (protected)
router.get('/me', authenticateToken, authController.getCurrentUser);

// POST /api/auth/forgot-password - Forgot password
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Reset password
router.post('/reset-password', authController.resetPassword);

export default router;
