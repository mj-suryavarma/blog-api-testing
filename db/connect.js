import mongoose from 'mongoose';


export const connectDB = (uri) =>{
      
      try {
          console.log("connected with db .....")
         return mongoose.connect(uri,{
              useNewUrlParser : true,
              useUnifiedTopology: true,
          });
        
      } catch (error) {
           console.log(error)
      }

}

