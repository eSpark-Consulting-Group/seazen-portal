import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Box,
  Stack,
  Paper,
  Typography,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import ExtraItems from "../extraItems";
import { DialogComponent } from "../../../dialog";

import clearCart from "../../../../api/cart/clearCart";
import addToCartApiCall from "../../../../api/cart/addToCart";

import { getDistanceFromLatLonInKm } from "../../../../utils/getAddress";

import {
  addToCart,
  removeFromCart,
  resetCart,
  updateCartMenuItemQuantity,
} from "../../../../store/reducers/cartSlice";

import { paths } from "../../../../routes/paths";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import updateCartApiCall from "../../../../api/cart/updateCart";
import { useQuery } from "@tanstack/react-query";
import deleteCart from "../../../../api/cart/deleteCartItem";

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
    setNotDeliver,
    setRestaurantOpen,
    setOpenAddressPopup,
    setRestaurantIsOpen,
  } = props;

  const plusIcon = "/assets/img/Icon - Plus.svg";
  const minusIcon = "/assets/img/Icon-Minus.svg";
  const trashIcon = "/assets/img/Icon-Trash.svg";
  const extraItemName = "rice, plate peppers, onion, red beans, …";

  const token = localStorage.getItem("token");

  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [menuCardDropdownOpen, setMenuCardDropdownOpen] = useState(false);
  const [clearCartModal, setClearCartModal] = useState(false);
  const [extraItemCount_1, setExtraItemCount_1] = useState(0);
  const [extraItemCount_2, setExtraItemCount_2] = useState(0);
  const [menuItemsVariances, setMenuItemsVariances] = useState([]);

  const [imageNotFound, setImageNotFound] = useState(false);
  const [farAway, setFarAway] = useState(true);
  const [onDisablePlus, setOnDisablePlus] = useState(false);

  const onImageError = () => {
    setImageNotFound(true);
  };
  const hasVariant = !!allData?.variants?.length;

  const cart = useSelector((state) => state.cart.cart);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );
  const addressData = useSelector((state) => state.address.addressData);
  const restaurantsData = useSelector(
    (state) => state.resturants.resturantsData
  );

  const cartItem = cart.find((val) => val.id == id);

  useEffect(() => {
    const quantity = getItemQuantity();
    setFoodItemQuantity(quantity);
    return () => setFoodItemQuantity(0);
  }, [id, cart]);

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
    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.id === id && cartItem.quantity > 0
    );

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
  // let itemsProcessed = 0;

  const watchBranchHoursBeforeAdd = (id) => {
    for (let i = 0; i < restaurantBranchHours?.data?.length; i++) {
      const resLat = +restaurantBranchHours?.data[i]?.latitude;
      const resLng = +restaurantBranchHours?.data[i]?.longitude;

      const currentLocation = JSON.parse(localStorage.getItem("location"));
      const selected = JSON.parse(localStorage.getItem("selected"));

      let fromLocation;
      if (selected === null && currentLocation !== null) {
        fromLocation = currentLocation;
      } else if (selected !== null && currentLocation !== null) {
        fromLocation = selected;
      }

      const distance = getDistanceFromLatLonInKm(
        resLat,
        resLng,
        fromLocation?.lat || 29.3140728,
        fromLocation?.lng || 47.68022
      );

      if (distance > 50) {
        if (allData.id === id) {
          setSelectedItemToDeliver(allData);
        }
        setFarAway(false);
        setOpenModal(true);
      } else {
        // let itemsIsCalled = 0;

        setFarAway(true);
        cartFunction(id);

        break;
      }
    }
  };

  const getMenuItemsVariances = () => {
    // find all items with the specified id
    const items = cart.filter((cartItem) => cartItem.id === id);

    let menuItemsVariances = [];

    // for each item, get the sideVariant, sizeVariant and toppingVariant
    items.forEach((element) => {
      if (element?.variants) {
        const { sideVariant, sizeVariant, toppingVariant, customVariant } =
          element.variants;
        let menuItemVariant = {
          id: element.id,
          item_code: element.item_code,
          quantity: element.quantity,
          has_variants: element.has_variants,
          sideVariants: sideVariant.map((variant) => {
            return {
              name_en: variant.name_en,
              quantity: variant.quantity,
            };
          }),
          sizeVariant: {
            name_en: sizeVariant?.name_en,
            quantity: sizeVariant?.quantity,
          },
          toppingVariants: toppingVariant?.map((variant) => {
            return {
              name_en: variant?.name_en,
              quantity: variant?.quantity,
            };
          }),
          customVariants: customVariant?.map((variant) => {
            return {
              name_en: variant?.name_en,
              quantity: variant?.quantity,
            };
          }),
        };

        if (menuItemVariant?.customVariants?.length > 0) {
          menuItemsVariances.push(menuItemVariant);
        }
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
  // let itemsProcessedRedirect = 0;

  function autoRedirect(id) {
    if (token === null) {
      navigate(paths.details + "/" + id, {
        state: {
          id: id,
          branch_id: allData.branch_id,
          locationDeliver: locationDeliver,
        },
      });
    } else if (restaurantBranchHours?.data?.length) {
      const currentLocation = JSON.parse(localStorage.getItem("location"));
      const selected = JSON.parse(localStorage.getItem("selected"));

      if (addressData?.length > 0 && selected === null) {
        setOpenAddressPopup(true);
      } else {
        for (let i = 0; i < restaurantBranchHours?.data?.length; i++) {
          let fromLocation;
          if (selected === null && currentLocation !== null) {
            fromLocation = currentLocation;
          } else if (selected !== null && currentLocation !== null) {
            fromLocation = selected;
          }

          const resLat = +restaurantBranchHours?.data[i]?.latitude;
          const resLng = +restaurantBranchHours?.data[i]?.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fromLocation?.lat || 29.3140728,
            fromLocation?.lng || 47.68022
          );

          if (distance > 50) {
            if (allData.id === id) {
              setSelectedItemToDeliver(allData);
            }
            setOpenModal(true);
          } else {
            setRestaurantIsOpen(false);
            setOpenModal(false);
            navigate(paths.details + "/" + id, {
              state: {
                id: id,
                branch_id: allData.branch_id,
                locationDeliver: locationDeliver,
              },
            });

            break;
          }
        }
      }
    }
  }

  const previousRestaurant = restaurantsData?.find((val) => {
    return val.id == cart[0]?.restaurant_id;
  });

  const cartFunction = (id) => {
    if (
      cart.length > 0 &&
      restaurant_id !== cart[0]?.restaurant_id &&
      !clearCartModal
    ) {
      setClearCartModal(true);
      return;
    }
    setClearCartModal(false);
    if (hasVariant) {
      navigate(paths.details + "/" + id, {
        state: {
          id: id,
          branch_id: allData.branch_id,
          locationDeliver: locationDeliver,
        },
      });
      return;
    }
    if ((!hasVariant && !farAway) || token === null) {
      const itemCode = uuidv4();

      const addtoCart = {
        id: id,
        itemName: foodItem,
        restaurant_id,
        totalPrice: foodPriceWithoutCurrency(),
        quantity: foodItemQuantity + 1,
        itemImage: foodImage,
        item_code: itemCode,
        branch_id: allData.branch_id,
      };

      const cartItemDataForApi = {
        item_code: itemCode,
        item_id: id,
        quantity: foodItemQuantity + 1,
        topping_variant_id: 0,
        side_variant_id: 0,
        size_variant_id: 0,
        custom_variant_id: 0,
        size_variant: [],
        topping_variant: [],
        custom_variant: [],
        side_variant: [],
        branch_id: allData.branch_id,
      };

      const sharedState = {
        restaurant_id: restaurantDetail.id,
        restaurantName: restaurantDetail.page_title_en,
        path: location.pathname,
        cartItemDataForApi,
        addtoCart,
        autoRedirect: true,
      };

      if (!locationDeliver) {
        navigate(paths.phone_verification_index, {
          state: sharedState,
        });
      } else {
        navigate(paths.location, {
          state: sharedState,
        });
      }

      // navigate(paths.location, {
      //   state: {
      //     restaurant_id: restaurantDetail.id,
      //     restaurantName: restaurantDetail.page_title_en,
      //     path: location.pathname,
      //     cartItemDataForApi,
      //     addtoCart,
      //     autoRedirect: true,
      //   },
      // });
    } else {
      setFoodItemQuantity(foodItemQuantity + 1);
      if (checkIfItemIsInCart()) {
        const updateDataForApi = {
          item_code: cartItem.item_code,
          item_id: cartItem.id,
          quantity: foodItemQuantity + 1,
          topping_variant_id: null,
          side_variant_id: null,
          size_variant_id: null,
          custom_variant_id: null,
          size_variant: [],
          topping_variant: [],
          custom_variant: [],
          side_variant: [],
          branch_id: cartItem.branch_id,
          cart_id: cartItem.cart_id,
        };
        updateCartApiCall(updateDataForApi, token)
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });

        dispatch(
          updateCartMenuItemQuantity({
            id: id,
            quantity: foodItemQuantity + 1,
            totalPrice: foodPriceWithoutCurrency() * (foodItemQuantity + 1),
          })
        );
      } else {
        setOnDisablePlus(true);

        const itemCode = uuidv4();

        const cartItemDataForApi = {
          item_code: itemCode,
          item_id: id,
          quantity: foodItemQuantity + 1,
          topping_variant_id: 0,
          side_variant_id: 0,
          size_variant_id: 0,
          custom_variant_id: 0,
          size_variant: [],
          topping_variant: [],
          custom_variant: [],
          side_variant: [],
          branch_id: allData.branch_id,
        };

        addToCartApiCall(cartItemDataForApi)
          .then((res) => {
            dispatch(
              addToCart({
                id: id,
                itemName: foodItem,
                restaurant_id,
                totalPrice: foodPriceWithoutCurrency(),
                quantity: foodItemQuantity + 1,
                itemImage: foodImage,
                item_code: itemCode,
                branch_id: allData.branch_id,
                cart_id: res?.data?.cart_id,
              })
            );
            setOnDisablePlus(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const { data, refetch } = useQuery({
    queryFn: () =>
      deleteCart(
        {
          cart_id: cartItem.cart_id,
          item_id: cartItem.id,
          item_code: cartItem.item_code,
        },
        token
      ),
    onSuccess: (data) => {
      console.log(data, "data");
    },
    enabled: false,
  });

  function handleClickSubtract() {
    setFoodItemQuantity(foodItemQuantity - 1);

    if (foodItemQuantity === 1) {
      refetch();
      dispatch(removeFromCart(id));
      if (cart.length == 1) {
        clearCartItems();
      }
    }

    if (foodItemQuantity > 1) {
      const updateDataForApi = {
        item_code: cartItem.item_code,
        item_id: cartItem.id,
        quantity: foodItemQuantity - 1,
        topping_variant_id: null,
        side_variant_id: null,
        size_variant_id: null,
        custom_variant_id: null,
        size_variant: [],
        topping_variant: [],
        custom_variant: [],
        side_variant: [],
        branch_id: cartItem.branch_id,
        cart_id: cartItem.cart_id,
      };
      updateCartApiCall(updateDataForApi, token)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

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
    const { sizeVariant, sideVariants, toppingVariants, customVariants } =
      menuItemsVariant;

    let extraItemNames = [];

    if (sizeVariant) {
      extraItemNames.push(sizeVariant.name_en);
    }

    if (sideVariants && sideVariants.length > 0) {
      extraItemNames.push(...sideVariants.map((variant) => variant.name_en));
    }

    if (toppingVariants && toppingVariants.length > 0) {
      extraItemNames.push(...toppingVariants.map((variant) => variant.name_en));
    }
    if (customVariants && customVariants.length > 0) {
      extraItemNames.push(...customVariants.map((variant) => variant.name_en));
    }

    return extraItemNames.join(", ");
  };

  useEffect(() => {
    // getMenuItemsVariances();
    if (cart.length > 0 && menuItemsVariances.length > 0) {
      setMenuCardDropdownOpen(true);
    }
  }, [cart, menuItemsVariances]);

  const filteredItems = menuItemsVariances.filter((val) => {
    return val.quantity > 0;
  });

  const uniqueObjects = new Set();

  const resultArray = filteredItems.filter((obj) => {
    const str = JSON.stringify({
      id: obj.id,
      sideVariants: obj.sideVariants,
      sizeVariant: obj.sizeVariant,
      toppingVariants: obj.toppingVariants,
      customVariants: obj.customVariants,
    });
    const isUnique = !uniqueObjects.has(str);
    if (isUnique) {
      uniqueObjects.add(str);
    }
    return isUnique;
  });

  return (
    <>
      <Dialog
        open={clearCartModal}
        onClose={() => {}}
        sx={{
          margin: "0",
          textAlign: "center",
        }}
        className="cart-dialog"
        PaperProps={{
          sx: {
            overflow: "visible",
            margin: "0px 0px 0px 27px",
            width: "327px",

            "@media (max-width: 500px)": {
              width: "375px",
              margin: "0px 0px 0px 0px",
            },

            "@media (max-width: 400px)": {
              width: "90%",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dialog-title title-cart"
        >
          <img src="/assets/img/exclaim.svg"></img>

          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setClearCartModal(false);
              sessionStorage.setItem("popupOpened", true);
            }}
          >
            <CloseIcon
              sx={{
                width: "24px",
                fontSize: "24px",
                cursor: "pointer",
                color: "#707070 !important",
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent className="dialog-content-cart">
          {`Warning: You are about to change your original order from ${previousRestaurant?.name_en} to ${restaurantDetail?.name_en}. All items currently in your cart from ${previousRestaurant?.name_en} will be removed. Continue?.`}
        </DialogContent>
        <div className="btn-navigate">
          <Button
            className="common-st add-btn"
            onClick={() => setClearCartModal(false)}
          >
            No
          </Button>

          <Button
            className="common-st go-to-btn"
            onClick={() => {
              clearCartItems();
              cartFunction(id);
            }}
          >
            Yes
          </Button>
        </div>
      </Dialog>
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
              borderLeft: (theme) =>
                `8px solid ${theme.palette.themeColor.main}`,
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
            onClick={() => {
              if (token === null) {
                navigate(paths.details + "/" + id, {
                  state: {
                    id: id,
                    branch_id: allData.branch_id,
                    locationDeliver: locationDeliver,
                  },
                });
              } else {
                navigate(paths.details + "/" + id, {
                  state: {
                    id: id,
                    locationDeliver: locationDeliver,
                    branchRestaurants: restaurantBranchHours,
                    resturantId: resturantId,
                    restaurantDetail,
                    branch_id: allData.branch_id,
                  },
                });
              }
            }}
          >
            <div
              className="menu_card_image_container pointer"
              // onClick={() => setMenuCardDropdownOpen(!menuCardDropdownOpen)}
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
            <div className="menu_card_price_text_container pointer">
              <div>
                <div className="menu_card_heading_text">{foodItem}</div>
                <div className="menu_card_sub_text">{foodIngredients}</div>
              </div>
              <div className="menu_card_price_add_to_cart_container">
                <div className="menu_card_price_container">
                  {/* <div className="menu_card_currency">{foodCurrency}</div> */}
                  <StyledItemPrice className="menu_card_item_price">
                    <Typography
                      // variant="subtitle2"
                      color="GrayText"
                      component="sup"
                      sx={{
                        mr: 0.5,
                        position: "relative",
                        top: "-4.5px",
                        fontSize: "10px",
                        fontWeight: "700",
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
                    onClick={() => {
                      if (!onDisablePlus) {
                        handleClickAdd(id);
                      }
                    }}
                    className="menu_card_add_to_cart_button pointer wewe"
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
                      className="menu_card_add_to_cart_button pointer qqq"
                    >
                      <img src={conditionalIcon} alt="button_icon" />
                    </AddToCartButton>
                  )}
                </>
              ) : (
                <AddToCartButton
                  onClick={() => autoRedirect(id)}
                  className="menu_card_add_to_cart_button pointer vvv"
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
              maxHeight: "220px",
              overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
              // p: 1,
              paddingTop: "1px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
              borderBottomRightRadius: (theme) => theme.shape.borderRadius,
            }}
          >
            <Stack>
              {resultArray?.map((variance, index) => {
                if (variance.has_variants) {
                  return (
                    <ExtraItems
                      key={index}
                      item={variance}
                      extraItemName={getExtraItemNames(variance)}
                      extraItemCount={variance.quantity}
                      item_code={variance.item_code}
                      id={id}
                    />
                  );
                }
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default MenuCard;
