import axiosInstance from "../../Interceptor/Interceptor";

export default function Post(url,data) {
   return (axiosInstance.post(`${url}`, data))
}

export function Get(url) {
    return( axiosInstance.get(`${url}`))
}

export function Patch(url,data) {
    return( axiosInstance.patch(`${url}`,data))
}

export function Delete(url) {
    return(axiosInstance.delete(`${url}`))
}

export function EmailVerification(url){
    return(axiosInstance.post(`${url}`))
}

export function VerifyAccount(url) {
    return(axiosInstance.post(`${url}`))
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

