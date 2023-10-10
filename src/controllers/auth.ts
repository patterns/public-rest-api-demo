import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign, Secret } from 'jsonwebtoken';

import User from '../models/User';
import { JWT_SECRET } from '../resources/settings';

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
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        invalidCredentialReturn();
      } else {
        // return jsonwebtoken (to authenticate)
        const payload = {
          user: {
            id: user.id,
          },
        };

        sign(
          payload,
          JWT_SECRET as Secret,
          {
            expiresIn: 259200, // 3 days
          },
          (err: Error, token: string) => {
            if (err) {
              throw err;
            }
            res.json({ token });
          },
        );
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
    const { name, email, password } = req.body;

    // check if email exists
    let existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ errors: [{ msg: 'User already exists with this email' }] });
    }

    // create and save new user
    let user = new User({
      name,
      email,
      password,
    });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    // return jsonwebtoken (to authenticate)
    const payload = {
      user: {
        id: user.id,
      },
    };

    sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 259200, // 3 days
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error. Please try again.' }] });
  }
};
