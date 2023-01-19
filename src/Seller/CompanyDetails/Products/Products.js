import { useEffect, useState } from "react";
import { getProducts } from "../../services/Http-Service";
import CreateNewProduct from "./Create-New-Product";
import ImgCarousal from "./Img-Carousal";
import Pagination from "./Pagination";
import QuickViewModal from "./Quick-View-Modal";
import {FaRupeeSign} from 'react-icons/fa'
import Footer from "../../../components/Footer";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [id, setId] = useState();
  
  const [pageNum, setPageNum] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [totalResults, setTotalResults] = useState();
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState("");
  const[searchByName,setSearchByName]=useState('')
  useEffect(() => {

    sortBy ?
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}&sortBy=${sortBy}`)
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
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}`)
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
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}&name=${searchByName}`)
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

  const onCreateProduct = () => {
    console.log("oncreate");
    setShow(true);
  };
  
  const onQuickView = (id) => {
    setQuickView(true)
    console.log(id)
    setId(id)
  }

  const onSearchByName = () => {
    setSearchByName(() => name)
    console.log(searchByName)
    
  }
  
  return (
    <div className="productImages-container">
      <div className="d-flex justify-content-between my-3 mx-3">
        <div className="d-flex ">
            <input type='text' value={name} className="form-control"
              onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary mx-2"
                onClick={onSearchByName}
            >Search</button>
        </div>
        <div className="d-flex align-items-center" >
          <label className='fw-bolder mx-2'>SortBy-</label>
          <select className="form-select" onChange={(e)=>setSortBy(e.target.value)} >
            <option value={''}>Default</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
          
          <button onClick={onCreateProduct}
           className='mx-2 btn btn-secondary' style={{width:'300px'}}>Create Product</button>
        </div>
      </div>
      
      <div className="productImages">
        {products.length>0 ?
        products.map((item, i) => {
          return (
            <div key={i} className='productCard'>
              {/* <div> */}
                <ImgCarousal imgData={item.images} />
              <div className="d-flex justify-content-center productCard-btn">
                <button className="btn btn-secondary btn-sm " onClick={() => onQuickView(item._id)}>QUICK VIEW</button>
              </div>
              {/* </div> */}
              {/* <div style={{ width: '100%', border: '1px solid black', height: '50vh' }}>
              {item.images.length>0 ?
              <img
                  className="cardImg"
                  src={item.images[0].url}
                  alt="First slide"
              /> :
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                  className="cardImg"
                  alt="no data"
              />
              }
            </div> */}
              <div className="text-center">
                <h6 className="py-1 fw-bolder">{item.name}</h6>
                <p className='fw-bolder' style={{color:'rgb(196, 85, 0)'}}> <FaRupeeSign />{item.price}</p>
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
        {totalResults && 
          <Pagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
            totalResults={totalResults}
            />
        }
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
      <div className="d-flex justify-content-between">
        <div>
          <label className='fw-bolder'>Items Per Page-</label>
          <select onChange={(e)=>setItemPerPage(e.target.value)}>
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
    </div>
  );
}
