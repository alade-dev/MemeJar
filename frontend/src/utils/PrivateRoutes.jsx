import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import  { UserContext } from "./UserContext"
import { AuthService } from "../pages/main/pages/zkLogin"


const PrivateRoutes = () => { 
 
  return (
    AuthService.isAuthenticated  ? <Outlet/> :<Navigate to='/auth'/>
  )
}

export default PrivateRoutes