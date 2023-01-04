import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loginContext } from "../../App";
// import getToken from "../Services/TokenService";


export default function PublicRouting() {
    const [live, ] = useContext(loginContext)

    return live ? <Navigate to='/seller/my-profile' /> : <Outlet />;
}