import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
 

// Retrieve user by userId; passed as routing parameters
export const findUserByID = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let user = await User.findById({ '_id': req.params.userId }).select('-_id').exec();

        if (!user) {
            return res.status(404).json({
                error: "Unable to find User."
            })
        }

        req.profile = user.toJSON();

        next();

    } catch (err) {

        return res.status(500).json(err.message);
    }
};


export const loadUser = (req: Request, res: Response) => {

    return res.json(req.profile)

}


// List all users
export const listActiveUsers = async (req: Request, res: Response) => {

    let authorizedUser = req.role

    if (authorizedUser === "administrator" || authorizedUser === 'instructor' ) { 

        try {

            let users = await User.find({})
                .select('name role')
                .exec();
    
            return res.status(200).json(users);
    
        } catch (err) {
    
            return res.status(404).json({
                error: "Could not access Users"
            });
        }
    }

};


export const listInstructors = async (req: Request, res: Response) => {
    
    try {
        
        let instructors = await User.find({'role': 'instructor'})
            .select('name created')
            .exec();

        return res.status(200).json(instructors)

    } catch (err) {
        return res.status(400).json(err);
    }
};


// Update a user's own account information
export const updateUser = async (req: Request, res: Response) => {

    let user = req.profile;
    
    let data = { ...req.body }

    await User.updateOne({"_id": user._id },
        { updated: Date.now(), ...data })
        .then((doc) => { 
            return res.status(200).json(doc.modifiedCount) 
        })
        .catch((err) => { 
            return res.status(400).json(err.message)
        });

}


// Deactivate or Reactivate a user's account
export const setUserAccessStatus = async (req: Request, res: Response) => {

    let user = req.profile

    let input = req.body.active ? true : false;

    await User.updateOne({user}, { $set: { active: input } })
        .then((doc) => {
            return res.status(200).json(
                {
                    "modified": doc.modifiedCount,
                });
        })
        .catch((err) => {
            return res.status(400).json(
                {
                    err: err.message   
                });
        });
}