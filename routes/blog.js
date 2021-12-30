import express from 'express';
const Router = express.Router();

import 
{getAllBlog,
     updateBlog,
     createBlog,
     deleteBlog,
     getSingleBlog,getUserBlogs} from '../controller/blog.js';


Router.route('/allBlog').post(getAllBlog)
Router.route('/blog').post(createBlog);
Router.route('/blog/:id').post(getSingleBlog);
Router.route('/user/blog').post(getUserBlogs);
Router.route('/user/blog/:id').patch(updateBlog).delete(deleteBlog)


export default Router;