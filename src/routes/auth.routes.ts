import { Router } from 'express';
import { loginValidation, registerValidation } from "../validations/auth";
import { login, register } from '../controllers/auth.controller';

const router = Router()
/*
 * Authentication Routes
 */

// login route
router.post('/login', loginValidation, login);

// registration route
router.post('/register', registerValidation, register);

export default router;
