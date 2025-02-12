
import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    verifyOTP:{type:String,default:""},
    verifyOTPexpireAt:{type:Number,default:0},
    isAccountverified:{type:Boolean,default:false},
    resetOTP:{type:String,default:""},
    resetOTPexpireAt:{type:Number,default:0}
})
const usermodel= mongoose.model('user',userSchema);
export default usermodel;