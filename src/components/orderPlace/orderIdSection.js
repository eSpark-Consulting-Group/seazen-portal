import React, { useState } from 'react'
import '../../screens/order/style.css'

const OrderIdSection = () => {
  const [orderId, setOrderId] = useState("KSE23-070400");

  const handleViewReceipt = () => {
    alert("Recept");
  }


  return (
    <div className='order-id-section'>
      <p id='order-id-text'>Order ID</p>
      <div className='orderid-with-tag'>
        <p>{orderId}</p>
        <div id='order-id-tag'><a href='' onClick={handleViewReceipt}>View Receipt</a></div>
      </div>
    </div>
  )
}

export default OrderIdSection
