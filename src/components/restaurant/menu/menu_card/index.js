import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import ExtraItems from "../extraItems";
import { v4 as uuidv4 } from "uuid";
import { paths } from "../../../../routes/paths";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  addToCart,
  removeFromCart,
  resetCart,
  updateCartMenuItemQuantity,
} from "../../../../store/reducers/cartSlice";
import "./style.css";
import clearCart from "../../../../api/cart/clearCart";
import addToCartApiCall from "../../../../api/cart/addToCart";
import { getDistanceFromLatLonInKm } from "../../../../utils/getAddress";

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

const MenuCard = (props) => {
  const {
    foodItem,
    foodIngredients,
    foodPrice,
    foodImage,
    id,
    restaurant_id,
    showSubTractButton,
    allData,
    locationDeliver,
    restaurantBranchHours,
    resturantId,
    restaurantDetail,
    setOpenModal,
    setSelectedItemToDeliver,
  } = props;

  const plusIcon = "/assets/img/Icon - Plus.svg";
  const minusIcon = "/assets/img/Icon-Minus.svg";
  const trashIcon = "/assets/img/Icon-Trash.svg";
  const extraItemName = "rice, plate peppers, onion, red beans, …";

  const token = localStorage.getItem("token");

  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [menuCardDropdownOpen, setMenuCardDropdownOpen] = useState(false);
  const [extraItemCount_1, setExtraItemCount_1] = useState(0);
  const [extraItemCount_2, setExtraItemCount_2] = useState(0);
  const [menuItemsVariances, setMenuItemsVariances] = useState([]);

  const [imageNotFound, setImageNotFound] = useState(false);
  const [farAway, setFarAway] = useState(true);

  const onImageError = () => {
    setImageNotFound(true);
  };
  const hasVariant = !!allData?.variants?.length;

  const cart = useSelector((state) => state.cart.cart);
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );

  useEffect(() => {
    const quantity = getItemQuantity();
    setFoodItemQuantity(quantity);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // i-e KWD 1.750 => 1.750 as a number
  const foodPriceWithoutCurrency = () => {
    return Number(foodPrice.split(" ")[1]).toFixed(3);
  };

  const checkIfItemIsInCart = () => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === id);

    if (itemIndex === -1) {
      return false;
    }
    return true;
  };

  const clearCartItems = () => {
    dispatch(resetCart());
    clearCart(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let itemsProcessed = 0;

  const watchBranchHoursBeforeAdd = (id) => {
    restaurantBranchHours?.data?.forEach((res, _, array) => {
      const resLat = +res.latitude;
      const resLng = +res.longitude;

      const selected = JSON.parse(localStorage.getItem("selected"));

      const distance = getDistanceFromLatLonInKm(
        resLat,
        resLng,
        selected.lat,
        selected.lng
      );
      itemsProcessed++;

      if (distance > 50) {
        if (allData.id === id) {
          setSelectedItemToDeliver(allData);
        }

        setFarAway(false);
        setOpenModal(true);
      } else {
        if (itemsProcessed === array.length) {
          setFarAway(true);
          cartFunction(id);
        }
      }
    });
  };

  const getMenuItemsVariances = () => {
    // find all items with the specified id
    const items = cart.filter((cartItem) => cartItem.id === id);

    let menuItemsVariances = [];

    // for each item, get the sideVariant, sizeVariant and toppingVariant
    items.forEach((element) => {
      if (element?.variants) {
        const { sideVariant, sizeVariant, toppingVariant } = element.variants;

        let menuItemVariant = {
          id: element.id,
          item_code: element.item_code,
          quantity: element.quantity,
          sideVariants: sideVariant.map((variant) => {
            return {
              name_en: variant.name_en,
              quantity: variant.quantity,
            };
          }),
          sizeVariant: {
            name_en: sizeVariant.name_en,
            quantity: sizeVariant.quantity,
          },
          toppingVariants: toppingVariant.map((variant) => {
            return {
              name_en: variant.name_en,
              quantity: variant.quantity,
            };
          }),
        };

        menuItemsVariances.push(menuItemVariant);
      }
    });

    setMenuItemsVariances(menuItemsVariances);

    return menuItemsVariances;
  };

  useEffect(() => {
    getMenuItemsVariances();
  }, [cart]);

  function handleClickAdd(id) {
    if (token === null) {
      cartFunction(id);
    } else {
      watchBranchHoursBeforeAdd(id);
    }
  }

  let itemsProcessedRedirect = 0;

  function autoRedirect(id) {
    if (token === null) {
      navigate(paths.details + "/" + id, {
        state: {
          id: id,
        },
      });
    } else if (restaurantBranchHours?.data?.length) {
      restaurantBranchHours?.data?.forEach((res, _, array) => {
        itemsProcessedRedirect++;

        const resLat = +res.latitude;
        const resLng = +res.longitude;

        const selected = JSON.parse(localStorage.getItem("selected"));

        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          selected.lat,
          selected.lng
        );

        if (distance > 50) {
          if (itemsProcessedRedirect === array.length) {
            if (allData.id === id) {
              setSelectedItemToDeliver(allData);
            }
            setOpenModal(true);
          }
        } else {
          if (itemsProcessedRedirect === array.length) {
            navigate(paths.details + "/" + id, {
              state: {
                id: id,
              },
            });
          }
        }
      });
    }
  }

  const cartFunction = (id) => {
    if (cart.length > 0 && restaurant_id !== cart[0]?.restaurant_id) {
      clearCartItems();
    }
    if (hasVariant) {
      navigate(paths.details + "/" + id, {
        state: {
          id: id,
        },
      });
      return;
    }
    if (!hasVariant && !farAway) {
      navigate(paths.location, {
        state: {
          restaurant_id: restaurantDetail.id,
          restaurantName: restaurantDetail.page_title_en,
          path: "menu/restaurant",
        },
      });
    } else {
      setFoodItemQuantity(foodItemQuantity + 1);
      if (checkIfItemIsInCart()) {
        dispatch(
          updateCartMenuItemQuantity({
            id: id,
            quantity: foodItemQuantity + 1,
            totalPrice: foodPriceWithoutCurrency() * (foodItemQuantity + 1),
          })
        );
      } else {
        dispatch(
          addToCart({
            id: id,
            itemName: foodItem,
            restaurant_id,
            totalPrice: foodPriceWithoutCurrency(),
            quantity: foodItemQuantity + 1,
            itemImage: foodImage,
          })
        );
        const cartItemDataForApi = {
          item_code: uuidv4(),
          item_id: id,
          quantity: foodItemQuantity + 1,
          topping_variant_id: 0,
          side_variant_id: 0,
          size_variant_id: 0,
          size_variant: [],
          topping_variant: [],
          side_variant: [],
        };

        addToCartApiCall(cartItemDataForApi, token)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  function handleClickSubtract() {
    setFoodItemQuantity(foodItemQuantity - 1);

    if (foodItemQuantity === 1) {
      dispatch(removeFromCart(id));
    }

    if (foodItemQuantity > 1) {
      dispatch(
        updateCartMenuItemQuantity({
          id: id,
          totalPrice: foodPriceWithoutCurrency() * (foodItemQuantity - 1),
          quantity: foodItemQuantity - 1,
        })
      );
    }
  }

  const getItemQuantity = () => {
    // there can be multiple items with same id but different sideVariant
    // so we need count of all items with same id

    const quantity = cart.reduce((acc, cartItem) => {
      if (cartItem.id === id) {
        return acc + cartItem.quantity;
      }
      return acc;
    }, 0);

    return quantity;
  };

  const getExtraItemName = () => {
    // const itemIndex = cart?.findIndex((cartItem) => cartItem.id === id);

    // if (itemIndex === -1) {
    //   return 0;
    // }
    // return cart[itemIndex].sideVariant;

    return [{ name_en: "rice" }, { name_en: "plate peppers" }];
  };

  const getExtraItemNames = (menuItemsVariant) => {
    return `${
      menuItemsVariant.sizeVariant.name_en
    }, ${menuItemsVariant.sideVariants.map(
      (sideVariant) => sideVariant.name_en
    )}, ${menuItemsVariant.toppingVariants.map(
      (toppingVariant) => toppingVariant.name_en
    )}`;
  };

  return (
    <Stack
      spacing={0}
      alignItems="center"
      sx={{
        width: "100%",
        marginTop: "10px",
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
            onClick={() => setMenuCardDropdownOpen(!menuCardDropdownOpen)}
          >
            {imageNotFound ? (
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "common.white",
                  borderRadius: "8px",
                }}
              >
                <ImageNotSupportedIcon fontSize="large"></ImageNotSupportedIcon>

                <Typography variant="caption">No Image Found</Typography>
              </Box>
            ) : (
              <LazyLoadImage
                className="food-image"
                src={foodImage}
                alt="menu_card_image"
                onError={onImageError}
                effect="blur"
                placeholder={
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: "grey.100" }}
                    width={100}
                    height={100}
                  />
                }
              />
            )}
          </div>
          <div
            className="menu_card_price_text_container pointer"
            onClick={() => {
              if (hasVariant) {
                navigate(paths.details + "/" + id, {
                  state: {
                    id: id,
                    locationDeliver: locationDeliver,
                    branchRestaurants: restaurantBranchHours,
                    resturantId: resturantId,
                    restaurantDetail,
                  },
                });
              }
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
            {showSubTractButton ? (
              <>
                <AddToCartButton
                  onClick={() => handleClickAdd(id)}
                  className="menu_card_add_to_cart_button pointer"
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
                    className="menu_card_add_to_cart_button pointer"
                  >
                    <img src={conditionalIcon} alt="button_icon" />
                  </AddToCartButton>
                )}
              </>
            ) : (
              <AddToCartButton
                onClick={() => autoRedirect(id)}
                className="menu_card_add_to_cart_button pointer"
              >
                <img
                  src={plusIcon}
                  alt="button_icon"
                  style={{ width: 16, height: 16 }}
                />
              </AddToCartButton>
            )}
          </div>
        </div>
      </Stack>
      {menuCardDropdownOpen && (
        <Stack
          spacing={0.5}
          sx={{
            width: "85%",
            backgroundColor: "common.white",
            p: 1,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomRightRadius: (theme) => theme.shape.borderRadius,
          }}
        >
          <Stack>
            {menuItemsVariances?.map((variance, index) => {
              return (
                <ExtraItems
                  key={index}
                  item={variance}
                  extraItemName={getExtraItemNames(variance)}
                  extraItemCount={variance.quantity}
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
