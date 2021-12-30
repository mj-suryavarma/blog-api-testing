import { StatusCodes } from 'http-status-codes';
import BlogModel from '../models/blog.js';


export const getAllBlog = async(req,res) => { 

    const  publicBlog =  await BlogModel.find().sort({"timestamp":-1});
          
         console.log(publicBlog);
 
     res.status(StatusCodes.OK).json(publicBlog);
 
 }
 