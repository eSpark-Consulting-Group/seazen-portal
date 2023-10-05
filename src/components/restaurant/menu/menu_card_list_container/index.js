import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuCard from "../menu_card/index.js";
import "./style.css";
import { paths } from "../../../../routes/paths.jsx";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { resetCart } from "../../../../store/reducers/cartSlice.js";
import InfiniteScroll from "react-infinite-scroll-component";

const MenuCardListContainer = () => {
  const navigate = useNavigate();
  const originalCartTotal = useSelector((state) => state.cart.total);
  const cartTotal = originalCartTotal < 0 ? 0 : originalCartTotal;
  const cartTotalItems = useSelector((state) => state.cart.totalQuantity);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showList, setShowList] = useState([]);
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );
  const dispatch = useDispatch();
  // const itemQuantity= useSelector((state) => state.)
  useEffect(()=>{
    if(cartTotalItems === 0){
      dispatch(resetCart());
    }
  },[cartTotalItems])

  useEffect(()=>{
    // console.log(categoryList?.slice(0, 10), "categoryList?.slice(0, 10)")
    setShowList(categoryList?.slice(0, 10))
  },[categoryList])
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const getCategoryName = () => {
    let category = searchParams.get("category");
    if (category) {
      return categoryList?.find((item) => item.id === category)?.name_en;
    }
    return "All";
  };

  const fetchMoreData = () => {
    const currentLength = showList?.length;
    const newItems = categoryList.slice(currentLength, currentLength + 10);
    setShowList([...showList, ...newItems]);
    console.log(newItems,"fetchMoreData")
  }

  return (
    <div className="scrollable-container-wrapper">
      <div className="scrollable-container" id="scrollableDiv">
        <div className="menu_card_list_outer_container px-3 px-sm-4 pt-3 pt-sm-4 pb-5">
          <div className="menu_card_list_inner_container">
            <div
              className={`card_list_title_search_container ${
                isSearchOpen ? "expanded_search" : ""
              }`}
            >
              <div className="card_list_title">{getCategoryName()}</div>
              <div
                className={`search ${isSearchOpen ? "expanded_search" : ""}`}
              >
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
            <>
              {!categoryList && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0px !important",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <Stack spacing={1.5}>
                <InfiniteScroll
                  dataLength={showList?.length}
                  next={fetchMoreData}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                  scrollThreshold={0.9}
                  scrollableTarget="scrollableDiv"
                >
                {showList?.map((item, index) => (
                  <MenuCard
                    key={index}
                    foodItem={item.name_en}
                    foodIngredients={item.description_en}
                    foodPrice={item.price}
                    foodImage={item.image}
                    id={item.id}
                    showSubTractButton={
                      item.has_extras === false && item.has_options === false
                    }
                  />
                ))}
                </InfiniteScroll>
              </Stack>
            </>

            {/* <div className="comment_button_container">
          <button>
            <img src="/assets/img/comment_icon.svg" alt="comment_icon" />
          </button>
        </div> */}
          </div>
        </div>
        <Box
          sx={{
            position: "fixed",
            cursor: "pointer",
            bottom: 0,
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "375px",
            borderTopLeftRadius: (theme) => theme.spacing(2),
            borderTopRightRadius: (theme) => theme.spacing(2),
            backgroundColor: (theme) => theme.palette.themeColor.main,
            "@media (max-width: 600px)": {
              maxWidth: "100%",
            },
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
              {cartTotalItems}
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
    </div>
  );
};

export default MenuCardListContainer;
