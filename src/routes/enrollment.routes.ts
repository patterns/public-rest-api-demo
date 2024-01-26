import { Router } from 'express';
import { requireLogin, hasAuthorization } from '../controllers/auth.controller';
import { readUser } from '../controllers/user.controller';
import { findCourseByID} from '../controllers/course.controller';
import { checkPermissions } from '../middleware/auth.middleware';
import { createNewEnrollment, findEnrollmentByID, findEnrollment, readEnrollment,
    updateToComplete, removeEnrollment, listEnrolled, enrollmentStats 
} from '../controllers/enrollment.controller';

const router = Router();

/*
 * Enrollment Routes
 */

// get list of enrolled courses; requires user to be logged in
router.route('/enrolled')
    .get(requireLogin, listEnrolled)

// enroll in a course; requires user to be logged in
router.route('/new/:courseId')
    .post(requireLogin, findEnrollment, createNewEnrollment)

// generate enrollment statistics 
router.route('/stats/:courseId')
    .get(enrollmentStats)

// update lessons to complete
router.route('/complete/:enrollmentId')
    .put(requireLogin, hasAuthorization, updateToComplete)

// Get enrollment status or withdraw from course if needed
router.route('/:enrollmentId')
    .get(requireLogin, hasAuthorization, readEnrollment)
    .delete(requireLogin, hasAuthorization, removeEnrollment)

// course and enrollment request routing parameters
router.param('courseId', findCourseByID)
router.param('enrollmentId', findEnrollmentByID)

export default router;