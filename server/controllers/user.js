import usermodel from "../database/usermodel.js";
export const getUserData= async(req,res)=>{
    try {
         const {userId}= req.body;
         const user= await usermodel.findById(userId);
         if(!user){
            return res.json({success:false,message:"User not Found"})
         }
         res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountverified:user.isAccountverified
            }
         })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}