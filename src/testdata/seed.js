const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/test';

const Course = require('./models/courses.ts')
//const Enrollment = require('./models/enrollment.ts');

const courses = require('./seed-courses.js');
//const enrollments = require('./testdata/seed-enrollments.js');
const seedUserRoles = require('./seed-users-roles.js');


mongoose
    .connect(db, { autoIndex: true })
        .then(() => {
            console.log('MONGO CONNECTION OPEN!!!');
        })
        .catch((err) => {
            console.log(err);
        });


const seedDB = async () => {
    
}


seedDB().then(() => {
    mongoose.connection.close();
});

