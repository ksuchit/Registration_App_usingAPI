import { useState, useEffect } from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Orders from "./Orders";
import Get from "../services/Http-Service"
import Pagination from '../Home/Pagination'
import { NavLink } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
export default function MyOrders(){

    const [key, setKey] = useState ('orders');
    const [orders,setOrders]=useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages,setTotalPages]=useState();
    const [itemPerPage, setItemPerPage] = useState(10);
    
    useEffect(()=>{

        Get(`/shop/orders?limit=${itemPerPage}&page=${pageNum}`)
        .then((response)=>{
            console.log(response)
            setOrders(response.data.results)
            setTotalPages(response.data.totalPages)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[pageNum,itemPerPage])

    return(
        <div className="row">
           <div className="col-2"></div>
            <div className="col-8">
            <div style={{paddingBottom:'10px'}}>
                        <NavLink to={'/home'} style={{textDecoration:'none'}}>home</NavLink><FaGreaterThan size={10} className='mx-1'/>
                        <NavLink to={'/orders'} style={{textDecoration:'none',color:'#c45500'}}>Your Orders</NavLink>
                    </div>
            <div><h3>Your Orders</h3></div>
            <div className="mb-2">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab eventKey="orders" title="Orders">
                        <Orders abc={key} orders={orders} setOrders={setOrders} />
                    </Tab>
                    <Tab eventKey="pending" title="Pending">
                        <Orders abc={key} orders={orders} setOrders={setOrders}/>
                    </Tab>
                    <Tab eventKey="notYetShipped" title="Not Yet Shipped">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                    <Tab eventKey="cancelledOrders" title="Cancelled Orders">
                        <Orders abc={key} orders={orders}/>
                    </Tab>
                </Tabs>
                </div>
                <div>
                    <Pagination
                        pageNum={pageNum}
                        setPageNum={setPageNum}
                        totalPages={totalPages}
                        itemPerPage={itemPerPage}
                    />
                </div>
            </div>
        </div>
    )
}