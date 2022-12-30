import {Navigate} from 'react-router-dom'
import { lazy } from 'react'

const Home =lazy(() => import('./Shopping/Home/Home'))
const Login =lazy(() => import('./Shopping/Auth/Login'))
const Registration =lazy(() => import('./Shopping/Auth/Registration'))
const Profile =lazy(() => import('./Shopping/Profile/Profile'))
const UpdateProfile =lazy(() => import('./Shopping/Profile/UpdateProfile'))
const ChangePassword =lazy(() => import('./Shopping/Auth/ChangePassword'))
const Cart =lazy(() => import('./Shopping/Cart/Cart'))

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
        }
    ]

    return customerRoute
}