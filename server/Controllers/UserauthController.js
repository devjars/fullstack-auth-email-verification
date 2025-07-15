const Userauth = require('../Model/UserauthModel');
const jwt = require("jsonwebtoken")
const { CreateToken }  = require("../Middleware/Jwt")

exports.AddnewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await Userauth.createUser(email, password);
    if (result.success) {  
          const token = CreateToken(result.payload)
              const oneMonth = 30 * 24 * 60 * 60 * 1000;
            res.cookie('Access-Token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: oneMonth
            });

      return res.status(200).json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success : false, message: result.message });
    }
  } catch (error) {
    console.error('Error adding new user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.VerifyCode = async (req,res) =>{
    const { code } = req.body
    const email = req.payloads.email
    console.log("email is`",email)
    console.log(code)
    if(!email || !code) {
        return res.status(400).json({message : 'Email & code are required'})
    }

    try{
        const result = await Userauth.VerifyCode(email,code)

        if(result.success){
          return  res.status(200).json({ success : true, message :result.message})
        }else{
          return  res.status(400).json({success : false , message : result.message})
        }
    }catch(err){
   console.error('Error Code Verification:', err);
    return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.GetnewCode = async (req,res)=>{
        const email = req.query.email

        if(!email){
            return res.status(400).json({success : false , message : "Invalid Email"})
        }

        try{
  const result = await Userauth.CreatenewCode(email)
            if(result.success){
                return res.status(200).json({success : true, code : result.code})
            }  else{
                return res.status(400).json({success : false, message : result.message})
            }
        }catch(error){
            console.log("Error code verification",error)
            return res.status(500).json({success : false, message : error.message})
        }
}

exports.Login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
            return res.status(400).json({success : false , message : "Email and Password is required"})
        }

        try{    
            const result = await Userauth.Login(email,password)

            if(result.success){
              const token = CreateToken(result.payload)
                const oneMonth = 30 * 24 * 60 * 60 * 1000;


              res.cookie("Access-Token",token,{
                httpOnly : true,
                secure : process.env.NODE_ENV === "production",
                sameSite : true,
                maxAge : oneMonth,


              } )
                return res.status(200).json({success : true , message : result.message})
            }else{
                return res.status(400).json({success : false , message : result.message})

            }

        }catch(err){
            console.log("Error Login ",err)
                return res.status(500).json({success : false ,message: "Login failed. Please try again later."})

        }

}

exports.CheckPendingVerification = async (req,res)=>{

  const { id } = req.payloads
  
  try{

    const result = await Userauth.GetPendingVerification(id)
    if(result.success){
      return res.status(200).json({success : true , message : result.message})
    }else{
      return res.status(400).json({success : false , message : result.message})
    }
    
  }catch(err){
    console.log("error", err.message)
    return res.status(500).json({success : false , message : "Check status failed, Please try again!"})
  }

}



exports.CheckSession  = async (req,res)=>{

    const { id, status } = req.payloads
     if(status === false){
            return res.status(403).json({success : false , message : "Account Not Verified"})
        }

    try{
    const result = await Userauth.CheckVerifiedUser(id)
      if(result.success){
        return res.status(200).json({success : true, message : result.message})
      }else{
        return res.status(400).json({success : false, message : result.message})
      }
    }catch(error){
      console.log("Error:",error.message)
   return res.status(500).json({success : false , message : error.message})
      
    }
}   