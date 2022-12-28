import { useContext, useEffect, useState } from "react";
import Get from "../Services/HttpService";
import ImgCarousal from "./ImgCarousal";
import Pagination from "./Pagination";
import {FaRupeeSign} from 'react-icons/fa'
import Footer from "../../Components/Footer";
import LoginModal from "./LoginModal";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { shopLoginContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Redux/Actions/CartActions";

let cnt = 0;
export default function Products() {
  const [products, setProducts] = useState([]);
  const [shopLive,] = useContext(shopLoginContext);

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
  // const cookies = new Cookies();
  // useEffect(()=>{
  //   if (cookies.get('registered')) {
  //     setLoginShow(false); //Modal does not open if cookie exists
  //   } else if (!cookies.get('registered')) {
  //     cookies.set('registered', 'true', {
  //        path:'/',
  //       expires:0
  //      });
  //      setLoginShow(true); //Creates a cookie and shows modal.
  //   }
  // },[])

  // useEffect(()=>{
  //   if (sessionStorage.getItem('registered')) {
  //     setLoginShow(false); //Modal does not open if cookie exists
  //   } else if (!sessionStorage.getItem('registered')) {
  //     sessionStorage.setItem('registered',true);
  //      setLoginShow(true); //Creates a cookie and shows modal.
  //   }
  // }, [])
  
  useEffect(() => {
    if (cnt === 0) {
      setLoginShow(true)
      cnt++;
    }
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
  const state = useSelector((state) => state);   //it will give us state in which array of selected products
  // console.log(state.cartReducer.cart)
  const addingItemToCart = (item) => {
    if (shopLive)
    {
      // return {
      //   type: "ADD_ITEM_TO_CART",
      //   payload: {
      //       item: item
      //       }
      // }
      item.quantity = 1;
      dispatch(addItemToCart(item));
    }
    else
      setLoginShow(true)
  }

  return (
    <div className="productImages-container">
      <div className="d-flex justify-content-between">
        <div className="mx-2 my-2">
          {/* <div>
            <h1>Product List</h1>
          </div> */}
          <div>
            <input type='text' value={name}
              onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary mx-2"
                onClick={onSearchByName}
            >Search</button>
          </div>
        </div>
        <div className="mx-3 my-2">
          <lable className='fw-bolder'>SortBy-</lable>
          <select onChange={(e)=>setSortBy(e.target.value)}>
            <option value=''>Default</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
          
         
        </div>
      </div>
      
      <div className="productImages">
        {products.length>0 ?
        products.map((item, i) => {
          return (
            <div key={i} className='productCard'>
              {/* <div> */}
              <ImgCarousal imgData={item.images} />
              <h6 className="py-1 mb-0">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
              <div>
                <p className='fw-bolder mb-0' > <FaRupeeSign />{item.price}</p>
              </div>
              <div className="mb-0 d-flex justify-content-center">
                {/* state.cartReducer.cart its used because state refreses when we come back to home page from anywhere   */}
                {
                  state.cartReducer.cart.find((prev)=>prev._id===item._id) ?
                    <button onClick={()=>navigate(`/cart?id=${item._id}`)} className="btn btn-primary btn-sm">Go to Cart</button>
                    : 
                    <button className="btn btn-warning btn-sm"
                      onClick={()=>addingItemToCart(item)}>Add to Cart</button>
                }
              </div>
            </div>
          );
        })
      :<p style={{color:'red'}}>No data Found</p>
      }
      </div>
      
      <div>
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
          itemPerPage={itemPerPage}
        />
        {/* we added ternary because when we click on quickView it will call fun and set id its working but before 
        that i think call goes to this modal  so we didn't get id in QuickModal so API not hitted   */}
        
      </div>
      <div>
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
    </div>
  );
}
