import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import { FaGreaterThan, FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom"
import { Get, Patch } from "../../services/Http-Service"


export default function OrderDetails() {

    const [searchParams,] = useSearchParams();
    console.log(searchParams.get('id'))
    const [data, setData] = useState();
    const state=useSelector((state)=>state)
    useEffect(() => {
        Get(`/orders/${searchParams.get('id')}`)
            .then((response) => {
                console.log(response)
                setData(response.data[0])
            })
            .catch((error) => {
            console.log(error)
        })
    }, [])

    const callOrderAction = (id,action) => {
        console.log(id, action)
        
        Patch(`/orders/${action}/${id}`)
            .then((response) => {
                console.log(response)
                setData(response.data.order)
                toast.success(`Your Order is ${action}ed`)
            })
            .catch((error) => {
            console.log(error)
        })
    }
    
    
    return (
        <div className="row">
            {data && <>
                <div className="col-2"></div>
                <div className="col-8">
                    <div style={{paddingBottom:'10px'}}>
                        <NavLink to={'/seller/products'} style={{textDecoration:'none'}}>Products</NavLink><FaGreaterThan size={10} className='mx-1'/>
                        <NavLink to={'/seller/orders'} style={{textDecoration:'none'}}>Orders</NavLink><FaGreaterThan size={10} className='mx-1'/>
                        <NavLink to={'/seller/orders/order-details'} style={{color:'#c45500',textDecoration:'none'}}>Order-Details</NavLink>
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
                            <span>Price:</span>
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
                                        <img src={state.sellerProducts.sellerProducts.find((data)=>data._id===product.productId)?.images[0].url} alt='product' style={{width:'100%',height:'100%'}}/>
                                    </div>
                                    <div className="mx-5 d-flex flex-column">
                                        {/* <h5>{state.sellerProducts.sellerProducts.find((data)=>data._id===product.productId)?.name}</h5> */}
                                        <h5>{product.name}</h5>
                                        <span>Quantity:{product.qty}</span>
                                        <span>Price: <FaRupeeSign size={12}/>{product.subTotal}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-3 my-2">
                                {j===0 && (data.status==="Delivered" ?
                                    <button className="btn btn-danger btn-sm" onClick={() => callOrderAction(data._id,'cancel')} style={{ width: '250px' }}>Cancel Order</button>
                                    : data.status === "Dispatched" ? <>
                                    <button className="btn btn-danger btn-sm" onClick={() => callOrderAction(data._id,'cancel')} style={{ width: '250px' }}>Cancel Order</button>        
                                    <button className="btn btn-success btn-sm" onClick={() => callOrderAction(data._id,'deliver')} >Deliver Order</button></>
                                    : data.status==="Confirmed" ? <>
                                    <button className="btn btn-danger btn-sm" onClick={() => callOrderAction(data._id,'cancel')} style={{ width: '250px' }}>Cancel Order</button>        
                                    <button className="btn btn-info btn-sm" onClick={() => callOrderAction(data._id,'dispatch')} >Dispatch Order</button>
                                    <button className="btn btn-success btn-sm" onClick={() => callOrderAction(data._id, 'deliver')} >Deliver Order</button></>
                                    : ""   )         
                                }
                                </div>
                            </div>
                        )
                    })}
                </div>
                </>}
        </div>
    )
}