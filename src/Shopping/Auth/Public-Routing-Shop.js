import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { shopLoginContext } from "../../App";


export default function PublicRoutingShop(){
    const [shopLive,]=useContext(shopLoginContext);

    return(shopLive ? <Navigate to='/home' /> : <Outlet />)
}