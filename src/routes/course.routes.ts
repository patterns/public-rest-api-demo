import { Router } from 'express';
import { findUserByID, loadUser } from '../controllers/user.controller';
import { createCourse, findCourseByID, loadCourse,
    updateCourse, addNewLesson, deleteCourse, listCourses, listCoursesByInstructor, 
    listPublishedCourses, photo, findCoursesByCategory, loadCourses } from '../controllers/course.controller';
import{ Auth, courseAuth } from '../config/auth.config';

const authInstance = Auth;

const courseAuthInstance = courseAuth;

const router = Router();

/*
 * Course Routes 
 */

// Get All courses
router.route('/')
    .get(listCourses)

// Get Courses by Category
router.route('/category/:category')
    .get(findCoursesByCategory, loadCourses)


// Get all published courses
router.route('/published')
    .get(listPublishedCourses)


// Get courses offered by a specific instructor
router.route('/instructors/:userId')
    .get(findUserByID, listCoursesByInstructor)


// Add a new course: instructors and admins
router.route('/admin/new-course')
    .post(authInstance.checkPermissions(['instructor', 'administrator']), createCourse)


// Access and edit a course: instructors and admins
router.route('/admin/:courseId')
    .get(courseAuthInstance.checkCourseOwner, loadCourse)
    .put(courseAuthInstance.checkCourseOwner, updateCourse)
    .delete(courseAuthInstance.checkCourseOwner, deleteCourse)


router.route('/admin/:courseId/new-lesson')
    .put(courseAuthInstance.checkCourseOwner, addNewLesson);


export default router;

// Access course image resource
// TODO: complete defaultImage func for second parameter in .get()
//router.route('/photo/:courseId').get(photo, defaultImage) 