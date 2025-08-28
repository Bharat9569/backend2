import mongoose from "mongoose"

const connectDB =async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("connection successfull"); 
    } catch (error) {
console.log("Not connected to DB",error);
    }
}
export default connectDB;
