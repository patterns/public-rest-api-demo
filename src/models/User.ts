import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        first: { 
            type: String, 
            required: true,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hashed_password: {
        type: String,
        required: true, // required is true temporarily until external identity providers implemented
        trim: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now()
    },
    role: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
    },
});

userSchema.virtual('role_name').get(function() {
    return `${this.role.name}`;
});

userSchema.index({ email: 1 });

const User = model('User', userSchema);

export default User;