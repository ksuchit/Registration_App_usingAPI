import OrdersDisplay from "./Orders-Display"

export default function Orders(props){

    return(
        <div>
            <h6 data-testid="orders">ORDERS</h6>
            {props.abc==='orders'?
             <OrdersDisplay status="Confirmed" orders={props.orders} setOrders={props.setOrders}/> : "" }
            {props.abc==='cancelledOrders' ?
             <OrdersDisplay status="Cancelled" orders={props.orders} /> : ""}
            {props.abc==='pending' ?
             <OrdersDisplay status="Pending" orders={props.orders} setOrders={props.setOrders} /> : ""}
            {props.abc==='notYetShipped' ?
             <OrdersDisplay status="Dispatched" orders={props.orders} setOrders={props.setOrders} /> : ""}
            {props.abc==='deliveredOrders' ?
             <OrdersDisplay status="Delivered" orders={props.orders} setOrders={props.setOrders}/> : ""}
        </div>
    )
}