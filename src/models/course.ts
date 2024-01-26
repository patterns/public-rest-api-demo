import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
    title: String,
    content: String,
    resource_url: String
})

export const Lesson = model('Lesson', lessonSchema);

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now()
    },
    lessons: [lessonSchema]
});

const Course = model('Course', courseSchema);
export default Course;