import {BsPhone} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import logo from '../images/logo.png'
import React from 'react';
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import { NavLink } from 'react-router-dom';

 const Footer = () => {
     return (
         <div style={{backgroundColor:'grey'}}>
    <CDBFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <NavLink to="/" className="d-flex align-items-center p-0 text-dark" >
              <img alt='logo' src={logo} width="50px" />
              <span className="mx-1 h5 font-weight-bold">READER'S PALACE</span>
            </NavLink>
            <p className="my-3" style={{ width: '250px' }}>
              We have All types of Books which will Change the Life of Readers
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Get In Touch
            </p>
            <CDBBox className='d-flex flex-column' style={{ cursor: 'pointer', padding: '0' }}>
              <NavLink to="/"><BsPhone />8889455556</NavLink>
              <NavLink to="/"><AiOutlineMail />ksuchit5697@gmail.com</NavLink>
              <NavLink to="/"><AiOutlineMail />Cancel Order</NavLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Quick Links
            </p>
            <CDBBox className='d-flex flex-column' style={{ cursor: 'pointer', padding: '0'}}>
              <NavLink to="/">Reseller/Bulk Order</NavLink>
              <NavLink to="/">About Us</NavLink>
              <NavLink to="/">FAQ</NavLink>
              <NavLink to="/">Contact Us</NavLink>
              <NavLink to="/">My Orders</NavLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Information
            </p>
            <CDBBox className='d-flex flex-column' style={{ cursor: 'pointer', padding: '0' }}>
              <NavLink to="/">Privacy Policy</NavLink>
              <NavLink to="/">Refund Policy</NavLink>
              <NavLink to="/">Shipping Policy</NavLink>
              <NavLink to="/">Terms of Service</NavLink>
            </CDBBox>
            </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">&copy; READER'S PALACE, 2020. All rights reserved.</small>
      </CDBBox>
    </CDBFooter>
    </div>
  );
 };

export default Footer;