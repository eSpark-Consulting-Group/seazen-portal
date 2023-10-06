import React from "react";
import styles from "./style.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";

const menu_categories = [
  "Burrito in a Bowl",
  "Quesadilla",
  "Burrito",
  "Sides",
  "Carne",
  "Poultry",
  "Pescheria",
  "Pasta",
  "Pizza",
  "Dessert",
  "Soft drinks",
];

const MenuItems = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleMenuItemClick = (category) => {
    // set only the category in the search params on whatever the current location is
    setSearchParams({
      category: category,
    });
  };

  return (
    <div className={`${styles.menuItemOuterContainer} px-3 px-sm-4`}>
      <div className={styles.menuItemInnerContainer}>
        <div className={styles.menuDropdownContainer}>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              className={styles.dropdownToggle}
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "10pt",
                fontWeight: "bold",
                border: "none",
                padding: "0",
              }}
            >
              <span className={styles.dropdownIconContainerMenu}>
                <img src="/assets/img/menu_Icon.svg" alt="chevron_down_icon" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "11pt",
                fontWeight: "bold",
                border: "none",
              }}
            >
              {menu_categories.map((category, index) => (
                <Dropdown.Item
                  key={`menu_category_drop_${index}`}
                  onClick={() => {
                    handleMenuItemClick(category);
                  }}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.menuItmesTextContainer}>
          {menu_categories.map((category, index) => (
            <button
              key={`menu_category_${index}`}
              onClick={() => {
                handleMenuItemClick(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
