import { lazy } from "react";

const VerifyEmail =lazy(() => import('./Seller/Auth/AuthOperation/VerifyEmail'))
const ChangePasswordModal =lazy(() => import('./Seller/CompanyDetails/CompanyPortal/ChangePasswordModal'))
const Products =lazy(() => import('./Seller/CompanyDetails/Products/Products'))
const UpdateCompany =lazy(() => import('./Seller/CompanyDetails/CompanyPortal/UpdateCompany'))
const MyProfile =lazy(() => import('./Seller/CompanyDetails/CompanyPortal/MyProfile'))
const ProductDetails =lazy(() => import('./Seller/CompanyDetails/Products/ProductDetails'))

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
