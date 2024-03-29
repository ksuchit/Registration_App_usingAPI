import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router';
import { Put } from '../services/Http-Service';

export default function CardModal(props) {

  const navigate=useNavigate();
  const [moreDetails, setMoreDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
    const date=[1,2,3,4,5,6,7,8,9,10,11,12];
    const year=[2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040];
    const {register,
            handleSubmit,
            reset,
      formState: { errors }, } = useForm();
  
    const makePayment=(data)=>{

      const payload={
        nameOnCard:data.nameOnCard,
        cardNumber:data.cardNumber,
        expiry:`${data.month}/${data.year}`,
        cvv:data.cvv
      }

       Put(`/shop/orders/confirm/${props.orderId}`,payload)
      .then((response)=>{
        console.log(response)
        props.setShow(false)
        setMoreDetails(false)
        console.log(data)
        props.setPaymentDetails(data)
        props.setpaymentDisabled(false)
        if (response.data.message === "Your order is successfully placed!!") {
          toast.success(response.data.message)
          navigate('/')
          props.setOrders((prev) => prev.map((item) => {
            if (item._id === props.orderId) {
              item.paymentStatus = 'Paid'
              item.status = 'Confirmed'
            }
            return item
          }))
        }
        toast.success(response.data.message)
      })
      .catch((error)=>{
        console.log(error)
        if (error.response.data.message ==="Declined due to insufficient funds" || error.response.data.message==="Declined due to incorrect CVV") {
          setErrorMessage(error.response.data.message)
          toast.error(error.response.data.message)
        }
        else {
          toast.error(error.message)
          props.setShow(false)
        }
        props.setShow(true)
        setMoreDetails(false)
        
      })

    }
    const onSubmit=(data)=>{
      console.log(data)
      setMoreDetails(true)
    }
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)} onExit={()=>reset()}
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
        {errorMessage ? <p style={{color:'red'}}>{errorMessage}</p> : ""}
        {moreDetails ?
         <div>
         <Form onSubmit={handleSubmit(makePayment)}>
             <Form.Group className="mb-3 d-flex align-items-center">
                 <Form.Label className='mx-2'>CVV:</Form.Label>
                 <Form.Control type="text" placeholder="Enter CVV" style={{width:'250px'}} maxLength='3'
                    {...register('cvv',{required:true})}
                 />
             </Form.Group>
             {errors.cvv && <p style={{ color: "red" }}>CVV is Required</p>}
            <button type='submit' className='btn btn-warning btn-sm'>Make Payment</button>
         </Form>
         {/* <div className='d-flex justify-content-end'>
            <Button className='btn-sm mx-2 ' onClick={()=>props.setShow(false)}>Cancel</Button>
         </div> */}
          </div>
        :
        <><div className='d-flex justify-content-between gap-2'>
            <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Card Number" style={{width:'350px'}}
                        {...register('cardNumber',{required:true})}
                    />
                </Form.Group>
                {errors.cardNumber && <p style={{ color: "red" }}>cardNumber is Required</p>}
                <Form.Group className="mb-3">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" 
                        {...register('nameOnCard',{required:true})}
                    />
                </Form.Group>
                {errors.nameOnCard && <p style={{ color: "red" }}>nameOnCard is Required</p>}
                <Form.Group className="mb-3 d-flex">
                    <Form.Label>Expiry</Form.Label>
                    <Form.Select aria-label="Default select example" style={{marginLeft:"20%",marginRight:'10%'}}
                        {...register('month',{required:true})}
                    >
                      {date.map((item,i)=>{
                        return <option value={i<9 ?`0${item}`:item} key={i}>{i<9 ?`0${item}`:item}</option>
                      })}
                    </Form.Select>
                    <Form.Select aria-label="Default select example"
                        {...register('year',{required:true})}
                    >
                      {year.map((item,i)=>{
                        return <option value={item} key={i}>{item}</option>
                      })}
                    </Form.Select>
                </Form.Group>
                {errors.month && errors.year && <p style={{ color: "red" }}>nameOnCard is Required</p>}

            <button type='submit' className='btn btn-warning btn-sm' >Enter card details</button>
            </Form>
            </div>
            <div>
                <h6>We accepts all major credit and debit cards:</h6>
                <div style={{width:'300px',height:'150px'}}><img src='https://toppng.com/uploads/preview/information-diners-club-credit-card-logo-11562925659qmdlcvtyqg.png' style={{width:'100%',height:'100%'}}/></div>
            </div>
        </div>
        {/* <div className='d-flex justify-content-end'>
            <Button className='btn-sm mx-2 ' onClick={()=>props.setShow(false)}>Close</Button>
        </div> */}
        </>
        }
      </Modal.Body>
    </Modal>
  );
}