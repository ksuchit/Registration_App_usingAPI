import { Modal } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteItemFromCart } from "../redux/actions/Cart-Actions";
import { minusItem, plusItem } from "../redux/actions/Cart-Item-Actions";
import { selectBuyOneItem } from "../redux/actions/Cart-Select-Item-Actions";
import parse from 'html-react-parser'
import getCart from "../services/Redux-Service";

export default function BuySingleProduct(props) {
console.log('props==>',props)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
    console.log('get store===>', JSON.stringify(localStorage.getItem('store')));
    const onProceedToBuy = (item) => {
        console.log(item)
        dispatch(selectBuyOneItem(item))
        
        // localStorage.setItem('store', JSON.stringify({
        //     cartReducer: { cart: [...cart] },
        //     CartSelectItemReducer: { selectedItem: [...selectedItem,item] },
        //     FavoriteReducer: { favorite: [...favorite] },
        //     allProductsReducer: { allProducts:  [...allProducts] }
        // }))

        navigate('/buy')
    }

    const onDeleteItem=(item)=>{
        dispatch(deleteItemFromCart(item))
        
        // localStorage.setItem('store', JSON.stringify({
        //     cartReducer: { cart: getCart().filter((data)=>data._id!== item._id) },
        //     CartSelectItemReducer: { selectedItem: [...selectedItem] },
        //     FavoriteReducer: { favorite: [...favorite] },
        //     allProductsReducer: { allProducts:  [...allProducts] }
        // }))                                           
    }
    return (
        <div>
        <Modal
        show={props.show}
        onHide={()=>props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Buying Single Product </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { state?.cartReducer?.cart.map((item,i) => {
            return (
                    item._id===props.singleProduct._id ?
                    <div key={item._id} id={item._id} className='d-flex p-2' style={{backgroundColor:'lightGrey',borderRadius:'2px'}}>
                        <div style={{width:'100px',height:'120px'}} className='d-flex gap-1'>
                            <img src={item.images[0].url} alt='cartItem' style={{height:'100%',width:'100%'}}/>
                        </div>
                        <div className="d-flex flex-column" style={{paddingLeft:'40px',width:'400px'}}> 
                        {/* onClick={()=>navigate(`/buy?id=${item._id}`)} */}
                            <div className="d-flex justify-content-between">
                                <h6 className="py-1 mb-0">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
                                <div>
                                    <p className='fw-bolder mb-0' > <FaRupeeSign />{item.price * item.quantity}</p>
                                </div>
                            </div>
                            <p className="mb-0">{item.description.length>40 ? `${parse(item.description.slice(0,40))} ...`: parse(item.description) }</p>
                            {/* {item.quantity !== 1 ?
                                <div className="d-flex">
                                    <p className='fw-bolder'>SubTotal:</p><p>{item.price} * {item.quantity} = </p><p className='fw-bolder'>{item.price * item.quantity} </p>
                                </div>                            
                            : ""} */}
                            <div className="d-flex flex-column bottom-0 start-0">
                                <div className="d-flex my-1">
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                        {item.quantity === 1 ?
                                            <button type="button" className="btn btn-outline-primary btn-sm"
                                                onClick={()=>onDeleteItem(item)}
                                            ><AiTwotoneDelete /></button>
                                            : 
                                            <button type="button" className="btn btn-outline-primary btn-sm"
                                                onClick={()=>dispatch(minusItem(item))}
                                            >-</button>
                                        }
                                        <button type="button" className="btn btn-outline-primary btn-sm" disabled>{item.quantity}</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm"
                                            onClick={()=>dispatch(plusItem(item))}
                                        >+</button>
                                    </div>
                                    <div className="mx-2">
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>dispatch(deleteItemFromCart(item))}
                                        >Delete</button>
                                    </div>
                                    {/* <div>
                                        <button className="btn btn-warning btn-sm" onClick={()=>navigate(`/buy?id=${item._id}`)}>Buy</button>
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={()=>navigate('/')}
                                        >See more like this</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-warning btn-sm" onClick={()=>onProceedToBuy(item)}>Proceed To Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :""
                )
            })
        }
        </Modal.Body>
      </Modal>
        </div>
    )
}