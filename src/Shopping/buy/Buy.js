import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { Put } from "../services/Http-Service";
import AccordionBuy from "./Accordion-Buy";

export default function Buy(){
    const [searchParams,]=useSearchParams();
    console.log(searchParams.get('id'));
    const [buyProduct,setBuyProduct]=useState();
    const state=useSelector((state)=>state)
    const [orderId,setOrderId]=useState();
    const [paymentDetails,setPaymentDetails]=useState();
    useEffect(()=>{
        if(searchParams.get('id')){
            setBuyProduct(state.CartSelectItemReducer.selectedItem.find((item)=>item._id===searchParams.get('id')))
        }
        else
            setBuyProduct(state.CartSelectItemReducer.selectedItem)
     
    },[])

    let price=0
    state.cartReducer.cart.map((item) => {
        if(state.CartSelectItemReducer.selectedItem.find((data)=>data._id===item._id))
        price+=item.price * item.quantity
        return item
    })
    console.log(buyProduct)

    const placeYourOrder=()=>{
        console.log('placeYourOrder')
        console.log(paymentDetails)

        const payload={
            nameOnCard:paymentDetails.nameOnCard,
            cardNumber:paymentDetails.cardNumber,
            expiry:`${paymentDetails.month}/${paymentDetails.year}`,
            cvv:paymentDetails.cvv
          }
      
          Put(`/shop/orders/confirm/${orderId}`,payload)
            .then((response)=>{
              console.log(response)
              toast.success(response.data.message)
            })
            .catch((error)=>{
              console.log(error)
              toast.error(error.response.data.message)
            })
    }

    return(
        <div>
            <div style={{backgroundColor:'lightgrey',padding:'10px',margin:'0px 10px'}} className='d-flex justify-content-center'>
                <h3>Checkout</h3>
            </div>
            <div className="row">
                <div className="col-2" style={{border:'1px solid black'}}>1</div>
                <div className="col-6" style={{border:'1px solid black'}}>
                    <AccordionBuy setOrderId={setOrderId} orderId={orderId} setPaymentDetails={setPaymentDetails} paymentDetails={paymentDetails}/>
                </div>
                <div className="col-2" style={{border:'1px solid black'}}>
                    <div className="d-flex flex-column">
                        <button className="btn btn-warning" onClick={placeYourOrder}>Place your order</button>
                        <span style={{fontSize:'80%'}}>By placing your order, you agree to READER'S PALACE privacy notice and conditions of use.</span>
                    </div>
                    <hr></hr>
                    <div>
                       <h6>Order Summary</h6>
                       <div className="d-flex justify-content-between">
                        <span>Items:</span>
                        <span><FaRupeeSign /> {price}</span>
                       </div>
                       <div className="d-flex justify-content-between">
                        <span>Delivery:</span>
                        <span><FaRupeeSign /> 40</span>
                       </div>
                       <div className="d-flex justify-content-between">
                        <span>Total:</span>
                        <span><FaRupeeSign /> {price+40}</span>
                       </div>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between" style={{color:'#B12704'}}>
                        <h6>Order Total:</h6>
                        <h6><FaRupeeSign /> {price+40}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}