import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ImgCarousal from "../Home/ImgCarousal";
import {AiTwotoneDelete} from 'react-icons/ai'
import { minusItem, plusItem } from "../Redux/Actions/CartItemActions";
import { deleteItemFromCart } from "../Redux/Actions/CartActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {

    const [searchParams,] = useSearchParams();
    console.log(searchParams.get('id'))
    
    useEffect(() => {
        if (searchParams.get('id'))
        document.getElementById(searchParams.get('id')).scrollIntoView({ behavior: "smooth" },1000)
    }, [])
    
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    console.log(state.cartReducer.cart)
    const dispatch = useDispatch();
    let price=0
    state.cartReducer.cart.map((item) => {
        price+=item.price * item.quantity
        return item
    })

    return ( 
        <div className="row mt-3">
        <div className="col-1"></div>
        <div className="d-flex flex-column col-7 gap-3" style={{border:'2px solid grey'}}>
            {state.cartReducer.cart.length > 0 ?
            state.cartReducer.cart.map((item,i) => {
                return (
                    <div key={item._id} id={item._id} className='d-flex p-2' style={{border:'2px solid grey'}}>
                        <div style={{width:'50%'}}>
                            <ImgCarousal imgData={item.images} />
                        </div>
                        <div className="mx-3 position-relative">
                            <h6 className="py-1 mb-0">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
                            <p>{item.description.length>50 ? `${item.description.slice(0,50)} ...`: item.description}</p>
                            <p className='fw-bolder mb-0' > <FaRupeeSign />{item.price}</p>
                            {item.quantity !== 1 ?
                                <div className="d-flex">
                                    <p className='fw-bolder'>SubTotal:</p><p>{item.price} * {item.quantity} = </p><p className='fw-bolder'>{item.price * item.quantity} </p>
                                </div>                            
                            : ""}
                            <div className="d-flex flex-column position-absolute bottom-0 start-0">
                                <div className="d-flex my-1">
                                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                                        {item.quantity === 1 ?
                                            <button type="button" class="btn btn-outline-primary btn-sm"
                                                onClick={()=>dispatch(deleteItemFromCart(item))}
                                            ><AiTwotoneDelete /></button>
                                            : 
                                            <button type="button" class="btn btn-outline-primary btn-sm"
                                                onClick={()=>dispatch(minusItem(item))}
                                            >-</button>
                                        }
                                        <button type="button" class="btn btn-outline-primary btn-sm" disabled>{item.quantity}</button>
                                        <button type="button" class="btn btn-outline-primary btn-sm"
                                            onClick={()=>dispatch(plusItem(item))}
                                        >+</button>
                                    </div>
                                    <div className="mx-2">
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>dispatch(deleteItemFromCart(item))}
                                        >Delete</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-warning btn-sm">Buy</button>
                                    </div>
                                </div>
                                <div className="mb-0">
                                    <button className="btn btn-secondary btn-sm"
                                        onClick={()=>navigate('/')}
                                    >See more like this</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            : 
            <div className="d-flex justify-content-center">
                <h3>Cart is Empty</h3>
            </div>
            }
        </div>
        <div className="col-3 price-details">
            <div style={{border:'1px solid black',padding:'3%'}}>
                <h6>PRICE DETAILS</h6>
                <hr></hr>
                <div className="d-flex justify-content-between">
                    <p>Total Items:</p>
                    <p>{state.cartReducer.cart.length}</p>    
                </div>
                <div className="d-flex justify-content-between">
                    <p>Price:</p>
                        <p><FaRupeeSign />{price}</p>    
                </div>
                <div className="d-flex justify-content-between">
                    <p>Discount:</p>
                    <p style={{color:'green'}}>-<FaRupeeSign />1000</p>    
                </div>
                <div className="d-flex justify-content-between">
                    <p>Delivery Charges:</p>
                    <p style={{color:'green'}}>FREE</p>    
                </div>
                <hr></hr>    
                <div className="d-flex justify-content-between">
                    <p>Total Amount:</p>
                    <p><FaRupeeSign />{price-1000}</p>    
                </div>
                <div>
                    <p style={{color:'green'}}  className='mb-0'>You will save <FaRupeeSign />1000 on this order</p>       
                </div>    
            </div>
        </div>
        </div>
    )
}