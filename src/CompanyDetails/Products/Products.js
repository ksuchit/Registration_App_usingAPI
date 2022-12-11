import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Services/HttpService";
import CreateNewProduct from "./CreateNewProduct";
import ImgCarousal from "./ImgCarousal";
import Pagination from "./Pagination";
import QuickViewModal from "./QuickViewModal";
import {FaRupeeSign} from 'react-icons/fa'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  
  const [pageNum, setPageNum] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [totalPages,setTotalPages]=useState();
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {

    sortBy ?
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}&sortBy=${sortBy}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
        setTotalPages(response.data.totalPages)
      })
      .catch((error) => {
        console.log(error);
      })
    : 
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
        setTotalPages(response.data.totalPages)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [itemPerPage,pageNum,sortBy]);

  const onCreateProduct = () => {
    console.log("oncreate");
    setShow(true);
  };
  
  const onQuickView = (id) => {
    setQuickView(true)
    console.log(id)
    setId(id)
  }
  
  return (
    <div className="productImages-container">
      <div className="d-flex justify-content-between">
        <div className="mx-2 my-2">
          <h1>Product List</h1>
        </div>
        <div className="mx-3 my-5">

          <lable className='fw-bolder'>SortBy-</lable>
          <select onChange={(e)=>setSortBy(e.target.value)}>
            <option value={''}>Default</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
          
          <button onClick={onCreateProduct}
           className='mx-2 btn btn-secondary'>Create Product</button>
        </div>
      </div>
      
      <div className="productImages">
        {products.length>0 ?
        products.map((item, i) => {
          return (
            <div key={i} className='productCard'>
              <ImgCarousal imgData={item.images} />
              <p>{item.name}</p>
              <p> <FaRupeeSign />{item.price}</p>
              <div className="d-flex justify-content-center productCard-btn">
                <button className="btn btn-secondary " onClick={() => onQuickView(item._id)}>QUICK VIEW</button>
              </div>
            </div>
          );
        })
      :<p style={{color:'red'}}>No data Found</p>
      }
      </div>
      <CreateNewProduct
        show={show}
        setShow={setShow}
        setProducts={setProducts}
      />
      <div>
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
        />
        {/* we added ternary because when we click on quickView it will call fun and set id its working but before 
        that i think call goes to this modal  so we didn't get id in QuickModal so API not hitted   */}
        {id ?
          <QuickViewModal
            show={quickView}
            setShow={setQuickView}
            id={id}
          />
          : ""}
      </div>
      <div>
        <lable className='fw-bolder'>Items Per Page-</lable>
        <select onChange={(e)=>setItemPerPage(e.target.value)}>
          <option value={4}>4</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
}
