import { Navigate } from "react-router-dom";
import VerifyEmail from "./Seller/Auth/AuthOperation/VerifyEmail";
import ChangePasswordModal from "./Seller/CompanyDetails/CompanyPortal/ChangePasswordModal";
import Products from "./Seller/CompanyDetails/Products/Products";
import UpdateCompany from "./Seller/CompanyDetails/CompanyPortal/UpdateCompany";
import MyProfile from "./Seller/CompanyDetails/CompanyPortal/MyProfile";
import ProductDetails from "./Seller/CompanyDetails/Products/ProductDetails";

export default function MapRouting() {

 const routes = [
    
        {
            path: "/seller/my-profile",
            element: < MyProfile />
        },
        {
            path:"/seller/my-profile/companyInfo" ,
            element:< UpdateCompany />
        },
        {
            path:"/seller/auth/change-password" ,
            element:<ChangePasswordModal />
        },
        {
            path:"/seller/auth/verify-email",
            element: <VerifyEmail /> 
        },
        {
            path: "/seller/products",
            element: <Products />
        },
        {
            path: "/seller/products/product-details",
            element:<ProductDetails />
        }

 ]
    return routes;
}
