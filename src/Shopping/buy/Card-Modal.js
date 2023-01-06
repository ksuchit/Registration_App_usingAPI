import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CardModal(props) {
    const [moreDetails,setMoreDetails]=useState(false);
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
            </Form>
            </div>
            <div>
                <h6>We accepts all major credit and debit cards:</h6>
                <div style={{width:'300px',height:'150px'}}><img src='https://toppng.com/uploads/preview/information-diners-club-credit-card-logo-11562925659qmdlcvtyqg.png' style={{width:'100%',height:'100%'}}/></div>
            </div>
        </div>
        <div>
            <Button className='btn-sm mx-2 ' onClick={()=>props.setShow(false)}>Close</Button>
            <button className='btn btn-warning btn-sm' onClick={setMoreDetails(true)}>Enter card details</button>
        </div></>
        :
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Card Number" style={{width:'350px'}}/>
                </Form.Group>
            </Form>
        </div>
        }
      </Modal.Body>
    </Modal>
  );
}