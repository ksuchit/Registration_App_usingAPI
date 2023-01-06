import { useEffect, useState } from 'react';
import { Button, Form, NavLink } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Address from '../profile/Address';
import Get, { Post } from '../services/Http-Service';
import CardModal from './Card-Modal'

export default function AccordionBuy() {
  const [address, setAddress] = useState([]);
  const [defaultAdd, setDefaultAdd] = useState();
  const [show,setShow]=useState(false)
  const [cardShow,setCardShow]=useState(false)
  const state=useSelector((state)=>state)
  const [activeKey,setActiveKey]=useState(0);
  const [orderId,setOrderId]=useState();
  console.log(state.CartSelectItemReducer.selectedItem)
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

  let price=0
  state.cartReducer.cart.map((item) => {
      if(state.CartSelectItemReducer.selectedItem.find((data)=>data._id===item._id))
      price+=item.price * item.quantity
      return item
  })

  const onPlaceOrder=()=>{
    console.log('Order Placed')
    const itemProduct=state.CartSelectItemReducer.selectedItem.map((item)=>{
      return{
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
        subTotal: item.subTotal
      }
    })
    const payload={
      items:itemProduct,
      deliveryFee:40,
      total:price+40,
      address:defaultAdd
    }
    console.log(payload)
    Post('/shop/orders',payload)
    .then((response)=>{
      console.log(response)
      setOrderId(response.data.order?._id)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const cartDetails=()=>{
    console.log('cart details')
    setCardShow(true)
  }

  console.log(defaultAdd)
  console.log(activeKey)
  return (
    <><Accordion defaultActiveKey={activeKey}>
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
            <Button className='btn-sm m-2' onClick={()=>setActiveKey(1)}>use this Address</Button>
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
                  <Button className='btn btn-primary btn-sm' onClick={()=>cartDetails()}>Enter Card Details</Button>
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
            <Button className='btn btn-warning m-2' onClick={()=>setActiveKey(2)}>Use this payment method</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>3. Items and delivery</Accordion.Header>
        <Accordion.Body>
          <div>
            <div>
              <h5>Delivery Date:</h5>
              <span><pre className='mb-0'>If you order in the next 5 hours and 27 minutes ( Details )</pre>
                    <pre>Items dispatched by Us</pre>
              </span>
            </div>
            {state.CartSelectItemReducer.selectedItem.map((item,i)=>{
              return(
                  <div style={{border:'1px solid black',borderRadius:'3px',padding:'10px',margin:'5px'}} className='d-flex gap-4' key={i}>
                    <div style={{width:'100px',height:'120px'}}>
                      <img src={item.images[0].url} style={{height:'100%',width:'100%'}} alt='delivery'/>
                    </div>
                    <div>
                        <h6>{item.name}</h6>
                        <span style={{color:'#B12704'}}><FaRupeeSign />{item.price}</span>
                        <Form.Select aria-label="Default select example">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                          <option value="5">Five</option>
                          <option value="6">Six</option>
                          <option value="7">Seven</option>
                          <option value="8">Eight</option>
                          <option value="9">Nine</option>
                          <option value="10">Ten</option><hr></hr>
                          <option value="delete">delete</option>
                        </Form.Select>
                    </div>
                    {i===0 ?
                    <div>
                        <h6>Choose a delivery option:</h6>
                        <Form>
                          <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
                            <Form.Check.Input type='radio' name='group1' className='mx-1'/>
                            <Form.Check.Label>
                              Tomorrow  — FREE FREE Delivery on eligible orders
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
                            <Form.Check.Input type='radio' name='group1' className='mx-1'/>
                            <Form.Check.Label>
                              Today  — Delivery Charges Rs. 40.
                            </Form.Check.Label>
                          </Form.Check>
                        </Form>
                    </div>
                    : ""}
                  </div>
               )
            })}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      <div style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex align-items-center gap-4'>
        <div><Button className='btn btn-warning' onClick={()=>onPlaceOrder()}>Place your order</Button></div>
        <div>
          <div className='d-flex'><h6>Order Total:</h6><p style={{color:'#B12704'}}><FaRupeeSign /> {price}</p> </div>
          <span style={{fontSize:'80%'}}>By placing your order, you agree to Amazon's privacy notice and conditions of use.</span>
        </div>
      </div>
      <div>
        <CardModal show={cardShow} setShow={setCardShow} orderId={orderId}/>
      </div></>
  );
}