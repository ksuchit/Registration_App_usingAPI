import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';

function ControlledTabs() {
  const [key, setKey] = useState('orders');
  const navigate=useNavigate();
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="orders" title="Orders">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="buyAgain" title="Buy Again">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="notYetShipped" title="Not Yet Shipped">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="cancelledOrders" title="Cancelled Orders">
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;