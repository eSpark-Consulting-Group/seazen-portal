import React from "react";
import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";

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

const MenuItems = ({ itemCategoryList }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleMenuItemClick = (category) => {
    // set only the category in the search params on whatever the current location is
    setSearchParams({
      category: category,
    });
  };

  return (
    <div className="menu_item_outer_container px-3 px-sm-4">
      <div className="menu_item_inner_container">
        <div className="menu_dropdown_container">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
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
              <div className="dropdown_icon_container_menu">
                <img src="/assets/img/menu_Icon.svg" alt="chevron_down_icon" />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "14px",
                fontWeight: "bold",
                border: "none",
                maxHeight: "300px",
                overflowY: "scroll",
                marginTop:"12px",
                borderRadius:"0 0 16px 16px"
              }}
            >
              {!isEmpty(itemCategoryList)
                ? itemCategoryList?.map((category, index) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => {
                        handleMenuItemClick(category?.id);
                      }}
                    >
                      {category?.name_en}
                    </Dropdown.Item>
                  ))
                : menu_categories.map((category, index) => (
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
        <div className="menu_itmes_text_container">
          {!isEmpty(itemCategoryList)
            ? itemCategoryList?.map((category, index) => (
                <button
                  style={{ color: "black" }}
                  key={category?.id}
                  onClick={() => {
                    handleMenuItemClick(category?.id);
                  }}
                >
                  {category?.name_en}
                </button>
              ))
            : menu_categories.map((category, index) => (
                <button
                  style={{ color: "black" }}
                  key={index}
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
