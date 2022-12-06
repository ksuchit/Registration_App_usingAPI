import { useEffect, useState } from "react"
import { getProducts } from "../../Services/HttpService"
import CreateNewProduct from "./CreateNewProduct";


export default function Products() {

    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        
        getProducts(`/products`)
            .then((response) => {
                console.log(response)
                setProducts(response.data.results)
            })
            .catch((error) => {
            console.log(error)
        })
    },[])

    const onCreateProduct = () => {
        console.log('oncreate')
        setShow(true)
    }

    return (
        <div>
            <button onClick={onCreateProduct}>Create Product</button>
            <h1>products</h1>
            <CreateNewProduct
                show={show}
                setShow={setShow}
            />
        </div>
    )
}