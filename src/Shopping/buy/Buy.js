import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import AccordionBuy from "./Accordion-Buy";

export default function Buy(){
    const [searchParams,]=useSearchParams();
    console.log(searchParams.get('id'));
    const [buyProduct,setBuyProduct]=useState();
    const state=useSelector((state)=>state)

    useEffect(()=>{
        if(searchParams.get('id')){
            setBuyProduct(state.CartSelectItemReducer.selectedItem.find((item)=>item._id===searchParams.get('id')))
        }
        else
            setBuyProduct(state.CartSelectItemReducer.selectedItem)
     
    },[])

    console.log(buyProduct)

    return(
        <div>
            <div style={{backgroundColor:'lightgrey',padding:'10px',margin:'0px 10px'}} className='d-flex justify-content-center'>
                <h3>Checkout</h3>
            </div>
            <div className="row">
                <div className="col-2" style={{border:'1px solid black'}}>1</div>
                <div className="col-6" style={{border:'1px solid black'}}>
                    <AccordionBuy />
                </div>
                <div className="col-2" style={{border:'1px solid black'}}>1</div>
            </div>
        </div>
    )
}