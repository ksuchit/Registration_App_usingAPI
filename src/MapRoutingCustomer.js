import Login from './Shopping/Auth/Login'
import Registration from './Shopping/Auth/Registration'
import {Navigate} from 'react-router-dom'

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
        }
    ]

    return customerRoute
}