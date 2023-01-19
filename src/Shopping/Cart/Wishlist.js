import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImgCarousal from "../Home/Img-Carousal";
import { addItemToCart } from "../redux/actions/Cart-Actions";
import { addToFavorite, removeFromFavorite } from "../redux/actions/Favorite-Action";

export default function Wishlist(){

  const navigate = useNavigate();
  const state = useSelector((state) => state) || JSON.stringify(localStorage.getItem('store'));
    const dispatch = useDispatch();
    console.log(state)
    const [products, setProducts] = useState();

    useEffect(() => {
        setProducts(state.FavoriteReducer.favorite)
    }, [state.FavoriteReducer.favorite.length])
    
    const addingItemToCart = (item) => {

        item.quantity = 1;
        item.subTotal=item.quantity * item.price
        dispatch(addItemToCart(item));
    }

    const onRemoveFromFavorite = (item) => {
        console.log(item)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove from WishList!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
              if (result.isConfirmed) {
                dispatch(removeFromFavorite(item))
                
              Swal.fire(
                'Deleted!',
                'Your Product has been Removed from wishList.',
                'success'
              )
            }
          })
        
    }

    return(
        <div>
        <div className="productImages my-5">
        {products && products.length>0 ?
        products.map((item, i) => {
          return (
            <div key={i} className='productCard'>
              {/* <div> */}
              <div className='position-relative'>
                <ImgCarousal imgData={item} />
                <div className="position-absolute top-0 end-0">
                  {state.FavoriteReducer.favorite.find((data)=>data._id===item._id) ?
                  <button onClick={()=>onRemoveFromFavorite(item)} style={{border:'none',borderRadius:'100%'}}><FcLike size={20}/></button>
                  : <button onClick={()=>dispatch(addToFavorite(item))} style={{border:'none',borderRadius:'100%'}}><MdOutlineFavoriteBorder size={20} /></button>
                  }
                </div>
              </div>
              <div className="text-center">
                <h6 className="py-1 mb-0 fw-bolder">{item.name.length>25 ? `${item.name.slice(0,25)} ...`: item.name}</h6>
                <p className='fw-bolder mb-0' style={{color:'rgb(196, 85, 0)'}} > <FaRupeeSign />{item.price}</p>
              </div>
              <div className="mb-0 d-flex justify-content-center">
                {/* state.cartReducer.cart its used because state refreses when we come back to home page from anywhere   */}
                {
                  state.cartReducer.cart.find((prev)=>prev._id===item._id) ?
                    <button onClick={()=>navigate(`/cart?id=${item._id}`)} className="btn btn-primary btn-sm">Go to Cart</button>
                    : 
                    <button className="btn btn-warning btn-sm"
                      onClick={()=>addingItemToCart(item)}>Add to Cart</button>
                }
                <button className="btn btn-dark mx-2" onClick={()=>navigate('/buy')} >Buy</button>
              </div>
            </div>
          );
        })
      :<p style={{color:'red'}}>No data Found</p>
      }
      </div>
        </div>
    )
}