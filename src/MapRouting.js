import { Navigate } from "react-router-dom";
import VerifyEmail from "./Auth/AuthOperation/VerifyEmail";
import ChangePasswordModal from "./CompanyDetails/ChangePasswordModal";
import UpdateCompany from "./CompanyDetails/UpdateCompany";
import MyProfile from "./Components/MyProfile";

export default function MapRouting() {

 const routes = [
    
        {
            path: "/my-profile",
            element: < MyProfile />
        },
        {
            path: "/",
            element: < Navigate to={ "/my-profile"} />
        },
        {
            path:"/my-profile/companyInfo" ,
            element:< UpdateCompany />
        },
        {
            path:"/auth/change-password" ,
            element:<ChangePasswordModal />
        },
        {
            path:"/auth/verify-email",
            element: <VerifyEmail /> 
        }

 ]
    return routes;
}
