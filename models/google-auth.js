import mongoose from 'mongoose';

const googleSchema = new mongoose.Schema({
    name: String,
    email : String,
    email_verified: Boolean,
    picture : String,

});
 
const googleModel = mongoose.model("google-user",googleSchema);

export default googleModel;
