import { useState } from "react"
import { useEffect } from "react"
import { NavLink,useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import Get from "../services/Http-Service"
import ControlledTabs from "./ControlledTabs";


export default function MyOrders(){

    const navigate=useNavigate();
    const [orders,setOrders]=useState([]);
    const state=useSelector((state)=>state);
    useEffect(()=>{

        Get('/shop/orders')
        .then((response)=>{
            console.log(response)
            setOrders(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <div className="row">
           <div className="col-2"></div>
           <div className="col-8">
            <div><h3>Your Orders</h3></div>
            <div className="mb-2">
                <ControlledTabs />
                {/* <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink className="nav-link active"  >Orders</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" >Buy Again</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" >Not Yet Shipped</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" >Cancelled Orders</NavLink>
                    </li>
                </ul> */}
            </div>
            {orders.map((item,i)=>{
             return(
                <div key={i} style={{boredr:'1px solid grey',borderRadius:'10%'}}>
                    <div style={{backgroundColor:'lightgrey',padding:'10px'}} className='d-flex justify-content-between'>
                        <div className="d-flex gap-4">
                            <div className="d-flex flex-column">
                                <span>ORDER PLACED</span>
                                <span>{item.createdAt}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>TOTAL</span>
                                <span><FaRupeeSign size={15} />{item.total}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>SHIP TO</span>
                                <span>{item.address.city}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <span>ORDER#{item._id}</span>
                            <div className="d-flex">
                                <button className="btn btn-link btn-sm mx-2" onClick={()=>navigate(`/orders/order-details?id=${item._id}`)}>View order details</button>
                                <button className="btn btn-link btn-sm">Invoice</button>
                            </div>
                        </div>
                    </div>
                    {item.items.map((product,j)=>{
                        return(
                        <div className='d-flex justify-content-between' style={{border:'1px solid grey',padding:'10px'}}>
                            <div style={{width:'100px',height:'120px'}}>
                                <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} style={{width:'100%',height:'100%'}} alt='product'/>
                                <NavLink>{console.log(state.allProductsReducer.allProducts.find((data)=>data._id===product.productId))}</NavLink>
                            </div>
                            <div className="d-flex flex-column gap-3 my-2">
                                <button className="btn btn-warning btn-sm" style={{width:'250px'}}>Track package</button>
                                <button className="btn btn-light btn-sm">Cancel Item</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                )
            })}
            </div>
        </div>
    )
}