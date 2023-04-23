import React from "react";
import { useUserAuth } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="signIn" />;
  }

  return children;
};

export default ProtectedRouter;
