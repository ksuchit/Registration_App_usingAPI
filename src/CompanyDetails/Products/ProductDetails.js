import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteProduct, getProductDetails } from "../../Services/HttpService";
import ImgCarousal from "./ImgCarousal";

export default function ProductDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
    const navigate = useNavigate();
  console.log(searchParams.get("productId"));

  useEffect(() => {
    getProductDetails(`/products/${searchParams.get("productId")}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const onDeleteProduct = () => {
        console.log('deleteProduct')

        DeleteProduct(`/products/${searchParams.get("productId")}`)
            .then((response) => {
                console.log(response)
                navigate('/products')
            })
            .catch((error) => {
            console.log(error)
        })
    }
    
  console.log(data);
  return (
    <div>
      <h1>productDetails</h1>
          {
            //we required time to get response but till our page is rendered so i was getting error.
            data && <>
            <ImgCarousal imgData={data.images} />
            <p>{data.name}</p>
              </>
          }

        <div>
           <button onClick={onDeleteProduct}>Delete Product</button>   
           <button >Update Product</button>   
        </div>
    </div>
  );
}
