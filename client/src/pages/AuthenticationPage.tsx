
import LogInForm from "../components/Auth/LogInForm";
import SignUpForm from "../components/Auth/SignUpForm";
import  { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AuthenticationPage() {
  const navigate = useNavigate()
  const { isVerified,setisVerified } = useAuth()
    const [isSignin,setisSignin] = useState<boolean>(false)
    axios.defaults.withCredentials = true

       useEffect(()=>{  

          if(isVerified){
        navigate("/dashboard")
        console.log(isVerified)
         }
       },[isVerified])

    useEffect(()=>{
        const CheckPending = async ()=>{
          const res = await axios.get("http://localhost:3000/auth/verification-status")

          if(res.data.success){
            navigate("/verify")
          }
          else{
            return
          }
        }
        CheckPending()
    },[])



  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-100 px-4 py-8 lg:gap-8 lg:flex-row lg:justify-evenly">
   

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
       {isSignin === true ?  <SignUpForm/> :  <LogInForm/>}
        <p className="text-sm mt-2 text-center">{isSignin ? 'Dont Have an Accont ?' : 'Already Have an Account ?'}
             <span className="underline cursor-pointer transition-all duration-300 hover:text-blue-500" onClick={()=>setisSignin(!isSignin)}> Click here!</span></p>
      </div>
       
    </div>
  );
}

export default AuthenticationPage;
