import React, { useState } from "react";
import { useNavigate } from "react-router";
import ExtraItems from "../extraItems";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import "./style.css";
import { paths } from "../../../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCart,
  updateCart,
} from "../../../../store/reducers/cartSlice";

const PaperCard = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[16],
}));

const StyledItemPrice = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
  // Add any other styles you need for the item price here
}));

const AddToCartButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main,
  // Add any other button styles you need here
}));

const MenuCard = ({ foodItem, foodIngredients, foodPrice, foodImage, id }) => {
  const plusIcon = "/assets/img/Icon - Plus.svg";
  const minusIcon = "/assets/img/Icon-Minus.svg";
  const trashIcon = "/assets/img/Icon-Trash.svg";
  const extraItemName = "rice, plate peppers, onion, red beans, …";

  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [menuCardDropdownOpen, setMenuCardDropdownOpen] = useState(false);
  const [extraItemCount_1, setExtraItemCount_1] = useState(0);
  const [extraItemCount_2, setExtraItemCount_2] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let conditionalIcon = foodItemQuantity < 2 ? trashIcon : minusIcon;

  const handlersAndStates = [
    {
      handler: (count) => setExtraItemCount_1(count),
      state: extraItemCount_1,
    },
    {
      handler: (count) => setExtraItemCount_2(count),
      state: extraItemCount_2,
    },
    // Add more handlers and state variables as needed
  ];

  function handleClickAdd() {
    setFoodItemQuantity(foodItemQuantity + 1);

    if (foodItemQuantity === 0) {
      dispatch(
        addToCart({
          id: id,
          name: foodItem,
          price: foodPriceWithoutCurrency(),
          quantity: foodItemQuantity,
          itemIngredients: foodIngredients,
        })
      );
    }

    if (foodItemQuantity > 0) {
      dispatch(
        updateCart({
          id: id,
          quantity: foodItemQuantity + 1,
        })
      );
    }
  }

  function handleClickSubtract() {
    setFoodItemQuantity(foodItemQuantity - 1);

    if (foodItemQuantity === 1) {
      dispatch(removeFromCart(id));
    }

    if (foodItemQuantity > 1) {
      dispatch(
        updateCart({
          id: id,
          quantity: foodItemQuantity - 1,
        })
      );
    }
  }

  // const handleDropDownClick = () =>{

  // }

  // i-e KWD 1.750 => 1.750 as a number
  const foodPriceWithoutCurrency = () => {
    return Number(foodPrice.split(" ")[1]);
  };

  const checkIfItemIsInCart = () => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (itemIndex === -1) {
      return false;
    }
    return true;
  };

  const getItemQuantity = () => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (itemIndex === -1) {
      return 0;
    }
    return cart[itemIndex].quantity;
  };

  const getExtraItemName = () => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (itemIndex === -1) {
      return 0;
    }
    return cart[itemIndex].sideVariant;
  };

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
          borderRadius: "8px",

          ...(checkIfItemIsInCart() && {
            borderLeft: (theme) => `8px solid ${theme.palette.themeColor.main}`,
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
          >
            <img className="food-image" src={foodImage} alt="menu_card_image" />
          </div>
          <div
            className="menu_card_price_text_container pointer"
            onClick={() => {
              navigate(paths.details + "/" + id, {
                state: {
                  id: id,
                },
              });
            }}
          >
            <div>
              <div className="menu_card_heading_text">{foodItem}</div>
              <div className="menu_card_sub_text">{foodIngredients}</div>
            </div>
            <div className="menu_card_price_add_to_cart_container">
              <div className="menu_card_price_container">
                {/* <div className="menu_card_currency">{foodCurrency}</div> */}
                <StyledItemPrice className="menu_card_item_price">
                  <Typography
                    variant="subtitle2"
                    color="GrayText"
                    component="sup"
                    sx={{
                      mr: 0.5,
                    }}
                  >
                    KWD
                  </Typography>
                  {foodPriceWithoutCurrency()}
                </StyledItemPrice>
              </div>
            </div>
          </div>
        </Stack>

        <div
          className={`menu_card_buttons_quantity_container ${
            getItemQuantity() > 0
              ? "justify-content-between"
              : "justify-content-end"
          }`}
        >
          {getItemQuantity() > 0 && (
            <StyledItemPrice className="menu_card_qunatity_label">{`${getItemQuantity()}x`}</StyledItemPrice>
          )}
          <div className="menu_card_add_to_cart_button_container">
            <AddToCartButton
              onClick={handleClickAdd}
              className="menu_card_add_to_cart_button"
            >
              <img
                src={plusIcon}
                alt="button_icon"
                style={{ width: 16, height: 16 }}
              />
            </AddToCartButton>

            {foodItemQuantity > 0 && (
              <AddToCartButton
                onClick={handleClickSubtract}
                className="menu_card_add_to_cart_button"
              >
                <img src={conditionalIcon} alt="button_icon" />
              </AddToCartButton>
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
            {getExtraItemName().map((item, index) => {
              const { handler, state } = handlersAndStates[index];
              return (
                <ExtraItems
                  key={index}
                  extraItemName={item?.name_en}
                  extraItemCount={state}
                  setExtraItemCount={handler}
                />
              );
            })}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default MenuCard;
