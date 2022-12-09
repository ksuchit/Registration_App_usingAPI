import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Services/HttpService";
import CreateNewProduct from "./CreateNewProduct";
import ImgCarousal from "./ImgCarousal";
import Pagination from "./Pagination";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const [pageNum, setPageNum] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {

    sortBy ?
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}&sortBy=${sortBy}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
    : 
    getProducts(`/products?&limit=${itemPerPage}&page=${pageNum}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [itemPerPage,pageNum,sortBy]);

  const onCreateProduct = () => {
    console.log("oncreate");
    setShow(true);
  };

    const showProduct = (item) => {
        console.log(item._id)
        navigate(`/products/product-details?&productId=${item._id}`)
  };
  return (
    <div>
      <div>
        <div>
          <button onClick={onCreateProduct}>Create Product</button>
          <h1>products</h1>
        </div>
        <div>
          <lable>SortBy-</lable>
          <select onChange={(e)=>setSortBy(e.target.value)}>
            <option value={''}>Default</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
        </div>
      </div>
      
      <div className="d-flex">
        {products.map((item, i) => {
          return (
            <div key={i}>
              <ImgCarousal imgData={item.images} />
              <p>Name={item.name}</p>
              <p>description={item.description}</p>
              <p>Price={item.price}</p>
              <button className="btn btn-secondary">QUICK VIEW</button>
              <button onClick={()=>showProduct(item)}>Show</button>
            </div>
          );
        })}
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
          products={products}
          itemPerPage={itemPerPage}
        />
      </div>
      <div>
        <lable>Items Per Page</lable>
        <select onChange={(e)=>setItemPerPage(e.target.value)}>
          <option value={4}>4</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
}
