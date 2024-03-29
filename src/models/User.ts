import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    emailVerified: {
        type: Date,
        default: Date.now()
    },
    updated: Date,
    created: { type: Date, default: Date.now() },
    role: { 
        type: String, 
        default: "student" 
    },
    active: {
        type: Boolean,
        default: true
    },
    image: String,
}, { collection: 'users' });

userSchema.index({ email: 1 });

const User = model('User', userSchema);

export default User;