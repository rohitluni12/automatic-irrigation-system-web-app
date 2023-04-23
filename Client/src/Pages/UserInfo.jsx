import React from "react";
import { useUserAuth } from "../Contexts/AuthContext";

const UserInfo = () => {
  const { user, userRole } = useUserAuth();
  return (
    <div>
      <h1>Email: {user?.email}</h1>
      <h2>Role: {userRole}</h2>
    </div>
  );
};

export default UserInfo;
