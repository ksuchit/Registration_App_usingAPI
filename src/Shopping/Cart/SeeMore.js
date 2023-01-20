import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FaGreaterThan, FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import QuickViewModal from "../../Seller/CompanyDetails/Products/Quick-View-Modal";
import ImgCarousal from "../Home/Img-Carousal";
import { addItemToCart } from "../redux/actions/Cart-Actions";
import { addToFavorite, removeFromFavorite } from "../redux/actions/Favorite-Action";
import BuySingleProductModal from '../Home/BuySingleProduct'

export default function SeeMore() {

    const [searchParams,] = useSearchParams();
    const dispatch = useDispatch();
    console.log(searchParams.get('id'))
    const state = useSelector((state) => state);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [quickView, setQuickView] = useState(false);
    const [buyShow, setBuyShow] = useState(false);
    const [singleProduct, setSingleProduct] = useState();

    useEffect(() => { 
        setData(state.allProductsReducer.allProducts.filter((item)=>item._org._id===searchParams.get('id')))
    }, [])
    console.log(data)

    const addingItemToCart = (item) => {

        item.quantity = 1;
        item.subTotal = item.quantity * item.price
        dispatch(addItemToCart(item));
    }

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
    
    const onQuickView = (id) => {
        setQuickView(true)
        console.log(id)
        setId(id)
      }
    return (
        <div>
            <div style={{margin:'2% 5%'}}>
                <NavLink to={'/home'} style={{textDecoration:'none'}}>home</NavLink><FaGreaterThan size={10} className='mx-1'/>
                <NavLink to={'/cart'} style={{textDecoration:'none'}}>cart</NavLink><FaGreaterThan size={10} className='mx-1'/>
                <NavLink to={'/cart/similar-products'} style={{color:'#c45500',textDecoration:'none'}}>Similar-Products</NavLink>
            </div>
        <div className="productImages">
            {data.length > 0 ?
                data.map((item, i) => {
                    return (
                        <div key={i} className='productCard'>
                            {/* <div> */}
                            <div className='position-relative'>
                                <ImgCarousal imgData={item} />
                                <div className="d-flex justify-content-center productCard-btn">
                                    <button className="btn btn-secondary btn-sm " onClick={() => onQuickView(item._id)}>QUICK VIEW</button>
                                </div>
                                <div className="position-absolute top-0 end-0">
                                    {state.FavoriteReducer.favorite.find((data) => data._id === item._id) ?
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="button-tooltip-2">Remove from Favorite</Tooltip>}
                                        >
                                            {({ ref, ...triggerHandler }) => (
                                                <span {...triggerHandler} ref={ref}><BsFillHeartFill size={18} className="mx-2" style={{ color: 'red' }} onClick={() => dispatch(removeFromFavorite(item))} /></span>
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
                                <h6 className="py-1 mb-0 fw-bolder">{item.name.length > 15 ? `${item.name.slice(0, 15)} ...` : item.name}</h6>
                                <p className='fw-bolder mb-0' style={{ color: 'rgb(196, 85, 0)' }}> <FaRupeeSign />{item.price}</p>
                                {/* <p id="my-anchor-element">Tooltip</p>
                  <Tooltip anchorId="my-anchor-element" content="hello world" place="top" /> */}
                            </div>
                            <div className="mb-0 d-flex justify-content-center">
                                {/* state.cartReducer.cart its used because state refreses when we come back to home page from anywhere   */}
                                {
                                    state.cartReducer.cart.find((prev) => prev._id === item._id) ?
                                        <button onClick={() => navigate(`/cart?id=${item._id}`)} className="btn btn-primary btn-sm mx-1">Go to Cart</button>
                                        : <>
                                            <button className="btn btn-warning btn-sm mx-1"
                                                onClick={() => addingItemToCart(item)}>Add to Cart</button>
                                            <button className="btn btn-dark btn-sm" onClick={() => BuySingleProduct(item)}>Buy</button>
                                        </>
                                }
                            </div>
                        </div>
                    );
                })
                : ""}
            
            <div>
            {id ?
                <QuickViewModal
                    show={quickView}
                    setShow={setQuickView}
                    id={id}
                    from="home"
                />
                : ""
                }
                
                {singleProduct &&
                    <BuySingleProductModal
                        show={buyShow}
                        setShow={setBuyShow}
                        singleProduct={singleProduct}
                    />
                }
            </div>
        </div>
        </div>    
    )
}