import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-bootstrap";
import { useState } from "react";
import CardModal from "./Card-Modal";
import Swal from "sweetalert2";
import { Patch } from "../services/Http-Service";


export default function OrdersDisplay(props){

    const navigate=useNavigate();
    const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
    const [cardShow,setCardShow]=useState(false)
    const [orderId, setOrderId] = useState();

    const onPendingPayment = (orderId) => {
        console.log(orderId)
        setOrderId(orderId)
        setCardShow(true)
    }

    const onCancelOrder = (orderId) => {
        console.log(orderId)

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
              html: `You won't be able to revert Order!</p>`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                Patch(`/shop/orders/cancel/${orderId}`)
                .then((response) => {
                    console.log(response)
                    props.setOrders((prev) => prev.map((item) => {
                        if (item._id === response.data.order?._id) {
                            item=response.data.order
                        }
                        return item
                    }))
                    swalWithBootstrapButtons.fire(
                      "Deleted!",
                      `Your Order has been deleted.`,
                      "success"
                    );
                    // navigate("/home");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  `Your Order is safe :)</p>`,
                  "error"
                );
              }
            });
    }

    return(
        <div>
           <div>
            {props.orders.map((item,i)=>{
                return(
                item.status===props.status ?
                <div key={i} style={{boredr:'1px solid grey',borderRadius:'10%'}} >
                    <div style={{backgroundColor:'lightgrey',padding:'10px',marginTop:'20px'}} className='d-flex justify-content-between'>
                        <div className="d-flex gap-4">
                            <div className="d-flex">
                                <div style={{color:'#0a58ca'}}>{i+1}</div>
                                <div className="d-flex flex-column"><span>:ORDER PLACED</span>
                                <span>{item.createdAt.slice(0,10)}</span></div>
                            </div>
                            <div className="d-flex flex-column">
                                <span>TOTAL</span>
                                <span><FaRupeeSign size={15} />{item.total}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>SHIP TO</span>
                                <span>{item.address.city}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span>PAYMENT</span>
                                        {item.paymentStatus === "Paid" ?
                                            <span style={{color:'green'}}>{item.paymentStatus}</span>
                                            :
                                            <NavLink className="btn btn-link"
                                                style={{ color: 'red' }} disabled={item.status==="Cancelled" ? true :false}
                                                onClick={() => onPendingPayment(item._id)}>{item.paymentStatus}</NavLink>
                                        }
                            </div>        
                        </div>
                        <div className="d-flex flex-column">
                            <span>ORDER#{item._id}</span>
                            <div className="d-flex">
                                <button className="btn btn-link btn-sm mx-2" onClick={()=>navigate(`/orders/order-details?id=${item._id}`)}>View order details</button>
                                <button className="btn btn-link btn-sm">Invoice</button>
                            </div>
                        </div>
                    </div>
                    {item.items.map((product,j)=>{
                        return(
                            <div className='d-flex justify-content-between' style={{ border: '1px solid grey', padding: '10px' }} key={j}>
                            <div className="d-flex">
                                <div style={{width:'100px',height:'120px'}}>
                                    <img src={state.allProductsReducer.allProducts.find((data)=>data._id===product.productId)?.images[0].url} style={{width:'100%',height:'100%'}} alt='product'/>
                                    {/* <NavLink>{console.log(state.allProductsReducer.allProducts.find((data)=>data._id===product.productId))}</NavLink> */}
                                </div>
                                <div className="mx-5">
                                    <h5>{product.name}</h5>
                                    <FaRupeeSign /> {product.subTotal}
                                </div>
                            </div>
                            {j === 0 && props.status!=="Cancelled" ?
                            <div className="d-flex flex-column gap-3 my-2">
                                <button className="btn btn-warning btn-sm" style={{ width: '250px' }}>Track package</button>
                                <button className="btn btn-light btn-sm" onClick={()=>onCancelOrder(item._id)}>Cancel Order</button>
                            </div>
                            : ""}
                        </div>
                        )
                    })}
                </div>
                : ""
                )
            })}
            </div>
            <div>
            <CardModal
                show={cardShow}
                setShow={setCardShow}
                orderId={orderId}
                setOrders={props.setOrders}    
            />
            </div>
        </div>
    )
}