import { lazy } from "react";

const VerifyEmail =lazy(() => import('./Seller/Auth/auth-Operation/Verify-Email'))
const ChangePasswordModal =lazy(() => import('./Seller/CompanyDetails/company-Portal/Change-Password-Modal'))
const Products =lazy(() => import('./Seller/CompanyDetails/Products/Products'))
const UpdateCompany =lazy(() => import('./Seller/CompanyDetails/company-Portal/Update-Company'))
const MyProfile =lazy(() => import('./Seller/CompanyDetails/company-Portal/MyProfile'))
const ProductDetails =lazy(() => import('./Seller/CompanyDetails/Products/Product-Details'))
const Orders = lazy(() => import("./Seller/CompanyDetails/order/Orders"))
const OrderDetails = lazy(() => import("./Seller/CompanyDetails/order/OrderDetails"))

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
        },
        {
            path: '/seller/orders',
            element:<Orders />
        },
        {
            path: '/seller/orders/order-details',
            element:<OrderDetails />
        }

 ]
    return routes;
}
