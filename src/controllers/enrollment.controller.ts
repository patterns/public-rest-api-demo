import { Request, Response, NextFunction } from 'express';
import Enrollment from "../models/enrollment";
import Course from "../models/course";

// Enroll in a new course
export const createNewEnrollment = async (req: Request, res: Response) => {
    
    let course = await Course.findById(req.params.courseId).exec();

    let lessonStatus = course.lessons.map((lesson) => {

        return { lesson: lesson, complete: false }
    })

    let enrollment = new Enrollment(
        {
            course: course,
            lessonStatus: lessonStatus,
            student: req.params.userId
        })

    try {

        let result = await enrollment.save()

        return res.status(200).json(result)

    } catch (err) {

        return res.status(400).json({
            error: "Could not enroll in course."
        });
    }
};

// Retrieve an enrollment passing enrollmentId in router.params
export const findEnrollmentByID = async (req: Request, res: Response, next: NextFunction, id: String) => {
    
    try {

        let enrollment = await Enrollment.findById(id).populate(
            {
                path: 'course', 
                populate: {path: 'instructor'}
            }
        ).populate('student', '_id name')

        if (!enrollment) {

            return res.status(400).json({
                error: "Enrollment not found"
            });
        }

        req.body.enrollment = enrollment;

        next();

    } catch (err) {

        return res.status(400).json({
            error: "Could not retrieve enrollment"
        });
    }
};

// Read the current enrollment
export const readEnrollment = (req: Request, res: Response) => {

    return res.json(req.body.enrollment);

};

// Update lesson status or course to complete
export const updateToComplete = async (req: Request, res: Response) => {

    let updatedData: any = {}

    updatedData = req.body

    updatedData.updated = Date.now()

    if (updatedData.courseCompleted) {

        updatedData.completed = req.body.courseCompleted
        return;
    }
    
    try {

        let result = await Enrollment.findById(req.params.enrollmentId);

        // Iterate through the stored lessonStatus array and check for a match with request data
        for (const [key, val] of result.lessonStatus.entries()) {

            // matching parameter is in the lesson referenced as the lesson._id
            if (result.lessonStatus[key] && updatedData.lesson == val.lesson) {

                result.lessonStatus[key].complete = updatedData.complete

                result.save();

                break;
            }
        }

        // respond with the updated array of lessons
        res.status(200).json(result.lessonStatus);

    } catch (err) {

        console.log(err.message)

        return res.status(400).json({
            error: "Unable to update Enrollment"
        });
    }
};

// Withdraw from a course
export const removeEnrollment = async (req: Request, res: Response) => {

    try {

        let enrollment = req.body.enrollment

        let deletedEnrollment = await enrollment.deleteOne();

        res.status(200).json(deletedEnrollment);

    } catch (err) {

        return res.status(400).json({
            error: "Unable to remove enrollment"
        });
    }
};

// Retrieve list of all enrolled courses
export const listEnrolled = async (req: Request, res: Response) => {

    try {

        let enrollments = await Enrollment.find({
            student: req.params.userId
        })
        .sort({'completed': 1})
        .populate('course', '_id name category')

        res.status(200).json(enrollments)

    } catch (err) {

        console.log(err)

        return res.status(400).json({
            error: "Unable to get list of enrolled courses"
        });
    }
};

// Retrieve an enrollment with courseId and userId as request parameters
export const findEnrollment = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let enrollments = await Enrollment.find({
            course: req.params.courseId,
            student: req.params.userId
        });

        if (enrollments.length == 0) {

            next();

        } else {

            res.json(enrollments[0])

        }

    } catch (err) {

        return res.status(400).json({
            error: "Cannot get enrollments "
        });
    }
};

// Retrieve enrollment stats for a course
// Total enrolled and Total completed
export const enrollmentStats = async (req: Request, res: Response) => {
    try {

        let stats: any = {}

        stats.totalEnrolled = await Enrollment.find(
            {course: req.params.courseId}).countDocuments()

        stats.totalCompleted = await Enrollment.find(
            {course: req.params.courseId}).exists('completed', true).countDocuments()

            res.status(200).json(stats)

    } catch (err) {

        return res.status(400).json({
            error: "Unable to get enrollment statistics."
        });
    }
};

