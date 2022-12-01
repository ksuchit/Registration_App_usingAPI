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

export function CreateUserPost(url,data) {
    return (axiosInstance.post(`${url}`,data))
}

export function UpdateCompanyInfo(url, data) {
    return(axiosInstance.patch(`${url}`,data))
}

export function UpdateUserInfo(url, data) {
    return(axiosInstance.patch(`${url}`,data))
}

export function UpdateUserRole(url, data) {
    return(axiosInstance.patch(`${url}`,data))
}

export function DeleteUser(url) {
    return(axiosInstance.delete(`${url}`))
}

export function Change_Password(url, data) {
    return(axiosInstance.post(`${url}`,data))
}

export function ForgotPassword(url,data){
    return(axiosInstance.post(`${url}`,data))
}

export function EmailVerification(url){
    return(axiosInstance.post(`${url}`))
}

export function VerifyAccount(url) {
    return(axiosInstance.post(`${url}`))
}

export function ResetPassword(url, data) {
    return(axiosInstance.post(`${url}`,data))
}

export function SocialLogin(url, data) {
    return(axiosInstance.post(`${url}`,data))
}