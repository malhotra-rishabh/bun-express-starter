import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema } from '../validations/userValidation';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

// Create user
router.post('/', validateRequest(createUserSchema), createUser);

// Get all users
router.get('/', isAuthenticated, getAllUsers);

export default router; 