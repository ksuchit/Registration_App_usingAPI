import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import ImgCarousal from "../home/Img-Carousal";
import {AiTwotoneDelete} from 'react-icons/ai'
import { minusItem, plusItem } from "../redux/actions/Cart-Item-Actions";
import { deleteItemFromCart } from "../redux/actions/Cart-Actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-bootstrap";
import { diSelectAllItems, selectAllItems, selectItem } from "../redux/actions/Cart-Select-Item-Actions";
import { useState } from "react";

export default function Cart() {

    const [selected,setSelected]=useState(false);
    const [searchParams,] = useSearchParams();
    // console.log(searchParams.get('id'))
    
    useEffect(() => {
        if (searchParams.get('id'))
        document.getElementById(searchParams.get('id')).scrollIntoView({ behavior: "smooth" },1000)
        onSelectAllItems();
    }, [])
    
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    // console.log(state.cartReducer.cart)
    console.log(state)

    const dispatch = useDispatch();
    let price=0
    state.cartReducer.cart.map((item) => {
        if(state.CartSelectItemReducer.selectedItem.find((data)=>data._id===item._id))
        price+=item.price * item.quantity
        return item
    })

    const onSelectAllItems=()=>{
        dispatch(selectAllItems(state.cartReducer.cart))
        setSelected((prev)=>!prev)
    }
    const onDiSelectAllItems=()=>{
        dispatch(diSelectAllItems())
        setSelected((prev)=>!prev)
    }
    return ( 
        <div className="row mt-3">
        <div className="col-1"></div>
        {state.cartReducer.cart.length > 0 ? <>
        <div className=" col-7 gap-3 d-flex flex-column" style={{border:'2px solid grey',borderRadius:'1%'}}>
            <div>
                <h3>Shopping Cart</h3>
                <div className="d-flex justify-content-between">
                    {selected ? 
                    <button className="btn btn-link" onClick={onDiSelectAllItems}>DeSelect all Items</button>
                    : <button className="btn btn-link" onClick={onSelectAllItems}>Select all Items</button>
                    }
                    {/* <p>Price</p> */}
                </div>
            </div>
            
           { state.cartReducer.cart.map((item,i) => {
                return (
                    <div key={item._id} id={item._id} className='d-flex p-2' style={{backgroundColor:'lightGrey',borderRadius:'2px'}}>
                        <div style={{width:'100px',height:'120px'}} className='d-flex gap-1'>
                            <input type='checkbox' onChange={()=>dispatch((selectItem(item)))}
                            checked={state.CartSelectItemReducer.selectedItem.find((data)=>data._id===item._id) ? true :false}
                            />
                            <img src={item.images[0].url} alt='cartItem' style={{height:'100%',width:'100%'}}/>
                        </div>
                        <div className="d-flex flex-column" style={{paddingLeft:'40px',width:'400px'}}> 
                        {/* onClick={()=>navigate(`/buy?id=${item._id}`)} */}
                            <div className="d-flex justify-content-between">
                                <h6 className="py-1 mb-0">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
                                <div>
                                    <p className='fw-bolder mb-0' > <FaRupeeSign />{item.price}</p>
                                </div>
                            </div>
                            <p className="mb-0">{item.description.length>40 ? `${item.description.slice(0,40)} ...`: item.description}</p>
                            {/* {item.quantity !== 1 ?
                                <div className="d-flex">
                                    <p className='fw-bolder'>SubTotal:</p><p>{item.price} * {item.quantity} = </p><p className='fw-bolder'>{item.price * item.quantity} </p>
                                </div>                            
                            : ""} */}
                            <div className="d-flex flex-column bottom-0 start-0">
                                <div className="d-flex my-1">
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                        {item.quantity === 1 ?
                                            <button type="button" className="btn btn-outline-primary btn-sm"
                                                onClick={()=>dispatch(deleteItemFromCart(item))}
                                            ><AiTwotoneDelete /></button>
                                            : 
                                            <button type="button" className="btn btn-outline-primary btn-sm"
                                                onClick={()=>dispatch(minusItem(item))}
                                            >-</button>
                                        }
                                        <button type="button" className="btn btn-outline-primary btn-sm" disabled>{item.quantity}</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm"
                                            onClick={()=>dispatch(plusItem(item))}
                                        >+</button>
                                    </div>
                                    <div className="mx-2">
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>dispatch(deleteItemFromCart(item))}
                                        >Delete</button>
                                    </div>
                                    {/* <div>
                                        <button className="btn btn-warning btn-sm" onClick={()=>navigate(`/buy?id=${item._id}`)}>Buy</button>
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>navigate('/')}
                                        >See more like this</button>
                                    </div>
                                    {item.quantity !== 1 ?
                                    <div className="d-flex mx-2 align-items-center">
                                        <p className='fw-bolder'>SubTotal:</p><p>{item.price} * {item.quantity} = </p><p className='fw-bolder'>{item.price * item.quantity} </p>
                                    </div>                            
                                    : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
        <div className="col-3 price-details">
            <div style={{border:'1px solid black',padding:'3%'}}>
                <h6>PRICE DETAILS</h6>
                <hr></hr>
                <div className="d-flex justify-content-between">
                    <p>Total Items:</p>
                    <p>{state.CartSelectItemReducer.selectedItem.length}</p>    
                </div>
                <div className="d-flex justify-content-between">
                    <p>Price:</p>
                        <p><FaRupeeSign />{price}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Discount:</p>
                    <p style={{ color: 'green' }}>{price > 1000 ? <p className='mb-0'>-<FaRupeeSign />1000</p> : '0'}</p>    
                </div>
                <div className="d-flex justify-content-between">
                    <p>Delivery Charges:</p>
                    <p style={{color:'green'}}>FREE</p>    
                </div>
                <hr></hr>    
                <div className="d-flex justify-content-between">
                    <p>Total Amount:</p>
                    <p><FaRupeeSign />{price>1000 ? price-1000 : price}</p>    
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-warning"
                        disabled={state.CartSelectItemReducer.selectedItem.length===0 ? true : false}            
                        onClick={()=>navigate('/buy')}
                    >Proceed To Buy ({state.CartSelectItemReducer.selectedItem.length} items)</button>
                </div>
                <div>
                    <p style={{color:'green'}}  className='mb-0'>You will save <FaRupeeSign />1000 on this order</p>       
                </div>    
            </div>
        </div>
        </>
           : 
           <div className="d-flex justify-content-center">
               <h3>Cart is Empty</h3>
           </div>
        }
        </div>
    )
}