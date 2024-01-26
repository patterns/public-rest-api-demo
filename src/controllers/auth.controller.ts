import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { genSalt, hash, compare } from 'bcryptjs';
import { expressjwt } from 'express-jwt';
import { JWT_SECRET } from '../resources/settings';
import User from '../models/User';
import Roles from '../models/roles'
import { generateToken, authenticateToken } from '../middleware/auth.middleware';

export const login = async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  try {

    const { email, password } = req.body;

    const invalidCredentialReturn = () => {

      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    };

    // check if user exists
    let user = await User.findOne({ email });

    if (!user) {

      invalidCredentialReturn();

    } else {

      // make sure username and password are valid
      const isMatch = await compare(password, user.hashed_password);

      if (!isMatch) {

        invalidCredentialReturn();

      } else {
        // return jsonwebtoken (to authenticate)
        const payload = {
          user: {
            id: user.id,
            role: user.role
          },
        };
        generateToken(payload, res);
      }
    }
  } catch (err) {

    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error. Please try again.' }] });

  }
};

export const register = async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  try {

    const { name: { first, last }, email, password, role: { name } } = req.body;

    // check if email exists
    let existingEmail = await User.findOne({ email });

    if (existingEmail) {

      return res.status(400).json({ errors: [{ msg: 'User already exists with this email' }] });

    }

    let user_role = await Roles.findOne({ 'name': req.body.role.name });
    
    const _id = user_role._id;

    let user = new User({

      name: { first, last },
      email,
      password,
      role: { _id, name }

    });

    const salt = await genSalt(10);

    user.hashed_password = await hash(password, salt);

    await user.save();

    // return jsonwebtoken (to authenticate)
    const payload = {
      user: {
        id: user.id,
        role: user.role
      },
    };
    generateToken(payload, res);

  } catch (err) {

    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error. Please try again.' }] });
  }

};

export const logout = (req: Request, res: Response) => {

  return res.status(200).json({
    message: "You have been logged out"
  });

};

export const requireLogin = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload'
});

export const hasAuthorization = async (req: Request, res: Response, next: NextFunction) => {

  const authorized = authenticateToken(req, res, next);

  if (!(authorized)) {

    return res.status(403).json({
      error: "User is not authorized"
    });

  }
};