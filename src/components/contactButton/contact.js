import React from 'react'
import { IoCall } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';


const ContactUs = () => {
  const phoneNumber = "18185555";
  let url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  const handleMesssage = () => {
    window.open(url);
  }




  return (
    <div className='ordercontact-section'>
      <div id='call-tag'>
        <IoCall />
        <a href='tel:18185555'>18185555</a>
      </div>
      <div id='whatsapp-tag'>
        <FaWhatsapp />
        <a href="" onClick={handleMesssage}>Send Message</a>
      </div>
    </div>
  )
}

export default ContactUs
