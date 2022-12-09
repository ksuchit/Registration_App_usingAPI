import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteProduct, getProductDetails } from "../../Services/HttpService";
import ImgCarousal from "./ImgCarousal";
import UpdateImageModal from "./UpdateImageModal";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [upShow, setUPShow] = useState();  //update product show
  const [uiShow, setUIShow] = useState();  //update images show

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

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          html: `You won't be able to revert <p style=${{color:'red'}}>${data.name} Products!</p>`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            DeleteProduct(`/products/${searchParams.get("productId")}`)
            .then((response) => {
              console.log(response)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `Your <p style={{color:'red'}}>${data.name} Products</p> has been deleted.`,
                'success'
              )
              navigate('/products')
            })
            .catch((error) => {
              console.log(error)
            })
            
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              `<p style={{color:'red'}}>Your ${data.name} Products is safe :)</p>`,
              'error'
            )
          }
        })
          
    }
    
  return (
    <div className="row">
    <div className="col-3"></div>
    <div className="col-6" style={{border:'1px solid black',padding:'2%',marginTop:'2%'}}>
      <h1 style={{textAlign:'center'}}>Product Details</h1>
          {
            //we required time to get response but till our page is rendered so i was getting error.
            data && <>
            <ImgCarousal imgData={data.images} />
            <p>{data.name}</p>
            
            <div>
              <UpdateProductModal
                show={upShow}
                setShow={setUPShow}
                data={data}
                setData={setData}
              />
               <UpdateImageModal
                  show={uiShow}
                  setShow={setUIShow}
                  data={data}
                  setData={setData}
              />
            </div>
            </>
          }

        <div style={{textAlign:'center'}}>
           <button onClick={onDeleteProduct}
              className="btn btn-danger"
           >Delete Product</button>   
           <button onClick={()=>setUPShow(true)}
              className="btn btn-secondary mx-2"
           >Update Product</button>
           <button onClick={()=>setUIShow(true)}
              className="btn btn-secondary"
           >Update Images</button>
      </div>
      
    </div>
    <div className="col-3"></div>
    </div>
  );
}
