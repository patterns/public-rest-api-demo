import { Router } from 'express';
import { requireLogin, hasAuthorization } from '../controllers/auth.controller';
import { findUserByID, readUser, listUsers, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

/*
 * User routes
 */

// get all users
// *** NEEDS AUTH MIDDLEWARE ADDED TO RESTRICT ACCESS TO ADMINS / SUPER-USERS ONLY ***
router.route('/all')
    .get(listUsers)

// User account access routes
router.route('/:userId')
    .get(requireLogin, readUser)
    .put(requireLogin, hasAuthorization, updateUser)
    .delete(requireLogin, hasAuthorization, deleteUser)

router.param('userId', findUserByID)

export default router