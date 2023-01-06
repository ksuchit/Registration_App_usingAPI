import { useState } from "react"
import { useEffect } from "react"
import { NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import Get from "../services/Http-Service"


export default function MyOrders(){

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
            <h3>Your Orders</h3>
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
                                <span>{item.total}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>SHIP TO</span>
                                <span>{item.address.city}</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <span>ORDER#{item._id}</span>
                            <div className="d-flex">
                                <NavLink>View order details</NavLink>
                                <NavLink>Invoice</NavLink>
                            </div>
                        </div>
                    </div>
                    {item.items.map((product,j)=>{
                        return(
                        <div className='d-flex justify-content-between'>
                            <div>
                                <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} alt='product'/>
                                <NavLink>{console.log(state.allProductsReducer.allProducts.find((data)=>data._id===product.productId))}</NavLink>
                            </div>
                            <div>
                                <button className="btn btn-secondary btn-sm">Cancel Item</button>
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