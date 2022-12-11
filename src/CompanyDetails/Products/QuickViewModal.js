import { useEffect, useState } from "react";
import Button  from "react-bootstrap/Button";
import  Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getProductDetails } from "../../Services/HttpService";
import ImgCarousal from "./ImgCarousal";

export default function QuickViewModal(props) {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [index,setIndex]=useState(0)  

console.log(props.id)
  useEffect(() => {
    getProductDetails(`/products/${props.id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

    const onSeeMore = () => {
        navigate(`/products/product-details?&productId=${props.id}`)
    }
    
  return (
    <div>
    <Modal {...props} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >   
        <Modal.Body>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column gap-3">
                    {
                        data && 
                        data.images.map((item,i) => {
                            return (
                                <div key={i}>
                                    <img src={item.url} alt={i} style={{ width: '100px' }}
                                        onClick={() => setIndex(i)} />
                                </div>
                            )
                        })
                    }
                </div>      
                <div  style={{border:'1px solid black',padding:'2%',marginTop:'2%'}}>
                    <h2 style={{textAlign:'center'}}>Product Details</h2>
                    {
                        //we required time to get response but till our page is rendered so i was getting error.
                        data && <>
                        <img src={data.images[index]?.url}
                            style={{width:'500px'}}
                            alt='1'
                        /> 
                        <p>{data.name}</p>
                        <p>{data.description}</p>
                        <p>{data.price}</p>          
                        </>
                    }
                    
                          <div className="d-flex justify-content-end">
                          <Button onClick={onSeeMore}>See More</Button>          
                          </div>
                          
                </div>
            </div>          
        </Modal.Body>
        <Button onClick={()=>props.setShow(false)}>Close</Button>      
    </Modal>              
    </div>
  );
}
