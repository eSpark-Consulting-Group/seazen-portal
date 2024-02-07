import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { Tab, Tabs, Box } from "@mui/material";

import { isEmpty } from "lodash";

import "./style.css";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  const visibleCategoryElementID = useSelector(
    (state) => state.resturants.visibleCategoryElementID
  );
  const scrollToElement = (id, index) => {
    if (index || index === 0) {
      setValue(index);
    }

    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    setValue(parseInt(visibleCategoryElementID - 1));
  }, [visibleCategoryElementID]);

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
                width: "100%",
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
                scrollbarWidth: "none",
                borderRadius: "0 0 16px 16px",
                position: "static",
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
          <Box
            sx={{
              maxWidth: { xs: "100%" },
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={value === -1 ? value + 1 : value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={true}
              textColor="black"
              aria-label="scrollable prevent tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: restaurantTheme?.main },
              }}
              sx={{
                "& .MuiButtonBase-root": {
                  textTransform: "none",
                  minWidth: "0px",
                  marginRight: "12px",
                },
              }}
            >
              {itemCategoryList?.map((val, index) => {
                return (
                  <Tab
                    onClick={() => scrollToElement(index + 1)}
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
