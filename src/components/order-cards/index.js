import React, { useState } from 'react'
import { Button, Card, Rating } from '@mui/material';
import '../../screens/order/style.css'
import RateCard from '../rate-card';


const OrderCard = ({ item, handleReorder, handleReceipt }) => {

    const [openRate, setOpenRate] = useState(false);
    const [average, setAverage] = useState(0)

    const handleRate = (val) => {
        setOpenRate(val)
    }

    const handleClose= (value)=>{
        handleRate(false);
        setAverage(value);
    }

    const iconPath = `./assets/img/${item.icon}`;

    return (
        <Card style={{ border: "1px solid #C0CDD7", marginTop: "10px" }} >
            <div className='card-nav'>
                <img src="./assets/img/Group 15.svg" alt="" />
                <div className='card-nav-tags'>
                    <div className='status-tag' style={{ backgroundColor: `${item.status.color}` }}><p>{item.status.text}</p></div>
                    <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className='receipt-tag' onClick={handleReceipt}>Receipt</Button>
                </div>
            </div>
            <hr className='break-line' />
            <div className='card-content'>
                <div className='card-content-left'>
                    <div className='card-content-left-lt'>
                        <img src={iconPath} alt="" />
                        <div>
                            <div className='card-content-left-text'>{item.type} order</div>
                            <div className='card-content-left-text'>Order Id : {item.orderId}</div>
                        </div>
                    </div>
                    <div className='card-content-left-text-regular'>Placed at {item.placeAt}</div>
                </div>
                <div className='card-content-right'>
                    <div id='card-content-right-price'>{item.priceTag}</div>
                    <div id='card-content-right-unit'>{item.currency}</div>
                </div>
            </div>
            <div className={item.rateTag.isActive && item.reOrderTag.isActive ? 'card-footer' : "card-single-footer"}>
                {average!==0 
                ? <Rating name="read-only" value={average}/> 
                : item.rateTag.isActive && <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className='card-footer-rate' onClick={() => handleRate(true)}>Rate</Button>}
                               
                {item.reOrderTag.isActive && <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className='card-footer-reorder' href='' onClick={handleReorder}>Reorder</Button>}
            </div>
            <RateCard isVisible={openRate} handleClose={(val)=>handleClose(val)} />
        </Card>
    )
}

export default OrderCard;
