import React, { useState } from "react";
import { useNavigate } from "react-router";
import ExtraItems from "../extraItems";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "./style.css";
import { paths } from "../../../../routes/paths";

const PaperCard = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[16],
}));

const MenuCard = ({
  foodItem,
  foodIngredients,
  foodCurrency,
  foodPrice,
  foodImage,
}) => {
  function handleClickAdd() {
    setFoodItemQuantity(foodItemQuantity + 1);
  }

  function handleClickSubtract() {
    setFoodItemQuantity(foodItemQuantity - 1);
  }

  const plusIcon = "/assets/img/Icon - Plus.svg";
  const minusIcon = "/assets/img/Icon-Minus.svg";
  const trashIcon = "/assets/img/Icon-Trash.svg";
  const extraItemName = "rice, plate peppers, onion, red beans, …";

  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [menuCardDropdownOpen, setMenuCardDropdownOpen] = useState(false);
  const [extraItemCount_1, setExtraItemCount_1] = useState(0);
  const [extraItemCount_2, setExtraItemCount_2] = useState(0);

  const navigate = useNavigate();

  let conditionalIcon = foodItemQuantity < 2 ? trashIcon : minusIcon;

  return (
    <Stack
      spacing={0}
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <Stack
        sx={{
          p: 1.5,
          width: "100%",
          position: "relative",

          ...(menuCardDropdownOpen && {
            borderLeft: "12px solid #026754",
          }),
        }}
        direction="row"
        justifyContent="space-between"
        component={PaperCard}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            minWidth: "75%",
          }}
        >
          <div
            className="menu_card_image_container pointer"
            onClick={() => {
              setMenuCardDropdownOpen(!menuCardDropdownOpen);
            }}
          >
            <img src={foodImage} alt="menu_card_image" />
          </div>
          <div
            className="menu_card_price_text_container pointer"
            onClick={() => {
              navigate(paths.details);
            }}
          >
            <div className="menu_card_heading_text">{foodItem}</div>
            <div className="menu_card_sub_text">{foodIngredients}</div>
            <div className="menu_card_price_add_to_cart_container">
              <div className="menu_card_price_container">
                <div className="menu_card_currency">{foodCurrency}</div>
                <div className="menu_card_item_price">{foodPrice}</div>
              </div>
            </div>
          </div>
        </Stack>

        <div className="menu_card_buttons_quantity_container">
          <div className="menu_card_qunatity_label">{`${foodItemQuantity}x`}</div>
          <div className="menu_card_add_to_cart_button_container">
            <button
              onClick={handleClickAdd}
              className="menu_card_add_to_cart_button"
            >
              <img src={plusIcon} alt="button_icon" />
            </button>

            {foodItemQuantity > 0 && (
              <button
                onClick={handleClickSubtract}
                className="menu_card_add_to_cart_button"
              >
                <img src={conditionalIcon} alt="button_icon" />
              </button>
            )}
          </div>
        </div>
      </Stack>
      {menuCardDropdownOpen && (
        <Stack
          spacing={1}
          sx={{
            width: "85%",
            backgroundColor: "common.white",
            p: 2,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomRightRadius: (theme) => theme.shape.borderRadius,
          }}
        >
          <Stack>
            <ExtraItems
              extraItemName={extraItemName}
              extraItemCount={extraItemCount_1}
              setExtraItemCount={setExtraItemCount_1}
            />
            <ExtraItems
              extraItemName={extraItemName}
              extraItemCount={extraItemCount_2}
              setExtraItemCount={setExtraItemCount_2}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default MenuCard;
