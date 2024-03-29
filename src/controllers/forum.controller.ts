import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import { IncomingForm } from 'formidable';
import fs from 'fs';


// Create a new form Post
export const createForumPost = (req: Request, res: Response) => {

    let form = new IncomingForm({
        keepExtensions: true
    })

    form.parse(req, async (err, fields, files) => {

        const { title, content } = fields

        const { image } = files

        if (err) {
            throw err
        }

        let post = new Post({
            title: title.toString(),
            content: content.toString()
        });

        post.postedBy = req.body.profile

        if (image) {

            post.photo.data = fs.readFileSync(image.toString())
            post.photo.contentType = image.toString()
        }

        try {
            let result = await post.save();

            res.status(200).json(result);

        } catch (err) {
            
            return res.status(400).json({
                error: err.message
            });
        }
    });
};


// Get forum Post by Id
export const findForumPostByID = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let post = await Post.findById({'_id': req.params.postId })
            .populate('postedBy', '_id name')
            .exec()

        if (!post) {
            return res.status(400).json({
                message: "Post not found."
            });
        }
        req.body.post = post;

        next();

    } catch (err) {

        return res.status(500).json(err);

    }
};

export const loadPost = (req: Request, res: Response) => {

    return res.json(req.body.post);

};


// Remove a forum Post
export const removePost = async (req: Request, res: Response) => {

    let post = req.body.post

    try {

        let deletedPost = await post.deleteOne();

        if (!deletedPost) {

            return res.status(400).json({ message: "Unable to delete or find post."})
        }
        res.status(200).json(deletedPost);

    } catch (err) {

        return res.status(400).json(err);

    }
};


// Get Posts by User 
export const listForumPostsByUser = async (req: Request, res: Response) => {

    try {

        let posts = await Post.find(
            { postedBy: req.body.profile._id })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()

        res.status(200).json(posts)
    
    } catch (err) {

        return res.status(400).json({
            error: err.message
        })
    } 
};

// Add comment to a forum post
export const addComment = async (req: Request, res: Response) => {

    let comment = req.body.comment

    comment.postedBy = req.body.userId

    try {
        let result = await Post.findByIdAndUpdate({ '_id': req.body.postId }, 
            { $push: { comments: comment} },
            { new: true})
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec();
        
        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json(err)
    }
};

// Remove comment from post
export const removeComment = async (req: Request, res: Response) => {

    let comment = req.body.comment;

    try {

        let result = await Post.findByIdAndUpdate(req.body.postId, 
            { $pull: { comments: {_id: comment._id}}}, 
            { new: true })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()

        res.status(200).json(result)

    } catch (err) {
        
        return res.status(500).json(err);
    }
};




