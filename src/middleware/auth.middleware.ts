import { Request, Response, NextFunction} from 'express';
import {sign, verify, Secret, JwtPayload} from 'jsonwebtoken';
import { JWT_SECRET } from '../resources/settings';
import User from '../models/User';

export interface AuthRequest extends Request {
    token: JwtPayload;
}

// Generate JWT tokens for auth mechanisms: 
export function generateToken(payload: any, res: Response) {

    return sign(payload, JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: 259200,
        },
        (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).json({token})
        });
};

// Authorization middleware
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const token = <string>req.headers['authorization'];

    try {
        let jwtPayload = <any>verify(token?.split(' ')[1], JWT_SECRET as Secret, 
            {
                algorithms: ['HS256']
            });
            (req as AuthRequest).token = jwtPayload
            next();
    } catch (error) {
        res.status(401).send(JSON.stringify(
            {
                message: "Missing or invalid token"
            }));
    }
};

// Permissions access middlware for ensuring role-based access to certain routes i.e. instructor
export const checkPermissions = (permissions: String[]) => async (req: Request, res: Response, next: NextFunction) => {
    
    const currentUser = req.body.profile

    try {

        let user = await User.findById(currentUser._id, 'role.name');

        let role_name = user.role.name

        if (!permissions.includes(role_name.toString())) {

            return res.status(403).json({
                message: 'Access forbidden: Missing required permissions to access the resource.',
                role_name
            });
        }
        next();

    } catch (err) {

        res.status(401).json({
            message: err.message
        });
    }
};



