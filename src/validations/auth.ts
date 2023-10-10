import { check } from "express-validator";

export const loginValidation = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').not().isEmpty()
];

export const registerValidation = [
    check('name', 'Please enter a name').not().isEmpty(),
    check('name', 'Please enter a name with 25- characters').isLength({ max: 25 }),
    check('email', 'Please enter a valid email').isEmail(),
    check('email', 'Please enter a shorter email').isLength({ max: 200 }),
    check('password', 'Please enter a password with 8+ characters').isLength({ min: 8 }),
    check('password', 'Please enter a password with 200- characters').isLength({ max: 200 })
];