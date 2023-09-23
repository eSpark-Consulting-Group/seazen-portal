import React, { useState } from "react";
import { useNavigate } from "react-router";
import ExtraItems from "../extraItems";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import styles from "./style.module.css";
import { paths } from "../../../../routes/paths";

const PaperCard = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[16],
}));

const StyledItemPrice = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
  // Add any other styles you need for the item price here
}));

const AddToCartButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main,
  // Add any other button styles you need here
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
            className={`${styles.menuCardImageContainer} pointer`}
            onClick={() => {
              setMenuCardDropdownOpen(!menuCardDropdownOpen);
            }}
          >
            <img src={foodImage} alt="menu_card_image" />
          </div>
          <div
            className={`${styles.menuCardPriceTextContainer} pointer`}
            onClick={() => {
              navigate(paths.details);
            }}
          >
            <div className={styles.menuCardHeadingText}>{foodItem}</div>
            <div className={styles.menuCardSubText}>{foodIngredients}</div>
            <div className={styles.menuCardPriceAddToCartContainer}>
              <div className={styles.menuCardPriceContainer}>
                <div className={styles.menuCardCurrency}>{foodCurrency}</div>
                <StyledItemPrice className={styles.menuCardItemPrice}>
                  {foodPrice}
                </StyledItemPrice>
              </div>
            </div>
          </div>
        </Stack>

        <div className={styles.menuCardButtonsQuantityContainer}>
          <StyledItemPrice
            className={styles.menuCardQunatityLabel}
          >{`${foodItemQuantity}x`}</StyledItemPrice>
          <div className={styles.menuCardAddToCartButtonContainer}>
            <AddToCartButton
              onClick={handleClickAdd}
              className={styles.menuCardAddToCartButton}
            >
              <img src={plusIcon} alt="button_icon" />
            </AddToCartButton>

            {foodItemQuantity > 0 && (
              <AddToCartButton
                onClick={handleClickSubtract}
                className={styles.menuCardAddToCartButton}
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
