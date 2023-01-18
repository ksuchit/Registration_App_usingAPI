import { useEffect, useState } from "react"
import { FaGreaterThan, FaRupeeSign } from "react-icons/fa"
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Get } from "../../services/Http-Service"


export default function Orders() {

    const [orders, setOrders] = useState();
    const navigate = useNavigate();
    const state=useSelector((state)=>state)
    useEffect(() => {
        Get('/orders')
            .then((response) => {
                console.log(response)
                setOrders(response.data.results)
            })
            .catch((error) => {
            console.log(error)
        })
    }, [])
    
    const onCancelOrder = (id) => {
        console.log(id)
    }

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <div style={{paddingBottom:'10px'}}>
                <NavLink to={'/seller/products'} style={{textDecoration:'none'}}>Products</NavLink><FaGreaterThan size={10} className='mx-1'/>
                <NavLink to={'/seller/orders'} style={{textDecoration:'none',color:'#c45500'}}>Orders</NavLink>
            </div>
            {orders &&
                orders.map((item, i) => {
                return(
                <div key={i} style={{boredr:'1px solid grey',borderRadius:'10%'}} >
                    <div style={{backgroundColor:'lightgrey',padding:'10px',marginTop:'20px'}} className='d-flex justify-content-between'>
                        <div className="d-flex gap-4">
                            <div className="d-flex">
                                <div style={{color:'#0a58ca'}}>{i+1}</div>
                                <div className="d-flex flex-column"><span>:ORDER PLACED</span>
                                <span>{item.createdAt.slice(0,10)}</span></div>
                            </div>
                            <div className="d-flex flex-column">
                                <span>TOTAL</span>
                                <span><FaRupeeSign size={15} />{item.total}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>SHIP TO</span>
                                <span>{item.address.city}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>PAYMENT</span>
                                <span style={{color:'green'}}>{item.paymentStatus}</span>
                            </div> 
                            <div className="d-flex flex-column">
                                <span>ORDER</span>
                                <span style={{color:'green'}}>{item.status}</span>
                            </div>     
                        </div>
                        <div className="d-flex flex-column">
                            <span>ORDER#{item._id}</span>
                            <div className="d-flex">
                                <button className="btn btn-link btn-sm mx-2" onClick={()=>navigate(`/seller/orders/order-details?id=${item._id}`)}>View order details</button>
                                <button className="btn btn-link btn-sm">Invoice</button>
                            </div>
                        </div>
                    </div>
                    {item.items.map((product,j)=>{
                        return(
                        <div className='d-flex justify-content-between' style={{border:'1px solid grey',padding:'10px'}}>
                            <div className="d-flex">
                                <div style={{width:'100px',height:'120px'}}>
                                    <img src={state.sellerProducts.sellerProducts.find((data)=>data._id===product.productId)?.images[0].url} style={{width:'100%',height:'100%'}} alt='product'/>
                                    {/* <NavLink>{console.log(state.sellerProducts.sellerProducts.find((data)=>data._id===product.productId))}</NavLink> */}
                                </div>
                                <div className="mx-5 d-flex flex-column">
                                    <h5>{product.name}</h5>
                                    <span>Quantity:{product.qty}</span>
                                    <span>Price: <FaRupeeSign size={12}/>{product.subTotal}</span>
                                </div>
                                </div>
                                {/* {j === 0 ?
                                    <div className="d-flex flex-column gap-3 my-2">
                                        <button className="btn btn-danger btn-sm" style={{ width: '250px' }}>Cancel Order</button>
                                        <button className="btn btn-info btn-sm" onClick={() => onCancelOrder(item._id)}>Dispatch Order</button>
                                        <button className="btn btn-success btn-sm" onClick={() => onCancelOrder(item._id)}>Deliver Order</button>
                                    </div>
                                : ""} */}
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