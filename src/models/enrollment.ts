import { Schema, model } from 'mongoose';

const enrollmentSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    updated: Date,
    enrolled: {
        type: Date,
        default: Date.now()
    },
    student: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    lessonStatus: [{
        lesson: {
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        complete: Boolean
    }],
    completed: Date
});

enrollmentSchema.virtual('markComplete')
    .set(function(value: boolean) {
        return this.lessonStatus.map((status) => {
            status.complete = value;
        });
    })

const Enrollment = model('Enrollment', enrollmentSchema);

export default Enrollment;
