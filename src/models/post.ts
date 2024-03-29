import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: 'Text is required'
    },
    content: {
        type: String,
        required: 'Text is required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        text: String,
        created: {
            type: Date,
            default: Date.now()
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

const Post = model('Post', postSchema);

export default Post;