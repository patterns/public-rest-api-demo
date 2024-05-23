import { Router } from 'express';
import { Auth } from '../config/auth.config';
import { 
    findUserByID, loadUser, listActiveUsers, listInstructors, updateUser, setUserAccessStatus 
} from '../controllers/user.controller';


const router = Router();

const authInstance = Auth;

/*
 * User routes
 */


// list all instructors/tutors
router.route('/instructors')
    .get(listInstructors)


// User account access routes
router.route('/:userId')
    .get(findUserByID, loadUser)
    .put(authInstance.checkAuthorization, updateUser)


// Get all active users **Admin users only.
router.route('/admin/active-users')
    .get(authInstance.checkPermissions(['instructor', 'administrator']), listActiveUsers)


// Deactivate a user's account
router.route('/admin/:userId')
    .get(findUserByID, loadUser)
    .put(authInstance.checkPermissions(['administrator']), setUserAccessStatus)


export default router
