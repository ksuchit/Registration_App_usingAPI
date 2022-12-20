import Login from './Shopping/Auth/Login'
import Registration from './Shopping/Auth/Registration'
import {Navigate} from 'react-router-dom'
import Home from './Shopping/Home/Home'
import Profile from './Shopping/Profile/Profile'
import UpdateProfile from './Shopping/Profile/UpdateProfile'
import ChangePassword from './Shopping/Auth/ChangePassword'

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
        }
    ]

    return customerRoute
}