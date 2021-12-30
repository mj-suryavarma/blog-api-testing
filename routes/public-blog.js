import express from 'express';
const Router = express.Router();

 
import 
{getAllBlog } from '../controller/public-blog.js';


Router.route('/app/allBlog').get(getAllBlog)
 

export default Router;