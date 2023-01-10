import { NavLink,useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";


export default function OrdersDisplay(props){

    const navigate=useNavigate();
    const state=useSelector((state)=>state);

    return(
        <div>
           <div>
            {props.orders.map((item,i)=>{
                return(
                item.status===props.status ?
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
                            <div className="d-flex">
                                <div style={{width:'100px',height:'120px'}}>
                                    <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} style={{width:'100%',height:'100%'}} alt='product'/>
                                    {/* <NavLink>{console.log(state.allProductsReducer.allProducts.find((data)=>data._id===product.productId))}</NavLink> */}
                                </div>
                                <div className="mx-5">
                                    <h5>{product.name}</h5>
                                    <FaRupeeSign /> {product.subTotal}
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-3 my-2">
                                <button className="btn btn-warning btn-sm" style={{width:'250px'}}>Track package</button>
                                <button className="btn btn-light btn-sm">Cancel Item</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                : ""
                )
            })}
            </div>
        </div>
    )
}