import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import styles from "./style.module.css";
import { paths } from "../../../routes/paths";

const PaperCard = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[17],
}));

const MenuCardItem = ({
  item: {
    id,
    resturant,
    name,
    foodIngredients,
    foodCurrency,
    foodPrice,
    foodImage,
    category: { color },
  },
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Forward");
  };
  const chevronIcon = "/assets/img/Icon - Chevron.svg";

  return (
    <Stack
      spacing={0}
      alignItems="center"
      onClick={() => {
        navigate(
          paths.details,
          navigate(paths.details, {
            state: {
              id: id,
            },
          })
        );
      }}
      sx={{
        width: "100%",
        padding: "2% 5%",
      }}
    >
      <Stack
        sx={{
          p: 2,
          position: "relative",
        }}
        direction="row"
        justifyContent="space-between"
        component={PaperCard}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            minWidth: "75%",
          }}
        >
          <div className={`${styles.menu_card_image_container} pointer`}>
            <img
              src={foodImage}
              alt="menu_card_image"
              style={{ width: "100px", height: "100px" }}
            />
          </div>

          <div className={`${styles.menu_card_price_text_container} pointer`}>
            <img
              src={resturant}
              alt=""
              className={`${styles.menu_card_resturant_img}`}
            />
            <div className={`${styles.menu_card_name}`}>{name}</div>
            <div className={`${styles.menu_card_sub_text}`}>
              {foodIngredients}
            </div>
            <div className={`${styles.menu_card_price_add_to_cart_container}`}>
              <div className={`${styles.menu_card_price_container}`}>
                <div
                  className={`${styles.menu_card_currency}`}
                  style={{ color: `${color}` }}
                >
                  {foodCurrency}
                </div>
                <div
                  className={`${styles.menu_card_item_price}`}
                  style={{ color: `${color}` }}
                >
                  {foodPrice}
                </div>
              </div>
            </div>
          </div>
        </Stack>

        <div className={`${styles.menu_card_add_to_cart_button_container}`}>
          <button
            className={`${styles.menu_card_add_to_cart_button}`}
            style={{ backgroundColor: `${color}` }}
            onClick={handleClick}
          >
            <img src={chevronIcon} alt="button_icon" />
          </button>
        </div>
      </Stack>
    </Stack>
  );
};

export default MenuCardItem;
