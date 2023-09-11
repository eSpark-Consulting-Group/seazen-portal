import React, { useEffect, useState } from 'react'
import './style.css'
import ContactUs from '../../components/contactButton/contact';
import CloseButton from '../../components/orderPlace/closeButton';
import HeaderSection from '../../components/orderPlace/headerSection';
import UpdateSection from '../../components/orderPlace/timeUpdateSection';
import AddressSection from '../../components/orderPlace/addressSection';
import OrderIdSection from '../../components/orderPlace/orderIdSection';
import FooterSection from '../../components/footer/footerTextBox/footerSection';


const OrderScreen = () => {
  const [progress, setProgress] = useState([{ done: true }, { done: false }, { done: false }, { done: false }]);

  const [updateStatus, setUpdateStatus] = useState([{ tag: "Submitted", text: "Confirming your order", tagColor: "#F7B500" },
  { tag: "Preparing", text: "Preparing your order", tagColor: "#0091FF" },
  { tag: "On the way", text: "Driver is on the way", tagColor: "#6236FF" },
  { tag: "Delivered", text: "Your order is delivered", tagColor: "#4E948A" }])

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 4) StartProgress();
  }, [count])


  const StartProgress = () => {
    setTimeout(() => {
      if (count < progress.length - 1) {
        const updateProgress = [...progress];
        updateProgress[count + 1].done = true;
        setCount(count + 1);
        setProgress(updateProgress);
      }
    }, 3000);
  }

  return (
    <div className='order-screen'>
      <CloseButton />
      <HeaderSection />
      <UpdateSection />

      <div className='order-progress-bar'>
        {progress.map((stage, index) => {
          return <div key={index} style={{ backgroundColor: stage.done ? "#BEC2C7" : '#DCDFE3' }} className='progress-bar'></div>
        })}
      </div >

      <div className='order-status'>
        <div id='order-status-tag' style={{ backgroundColor: updateStatus[count].tagColor }}><p>{updateStatus[count].tag}</p></div>
        <div><p id='confirm-text'> {updateStatus[count].text}</p></div>
      </div>

      <AddressSection />
      <OrderIdSection />
      <ContactUs />
      <FooterSection />
    </div>
  )
}

export default OrderScreen
