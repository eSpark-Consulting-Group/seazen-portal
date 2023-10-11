import React from "react";
import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, Box } from "@mui/material";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (category) => {
    // set only the category in the search params on whatever the current location is
    setSearchParams({
      category: category,
    });
  };

  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  const scrollToElement = (id, index) => {
    if (index || index == 0) {
      setValue(index);
    }
    const container = document.getElementById(id);
    container.scrollIntoView({ behavior: "smooth" });
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
                maxHeight: "150px",
                overflowY: "scroll",
                borderRadius: "0 0 16px 16px",
                position:"static",
              }}
            >
              {!isEmpty(itemCategoryList)
                ? itemCategoryList?.map((category, index) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => {
                        scrollToElement(category?.id, index);
                      }}
                    >
                      {category?.name_en}
                    </Dropdown.Item>
                  ))
                : menu_categories.map((category, index) => (
                    <Dropdown.Item
                      key={`menu_category_drop_${index}`}
                      onClick={() => {
                        scrollToElement(category.id, index);
                      }}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="menu_itmes_text_container">
          {/* {!isEmpty(itemCategoryList)
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
              ))} */}

          <Box
            sx={{
              maxWidth: { xs: "100%", sm: 480 },
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              textColor="black"
              // indicatorColor="black"
              aria-label="scrollable prevent tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: restaurantTheme?.main },
              }}
              sx={{
                "& .MuiButtonBase-root": {
                  textTransform: "none",
                  minWidth: "60px",
                },
              }}
            >
              {itemCategoryList?.map((val) => {
                return (
                  <Tab
                    onClick={() => scrollToElement(val.id)}
                    key={val.id}
                    label={
                      val.name_en.charAt(0).toUpperCase() +
                      val.name_en.slice(1).toLowerCase()
                    }
                  />
                );
              })}
            </Tabs>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
