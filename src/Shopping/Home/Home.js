import { useEffect, useState } from "react";
import Get from "../Services/HttpService";
import ImgCarousal from "./ImgCarousal";
import Pagination from "./Pagination";
import {FaRupeeSign} from 'react-icons/fa'
import Footer from "../../Components/Footer";

export default function Products() {
  const [products, setProducts] = useState([]);
  
  const [pageNum, setPageNum] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [totalResults, setTotalResults] = useState();
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState("");
  const[searchByName,setSearchByName]=useState('')
  useEffect(() => {

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
  
  return (
    <div className="productImages-container">
      <div className="d-flex justify-content-between">
        <div className="mx-2 my-2">
          <div>
            <h1>Product List</h1>
          </div>
          <div>
            <input type='text' value={name}
              onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary mx-2"
                onClick={onSearchByName}
            >Search</button>
          </div>
        </div>
        <div className="mx-3 my-5">

          <lable className='fw-bolder'>SortBy-</lable>
          <select onChange={(e)=>setSortBy(e.target.value)}>
            <option value={''}>Default</option>
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
              <div className="d-flex justify-content-center productCard-btn">
                {/* <button className="btn btn-secondary btn-sm " onClick={() => onQuickView(item._id)}>QUICK VIEW</button> */}
              </div>
             
              <h6 className="py-1">{item.name}</h6>
              <div>
                <p className='fw-bolder'> <FaRupeeSign />{item.price}</p>
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
        />
        {/* we added ternary because when we click on quickView it will call fun and set id its working but before 
        that i think call goes to this modal  so we didn't get id in QuickModal so API not hitted   */}
        
      </div>
      <div>
        <div>
          <lable className='fw-bolder'>Items Per Page-</lable>
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
