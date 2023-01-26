import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {AiTwotoneDelete} from 'react-icons/ai'
import { minusItem, plusItem } from "../redux/actions/Cart-Item-Actions";
import { addItemToCart, clearCart, deleteItemFromCart } from "../redux/actions/Cart-Actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deSelectItem, diSelectAllItems, selectAllItems, selectItem } from "../redux/actions/Cart-Select-Item-Actions";
import { useState } from "react";
import { shopLoginContext } from "../../App";
import LoginModal from "../Home/Login-Modal";
import parse from 'html-react-parser'
import { set } from "react-hook-form";
import ImgCarousal from "../Home/Img-Carousal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { addToFavorite, removeFromFavorite } from "../redux/actions/Favorite-Action";
import BuySingleProductModal from '../Home/BuySingleProduct'

export default function Cart() {

    const [selected,setSelected]=useState(false);
    const [searchParams,] = useSearchParams();
    const [loginShow, setLoginShow] = useState(false)
    const [similar,setSimilar]=useState([]);

    // console.log(searchParams.get('id'))
    const [shopLive,] = useContext(shopLoginContext);
    const navigate = useNavigate();
    const state = (useSelector((state) => state) || JSON.stringify(localStorage.getItem('store')));
    console.log(state)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (searchParams.get('id'))
        document.getElementById(searchParams.get('id')).scrollIntoView({ behavior: "smooth" },1000)
        onSelectAllItems();
        // setSimilar(state.cartReducer.cart.map((item)=> item._org._id))
        removeDuplicate(state.cartReducer.cart.map((item)=> item._org._id))
    }, [state.cartReducer.cart.length])
    
    const removeDuplicate=(arr)=>{
        setSimilar([...new Set(arr)])
    }
    console.log(similar)

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
    const onProceedToBuy = () => {
        if (shopLive) {
            navigate('/buy')
            // dispatch(clearCart())
        }
        else
            setLoginShow(true)
    }
    const addingItemToCart = (item) => {

        item.quantity = 1;
        item.subTotal = item.quantity * item.price
        dispatch(addItemToCart(item));
        
    }
  const [singleProduct,setSingleProduct]=useState();
  const [buyShow,setBuyShow]=useState(false);
    const BuySingleProduct = (item) => {
      // navigate(`/buy?id=${item._id}`)
      // dispatch(clearCart());
      console.log(item)
      setSingleProduct(item)
      setBuyShow(true)
      item.quantity = 1;
      item.subTotal = item.quantity * item.price
      dispatch(addItemToCart(item));
  
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
                    <div key={item._id} id={item._id} className='d-flex p-2' style={{backgroundColor:'lightGrey',borderRadius:'7px'}}>
                        <div style={{width:'100px',height:'120px'}} className='d-flex gap-1'>
                            <input type='checkbox' onChange={()=>dispatch((selectItem(item)))}
                            checked={state.CartSelectItemReducer.selectedItem.find((data)=>data._id===item._id) ? true :false}
                            />
                            <img src={item.images[0].url} alt='cartItem' style={{height:'100%',width:'100%',borderRadius:'7px'}}/>
                        </div>
                        <div className="d-flex flex-column" style={{paddingLeft:'40px',width:'400px'}}> 
                        {/* onClick={()=>navigate(`/buy?id=${item._id}`)} */}
                            <div className="d-flex justify-content-between">
                                <h6 className="py-1 mb-0">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
                                <div>
                                    <p className='fw-bolder mb-0' > <FaRupeeSign />{item.price}</p>
                                </div>
                            </div>
                            <p className="mb-0">{item.description.length>40 ? `${parse(item.description.slice(0,40))} ...`: parse(item.description) }</p>
                            {/* {item.quantity !== 1 ?
                                <div className="d-flex">
                                    <p className='fw-bolder'>SubTotal:</p><p>{item.price} * {item.quantity} = </p><p className='fw-bolder'>{item.price * item.quantity} </p>
                                </div>                            
                            : ""} */}
                            <div className="d-flex flex-column bottom-0 start-0">
                                <div className="d-flex my-1">
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                        {item.quantity === 1 ?
                                            <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="button-tooltip-2">Remove item from cart</Tooltip>}
                                            >
                                            {({ ref, ...triggerHandler }) => (
                                               <button type="button" className="btn btn-outline-primary btn-sm"
                                               onClick={() => {
                                                   dispatch(deleteItemFromCart(item))
                                                   dispatch(deSelectItem(item))
                                               }}
                                               {...triggerHandler} ref={ref} 
                                           ><AiTwotoneDelete /></button>
                                                )}
                                        </OverlayTrigger>
                                            
                                            : 
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="button-tooltip-2">Decrease quantity</Tooltip>}
                                                >
                                                {({ ref, ...triggerHandler }) => (
                                                    <button type="button" className="btn btn-outline-primary btn-sm"
                                                    {...triggerHandler} ref={ref} onClick={()=>dispatch(minusItem(item))}
                                                    >-</button>
                                                    )}
                                            </OverlayTrigger>
                                            
                                        }
                                        <button type="button" className="btn btn-outline-primary btn-sm" disabled>{item.quantity}</button>
                                        <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="button-tooltip-2">Increase quantity</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <button type="button" className="btn btn-outline-primary btn-sm"
                                                {...triggerHandler} ref={ref}  onClick={()=>dispatch(plusItem(item))}
                                              >+</button>
                                            )}
                                        </OverlayTrigger>
                                    </div>
                                    <div className="mx-2">
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                dispatch(deleteItemFromCart(item))
                                                dispatch(deSelectItem(item))
                                            }}
                                        >Remove from Cart</button>
                                    </div>
                                    {/* <div>
                                        <button className="btn btn-warning btn-sm" onClick={()=>navigate(`/buy?id=${item._id}`)}>Buy</button>
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>navigate(`/cart/similar-products?id=${item._org._id}`)}
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
        <div><h6>Similar Products...</h6></div>
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
                        onClick={onProceedToBuy}
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
        <div>
            <LoginModal
            show={loginShow}
            setShow={setLoginShow}
            />        
        </div> 
        <div>
        <div className="productImages">
          {similar.length>0 ?
          state.allProductsReducer.allProducts.map((item, i) => {
            if(similar.find((data,j)=>data===item._org._id))
            return (
              <div key={i} className='productCard'>
                {/* <div> */}
                <div className='position-relative'>
                  <ImgCarousal imgData={item} />
                  <div className="d-flex justify-content-center productCard-btn">
                      {/* <button className="btn btn-secondary btn-sm " onClick={() => onQuickView(item)}>QUICK VIEW</button> */}
                  </div>
                  <div className="position-absolute top-0 end-0">
                    {state.FavoriteReducer.favorite.find((data) => data._id === item._id) ?
                      <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2">Remove from Favorite</Tooltip>}
                       >
                        {({ ref, ...triggerHandler }) => (
                            <span {...triggerHandler} ref={ref}><BsFillHeartFill size={18} className="mx-2" style={{color:'red'}} onClick={()=>dispatch(removeFromFavorite(item))}/></span>
                        )}
                      </OverlayTrigger>     
                    :
                      <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2">Add to Favorite</Tooltip>}
                      >
                        {({ ref, ...triggerHandler }) => (
                            <span {...triggerHandler} ref={ref}><BsHeart size={18} className="mx-2" style={{ color: 'red' }} onClick={() => dispatch(addToFavorite(item))} /></span>
                        )}
                      </OverlayTrigger>  
                      
                    }
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6 className="py-1 mb-0 fw-bolder">{item.name.length>15 ? `${item.name.slice(0,15)} ...`: item.name}</h6>
                  <p className='fw-bolder mb-0' style={{color:'rgb(196, 85, 0)'}}> <FaRupeeSign />{item.price}</p>
                  {/* <p id="my-anchor-element">Tooltip</p>
                  <Tooltip anchorId="my-anchor-element" content="hello world" place="top" /> */}
                </div>
                <div className="mb-0 d-flex justify-content-center">
                  {/* state.cartReducer.cart its used because state refreses when we come back to home page from anywhere   */}
                  {
                    state.cartReducer.cart.find((prev)=>prev._id===item._id) ?
                      <button onClick={()=>navigate(`/cart?id=${item._id}`)} className="btn btn-primary btn-sm mx-1">Go to Cart</button>
                      : <>
                      <button className="btn btn-warning btn-sm mx-1"
                        onClick={()=>addingItemToCart(item)}>Add to Cart</button>
                      <button className="btn btn-dark btn-sm" onClick={()=>BuySingleProduct(item)}>Buy</button>
                      </>
                  }
                </div>
              </div>
            );
          })
        :<p style={{color:'red'}}>No data Found</p>
        }
        </div>
        {singleProduct &&
          <BuySingleProductModal
            show={buyShow}
            setShow={setBuyShow}
            singleProduct={singleProduct}
          />
      }
        </div>  
        </div>
    )
}