const jwt = require("jsonwebtoken")

const CreateToken = (data) =>{

    const Payload={
        id : data.user_id,
        email: data.email,
        status : data.is_verified

    }

    const Token = jwt.sign(Payload,process.env.JWT_SECRET_KEY,{ expiresIn: "1d" })
    return Token
}

const ValidateToken = (req,res,next)=>{

    const Token = req.cookies?.['Access-Token']

   if (!Token) {
  return res.status(401).json({ 
    success: false, 
    message: "Access-Token cookie missing. User not authenticated." 
  });
}

    jwt.verify(Token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(403).json({ success : false,  message: "Token is invalid or expired" })
        }
        req.payloads = payload
        next()
    })

}






module.exports= { CreateToken,ValidateToken }