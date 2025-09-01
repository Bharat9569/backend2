import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema=new mongoose.Schema({
   userName:{
    type:String,
    require:true,
    trim:true,
    index:true,
    unique:true,
    lowercase:true
   },
    email:{
    type:String,
    require:true,
    lowercase:true,
    trim:true,
    unique:true
   },
    FullName:{
    type:String,
    require:true,
    trim:true,
   },
   avator:{
    type:String,
    require:true
   },
   coverImage:{
 type:String
   },
   watchHistory:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Video'
   }],
   password:{
     type:String,
    require:[true,"password required"]
   },
   refreshToken:{
    type:String
   }
},{timestamps:true});

userSchema.pre("save",function(next){
    if(this.isModified("password")){
        this.password=bcrypt.hash(this.password,10);
        next();
    }
})
userSchema.methods.isPasswordCorrect=async function(password){
return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=async function(){
    return await jwt.sign(
        {
        _id:this._id,
        userName:this.userName,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,

    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}

userSchema.methods.generateRefreshToken=async function(){
    return await jwt.sign(
        {
        _id:this._id,
        userName:this.userName,
        email:this.email
    },
    process.env.REFRESH_TOKEN_SECRET,

    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}
export const User=mongoose.model('User',userSchema);