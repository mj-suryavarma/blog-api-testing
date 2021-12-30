import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const  UserSchema = new mongoose.Schema({
    name:{type: String,
      required: [true, "please provide your name"],
      minlength: 3,
      maxlength: 20,
    },
    email :{ type: String,
      required: [true, "please provide your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
        'Please provide valid email',
    ],
    unique : true,
    },
    password : {type : String ,
         required:[true, "please provide your password"],
         minlength: 6,
        },
    
},{timestamps:true})


UserSchema.pre("save",async function (next) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);
      next();
    })

 UserSchema.methods.comparePassword = async function(candidatePassword) {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
 }

UserSchema.methods.createJwt = function (){
  
    return jwt.sign({userId : this._id , name:this.name},
        process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRESIN});

}
 


const userAuth = mongoose.model("user-auth",UserSchema);

export default userAuth;
