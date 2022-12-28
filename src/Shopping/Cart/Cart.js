import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import ImgCarousal from "../Home/ImgCarousal";


export default function Cart() {

    const state = useSelector((state) => state);
    console.log(state.cartReducer.cart)
    
    return ( 
        <div className="row">
        <div className="col-1"></div>
        <div className="d-flex flex-column col-7">
            {state.cartReducer.cart.length > 0 ?
            state.cartReducer.cart.map((item,i) => {
                return (
                    <div key={i} className='d-flex'>
                        <div style={{border:'1px solid red',width:'50%'}}>
                            <ImgCarousal imgData={item.item.images} />
                        </div>
                        <div className="mx-3">
                            <p>{item.item.description}</p>
                            <h6 className="py-1 mb-0">{item.item.name.length>25 ? `${item.item.name.slice(0,25)} ...`: item.item.name}</h6>
                            <p className='fw-bolder mb-0' > <FaRupeeSign />{item.item.price}</p>
                            <div className="d-flex">
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" class="btn btn-outline-primary btn-sm">-</button>
                                    <button type="button" class="btn btn-outline-primary btn-sm">Middle</button>
                                    <button type="button" class="btn btn-outline-primary btn-sm">+</button>
                                </div>
                                <div className="mx-2">
                                    <button className="btn btn-secondary btn-sm">Delete</button>
                                </div>
                                <div>
                                    <button className="btn btn-secondary btn-sm">Save for later</button>
                                </div>
                            </div>
                            <div className="my-2">
                                <button className="btn btn-secondary btn-sm">See more like this</button>
                            </div>
                        </div>
                    </div>
                )
            })
            : 
            <div className="d-flex justify-content-center">
                <h3>Cart is Empty</h3>
            </div>
            }
        </div>
        <div className="col-4">
            <h6>Grand Total: <FaRupeeSign /></h6>
        </div>
        </div>
    )
}