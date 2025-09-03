
import { User } from "../models/user.model.js"; 
import uploadOnCloudinary from "../utils/cloudinary.js"

const userRegister=async(req,res,next)=>{
      try {
            const{userName,fullName,email,password}=req.body;

            if([userName,fullName,email,password].some((field)=>{  return field.trim()==="" })){
              return res.status(400).json({
              message:"All fields are required"
            })
          }

          // check in database user already exists
          const existedUser=await User.findOne({$or:[{userName},{email}]});

          if(existedUser){
             return res.status(409).json({
              message:"User is already exists"
               })
        }
        // avator uploaded

        const avatorLocalPath=req.files?.avator[0]?.path;
         const coverImageLocalPath=req.files?.coverImage[0]?.path;
         console.log(avatorLocalPath);

         if(!avatorLocalPath)
         {
            return res.status(500).json({
              message:"avator path is missing"
               })
         }
          const avator=await uploadOnCloudinary(avatorLocalPath);
          const coverImage=await uploadOnCloudinary(coverImageLocalPath);

          if(!avator)
          {
            return res.status(500).json({
              message:"avator url is missing from cloudinary"
               })
          }

          // create user object
          const user=await User.create({
            fullName,
            userName,
            email,
            avator:avator.url,
            password:password.toLowerCase,
            coverImage:coverImage?.url || ""
          });

          const createdUser=await User.findById(user._id).select("-password -refreshToken");
          if(!createdUser){
             return res.status(500).json({
              message:"user is not created"
               })
          }
          return res.status(200).json({
            message:"user is registered",
            userName:userName
          })
          
      } catch (error) {
       return res.status(400).json({
            message:"something went wrong"
        })
      }
}

export default userRegister ;