import { useAuth } from "@/Context/AuthContext"
import { Navigate } from "react-router-dom"
function ProtectedRoute({children} : {children :React.JSX.Element}) {

    const { isVerified } = useAuth()

    if(!isVerified){
      return  <Navigate to="/" />
    }
  return children
}

export default ProtectedRoute
