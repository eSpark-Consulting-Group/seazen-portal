import { useState } from "react";
import "./style.css";

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

  const plusIcon = "./assets/img/Icon - Plus.svg";
  const minusIcon = "./assets/img/Icon-Minus.svg";
  const trashIcon = "./assets/img/Icon-Trash.svg";

  const [foodItemQuantity, setFoodItemQuantity] = useState(0);

  let conditionalIcon = foodItemQuantity < 2 ? trashIcon : minusIcon;

  if (foodItemQuantity < 1) {
    return (
      <div className="menu_card_outer_container">
        <div className="menu_card_inner_container">
          <div className="menu_card_image_container">
            <img src={foodImage} alt="menu_card_image" />
          </div>
          <div className="menu_card_price_text_container">
            <div className="menu_card_heading_text">{foodItem}</div>
            <div className="menu_card_sub_text">{foodIngredients}</div>
            <div className="menu_card_price_add_to_cart_container">
              <div className="menu_card_price_container">
                <div className="menu_card_currency">{foodCurrency}</div>
                <div className="menu_card_item_price">{foodPrice}</div>
              </div>
            </div>
          </div>
          <div className="menu_card_buttons_quantity_container">
            <div className="menu_card_add_to_cart_button_container">
              <button
                onClick={handleClickAdd}
                className="menu_card_add_to_cart_button"
              >
                <img src={plusIcon} alt="button_icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="menu_card_outer_container">
        <div className="menu_card_active_indicator"></div>
        <div className="menu_card_inner_container">
          <div className="menu_card_image_container">
            <img src={foodImage} alt="menu_card_image" />
          </div>
          <div className="menu_card_price_text_container">
            <div className="menu_card_heading_text">{foodItem}</div>
            <div className="menu_card_sub_text">{foodIngredients}</div>
            <div className="menu_card_price_add_to_cart_container">
              <div className="menu_card_price_container">
                <div className="menu_card_currency">{foodCurrency}</div>
                <div className="menu_card_item_price">{foodPrice}</div>
              </div>
            </div>
          </div>
          <div className="menu_card_buttons_quantity_container_active">
            <div className="menu_card_qunatity_label">{`${foodItemQuantity}x`}</div>
            <div className="menu_card_add_to_cart_button_container">
              <button
                onClick={handleClickAdd}
                className="menu_card_add_to_cart_button"
              >
                <img src={plusIcon} alt="button_icon" />
              </button>
              <button
                onClick={handleClickSubtract}
                className="menu_card_add_to_cart_button"
              >
                <img src={conditionalIcon} alt="button_icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MenuCard;
