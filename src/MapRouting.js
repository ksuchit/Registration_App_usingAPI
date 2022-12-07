import { Navigate } from "react-router-dom";
import VerifyEmail from "./Auth/AuthOperation/VerifyEmail";
import ChangePasswordModal from "./CompanyDetails/CompanyPortal/ChangePasswordModal";
import Products from "./CompanyDetails/Products/Products";
import UpdateCompany from "./CompanyDetails/CompanyPortal/UpdateCompany";
import MyProfile from "./Components/MyProfile";
import ProductDetails from "./CompanyDetails/Products/ProductDetails";

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
        },
        {
            path: "/products",
            element: <Products />
        },
        {
            path: "/products/product-details",
            element:<ProductDetails />
        }

 ]
    return routes;
}
