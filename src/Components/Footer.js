import {BsPhone} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import logo from '../Images/logo.png'
import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

 const Footer = () => {
     return (
         <div style={{backgroundColor:'grey'}}>
    <CDBFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt='logo' src={logo} width="50px" />
              <span className="mx-1 h5 font-weight-bold">READER'S PALACE</span>
            </a>
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
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/"><BsPhone />8889455556</CDBFooterLink>
              <CDBFooterLink href="/"><AiOutlineMail />ksuchit5697@gmail.com</CDBFooterLink>
              <CDBFooterLink href="/"><AiOutlineMail />Cancel Order</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Quick Links
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0'}}>
              <CDBFooterLink href="/">Reseller/Bulk Order</CDBFooterLink>
              <CDBFooterLink href="/">About Us</CDBFooterLink>
              <CDBFooterLink href="/">FAQ</CDBFooterLink>
              <CDBFooterLink href="/">Contact Us</CDBFooterLink>
              <CDBFooterLink href="/">My Orders</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
            Information
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Privacy Policy</CDBFooterLink>
              <CDBFooterLink href="/">Refund Policy</CDBFooterLink>
              <CDBFooterLink href="/">Shipping Policy</CDBFooterLink>
              <CDBFooterLink href="/">Terms of Service</CDBFooterLink>
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