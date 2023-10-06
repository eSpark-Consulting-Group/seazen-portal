import React, { useState } from "react";
import { Button, Card, Rating } from "@mui/material";
import styles from "../../screens/myorder/style.module.css"; // Import the module CSS file
import RateCard from "../rate-card";

const OrderCard = ({ item, handleReorder, handleReceipt }) => {
  const [openRate, setOpenRate] = useState(false);
  const [average, setAverage] = useState(0);

  const handleRate = (val) => {
    setOpenRate(val);
  };

  const handleClose = (value) => {
    handleRate(false);
    setAverage(value);
  };

  const iconPath = `/assets/img/${item.icon}`;

  return (
    <Card style={{ border: "1px solid #C0CDD7", marginTop: "10px" }}>
      <div className={styles.cardNav}>
        <img src="/assets/img/Group 15.svg" alt="" />
        <div className={styles.cardNavTags}>
          <div
            className={styles.statusTag}
            style={{ backgroundColor: `${item.status.color}` }}
          >
            {item.status.text}
          </div>
          <Button
            sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            variant="outlined"
            className={styles.receiptTag}
            onClick={handleReceipt}
          >
            Receipt
          </Button>
        </div>
      </div>
      <hr className={styles.breakLine} />
      <div className={styles.cardContent}>
        <div className={styles.cardContentLeft}>
          <div className={styles.cardContentLeftLt}>
            <img src={iconPath} alt="" />
            <div>
              <div className={styles.cardContentLeftText}>
                {item.type} order
              </div>
              <div className={styles.cardContentLeftText}>
                Order Id : {item.orderId}
              </div>
            </div>
          </div>
          <div className={styles.cardContentLeftTextRegular}>
            Placed at {item.placeAt}
          </div>
        </div>
        <div className={styles.cardContentRight}>
          <div id={styles.cardContentRightPrice}>{item.priceTag}</div>
          <div id={styles.cardContentRightUnit}>{item.currency}</div>
        </div>
      </div>
      <div
        className={
          item.rateTag.isActive && item.reOrderTag.isActive
            ? styles.cardFooter
            : styles.cardSingleFooter
        }
      >
        {average !== 0 ? (
          <Rating name="read-only" value={average} />
        ) : (
          item.rateTag.isActive && (
            <Button
              sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
              variant="outlined"
              className={styles.cardFooterRate}
              onClick={() => handleRate(true)}
            >
              Rate
            </Button>
          )
        )}

        {item.reOrderTag.isActive && (
          <Button
            sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            variant="outlined"
            className={styles.cardFooterReorder}
            href=""
            onClick={handleReorder}
          >
            Reorder
          </Button>
        )}
      </div>
      <RateCard isVisible={openRate} handleClose={(val) => handleClose(val)} />
    </Card>
  );
};

export default OrderCard;
