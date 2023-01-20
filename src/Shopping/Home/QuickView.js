import { useState } from "react";
import Button  from "react-bootstrap/Button";
import  Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from 'react-icons/fa'
import parse from 'html-react-parser'

export default function QuickView(props) {
  const navigate = useNavigate();
  const [index,setIndex]=useState(0)  
    
  return (
    <div>
    <Modal {...props} 
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >   
        <Modal.Body>
            <div className="d-flex gap-5">
                <div className="d-flex flex-column gap-3">
              {
                props.data &&
                props.data.images.map((item, i) => {
                  if (i < 6) {
                    return (
                      <div key={i}>
                        <img src={item.url} alt={i} style={{ width: '60px' }}
                          onClick={() => setIndex(i)} />
                      </div>
                    )
                  }
                  })
                    }
                </div>      
            <div style={{ border: '1px solid black', padding: '2%', marginTop: '1%' }}>
              <div className="d-flex">
                    {
                        //we required time to get response but till our page is rendered so i was getting error.
                props.data && <>
                  {props.data.images.length === 0 ?
                    <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                    style={{ width: '400px',height:'400px' }}
                      alt='no props.data' />
                    :
                     <img src={props.data.images[index]?.url}
                       style={{ width: '400px',height:'400px' }}
                       alt='1'
                       />
                      
                    }
                    <div className="mx-5">
                        <h2>{props.data.name}</h2>
                        <p>{parse(props.data.description)}</p>
                      <p className='fw-bolder'><FaRupeeSign />{props.data.price}</p>
                    </div>
                        </>
                    }
              </div>
                       
              </div>
            </div>          
        </Modal.Body>
        <Button onClick={()=>props.setShow(false)}>Close</Button>      
    </Modal>              
    </div>
  );
}
