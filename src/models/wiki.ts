import { Schema, model } from 'mongoose';

const sectionSchema = new Schema({
    title: String,
    content: String,
    image: {
        data: Buffer,
        contentType: String
    },
    updated: Date
});

sectionSchema.index({ title: 1 });

const wikiSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date,
    content: [sectionSchema]
});

const content = model('Section', sectionSchema);
const wiki = model('Wiki', wikiSchema);

export default {
    content,
    wiki
};