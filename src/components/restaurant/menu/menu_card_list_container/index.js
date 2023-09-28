import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuCard from "../menu_card/index.js";
import "./style.css";
import { paths } from "../../../../routes/paths.jsx";
import { useSelector } from "react-redux";

const MenuCardListContainer = () => {
  const navigate = useNavigate();
  const cartTotal = useSelector((state) => state.cart.total);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );

  // const itemQuantity= useSelector((state) => state.)
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div>
      <div className="menu_card_list_outer_container px-3 px-sm-4 pt-3 pt-sm-4 pb-5">
        <div className="menu_card_list_inner_container">
          <div
            className={`card_list_title_search_container ${
              isSearchOpen ? "expanded_search" : ""
            }`}
          >
            <div className="card_list_title">
              {searchParams.get("category") || "Burrito in a Bowl"}
            </div>
            <div className={`search ${isSearchOpen ? "expanded_search" : ""}`}>
              <div
                className={`searchwrapper ${
                  isSearchOpen ? "expanded_search" : ""
                }`}
              >
                <img
                  src="/assets/img/Icon - Search.svg"
                  alt="search_icon"
                  className="searchicon"
                  onClick={toggleSearch}
                />
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Search"
                    className={`searchbar ${
                      isSearchOpen ? "expanded_search" : ""
                    }`}
                  />
                )}
              </div>
            </div>
          </div>

          <Stack spacing={1.5}>
            {categoryList?.map((item, index) => (
              <MenuCard
                key={index}
                foodItem={item.name_en}
                foodIngredients={item.description_en}
                foodPrice={item.price}
                foodImage={item.image}
                id={item.id}
              />
            ))}
          </Stack>

          {/* <div className="comment_button_container">
          <button>
            <img src="/assets/img/comment_icon.svg" alt="comment_icon" />
          </button>
        </div> */}
        </div>
      </div>
      <Box
        sx={{
          cursor: "pointer",
          bottom: 0,
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTopLeftRadius: (theme) => theme.spacing(2),
          borderTopRightRadius: (theme) => theme.spacing(2),
          backgroundColor: (theme) => theme.palette.themeColor.main,
        }}
        onClick={() => {
          navigate(paths.cart);
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              py: 0.5,
              px: 2,
              borderRadius: 1,
              backgroundColor: (theme) => theme.palette.themeColor.light,
            }}
          >
            0
          </Box>
          <Typography>Your Cart</Typography>
        </Stack>

        <Box
          sx={{
            py: 0.5,
            px: 2,
            borderRadius: 1,
            backgroundColor: (theme) => theme.palette.themeColor.light,
          }}
        >
          KWD {Number(cartTotal).toFixed(2) || Number(0).toFixed(2)}
        </Box>
      </Box>
    </div>
  );
};

export default MenuCardListContainer;
