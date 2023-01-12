import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { shopLoginContext } from "../../App";


export default function ProtectedRoutingShop(){
    const [shopLive,]=useContext(shopLoginContext);

    return(shopLive ? <Outlet /> : <Navigate to='/auth/login' />)
}