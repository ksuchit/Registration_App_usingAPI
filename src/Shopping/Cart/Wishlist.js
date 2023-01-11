import { useSelector } from "react-redux"


export default function Wishlist(){

    const state=useSelector((state)=> state)
    return(
        <div>
            <h4>Wishlist</h4>
        </div>
    )
}