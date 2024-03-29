import { check } from "express-validator";

export const loginValidation = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8, max: 25 }),
    check('password', 'Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 special character or 1 number.')
        .matches(/(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@#$%A^&-+=()!? "])).{8,128}$/)
];

export const registerValidation = [
    check('name.first', 'Please enter a first name').not().isEmpty(),
    check('name.first', 'Please enter a first name with 25- characters').isLength({ max: 25 }),
    check('name.last', 'Please enter a last name').not().isEmpty(),
    check('name.last', 'Please enter a last name with 25- characters').isLength({ max: 25 }),
    check('email', 'Please enter a valid email').isEmail(),
    check('email', 'Please enter a shorter email').isLength({ max: 200 }),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8, max: 25 }),
    check('password', 'Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 special character or 1 number.')
        .matches(/(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@#$%A^&-+=()!? "])).{8,128}$/),
];

