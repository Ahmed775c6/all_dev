import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthProvider";


interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {

const {token } : any = useAdminAuth();

  if (!token) {
    // If token is not found, redirect to the login page
  return  <Navigate to=  "/admin" replace />
    
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
