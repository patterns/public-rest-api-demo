import { Router } from 'express';
import { createForumPost, findForumPostByID, removePost, listForumPostsByUser, loadPost,
    addComment, removeComment } from '../controllers/forum.controller';    
import { Auth }from '../config/auth.config';
import { findUserByID } from '../controllers/user.controller';


const authInstance = Auth;

const router = Router();


// create new forum Post
router.route('/posts')
    .post(createForumPost)


// Get posts by User
router.route('/posts/:userId')
    .get(findUserByID, listForumPostsByUser)


// Delete a post
router.route('/posts/:postId')
    .get(findForumPostByID, loadPost)
    .put(addComment, removeComment)
    .delete(removePost)


export default router;