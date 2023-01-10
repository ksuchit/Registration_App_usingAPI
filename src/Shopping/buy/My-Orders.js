import { useState, useEffect } from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Orders from "./Orders";
import Get from "../services/Http-Service"

export default function MyOrders(){

    const [key, setKey] = useState ('orders');
    const [orders,setOrders]=useState([]);

    useEffect(()=>{

        Get('/shop/orders')
        .then((response)=>{
            console.log(response)
            setOrders(response.data.results)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <div className="row">
           <div className="col-2"></div>
           <div className="col-8">
            <div><h3>Your Orders</h3></div>
            <div className="mb-2">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab eventKey="orders" title="Orders">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                    <Tab eventKey="buyAgain" title="Buy Again">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                    <Tab eventKey="notYetShipped" title="Not Yet Shipped">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                    <Tab eventKey="cancelledOrders" title="Cancelled Orders">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                </Tabs>
            </div>
           
            </div>
        </div>
    )
}