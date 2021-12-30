import mongoose from 'mongoose';


const blogSchema= new mongoose.Schema({
    userId : {
        type: String,
        required : [true, "please provide user id"]},
    userName : {
        type : String,
        required : [true, "please provide username"],
    },

    googlePicture : String,
     time : String,
     date : String,
    userType :{
        type: String,
       required : [true, "please provide auth type"]},
    title :{ 
        type: String,
     required: [true, "please provide your stroy title"]},
    story : {
        type: String,
      required : [true, "please provide your story.."]},

},{timestamps:true})


const blogModel = mongoose.model("story-content",blogSchema);

export default blogModel;