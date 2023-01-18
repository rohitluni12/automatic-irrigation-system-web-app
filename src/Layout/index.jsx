import React from 'react'
import './index.css';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/AuthContext";
const Layout = () => {

  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
    logOut();
  }

  return (
    <nav className="w-full h-20 bg-slate-500/10  flex justify-between items-center">
    <div className="bg-teal-500 m-2 p-2 rounded-md">Status: ON</div>
    <div id="google_translate_element"></div>
    <button className="bg-teal-500 m-2 p-2 rounded-md" onClick={logout}>Log Out</button>
  </nav>
  )
}

export default Layout