import React from 'react'
import '../../screens/order/style.css'



const FooterSection = () => {

  const handleMessage = () => {
    prompt("Enter message");
  }

  return (
    <div className='footer-section'>
      <a href="" onClick={handleMessage}>
        <img src="/assets/img/message.png" alt="" />
      </a>
    </div>
  )
}

export default FooterSection
