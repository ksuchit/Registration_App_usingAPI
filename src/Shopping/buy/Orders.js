import OrdersDisplay from "./Orders-Display"

export default function Orders(props){

    return(
        <div>
            {props.abc==='orders'?
             <OrdersDisplay status="Confirmed" orders={props.orders}/> : "" }
            {props.abc==='cancelledOrders' ?
             <OrdersDisplay status="Cancelled" orders={props.orders} /> : ""}
            {props.abc==='pending' ?
             <OrdersDisplay status="Pending" orders={props.orders}/> : ""}
        </div>
    )
}