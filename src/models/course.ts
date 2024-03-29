import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
    title: String,
    content: String,
    resource_url: String
})

lessonSchema.index({title: 1})

export const Lesson = model('Lesson', lessonSchema);

const courseSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
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
    image: {
        data: Buffer,
        contentType: String
    },
    lessons: [lessonSchema]
});

courseSchema.index({title: 1})

export const Course = model('Course', courseSchema);