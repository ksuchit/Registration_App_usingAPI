import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Delete, Get } from "../../services/Http-Service";
import UpdateImageModal from "./Update-Image-Modal";
import UpdateProductModal from "./Update-Product-Modal";
import { FaRupeeSign } from "react-icons/fa";
import parse from 'html-react-parser'
import ReactImageMagnify from "react-image-magnify";

export default function ProductDetails() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [upShow, setUPShow] = useState(); //update product show
  const [uiShow, setUIShow] = useState(); //update images show
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Get(`/products/${searchParams.get("productId")}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDeleteProduct = () => {
    console.log("deleteProduct");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <p style=${{ color: "red" }}>${
          data.name
        } Products!</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Delete(`/products/${searchParams.get("productId")}`)
            .then((response) => {
              console.log(response);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                `Your <p style={{color:'red'}}>${data.name} Products</p> has been deleted.`,
                "success"
              );
              navigate("/seller/products");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `<p style={{color:'red'}}>Your ${data.name} Products is safe :)</p>`,
            "error"
          );
        }
      });
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div
        className="col-7"
        style={{ border: "1px solid black", padding: "2%", marginTop: "2%" }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Product Details</h1>
        </div>
        <div className="d-flex gap-3">
          <div className="d-flex flex-column gap-3">
            {data &&
              data.images.map((item, i) => {
                return (
                  <div key={i}>
                    <img
                      src={item.url}
                      alt={1}
                      style={{ width: "100px" }}
                      onClick={() => setIndex(i)}
                    />
                  </div>
                );
              })}
          </div>
          <div>
            {
              //we required time to get response but till our page is rendered so i was getting error.
              data && (
                <>
                  {data.images.length > 0 ? (
                    <>
                      <div style={{ width: "300px" }}>
                        {/* <img
                          src={data.images[index].url}
                          alt="1"
                          style={{ width: "400px", height: "400px" }}
                        /> */}
                        <ReactImageMagnify {...{
                              smallImage: {
                                  alt: 'Wristwatch by Ted Baker London',
                                  isFluidWidth: true,
                                  src:data.images[index].url 
                              },
                              largeImage: {
                                  src:data.images[index].url ,
                                  width: 800,
                                  height: 1100
                              },
                         
                        }}
                        />
                      </div>
                      
                    </>
                  ) : (
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                        style={{ width: "400px", height: "400px" }}
                        alt="no data"
                      />
                    </div>
                  )}
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
              )
            }

            
          </div>
          {data &&
            <div>
              <h2>{data.name}</h2>
              <p>{parse(data.description)}</p>
              <p className="fw-bolder">
                <FaRupeeSign />
                {data.price}
              </p>
            </div>
          }
        </div>
        <div style={{ textAlign: "center" }} className="my-3">
              <button onClick={onDeleteProduct} className="btn btn-danger">
                Delete Product
              </button>
              <button
                onClick={() => setUPShow(true)}
                className="btn btn-secondary mx-2"
              >
                Update Product
              </button>
              <button
                onClick={() => setUIShow(true)}
                className="btn btn-secondary"
              >
                Update Images
              </button>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
}
