import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import ImgCarousal from "../Home/ImgCarousal";


export default function Cart() {

    const state = useSelector((state) => state);
    console.log(state.cartReducer.cart)
    
    return (
        <div className="d-flex">
            {state.cartReducer.cart.map((item,i) => {
                return (
                    <div key={i}>
                        <ImgCarousal imgData={item.item.images} />
                        <h6 className="py-1 mb-0">{item.item.name.length>25 ? `${item.item.name.slice(0,25)} ...`: item.item.name}</h6>
                        <div>
                            <p className='fw-bolder mb-0' > <FaRupeeSign />{item.item.price}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}