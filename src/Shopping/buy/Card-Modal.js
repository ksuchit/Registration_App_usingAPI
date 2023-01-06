import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-hot-toast';
import { Put } from '../services/Http-Service';

export default function CardModal(props) {
    const [moreDetails,setMoreDetails]=useState(false);
    const date=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    const year=[2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040];

    const makePayment=()=>{

      const payload={
        nameOnCard: 'Suchit Kore',
        cardNumber: '5555555555554444',
        expiry: '07/2028',
        cvv: '233'
      }
      Put(`/shop/orders/confirm/${props.orderId}`,payload)
      .then((response)=>{
        console.log(response)
        toast.success(response.data.message)
      })
      .catch((error)=>{
        console.log(error)
        toast.error(error.response.data.message)
      })
    }
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}
      size='lg'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Enter card details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {moreDetails ?
         <div>
         <Form>
             <Form.Group className="mb-3 d-flex align-items-center">
                 <Form.Label className='mx-2'>CVV:</Form.Label>
                 <Form.Control type="text" placeholder="Enter CVV" style={{width:'250px'}}/>
             </Form.Group>
         </Form>
         <div>
            <Button className='btn-sm mx-2 ' onClick={()=>props.setShow(false)}>Cancel</Button>
            <button className='btn btn-warning btn-sm' onClick={makePayment}>Make Payment</button>
         </div>
          </div>
        :
        <><div className='d-flex justify-content-between gap-2'>
            <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Card Number" style={{width:'350px'}}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3 d-flex">
                    <Form.Label>Expiry</Form.Label>
                    <Form.Select aria-label="Default select example" style={{marginLeft:"20%",marginRight:'10%'}}>
                      {date.map((item,i)=>{
                        return <option value={item} key={i}>{i<9 ?`0${item}`:item}</option>
                      })}
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                      {year.map((item,i)=>{
                        return <option value={item} key={i}>{item}</option>
                      })}
                    </Form.Select>
                </Form.Group>
            </Form>
            </div>
            <div>
                <h6>We accepts all major credit and debit cards:</h6>
                <div style={{width:'300px',height:'150px'}}><img src='https://toppng.com/uploads/preview/information-diners-club-credit-card-logo-11562925659qmdlcvtyqg.png' style={{width:'100%',height:'100%'}}/></div>
            </div>
        </div>
        <div>
            <Button className='btn-sm mx-2 ' onClick={()=>props.setShow(false)}>Close</Button>
            <button className='btn btn-warning btn-sm' onClick={()=>setMoreDetails(true)}>Enter card details</button>
        </div></>
        }
      </Modal.Body>
    </Modal>
  );
}