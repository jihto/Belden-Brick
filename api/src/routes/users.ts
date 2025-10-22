import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateUser } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// GET /api/users - Get all users (protected)
router.get('/', authenticateToken, userController.getAllUsers);

// GET /api/users/:id - Get user by ID (protected)
router.get('/:id', authenticateToken, userController.getUserById);

// PUT /api/users/:id - Update user (protected)
router.put('/:id', authenticateToken, validateUser, userController.updateUser);

// DELETE /api/users/:id - Delete user (protected)
router.delete('/:id', authenticateToken, userController.deleteUser);

// GET /api/users/profile - Get current user profile (protected)
router.get('/profile', authenticateToken, userController.getProfile);

// PUT /api/users/profile - Update current user profile (protected)
router.put('/profile', authenticateToken, validateUser, userController.updateProfile);

export default router;
