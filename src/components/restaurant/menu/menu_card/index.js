import "./style.css";

const MenuCard = () => {
  function handleClick() {}

  return (
    <div className="menu_card_outer_container">
      <div className="menu_card_inner_container">
        <div className="menu_card_image_container">
          <img src=".\assets\img\menu_card_image.png" alt="menu_card_image" />
        </div>
        <div className="menu_card_price_text_container">
          <div className="menu_card_heading_text">
            Burrito Vegetarian in a Bowl (450 g)
          </div>
          <div className="menu_card_sub_text">
            rice, plate peppers, onion, red beans, …
          </div>
          <div className="menu_card_price_add_to_cart_container">
            <div className="menu_card_price_container">
              <div className="menu_card_currency">KWD</div>
              <div className="menu_card_item_price">6.990</div>
            </div>
            <div className="menu_card_add_to_cart_button_container">
              <button
                onClick={handleClick}
                className="menu_card_add_to_cart_button"
              >
                <img src=".\assets\img\Icon - Plus.svg" alt="button_icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
