import { Request, Response, NextFunction } from 'express';
import extend from 'lodash/extend';
import { IncomingForm } from 'formidable'
import fs from 'fs';
import Course from '../models/course';

export const createCourse = (req: Request, res: Response) => {

    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {

        // Extract all required db fields from form
        const { name, category, published, description } = fields

        // Extract image file if included (optional)
        const { image } = files

        if (err) {
            throw err
        }

        // Instantiate and initialize new Course object from the form fields
        let course = new Course({
            name: name.toString(),
            category: category.toString(),
            published: published.toString(),
            description: description.toString()
        });

        // Assign the course db field instructor from the current instructor
        course.instructor = req.body.profile

        // Image file upload
        // ***NOT TESTED YET***
        if (image) {

            course.image.data = fs.readFileSync(image.toString());

            course.image.contentType = image.toString()

        }

        try {

            let result = await course.save()

            res.status(200).json({result})

        } catch (err) {

            return res.status(400).json({

                message: err.message

            })
        }
    })
};

// Retrieve course by Id to pass to routing params
export const findCourseByID = async (req: Request, res: Response, next: NextFunction, id: String) => {
    
    try {

        let course = await Course.findById(id).populate('instructor', '_id name')

        if (!course) {

            return res.status(400).json({
                error: "Course not found"
            })
        }


        req.body.course = course

        next();

    } catch (err) {

        return res.status(400).json({
            error: "Could not retrieve course"
        })
    }
};

// return course from currently accessed course
export const readCourse = (req: Request, res: Response) => {

    req.body.course.image = undefined
    
    return res.json(req.body.course)

};

// Retrieve all courses
export const listCourses = async (req: Request, res: Response) => {

    try {

        let courses = await Course.find({}).select('name email updated created')

        res.json(courses)

    } catch (err) {

        return res.status(400).json({
            error: "Could not get all Courses"
        })
    }
};

// Updated a course
export const updateCourse = async (req: Request, res: Response) => {

    const form = new IncomingForm({
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw err
        }

        let course = req.body.course

        // Get all field values 
        const data = { ...fields }

        const dataFiles = { files }

        course = extend(course, data)

        course.updated = Date.now()

        if (files.image) {
            course.image.data = fs.readFileSync(Object.entries(dataFiles).toString())
            course.image.contentType = req.body.files.image.type
        }
        
        try {

            // iterate through the form fields to check for field entries
            for (const [key, value] of Object.entries(data)) {
                course.set(key, value.toString())
                console.log(`${key}: ${value.toString()}`)
            }
            
            res.status(200).json(course)

        } catch (err) {

            return res.status(400).json({
                error: "Could not save course"
            })
        }
    })
};

// Add new lessons to a course
export const addNewLesson = async (req: Request, res: Response) => {

    try {

        let { lessons, course } = req.body

        let result = await Course.findByIdAndUpdate(
            course._id,
            {
                $push: {lessons: lessons},
                updated: Date.now()
            },
            {
                new: true
            }
        ).populate('instructor', '_id name')
        .exec()

        res.status(200).json(result)

    } catch (err) {

        return res.status(400).json({
            error: "Could not add new Lesson"
        })
    }
};

// Remove a course from the db
export const deleteCourse = async (req: Request, res: Response) => {

    try {

        let course = req.body.course;

        let result = await course.deleteOne();
        
        res.status(200).json(
            {
                message: "course was successfully deleted",
                result,
            });

    } catch (err) {

        return res.status(400).json({
            error: "Could not delete course"
        })
    }
};

// List courses by instructor: userId as params
export const listByInstructor = async (req: Request, res: Response) => {
    try {

        const courses = await Course.find({ instructor: req.body.profile })
        .populate('instructor', '_id name').exec();

        return res.json(courses);

    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
    
};

// Retrieve a list of all published courses
export const listPublished = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({published: true})
            .populate('instructor', '_id name').exec();

        return res.status(200).json(courses);

    } catch (err) {

        console.log(err.message)

        return res.status(400).json({
            error: "Could not get list of published courses"
        })
    }
};

// Set image content and send image data
export const photo = (req: Request, res: Response, next: NextFunction) => {

    if(req.body.course.image.data) {
        res.set("Content-Type", req.body.course.image.contentType)
        return res.send(req.body.course.image.data)
    }
    next();
};

/**
 * // For implementation at a later time
 * export const defaultPhoto = (req: Request, res: Response) => {
 * return res.sendFile(process.cwd()+'defaultPath') } 
 **/

