import Login from './Shopping/Auth/Login'
import Registration from './Shopping/Auth/Registration'
import {Navigate} from 'react-router-dom'
import Home from './Shopping/Home/Home'

export default function MapRoutingCustomer(){
    
    const customerRoute=[
        {
            path:'/auth/login',
            element:<Login />
        },
        {
            path: "/",
            element: < Navigate to={ "/auth/login"} />
        },
        {
            path:'/auth/registration',
            element:<Registration />
        },
        {
            path: '/home',
            element:<Home />
        }
    ]

    return customerRoute
}