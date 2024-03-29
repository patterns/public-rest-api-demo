import { Router } from 'express';
import { Auth } from '../config/auth.config';
import { findCourseByID} from '../controllers/course.controller';
import { createNewEnrollment, findEnrollmentByID, findEnrollment, loadEnrollment,
    updateToComplete, removeEnrollment, listEnrolled, enrollmentStats 
} from '../controllers/enrollment.controller';

const authInstance = Auth;

const router = Router();

/*
 * Enrollment Routes
 */

// STUDENT: get list of enrolled courses; requires user to be logged in
router.route('/enrolled')
    .get(listEnrolled)


// STUDENT: check if student is already enrolled. If not create a new enrollment instance
router.route('/:courseId')
    .post(findEnrollment, createNewEnrollment)


// INSTRUCTOR, generate course enrollment statistics { number enrolled, number completed } 
router.route('/stats/:courseId')
    .get(findCourseByID, authInstance.checkPermissions(['instructor', 'administrator']), enrollmentStats)
    

// STUDENT: Get enrollment status, update lesson status, or withdraw from a course
router.route('/:enrollmentId')
    .get(findEnrollmentByID, loadEnrollment)
    .put(updateToComplete)
    .delete(removeEnrollment)


export default router;