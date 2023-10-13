import React, { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import "../../screens/receipt/style.css";

const ReceiptItem = ({ item, currency_code }) => {
  const [imageNotFound, setImageNotFound] = useState(false);

  const onImageError = () => {
    setImageNotFound(true);
  };
  return (
    <div className="receipt-items">
      {imageNotFound ? (
        <Box
          sx={{
            width: 100,
            height: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "common.white",
            borderRadius: "8px",
          }}
        >
          <ImageNotSupportedIcon fontSize="large"></ImageNotSupportedIcon>

          <Typography variant="caption">No Image Found</Typography>
        </Box>
      ) : (
        <LazyLoadImage
          className="food-image"
          src={item.menu_item.image}
          alt="menu_card_image"
          onError={onImageError}
          effect="blur"
          placeholder={
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: "grey.100" }}
              width={100}
              height={100}
            />
          }
        />
      )}
      <div className="receipt-items-name">
        {`${item.menu_item.name_en} x (${item.quantity})`}
      </div>
      <div className="receipt-items-price">
        {`${currency_code} ${Number(item.unit_price).toFixed(3)}`}
      </div>
    </div>
  );
};

export default ReceiptItem;
