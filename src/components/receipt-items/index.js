import React, { useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Box, Skeleton, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import "../../screens/receipt/style.css";

const ReceiptItem = ({ item, currency_code }) => {
  const [imageNotFound, setImageNotFound] = useState(false);

  const onImageError = () => {
    setImageNotFound(true);
  };

  const capitalizedTextFunc = (text) => {
    const capitalizedText = text
      .toLowerCase()
      .replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase();
      });

    return capitalizedText;
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
        <div className="items-div">
          <span>{`${item.menu_item.name_en} x (${item.quantity})`}</span>
          <span className="second-span">{`${currency_code} ${Number(
            item.unit_price * item.quantity
          ).toFixed(3)}`}</span>
        </div>

        {item?.custom_variant?.length
          ? item?.custom_variant?.map((item) => (
              <div key={item.option_id} className="items-div">
                <span
                  className="first-span"
                  key={item?.name_en}
                >{`${capitalizedTextFunc(item?.name_en)} x (${
                  item?.option_quantity
                })`}</span>

                <span className="second-span" key={item?.name_en}>
                  {`${currency_code} ${Number(
                    item.unit_price * item.option_quantity
                  ).toFixed(3)}`}
                </span>
              </div>
            ))
          : null}
      </div>

      <div></div>
    </div>
  );
};

export default ReceiptItem;
