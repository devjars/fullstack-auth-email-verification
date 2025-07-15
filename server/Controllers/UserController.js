const User = require('../Model/UserModel')


exports.GetEmail = async (req,res)=>{
    const  email = req.payloads.email
    try{
        const result = await User.GetUserEmail(email)
        if(result.success){
         return  res.status(200).json({success: true , message :result.message, data :result.data})
        }else{
        return res.status(400).json({ success : false , message :result.message})

        }
    }catch(error){
        console.log("Error:",error.message)
        return res.status(500).json({ success : false , message : error.message})
    }
}