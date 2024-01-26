import { Router } from 'express';
import { requireLogin, hasAuthorization } from '../controllers/auth.controller';
import { findUserByID } from '../controllers/user.controller';
import { createCourse, readCourse, findCourseByID, updateCourse, addNewLesson, 
    deleteCourse, listByInstructor, listPublished, photo } from '../controllers/course.controller';
import { checkPermissions } from '../middleware/auth.middleware';

const router = Router();

/*
 * Course Routes 
 */

// Get a list of all published courses
router.route('/published')
    .get(listPublished)

// Get a course referenced by its courseId
router.route('/:courseId/view')
    .get(readCourse)

// Access an instructor with list of list all courses of Instructor
// create a new course referenced by the Instructor's 
router.route('/:userId/add')
    .post(requireLogin, hasAuthorization, checkPermissions(['instructor']), createCourse)

// Access a list of courses by instructor
router.route('/:userId/list')
    .get(requireLogin, hasAuthorization, listByInstructor)

// Add new lessons to a course
router.route('/:userId/:courseId/lesson/add')
    .put(requireLogin, hasAuthorization, checkPermissions(['instructor']), addNewLesson)

// Access and edit a course
router.route('/:userId/:courseId/edit')
    .put(requireLogin, hasAuthorization, checkPermissions(['instructor']), updateCourse)
    .delete(requireLogin, hasAuthorization, checkPermissions(['instructor']), deleteCourse)

// user and course request routing parameters
router.param('courseId', findCourseByID)
router.param('userId', findUserByID)

export default router;

// Access course image resource
// FIXME: complete defaultImage func for second parameter in .get()
//router.route('/photo/:courseId').get(photo, defaultImage) 