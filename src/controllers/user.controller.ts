import { Request, Response, NextFunction } from 'express';
import User from '../models/User'
import extend from 'lodash/extend'

// Retrieve user by userId; passed as routing parameters
export const findUserByID = async (req: Request, res: Response, next: NextFunction, id: String) => {
    try {
        let user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                error: "Unable to find User."
            })
        }
        req.body.profile = user
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve User"
        })
    }
};

// Read current user and include in response
export const readUser = (req: Request, res: Response) => {
    req.body.profile.hashed_password = undefined
    return res.json(req.body.profile)
}

// List all users
// *** NEED TO ADD AUTH MIDDLWARE FUNCTIONS TO RESTRICT TO ADMINS ***
export const listUsers = async (req: Request, res: Response) => {
    try {

        let users = await User.find().select('name email role updated created');
        res.json(users);

    } catch (err) {

        return res.status(400).json({
            error: "Could not access Users"
        });
    }
};

// Update a user's own account information
export const updateUser = async (req: Request, res: Response) => {

    try {

        let user = req.body.profile

        user = extend(user, req.body)

        user.updated = Date.now();

        await user.save();

        user.hashed_password = undefined

        res.json(user);

    } catch (err) {

        return res.status(400).json({
            error: "Could not update User"
        });
    }
}

// Remove user account
// *** CURRENTLY ONLY ACCESSED BY AN AUTHENTICATED USER FOR THEIR OWN ACCOUNT ***
export const deleteUser = async (req: Request, res: Response) => {

    try {

        let user = req.body.profile

        let deletedUser = await User.deleteOne(user);

        res.json(deletedUser)

    } catch (err) {

        return res.status(400).json({

            error: "Could not delete User"
        })
    }
}