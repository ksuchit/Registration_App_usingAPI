import { useEffect ,useState} from "react"
import Get from "../services/Http-Service"
import {useSearchParams} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import { useSelector } from "react-redux";

export default function OrderDetails(){

    const [searchParams, ] = useSearchParams();
    const [data,setData]=useState([]);
    const state=useSelector((state)=>state)
    
    useEffect(() => {
        console.log("dcns;lcsm;ldm;lmd;l") 
        console.log(searchParams.get('id')) 
        Get(`/shop/orders/${searchParams.get('id')}`)
        .then((response)=>{
            console.log(response)
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    
    console.log(data)
    return(
        <div className="row">
            <div className="col-2"></div>
            
            {data.map((item,i)=>{
                return(
                    <div className="col-7" key={i}>
                    <h4>Order Details</h4>
                    <div className="d-flex justify-content-between">
                        <span>Ordered on {item.createdAt}</span>
                        <span className="mx-2">Order# {item._id}</span>
                    </div>
                    <div className="d-flex justify-content-between my-3" style={{border:'1px solid grey',borderRadius:'5px',padding:'10px'}}>
                        <div>
                            <h6>Shipping Address</h6>
                            <pre className="mb-0">{item.address.street},{item.address.addressLine2}</pre>
                            <pre className="mb-0">{item.address.city},{item.address.state}-{item.address.pin}</pre>
                            <pre>India</pre>
                        </div>
                        <div>
                            <h6>Payment Status</h6>
                            <span>{item.paymentStatus}</span>
                        </div>
                        <div>
                            <h6>Status</h6>
                            <span>{item.status}</span>
                        </div>
                        <div>
                           <h6>Order Summary</h6>
                           <div className="d-flex justify-content-between">
                            <span>Items:</span>
                            <span><FaRupeeSign /> {item.total}</span>
                           </div>
                           <div className="d-flex justify-content-between">
                            <span>Delivery:</span>
                            <span><FaRupeeSign /> {item.deliveryFee}</span>
                           </div>
                           <div className="d-flex justify-content-between">
                            <span>Total:</span>
                            <span><FaRupeeSign /> {item.total + item.deliveryFee}</span>
                           </div>
                        </div>
                    </div>
                    {item.items.map((product,j)=>{
                        return(
                            <div key={j} className='d-flex justify-content-between my-3' style={{border:'1px solid grey',borderRadius:'5px',padding:'10px'}}>
                                <div className="d-flex">
                                    <div style={{width:'100px',height:'120px'}}>
                                        <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} alt='product' style={{width:'100%',height:'100%'}}/>
                                        {/* {console.log(state.allProductsReducer.allProducts.find((data)=>data._id===product.productId))} */}
                                    </div>
                                    <div className="mx-5">
                                        <h5>{state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.name}</h5>
                                        <FaRupeeSign /> {product.subTotal}
                                    </div>
                                </div>
                                {j===0 ?
                                <div className="d-flex flex-column gap-3 my-2">
                                    <button className="btn btn-warning btn-sm" style={{width:'250px'}}>Track package</button>
                                    <button className="btn btn-light btn-sm">Cancel Item</button>
                                </div>
                                : ""}
                            </div>
                        )
                    })}
                </div>
                )
            })}
           
        </div>
    )
}