import { useEffect } from "react"
import Get from "../Services/HttpService"


export default function Home(){

    useEffect(()=>{
        Get('/shop/products')
        .then((Response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    return(
        <div>
            Home
        </div>
    )
}