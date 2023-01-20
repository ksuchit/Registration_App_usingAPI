import {Navigate} from 'react-router-dom'
// import { lazy } from 'react'
import Login from './Shopping/Auth/Login'
import Registration from './Shopping/Auth/Registration'
import Home from './Shopping/Home/Home'
import Profile from './Shopping/Profile/Profile'
import UpdateProfile from './Shopping/Profile/Update-Profile'
import ChangePassword from './Shopping/Auth/Change-Password'
import Cart from './Shopping/Cart/Cart'
import Buy from './Shopping/buy/Buy'
import MyOrders from './Shopping/buy/My-Orders'
import OrderDetails from './Shopping/buy/Order-Details'
import Wishlist from './Shopping/Cart/Wishlist'
import SeeMore from './Shopping/Cart/SeeMore'
// const Home =lazy(() => import('./Shopping/Home/Home'))
// const Login =lazy(() => import('./Shopping/auth/Login'))
// const Registration =lazy(() => import('./Shopping/auth/Registration'))
// const Profile =lazy(() => import('./Shopping/profile/Profile'))
// const UpdateProfile =lazy(() => import('./Shopping/profile/Update-Profile'))
// const ChangePassword =lazy(() => import('./Shopping/auth/Change-Password'))
// const Cart =lazy(() => import('./Shopping/cart/Cart'))
// const Buy=lazy(()=>import('./Shopping/buy/Buy'));
// const MyOrders = lazy(() => import('./Shopping/buy/My-Orders'));
// const OrderDetails = lazy(() => import('./Shopping/buy/Order-Details'));

export default function MapRoutingCustomer(){
    
    const customerRoute = [
        {
            path:'/auth/login',
            element:<Login />
        },
        {
            path: "/",
            element: < Navigate to={ "/home"} />
        },
        {
            path:'/auth/registration',
            element:<Registration />
        },
        {
            path: '/home',
            element:<Home />
        },
        {
            path: 'cart',
            element:<Cart />
        },
        {
            path: 'profile',
            element:<Profile />
        },
        {
            path: 'update-profile',
            element:<UpdateProfile />
        },
        {
            path: 'change-password',
            element:<ChangePassword />
        },
        {
            path: 'buy',
            element:<Buy />
        },
        {
            path:'orders',
            element:<MyOrders />
        },
        {
            path:'orders/order-details',
            element:<OrderDetails />
        },
        {
            path:'wishlist',
            element:<Wishlist />
        },
        {
            path: '/cart/similar-products',
            element:<SeeMore />
        }
        ]
    

    return customerRoute
}