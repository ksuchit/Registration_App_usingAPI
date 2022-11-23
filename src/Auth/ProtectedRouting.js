import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loginContext } from "../App";
import getToken from "../Services/TokenService";

export default function ProtectedRouting() {
    const [live, ] = useContext(loginContext)
    
    return (live ? <Outlet /> : <Navigate to='/auth/login' />)
}