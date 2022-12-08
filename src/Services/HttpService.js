import axiosInstance from "../Interceptor/Interceptor";

export default function Post(url,data) {
   return (axiosInstance.post(`${url}`, data))
}

export function secureGet(url) {
    return( axiosInstance.get(`${url}`))
}

export function Patch(url,data) {
    return( axiosInstance.patch(`${url}`,data))
}

export function getUsers(url) {
    return(axiosInstance.get(`${url}`))
}

export function DeleteUser(url) {
    return(axiosInstance.delete(`${url}`))
}

export function EmailVerification(url){
    return(axiosInstance.post(`${url}`))
}

export function VerifyAccount(url) {
    return(axiosInstance.post(`${url}`))
}

export function getProducts(url) {
    return (axiosInstance.get(`${url}`))
}

export function CreateProduct(url,formData) {
    return (axiosInstance.post(`${url}`,formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
                }
        }
    ))
}

export function getProductDetails(url) {
    return(axiosInstance.get(`${url}`))
}

export function DeleteProduct(url) {
    return(axiosInstance.delete(`${url}`))
}

export function UpdateProduct(url, data) {
    return(axiosInstance.patch(`${url}`,data))
}