import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); 

  // If token exists, render the protected component, otherwise redirect to login
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
