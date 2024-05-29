import { Outlet, Navigate } from "react-router-dom"
// import { useAuth } from "./AuthContext"

const PrivateRoutes = () => { 
   const user = true;
  return (
    user ? <Outlet/> :<Navigate to='/auth'/>
  )
}

export default PrivateRoutes