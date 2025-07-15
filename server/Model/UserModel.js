const db = require('../config/db');


exports.GetUserEmail = async (email)=>{

  try{
    const query = "SELECT  email, is_verified FROM user WHERE email = ?";
    const res = await db(query, [email]);
    if (res.length === 0) {
      return { success: false, message: "User not found" };
    }
    if(!res[0].is_verified){
      return { success: false, message: "User not Verified" };
    }
    return { success: true,message : "User Found", data: res[0] };
  }catch(error){  
    console.log("Error", error.message)
    return {success : false, message : "Internal Server Error"}
  }
}
    