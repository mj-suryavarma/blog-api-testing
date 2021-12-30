import { StatusCodes } from 'http-status-codes';
import { UnauthenticationError } from '../errors/index.js';
import BlogModel from '../models/blog.js';



export const createBlog = async(req,res) => {
    const {title, story, type,googleUserId, userName, googlePicture}  = await req.body;

     const {userId, name } = await req.user;
    var time = new Date();
    var currentTime = time.toLocaleTimeString();
    var currentDate = time.toLocaleDateString();
 
    if(type === "auth"){

    try {
      const authStory =  await BlogModel.create({userId,userName:name, title, googlePicture,story, userType:type, time:currentTime, date:currentDate});
     
      return  res.status(StatusCodes.CREATED).json({success:true, data: authStory})
    }
    catch(err){
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:err})

     }
}

else if(type==="google"){

   try {       const googleUserBlog =  await BlogModel.create({title, time:currentTime, story,userType:type, userName, googlePicture, userId:googleUserId,date:currentDate})
       return  res.status(StatusCodes.CREATED).json({success:true,data:googleUserBlog})
    }   catch(err){
     return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
} 
        } 
}

export const updateBlog = async(req,res) => {
            const {title, story, userId, blogId} = req.body;

     
    var time = new Date();
    var currentTime = time.toLocaleTimeString();
    var currentDate = time.toLocaleDateString();
    
    const filter = {_id:blogId,userId}
    const update = {title,story,time:currentTime,date:currentDate}

    const updatedBlog = await BlogModel.findOneAndUpdate(filter,update,{new:true,});
 
   if(!updateBlog){
       return res.status(StatusCodes.NOT_FOUND).json({err:`nothing any task with id: ${_id}`})

    }
  
        return res.status(StatusCodes.OK).json({success:true,data:updatedBlog})

}

export const deleteBlog = async(req,res) => {

    const {BlogId} = req.body;
    console.log("deleted response",req.body)
    
   const deletedBlod = await BlogModel.findOneAndDelete({_id:BlogId})
 if(!deleteBlog){
     return  res.status(StatusCodes.NOT_FOUND).json({success:false})
 }
   return res.status(StatusCodes.OK).json({success:true});

}

export const getAllBlog = async(req,res) => { 

   const  publicBlog =  await BlogModel.find().sort({"createdAt":-1});
        
   return res.status(StatusCodes.OK).json(publicBlog);

}

export const getSingleBlog = async (req,res) => {
    const {userId, name} = req.user;
    const {type , id} = req.body
    const singleBlog  =  await BlogModel.findOne({_id:id});
    
    // console.log(singleBlog)

    if(singleBlog === null){
    return res.status(StatusCodes.NOT_FOUND).json({err: "nothing here based your id..."})
    }
   return  res.status(StatusCodes.OK).json(singleBlog);
     
    
}

export const getUserBlogs = async(req, res) => {
    const {userId} = req.user;
    const {googleUserId, type} = req.body;

    if(type==="auth"){
      const userBlog = await BlogModel.find({userId});

        return  res.status(StatusCodes.OK).json(userBlog);
    }

    else if(type==="google"){
        const googleUserBlog = await BlogModel.find({userId: googleUserId})

          return  res.status(StatusCodes.OK).json(googleUserBlog)
        
    }
    


}