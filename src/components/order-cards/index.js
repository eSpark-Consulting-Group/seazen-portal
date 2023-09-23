import React, { useState } from 'react'
import { Button, Card, Rating } from '@mui/material';
import styles from '../../screens/myorder/style.module.css'
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

    const iconPath = `/assets/img/${item.icon}`;

    return (
        <Card style={{ border: "1px solid #C0CDD7", marginTop: "10px" }} >
            <div className={`${styles.card_nav}`}>
                <img src="/assets/img/Group 15.svg" alt="" />
                <div className={`${styles.card_nav_tags}`}>
                    <div className={`${styles.status_tag}`} style={{ backgroundColor: `${item.status.color}` }}>{item.status.text}</div>
                    <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className={`${styles.receipt_tag}`} onClick={handleReceipt}>Receipt</Button>
                </div>
            </div>
            <hr className={`${styles.break_line}`} />
            <div className={`${styles.card_content}`}>
                <div className={`${styles.card_content_left}`}>
                    <div className={`${styles.card_content_left_lt}`}>
                        <img src={iconPath} alt="" />
                        <div>
                            <div className={`${styles.card_content_left_text}`}>{item.type} order</div>
                            <div className={`${styles.card_content_left_text}`}>Order Id : {item.orderId}</div>
                        </div>
                    </div>
                    <div className={`${styles.card_content_left_text_regular}`}>Placed at {item.placeAt}</div>
                </div>
                <div className={`${styles.card_content_right}`}>
                    <div id={`${styles.card_content_right_price}`}>{item.priceTag}</div>
                    <div id={`${styles.card_content_right_unit}`}>{item.currency}</div>
                </div>
            </div>
            <div className={item.rateTag.isActive && item.reOrderTag.isActive ? `${styles.card_footer}` : `${styles.card_single_footer}`}>
                {average!==0 
                ? <Rating name="read-only" value={average}/> 
                : item.rateTag.isActive && <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className={`${styles.card_footer_rate}`} onClick={() => handleRate(true)}>Rate</Button>}
                               
                {item.reOrderTag.isActive && <Button sx={{ p: 1, border: ' 1px solid #C0CDD7', color: '#40484E' }} variant='outlined' className={`${styles.card_footer_reorder}`} href='' onClick={handleReorder}>Reorder</Button>}
            </div>
            <RateCard isVisible={openRate} handleClose={(val)=>handleClose(val)} />
        </Card>
    )
}

export default OrderCard;
