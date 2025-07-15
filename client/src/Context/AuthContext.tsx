import axios from "axios"
import { useEffect, useState, createContext, useContext } from "react"

// Define the context type
type AuthContextType = {
  isVerified: boolean
  setisVerified: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVerified, setisVerified] = useState<boolean>(false)
  axios.defaults.withCredentials = true
 
  useEffect(() => {
    const GetUser = async () => {

      try{
        const checkUser = await axios.get("http://localhost:3000/auth/session")
        if(!checkUser.data.success){
          setisVerified(false)
         
        }else{
          console.log("login")
          setisVerified(true)
        }
      }catch(err){
          setisVerified(false)

      }
    }
    GetUser()
  },[])
 console.log("From context =>", isVerified)
  return (
    <AuthContext.Provider value={{ isVerified, setisVerified }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
