import { Outlet, Navigate } from "react-router-dom";
import { AuthService } from "../hooks/zkLogin";

const PrivateRoutes = () => {
  
  return AuthService.isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
