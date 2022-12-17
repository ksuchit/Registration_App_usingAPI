import { useEffect, useState } from "react"
import Get from "../Services/HttpService"


export default function Home(){

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [totalResults, setTotalResults] = useState();

    useEffect(()=>{
        Get('/shop/products')
        .then((response)=>{
            console.log(response)
            setProducts(response.data.results)
            setTotalPages(response.data.totalPages)
            setTotalResults(response.data.totalResults)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    return(
        <div>
            Home
        </div>
    )
}