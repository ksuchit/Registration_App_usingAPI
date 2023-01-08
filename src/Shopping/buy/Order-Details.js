import { useEffect } from "react"
import Get from "../services/Http-Service"
import {useSearchParams} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import { useState } from "react";
import { useSelector } from "react-redux";
export default function OrderDetails(){

    const [searchParams, ] = useSearchParams();
    const [data,setData]=useState({});
    const state=useSelector((state)=>state)
    useEffect(()=>{
        Get(`/shop/orders/${searchParams.get('id')}`)
        .then((response)=>{
            console.log(response)
            setData(response.data[0])
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    console.log(data)
    return(
        <div className="row">
            <div className="col-2"></div>
            <div className="col-7">
                <h4>Order Details</h4>
                <div>
                    <span>Ordered on {data.createdAt}</span>
                    <span className="mx-2">Order# {data._id}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <div>
                        <h6>Shipping Address</h6>
                        <pre className="mb-0">{data.address.street},{data.address.addressLine2}</pre>
                        <pre className="mb-0">{data.address.city},{data.address.state}-{data.address.pin}</pre>
                        <pre>India</pre>
                    </div>
                    <div>
                        <h6>Payment Status</h6>
                        <span>{data.paymentStatus}</span>
                    </div>
                    <div>
                       <h6>Order Summary</h6>
                       <div className="d-flex justify-content-between">
                        <span>Items:</span>
                        <span><FaRupeeSign /> {data.total}</span>
                       </div>
                       <div className="d-flex justify-content-between">
                        <span>Delivery:</span>
                        <span><FaRupeeSign /> {data.deliveryFee}</span>
                       </div>
                       <div className="d-flex justify-content-between">
                        <span>Total:</span>
                        <span><FaRupeeSign /> {data.total + data.deliveryFee}</span>
                       </div>
                    </div>
                </div>
                {data.items.map((item,i)=>{
                    return(
                        <div key={i}>
                            <div style={{width:'100px',height:'120px'}}>
                                <img url={state.allProductsReducer.allProducts.find((data)=>data._id===item.productId)?.images[0].url} alt='product' style={{width:'100%',height:'100%'}}/>
                            </div>
                            <div className="d-flex flex-column gap-3 my-2">
                                <button className="btn btn-warning btn-sm" style={{width:'250px'}}>Track package</button>
                                <button className="btn btn-light btn-sm">Cancel Item</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}