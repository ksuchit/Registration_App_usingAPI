import { useEffect, useState } from 'react';
import { Button, Form, NavLink } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FaRupeeSign } from 'react-icons/fa';
import Address from '../profile/Address';
import Get from '../services/Http-Service';
import CardModal from './Card-Modal';

export default function AccordionBuy() {
  const [address, setAddress] = useState([]);
  const [defaultAdd, setDefaultAdd] = useState();
  const [show,setShow]=useState(false)
  const [cardShow,setCardShow]=useState(false)
  useEffect(()=>{
    Get('/customers/address')
    .then((response) => {
        console.log(response)
        setAddress(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  },[])

  console.log(defaultAdd)
  return (
    <Accordion defaultActiveKey="2">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
        {defaultAdd ?
        <div className='d-flex gap-5'>
          <div>1. Delivery address</div>
          <div >
            <pre>{defaultAdd.street},{defaultAdd.addressLine2}</pre>
            <pre>{defaultAdd.city},{defaultAdd.state}-{defaultAdd.pin}</pre>
          </div>
        </div>
        :'1. Delivery address'}
        </Accordion.Header>
        <Accordion.Body>
          <Form>
          {address.map((item,i)=>{
            return(
                <Form.Check key={i} style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}}>
                  <Form.Check.Input type='radio' name='group1' className='mx-1' onChange={()=>setDefaultAdd(item)}/>
                  <Form.Check.Label>
                    {`${item.addressLine2}, ${item.street}, ${item.city}, ${item.state}-${item.pin}`}
                  </Form.Check.Label>
              </Form.Check>
              )
            })}
          </Form>
          <div className='d-flex justify-content-between'>
            <Button className='btn-sm m-2'>use this Address</Button>
            <Button className='btn-secondary btn-sm m-2' onClick={()=>setShow(true)}>Add Address</Button>
          </div>
          <div>
            <Address show={show} setShow={setShow}/>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>2. Select a payment method</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1'/>
              <Form.Check.Label>
                <div>Pay with Debit/Credit/ATM Cards</div>
                <div style={{fontSize:'80%'}}>You can save your cards as per new RBI guidelines!</div>
                {/* <div>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-aIbegXTuKD72gcbiDOahjEhV63kZbZLAg&usqp=CAU'/>
                </div> */}
                <div>
                  <button className='btn btn-primary btn-sm' onClick={()=>setCardShow(true)}>Enter Card Details</button>
                </div>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1'/>
              <Form.Check.Label>
                <div>Net Banking</div>
                <Form.Select aria-label="Default select example">
                  <option>select Bank</option>
                  <option value="kotak">Kotak Bank</option>
                  <option value="Hdfc">HDFC Bank</option>
                  <option value="SBI">SBI</option>
                </Form.Select>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1'/>
              <Form.Check.Label>
                <div>Other UPI Apps</div>
                <div style={{fontSize:'80%'}}>Please enter your UPI ID</div>
                <div className='d-flex justify-content-between'>
                  <Form.Control type='text' placeholder='Ex: MobileNumber@upi'/>
                  <Button className='brn brn-warning btn-sm mx-2'>Verify</Button>
                </div> 
              </Form.Check.Label>
            </Form.Check>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1'/>
              <Form.Check.Label>
                <div>EMI available</div>
              </Form.Check.Label>
            </Form.Check>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1'/>
              <Form.Check.Label>
                <div>Cash On Delivery/Pay On Delivery</div>
                <div style={{fontSize:'80%'}}>Cash/Pay on Delivery available for this order...</div>
              </Form.Check.Label>
            </Form.Check>
            <Button className='btn btn-warning m-2'>Use this payment method</Button>
          </Form>
          {/* <div>
            <CardModal show={cardShow} setShow={setCardShow} />
          </div> */}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>3. Items and delivery</Accordion.Header>
        <Accordion.Body>
          <div>
            <div>
              <h5>Delivery Date:</h5>
              <span><pre>If you order in the next 13 hours and 27 minutes ( Details )</pre>
                    <pre>Items dispatched by Amazon</pre>
              </span>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <div style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex gap-4'>
        <button className='btn btn-warning btn-sm'>Place your order</button>
        <div>
          <h6>Order Total:{<FaRupeeSign />}</h6>
          <span style={{fontSize:'80%'}}>By placing your order, you agree to Amazon's privacy notice and conditions of use.</span>
        </div>
      </div>
    </Accordion>
  );
}