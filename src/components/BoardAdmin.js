import React, { Component, useState } from "react";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BoardAdmin() {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  
  const checkToken = async () => {
    try {
      const response = await AuthService.getListUsers()
      setIsLogin(true)
    } catch (error) {
      setIsLogin(false)
    }
    
  }

  useEffect(()=>{
    checkToken()
    if(user) {
      if(user.role.includes("ADMIN") && isLogin) {
        navigate('/admin')
      }
      else if(!isLogin) navigate('/login')
      else if(user.role.includes("USER")) navigate('/')
    }
    else navigate('/login')
  },[isLogin])


  return (
    <div className="app">
      {
        user?.role?.includes("ADMIN") && <>
          <Sidebar />
      <main>
        <div className="header">
          <p>Admin</p>
        </div>
       <Outlet />
      </main>
        </>
      }
    </div>
  )
}

export default BoardAdmin


