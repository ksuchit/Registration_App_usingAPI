import {Navigate} from 'react-router-dom'
import { lazy } from 'react'
import MyOrders from './Shopping/buy/My-Orders'
import OrderDetails from './Shopping/buy/Order-Details'

const Home =lazy(() => import('./Shopping/home/Home'))
const Login =lazy(() => import('./Shopping/auth/Login'))
const Registration =lazy(() => import('./Shopping/auth/Registration'))
const Profile =lazy(() => import('./Shopping/profile/Profile'))
const UpdateProfile =lazy(() => import('./Shopping/profile/Update-Profile'))
const ChangePassword =lazy(() => import('./Shopping/auth/Change-Password'))
const Cart =lazy(() => import('./Shopping/cart/Cart'))
const Buy=lazy(()=>import('./Shopping/buy/Buy'));

export default function MapRoutingCustomer(){
    
    const customerRoute=[
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
            path: 'cart',
            element:<Cart />
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
        }
    ]

    return customerRoute
}