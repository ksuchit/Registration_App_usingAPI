import { useEffect, useState } from 'react';
import { Button, Form, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-hot-toast';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Address from '../Profile/Address';
import Get, { Delete, Post, Put } from '../services/Http-Service';
import CardModal from './Card-Modal'
import { AiFillEdit ,AiFillDelete} from 'react-icons/ai'
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateAddressModal from '../Profile/Update-Address-Modal';
import { clearCart, deleteItemFromCart } from '../redux/actions/Cart-Actions';
import { changeQuantity, deSelectItem } from '../redux/actions/Cart-Select-Item-Actions';

export default function AccordionBuy(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [defaultAdd, setDefaultAdd] = useState();
  const [show,setShow]=useState(false)
  const [cardShow,setCardShow]=useState(false)
  const [activeKey,setActiveKey]=useState('0');
  const [payWithCard, setPayWithCard] = useState(false)
  const [addressDisabled,setAddressDisabled]=useState(true)
  const [paymentDisabled,setpaymentDisabled]=useState(true)
  const [selectAddress, setSelectAddress] = useState();
  
  const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
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

    
    const createOrder=()=>{
      console.log('Order created')
      
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
      deliveryFee:props.deliveryCharges,
      total:props.price+props.deliveryCharges,
      address:selectAddress
    }
    console.log(payload)
    Post('/shop/orders',payload)
    .then((response)=>{
      console.log(response)
      props.setOrderId(response.data.order?._id)
      toast.success('Successfully Order Created')
    })
    .catch((error)=>{
      console.log(error)
    })
    
    dispatch(clearCart(state.CartSelectItemReducer.selectedItem))
    setDefaultAdd(selectAddress)
    setActiveKey('1');
  }
  
  const cartDetails=()=>{
    console.log('cart details')
    setCardShow(true)
  }

  const placeYourOrder=()=>{
    console.log(props.paymentDetails)
    const payload={
      nameOnCard:props.paymentDetails.nameOnCard,
      cardNumber:props.paymentDetails.cardNumber,
      expiry:`${props.paymentDetails.month}/${props.paymentDetails.year}`,
      cvv:props.paymentDetails.cvv
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
    const [editAddress, setEditAddress] = useState();
    const [addressShow,setAddressShow]=useState(false)
    const onEditAddress = (item) => {
    console.log(item)
    setEditAddress(item)
    setAddressShow(true)
  }
  const onDeleteAddress = (id) => {
    console.log('delete address',id)
    
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
        html: `You won't be able to revert Address!</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
          if (result.isConfirmed) {
          Delete(`/customers/address/${id}`)
          .then((response) => {
              console.log(response)
              setAddress((prev)=>prev.filter((item)=>item._id!==id))
              swalWithBootstrapButtons.fire(
                "Deleted!",
                `Your Address has been deleted.`,
                "success"
              );
              navigate("/profile");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `Your Address is safe :)</p>`,
            "error"
          );
        }
      });
  }
  console.log(defaultAdd)
  console.log(activeKey)
  return (
    <><Accordion activeKey={activeKey}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={()=>setActiveKey('0')}>
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
                <Form.Check.Input type='radio' name='group1' className='mx-1' onChange={() => {
                  setSelectAddress(item)
                  setAddressDisabled(false)
                }} />
                  <Form.Check.Label className='d-flex justify-content-between'>
                    <div>{`${item.addressLine2}, ${item.street}, ${item.city}, ${item.state}-${item.pin}`}</div>
                    <div>
                    <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Edit Address</Tooltip>}
                              >
                      {({ ref, ...triggerHandler }) => (
                        
                          // <Image
                          // {...triggerHandler}
                          //   ref={ref}
                          //   roundedCircle
                          //   src={<AiFillEdit />}
                          // />
                          <span {...triggerHandler} ref={ref}><AiFillEdit className='mx-1' onClick={()=>onEditAddress(item)} /></span>
                      
                      )}
                    </OverlayTrigger>                      
                    <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Remove Address</Tooltip>}
                              >
                      {({ ref, ...triggerHandler }) => (
                        
                          // <Image
                          // {...triggerHandler}
                          //   ref={ref}
                          //   roundedCircle
                          //   src={<AiFillEdit />}
                          // />
                          <span {...triggerHandler} ref={ref}><AiFillDelete onClick={()=>onDeleteAddress(item._id)}/></span>
                      
                      )}
                    </OverlayTrigger>     
                      
                    </div>
                  </Form.Check.Label>
              </Form.Check>
              )
            })}
          </Form>
          <div className='d-flex justify-content-between'>
            <Button className='btn-sm m-2' onClick={createOrder}
              disabled={addressDisabled ? true : false}
            >use this Address & Create Order</Button>
            <Button className='btn-secondary btn-sm m-2' onClick={()=>setShow(true)}>Add Address</Button>
          </div>
          <div>
            <Address show={show} setShow={setShow} setAddress={setAddress} />
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={()=>setActiveKey('1')}>2. Items and delivery</Accordion.Header>
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
                    <Form.Select aria-label="Default select example" onChange={(e) => {
                      console.log(e.target.value)
                      if (e.target.value === '11')
                        navigate('/cart')
                      else if(e.target.value === 'delete'){
                        dispatch(deleteItemFromCart(item))
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(deSelectItem(item))
                            Swal.fire(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            )
                          }
                        })
                      }
                      else
                        dispatch(changeQuantity(item, e.target.value))
                        
                    }}
                    >
                      <option defaultValue={item.quantity}>{item.quantity}</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                          <option value="5">Five</option>
                          <option value="6">Six</option>
                          <option value="7">Seven</option>
                          <option value="8">Eight</option>
                          <option value="9">Nine</option>
                          <option value="10">Ten</option>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="button-tooltip-2">For more than 10 Qty got to CART</Tooltip>}
                          >
                          {({ ref, ...triggerHandler }) => (
                            <option value="11" {...triggerHandler} ref={ref} >Ten+</option>
                          )}
                          </OverlayTrigger>
                          <hr></hr>
                          <option value="delete">delete</option>
                        </Form.Select>
                    </div>
                    {i===0 ?
                    <div>
                        <h6>Choose a delivery option:</h6>
                        <Form>
                          <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
                            <Form.Check.Input type='radio' name='group1' className='mx-1' onChange={()=>props.setDeliveryCharges(0)}/>
                            <Form.Check.Label>
                              Tomorrow  — FREE FREE Delivery on eligible orders
                            </Form.Check.Label>
                          </Form.Check>
                          <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
                            <Form.Check.Input type='radio' name='group1' className='mx-1' onChange={()=>props.setDeliveryCharges(40)}/>
                            <Form.Check.Label>
                              Today  — Delivery Charges Rs. 40.
                            </Form.Check.Label>
                          </Form.Check>
                          <Button className='btn btn-primary btn-sm mx-2'
                              onClick={()=>setActiveKey('2')}
                              disabled={props.deliveryCharges<0 ? true : false}
                          >Done</Button>
                        </Form>
                    </div>
                    : ""}
                  </div>
               )
            })}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header onClick={()=>setActiveKey('2')}>3. Select a payment method</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Check style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex' >
              <Form.Check.Input type='radio' name='group1' className='mx-1' onChange={()=>setPayWithCard(true)}/>
              <Form.Check.Label>
                <div>Pay with Debit/Credit/ATM Cards</div>
                <div style={{fontSize:'80%'}}>You can save your cards as per new RBI guidelines!</div>
                {/* <div>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-aIbegXTuKD72gcbiDOahjEhV63kZbZLAg&usqp=CAU'/>
                </div> */}
                {payWithCard ?
                  <div>
                    <Button className='btn btn-primary btn-sm' onClick={() => cartDetails()}>Enter Card Details</Button>
                  </div>
                : ""}  
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
            <Button className='btn btn-warning m-2' onClick={() => setActiveKey('2')}
                disabled={paymentDisabled ? true : false}
            >Use this payment method</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
      <div style={{backgroundColor:'lightgrey',margin:'10px',padding:'5px'}} className='d-flex align-items-center gap-4'>
        <div><Button className='btn btn-warning' onClick={() => placeYourOrder()} style={{width:'200px'}}
          disabled={addressDisabled && paymentDisabled ? true : false}
        >Place your order</Button></div>
        <div>
        <div className='d-flex my-2 mb-0'><h6>Order Total:</h6><p style={{color:'#B12704'}}><FaRupeeSign /> {props.price}</p> </div>
          <span style={{fontSize:'80%'}}>By placing your order, you agree to Amazon's privacy notice and conditions of use.</span>
        </div>
      </div>
      <div>
        <CardModal
          show={cardShow}
          setShow={setCardShow}
          setPaymentDetails={props.setPaymentDetails}
          setpaymentDisabled={setpaymentDisabled}
          orderId={props.orderId}
        />
        {editAddress ?
        <UpdateAddressModal 
            show={addressShow}
            setShow={setAddressShow}
            updateAdd={editAddress}
            setAddress={setAddress}
        />
        :''}
      </div></>
  );
}