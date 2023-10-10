import { Router } from 'express';

import { loginValidation, registerValidation } from "../validations/auth";
import { login, register } from "../controllers/auth";


const router = Router();


router.post('/auth/login', loginValidation, login);
router.post('/auth/register', registerValidation, register);


export default router