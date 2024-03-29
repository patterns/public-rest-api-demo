import { Request, Response, NextFunction } from 'express';
import { Account } from '../models/auth-models';
import User from '../models/User';
import { Course } from '../models/course';


export default class AuthService {

    accountModel: typeof Account
    userModel: typeof User;

    public constructor(accountModel: typeof Account, userModel: typeof User) {
        this.accountModel = accountModel;
        this.userModel = userModel
    }
    
    getAuthToken = async (req: Request, res: Response, next: NextFunction) => {
        
        const authorization = req.headers['authorization'];
        
        if (!authorization)
        { throw new Error("No Authorization tokens found.") }

        const headerParts = authorization.split(' ');

        if ( headerParts.length < 2 || headerParts[0] !== "Bearer" ) 
        { throw new Error("No Authorization tokens found.") }

        const token = headerParts[1]

        let account = await this.accountModel.findOne({access_token: token})
            .populate('userId')
            .exec();

        req.account = account.toJSON();

        if (!account) {
            return res.status(402).json({"message": "Cannot find account"});
        }

        next();
    }
    // Permissions access middleware for ensuring role-based access to certain routes i.e. instructor
    checkPermissions = (permissions: String[]) => async(req: Request, res: Response, next: NextFunction) => {
        
        let currentUserRole = Object(req.account).userId.role;

        try {

            if (!permissions.includes(currentUserRole)) {

                return res.status(403).json({
                    message: 'Access forbidden: Missing required permissions to access the resource.',
                });
            }
            req.role = currentUserRole;

            console.log(currentUserRole);

            next();

        } catch (err) {

            return res.status(401).json(err);
        }
    }
    // Check User account authorization: updates to user information
    checkAuthorization = async (req: Request, res: Response, next: NextFunction) => {

        let user = req.account;

        let currentUserId = Object(user).userId._id;

        let profile = req.params.userId

        if (currentUserId.toString() !== profile.toString() ) {

            return res.status(402).json("Not authorize to edit profile");
        }

        let authorizedUser = await this.userModel.findOne({ "_id" : currentUserId}).exec();

        req.profile = authorizedUser.toJSON();

        next();
    }

}

export class CourseAuth extends AuthService {

    courseModel: typeof Course

    constructor(courseModel: typeof Course, accountModel: typeof Account, userModel: typeof User) {
        super(accountModel, userModel);
        this.courseModel = courseModel;
    }
    checkCourseOwner = async (req: Request, res: Response, next: NextFunction) => {

        let user = req.account;

        let currentUserId = Object(user).userId._id;

        let course = await this.courseModel.findOne({ _id : req.params.courseId})
            .exec();

        if (currentUserId.toString() !== Object(course).instructor._id.toString()) {

            return res.status(401).json("Not Authorized to modify course");
        }

        req.course = course.toJSON();

        next();

    }
}