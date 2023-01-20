import { useEffect, useState } from "react";
import Get from "../services/Http-Service";
import ImgCarousal from "./Img-Carousal";
import Pagination from "./Pagination";
import {FaRupeeSign} from 'react-icons/fa'
import Footer from "../../components/Footer";
import LoginModal from "./Login-Modal";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/actions/Cart-Actions";
import { addToFavorite, removeFromFavorite } from "../redux/actions/Favorite-Action";
import BuySingleProductModal from "./BuySingleProduct";
import getCart from "../services/Redux-Service";
import QuickViewModal from "../../Seller/CompanyDetails/Products/Quick-View-Modal";
import { BsArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// let cnt = 0;
export default function Products() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [totalResults, setTotalResults] = useState();
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState("");
  const [searchByName, setSearchByName] = useState('')
  const [loginShow, setLoginShow] = useState(false)
  const [buyShow, setBuyShow] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [quickView, setQuickView] = useState(false);
  const [id, setId] = useState();
  const cookies = new Cookies();
  useEffect(()=>{
    if (cookies.get('registered')) {
      setLoginShow(false); //Modal does not open if cookie exists
    } else if (!cookies.get('registered')) {
      cookies.set('registered', 'true', {
         path:'/',
        expires:0
       });
       setLoginShow(true); //Creates a cookie and shows modal.
    }
  },[])

  // useEffect(()=>{
  //   if (sessionStorage.getItem('registered')) {
  //     setLoginShow(false); //Modal does not open if cookie exists
  //   } else if (!sessionStorage.getItem('registered')) {
  //     sessionStorage.setItem('registered',true);
  //      setLoginShow(true); //Creates a cookie and shows modal.
  //   }
  // }, [])
  
  useEffect(() => {
  //   if (cnt === 0) {
  //     setLoginShow(true)
  //     cnt++;
  //   }
    sortBy ?
    Get(`/shop/products?&limit=${itemPerPage}&page=${pageNum}&sortBy=${sortBy}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
        setTotalPages(response.data.totalPages)
        setTotalResults(response.data.totalResults)
      })
      .catch((error) => {
        console.log(error);
      })
    : 
    Get(`/shop/products?&limit=${itemPerPage}&page=${pageNum}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
        setTotalPages(response.data.totalPages)
        setTotalResults(response.data.totalResults)
      })
      .catch((error) => {
        console.log(error);
      });
    
    searchByName &&
    Get(`/shop/products?&limit=${itemPerPage}&page=${pageNum}&name=${searchByName}`)
    .then((response) => {
      console.log(response);
      setProducts(response.data.results);
      setTotalPages(response.data.totalPages)
      setTotalResults(response.data.totalResults)
      setName("")
    })
    .catch((error) => {
      console.log(error);
    })

  }, [itemPerPage,pageNum,sortBy,searchByName]);

  const onSearchByName = () => {
    setSearchByName(() => name)
    console.log(searchByName)
    
  }
  const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));//it will give us state in which array of selected products
  // console.log(state.cartReducer.cart)

  const addingItemToCart = (item) => {

      item.quantity = 1;
      item.subTotal = item.quantity * item.price
      dispatch(addItemToCart(item));
      
    //   localStorage.setItem('store', JSON.stringify({
    //     cartReducer: { cart: [...cart] },
    //     CartSelectItemReducer: { selectedItem: [...selectedItem] },
    //     FavoriteReducer: { favorite: [...favorite] },
    //     allProductsReducer: { allProducts:  [...allProducts] }
    // }))
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

  //   localStorage.setItem('store', JSON.stringify({
  //     cartReducer: { cart: [...cart,item] },
  //     CartSelectItemReducer: { selectedItem: [...selectedItem] },
  //     FavoriteReducer: { favorite: [...favorite] },
  //     allProductsReducer: { allProducts:  [...allProducts] }
  // }))
  }

  const onQuickView = (id) => {
    setQuickView(true)
    console.log(id)
    setId(id)
  }
  return (
    <div className="productImages-container">
      <div className="d-flex justify-content-between my-2 mx-2">
          <div className="d-flex">
            <input type='text' value={name} className="form-control"
              onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary mx-2"
                onClick={onSearchByName}
            >Search</button>
          </div>
        <div className="d-flex align-items-center mx-3">
          <lable className='fw-bolder mx-2'>SortBy-</lable>
          <select className="form-select"  onChange={(e)=>setSortBy(e.target.value)} >
            <option value=''>Default</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
      </div>
      </div>
      <div className="d-flex align-items-center">
        {pageNum !== 1 ?
          <div onClick={() => setPageNum((prev) => prev - 1)}><BsArrowLeftCircleFill size={40} style={{ marginLeft: '30%' }} /></div>
        : ""}
        <div className="productImages">
          {products.length>0 ?
          products.map((item, i) => {
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
        <div onClick={()=>setPageNum((prev)=>prev+1)}><BsFillArrowRightCircleFill size={40} style={{marginRight:'30%'}}/></div>
      </div>
      <div>
        {totalResults && 
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
          itemPerPage={itemPerPage}
          totalResults={totalResults}
        />
        }
        {/* we added ternary because when we click on quickView it will call fun and set id its working but before 
        that i think call goes to this modal  so we didn't get id in QuickModal so API not hitted   */}
        
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <lable className='fw-bolder'>Items Per Page-</lable>
          <select onChange={(e) => {
            setItemPerPage(e.target.value)
            setPageNum(1)
          }}>
            <option value={4}>4</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="d-flex py-1">
          <p>Showing Results From :</p> <p className="px-1 fw-bolder">{itemPerPage * (pageNum - 1) + 1}</p>
            to <p className="px-1 fw-bolder">{itemPerPage * pageNum > totalResults ? totalResults : itemPerPage * pageNum}</p>
            of <p className="px-1 fw-bolder">{totalResults} </p>
        </div>
      </div>
      <Footer />

      {/* it will display when we first time come to home page */}
      <div>
        <LoginModal
          show={loginShow}
          setShow={setLoginShow}
        />
      </div>
      {singleProduct &&
        <div>
          <BuySingleProductModal
            show={buyShow}
            setShow={setBuyShow}
            singleProduct={singleProduct}
          />
        </div>
      }

      {id ?
          <QuickViewModal
            show={quickView}
            setShow={setQuickView}
            id={id}
            from="home"
          />
        : ""
      }
    </div>
  );
}
