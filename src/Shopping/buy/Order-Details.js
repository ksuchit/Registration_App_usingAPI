import { useEffect ,useState} from "react"
import Get from "../services/Http-Service"
import {NavLink, useSearchParams} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import { useSelector } from "react-redux";
import { FaGreaterThan } from 'react-icons/fa'
import { style } from "@mui/system";

export default function OrderDetails(){

    const [searchParams, ] = useSearchParams();
    const [data,setData]=useState(false);
    const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
    
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
    return (
        <div className="row">
            {data && <>
            <div className="col-2"></div>
                <div className="col-7">
                    <div style={{paddingBottom:'10px'}}>
                        <NavLink to={'/home'} style={{textDecoration:'none'}}>home</NavLink><FaGreaterThan size={10} className='mx-1'/>
                        <NavLink to={'/orders'} style={{textDecoration:'none'}}>Your Orders</NavLink><FaGreaterThan size={10} className='mx-1'/>
                        <NavLink to={'/orders'} style={{color:'#c45500',textDecoration:'none'}}>Your Details</NavLink>
                    </div>
                    <h4>Order Details</h4>
                    <div className="d-flex justify-content-between">
                        <span>Ordered on {data.createdAt}</span>
                        <span className="mx-2">Order# {data._id}</span>
                    </div>
                    <div className="d-flex justify-content-between my-3" style={{border:'1px solid grey',borderRadius:'5px',padding:'10px'}}>
                        <div>
                            <h6>Shipping Address</h6>
                            <pre className="mb-0">{data.address.street},{data.address.addressLine2}</pre>
                            <pre className="mb-0">{data.address.city},{data.address.state}-{data.address.pin}</pre>
                            <pre>India</pre>
                        </div>
                        <div>
                            <h6>Payment Status</h6>
                                {data.paymentStatus === "Paid" ?
                                    <span style={{color:'green'}}>{data.paymentStatus}</span>
                                    : data.paymentStatus === "Pending" ?
                                    <span style={{color:'red'}}>{data.paymentStatus}</span>
                                    : <span style={{color:'red'}}>{data.paymentStatus}</span>
                                }    
                        </div>
                        <div>
                            <h6>Status</h6>
                                {data.status === "Confirmed" ?
                                    <span style={{color:'green'}}>{data.status}</span>
                                    : data.status === "Pending" ?
                                    <span style={{color:'red'}}>{data.status}</span>
                                    : <span style={{color:'red'}}>{data.status}</span>
                                }    
                        </div>
                        <div>
                           <h6>Order Summary</h6>
                           <div className="d-flex justify-content-between">
                            <span>datas:</span>
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
                    {data.items.map((product,j)=>{
                        return(
                            <div key={j} className='d-flex justify-content-between my-3' style={{border:'1px solid grey',borderRadius:'5px',padding:'10px'}}>
                                <div className="d-flex">
                                    <div style={{width:'100px',height:'120px'}}>
                                        <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} alt='product' style={{width:'100%',height:'100%'}}/>
                                    </div>
                                    <div className="mx-5">
                                        <h5>{state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.name}</h5>
                                        <FaRupeeSign /> {product.subTotal}
                                    </div>
                                </div>
                                {j===0 && data.status!=='Cancelled'?
                                <div className="d-flex flex-column gap-3 my-2">
                                    <button className="btn btn-warning btn-sm" style={{width:'250px'}}>Track package</button>
                                    <button className="btn btn-light btn-sm">Cancel data</button>
                                </div>
                                : ""}
                            </div>
                        )
                    })}
                </div>
                </>}
        </div>
    )
}