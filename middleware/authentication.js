import jwt from 'jsonwebtoken';
import {UnauthenticationError} from '../errors/index.js';
import dotenv from 'dotenv';

dotenv.config();


const authenticationMiddleware = async (req, res, next) => {
  const {type} =  req.body; 

  if(type === "auth"){
            
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticationError("Authentication Invalid.");
       return
    }
    

    const token = authHeader.split(" ")[1];
    try{
        const payload = await jwt.verify(token,process.env.JWT_SECRET);
        
         req.user = {userId : payload.userId, name: payload.name}
         
        /// attached for call back function
         console.log("payload",payload)
        
    } catch(err) {
        
        throw new UnauthenticationError("No access allowed Authentication Invalid");
    } 
    
} 
else if(type ==="google") {
    req.user = {isGoogle: true}
    return
    // console.log(req.body)
}
else {
       throw new UnauthenticationError("Authentication invalid..")
   }
    

    next();
}
export default authenticationMiddleware;
