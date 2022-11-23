import axiosInstance from "../Interceptor/Interceptor";


export default function securePost(url,data) {

   return (axiosInstance.post(`${url}`, data))
}

export function secureGet(url) {
    return( axiosInstance.get(`${url}`
    ))
}

export function patch(url,data) {
    return( axiosInstance.patch(`${url}`,data))
}

export function getUsers(url) {
    return(axiosInstance.get(`${url}`))
}