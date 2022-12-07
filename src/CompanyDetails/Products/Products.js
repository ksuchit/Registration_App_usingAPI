import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Services/HttpService";
import CreateNewProduct from "./CreateNewProduct";
import ImgCarousal from "./ImgCarousal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(`/products`)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <button onClick={onCreateProduct}>Create Product</button>
      <h1>products</h1>
      <div className="d-flex">
        {products.map((item, i) => {
          return (
            <div key={i}>
              <ImgCarousal imgData={item.images} />
              <p>Name={item.name}</p>
              <p>description={item.description}</p>
              <p>Price={item.price}</p>
              <button onClick={()=>showProduct(item)}>Show</button>
            </div>
          );
        })}
      </div>
      <CreateNewProduct show={show} setShow={setShow} />
    </div>
  );
}
