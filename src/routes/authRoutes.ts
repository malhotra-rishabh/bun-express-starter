import { Router } from 'express';
import { login } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { loginSchema } from '../validations/authValidation';

const router = Router();

router.post('/login', validateRequest(loginSchema), login);

export default router; 