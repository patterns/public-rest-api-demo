import { Request, Response, NextFunction } from 'express';
import extend from 'lodash/extend';
import { IncomingForm } from 'formidable'
import fs from 'fs';
import { Course } from '../models/course';


// Create course using Form data **Be sure to use form-data Body when testing in Postman**
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
        course.instructor = Object(req.account).userId._id
        
        // Image file upload
        // ***NOT TESTED YET***
        if (image) {

            course.image.data = fs.readFileSync(image.toString());

            course.image.contentType = image.toString()

        }

        try {

            let result = await course.save()

            return res.status(201).json({result})

        } catch (err) {

            return res.status(400).json({

                message: err.message

            })
        }
    })
};


// Retrieve course by Id to pass to routing params
export const findCourseByID = async (req: Request, res: Response, next: NextFunction) => {
    
    let course = await Course.findOne({ _id: req.params.courseId })
            .populate('instructor')
            .populate('lessons')
            .exec()
            .then((course) => {
                console.log(course);
                req.course = course.toJSON();
                next();
            })
            .catch((err) => {
                return err.message
            });
        
};

// return course from currently accessed course
export const loadCourse = (req: Request, res: Response) => {
    
    return res.json(req.course);

};

export const findCoursesByCategory = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let courses = await Course.find({ category: req.params.category })
            .populate('instructor', '_id name')
            .populate('lessons', '_id title content')
            .sort('category')
            .exec();

        if (!courses) {
            return res.status(404).json({
                message: "Could not find course."
            })
        }

        req.body.courses = courses

        next();

    } catch (err) {

        return res.status(500).json(err);
    }

}


export const loadCourses = (req: Request, res: Response) => {

    return res.json(req.body.courses);

}


// Retrieve all courses
export const listCourses = async (req: Request, res: Response) => {

    try {

        let courses = await Course.find({})
            .populate('instructor')
            .populate('lessons')
            .select('title category description instructor')

        if (!courses) {

            return res.status(404).json({message: "Could not find courses."})
        
        } else {

            return res.status(200).json(courses)

        }

    } catch (err) {

        return res.status(500).json(err)
    }
};


// Update: ** Test with form-data in Postman.
export const updateCourse = async (req: Request, res: Response) => {

    const form = new IncomingForm({
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw err
        }

        let course = Object(req.course)

        console.log(course);

        // Get all field values 
        const data = { ...fields }

        const dataFiles = { files }

        course = extend(course, data)

        console.log(course);

        course.updated = Date.now()

        if (files.image) {
            course.image.data = fs.readFileSync(files.image.toString())
            course.image.contentType = files.image.toString();
        }
        
        try {

            // iterate through the form fields to check for field entries
            for (const [keys, values] of Object.entries(data)) {
                const [key, ] = keys
                const [val, ] = values
                await Course.updateOne({course}, {key, val});
            }

            return res.status(200).json(course);

        } catch (err) {

            return res.status(500).json(err);
        }
    })
};


// Add new lessons to a course
export const addNewLesson = async (req: Request, res: Response) => {

    try {

        let course = req.course

        let lessons = {...req.body}

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
        .populate('lessons')
        .exec()

        return res.status(200).json(result)

    } catch (err) {

        return res.status(400).json({
            error: "Could not add new Lesson"
        })
    }
};


// Remove a course from the db
export const deleteCourse = async (req: Request, res: Response) => {

    try {

        let course = Object(req.course)._id;

        await Course.findOneAndDelete({ _id: course._id })
            .exec()
            .then((deleted) => {
                return res.status(200).json({deleted});
            })
            .catch((error)=> {
                return res.status(400).json({error});
            });

    } catch (err) {

        return res.status(500).json(err);
    }
}


// List courses by instructor: userId as params
export const listCoursesByInstructor = async (req: Request, res: Response) => {

    try {

        const courses = await Course.find({ instructor: req.params.userId })
            .populate('instructor', '_id name')
            .populate('lessons')
            .exec();

        if (!courses) {

            return res.status(400).json({ message: "Could not get courses."})
        }

        return res.status(200).json(courses);

    } catch (err) {

        return res.status(500).json(err);
    }
    
};


// Retrieve a list of all published courses
export const listPublishedCourses = async (req: Request, res: Response) => {

    try {

        const courses = await Course.find({published: true})
            .populate('instructor', '_id name')
            .exec();

        if (!courses) {

            return res.send(400).json({ message: "Could not get courses."});

        }

        return res.status(200).json(courses);

    } catch (err) {

        console.log(err.message)

        return res.status(400).json({
            error: "Could not get list of published courses"
        })
    }
};


// List courses by Category
export const listCoursesByCategory = async (req: Request, res: Response) => {

    try {

        let courses = [{...req.body.courses}]

        if (!courses) {

            return res.status(404).json({ message: "Could not get courses."});
    
        }
        
        return res.status(200).json({courses});

    } catch (err) {

        console.log(err.message)

        return res.status(500).json(err)
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


