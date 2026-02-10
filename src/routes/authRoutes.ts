import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/AuthController';
import { validate } from '../middleware/validateResource';
import { registerSchema, loginSchema } from '../schemas/userSchema';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);


export default router;