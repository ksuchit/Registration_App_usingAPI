import { useEffect, useState } from "react";
import Button  from "react-bootstrap/Button";
import  Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { getProductDetails } from "../../services/Http-Service";
import { FaRupeeSign } from 'react-icons/fa'
import parse from 'html-react-parser'

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
        navigate(`/seller/products/product-details?&productId=${props.id}`)
    }
    
  return (
    <div>
    <Modal {...props} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
            <div style={{ border: '1px solid black', padding: '2%', marginTop: '1%' }}>
              <div className="d-flex">
                    {/* <h2 style={{textAlign:'center'}}>Product Details</h2> */}
                    {
                        //we required time to get response but till our page is rendered so i was getting error.
                data && <>
                  {data.images.length === 0 ?
                    <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                    style={{ width: '400px',height:'400px' }}
                      alt='no data' />
                    :
                    <img src={data.images[index]?.url}
                      style={{ width: '400px',height:'400px' }}
                      alt='1'
                    />
                    }
                    <div className="mx-2">
                        <h2>{data.name}</h2>
                        <p>{parse(data.description)}</p>
                        <p className='fw-bolder'><FaRupeeSign />{data.price}</p>  
                    </div>
                        </>
                    }
                </div>    
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
