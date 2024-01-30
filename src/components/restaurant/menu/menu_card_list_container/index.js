import React, { useEffect, useState } from "react";
import {
  // useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Stack, Typography, Modal, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Button } from "react-bootstrap";

import MenuCard from "../menu_card/index.js";
import { DialogComponent } from "../../../dialog/index.js";
import SelectLocation from "../../../dialog/selectLocation.js";
import SchedulePicker from "../../../shared/schedulePicker/index.js";
import ScheduleDialog from "../../../../components/dialog/scheduleDialog.js";

import { paths } from "../../../../routes/paths.jsx";

import { resetCart } from "../../../../store/reducers/cartSlice.js";
import {
  getBranchHours,
  // getNearByRest,
  setBranchID,
  setCategoryElementID,
} from "../../../../store/reducers/resturantsSlice.js";
import { addSelectedAddress } from "../../../../store/reducers/userLocationSlice.js";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
  selectChooseAddress,
} from "../../../../utils/getAddress.js";

import getRestaurantBranchHours from "../../../../api/restaurant/getRestaurantBranchHours.js";
// import getNearByRestaurants from "../../../../api/restaurant/getNearByRestaurant.js";
import getBranchByArea from "../../../../api/restaurant/branches/getBranchByArea.js";

import "./style.css";

const MenuCardListContainer = ({
  itemCategoryList,
  locationDeliver,
  restaurantBranchHours,
  resturantId,
  restaurantDetail,
  setOpenModal,
  setSelectedItemToDeliver,
  setNotDeliver,
  setRestaurantOpen,
  ItemsCategoryLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotalItems = useSelector((state) => state.cart.totalQuantity);
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );
  const cart = useSelector((state) => state.cart.cart);
  const addressData = useSelector((state) => state.address.addressData);

  const branchHours = useSelector((state) => state.resturants.branchHours);
  // const nearbyRestaurants = useSelector(
  //   (state) => state.resturants.nearbyRestaurants
  // );

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.totalPrice),
    0
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [fullAddress, setFullAddress] = useState(null);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [restaurantIsOpen, setRestaurantIsOpen] = useState(false);
  const [addressID, setAddressID] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();
  const [name_en, setNameEn] = useState();
  const [distancesLessThan50, setDistancesLessThan50] = useState([]);

  const currentLocation = JSON.parse(localStorage.getItem("location"));
  const isAfterNewLocation = JSON.parse(
    sessionStorage?.getItem("storeAddress")
  );

  const { id } = useParams();

  useEffect(() => {
    if (cartTotalItems === 0) {
      dispatch(resetCart());
    }
  }, [cartTotalItems]);

  useEffect(() => {
    setShowList(categoryList?.slice(0, 10));
  }, [categoryList]);

  const toggleSearch = () => {
    setOpen(true);
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "-300px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.id;
          dispatch(setCategoryElementID(elementId));
          // You can perform any action here with the element ID
        }
      });
    }, options);

    // You can select the elements you want to observe by their class or other attributes.
    const elements = document.querySelectorAll(".card_list_title");
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup the observer when the component unmounts
    return () => observer.disconnect();
  }, [categoryList]);

  const fetchMoreData = () => {
    const currentLength = showList?.length;
    const newItems = categoryList.slice(currentLength, currentLength + 10);
    setShowList([...showList, ...newItems]);
  };

  let categoriesWiseList = {};

  categoryList?.length &&
    categoryList?.forEach(({ category_id }) => {
      return (categoriesWiseList[category_id] = categoryList?.filter(
        (val) => val.category_id == category_id
      ));
    });

  const filterItems = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = categoryList.filter((item) => {
      const itemName = item.name_en.toLowerCase();
      const itemIngredients = item.description_en?.toLowerCase();
      return (
        itemName.includes(lowercasedQuery) ||
        itemIngredients?.includes(lowercasedQuery)
      );
    });
    setFilteredItems(filtered);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredItems([]);
      return;
    }
    filterItems(query);
  };

  const chooseAddress = (item) => {
    const object = {
      country_id: JSON.parse(localStorage.getItem("country"))?.id,
      delivery_charge_area_id: item?.delivery_charge_area_info.id,
    };

    getBranchByArea(restaurantDetail?.id, object, dispatch)
      .then((res) => {
        if (res?.data?.length === 0) {
          getBranchIdNearToLocation();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    selectChooseAddress(
      item,
      setAddressID,
      setDeliveryCharge,
      setDeliveryTime,
      setMinOrderAmount,
      setNameEn,
      getFullAddress,
      setFullAddress
    );
  };

  const getBranchIdNearToLocation = () => {
    const selectedLoc = JSON.parse(localStorage.getItem("selected"));

    const pushedDistanceWithDetail = [];

    const filterBranch = branchHours?.data?.data?.filter(
      (rest) => rest.restaurant_id === restaurantDetail?.id
    );

    let fromLocation;
    if (selectedLoc === null && currentLocation !== null) {
      fromLocation = currentLocation;
    } else if (selectedLoc !== null && currentLocation !== null) {
      fromLocation = selectedLoc;
    }

    if (branchHours?.data?.data.length && filterBranch?.length) {
      for (const filtBranch of filterBranch) {
        const resLat = +filtBranch?.latitude;
        const resLng = +filtBranch?.longitude;

        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          fromLocation?.lat || 29.3140728,
          fromLocation?.lng || 47.68022
        );

        // Check if any distance is less than 50
        if (distance < 50) {
          pushedDistanceWithDetail.push({
            ...filtBranch,
            distance: distance,
          });

          setDistancesLessThan50(pushedDistanceWithDetail);
        }
      }
    }
  };

  useEffect(() => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...distancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = distancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      localStorage.setItem("branchId", smallestDistanceLocation.id);
      dispatch(setBranchID(smallestDistanceLocation.id));
    }
  }, [localStorage, distancesLessThan50]);

  const fetchBranchHours = () => {
    getRestaurantBranchHours(id).then((res) => {
      if (res.status === "ok") {
        dispatch(getBranchHours(res?.data));
      }
    });
  };

  useEffect(() => {
    if (branchHours?.length === 0) {
      fetchBranchHours();
    }
  }, [branchHours]);

  useEffect(() => {
    let pushedWithDistance = [];

    const filterBranch = branchHours?.filter(
      (rest) => rest.restaurant_id === +id
    );

    if (fullAddress !== null) {
      if (branchHours.length && filterBranch?.length) {
        for (let i = 0; i < filterBranch?.length; i++) {
          const resLat = +filterBranch[i]?.latitude;
          const resLng = +filterBranch[i]?.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fullAddress.lat,
            fullAddress.lng
          );

          if (distance > 50) {
            setRestaurantName(restaurantDetail?.name_en);
            setDistanceIsFar(true);
            setOpenAddressPopup(false);
          } else {
            setDistanceIsFar(false);
            setOpenAddressPopup(false);

            checkNearByRest(filterBranch);

            break;
          }
        }
      }
    }
  }, [fullAddress, branchHours]);

  const checkWithBranchIdDeliverZones = (
    allDistancesLessThan50,
    filterBranch
  ) => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...allDistancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = allDistancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      setDistanceIsFar(false);
      setOpenAddressPopup(false);

      checkNearByRest(filterBranch);
    }
  };

  const navigateUser = () => {
    navigate(paths.location, {
      state: {
        path: "menu/restaurant",
        restaurant_id: id,
        restaurantName: restaurantDetail?.name_en,
        addNew: true,
      },
    });
  };

  const checkNearByRest = (branch) => {
    const addToStore = {
      ...fullAddress,
      addressId: addressID,
      delivery_charges,
      delivery_time,
      minOrderAmount,
      name_en,
    };

    localStorage.setItem("selected", JSON.stringify(addToStore));
    dispatch(addSelectedAddress(addToStore));

    if (branch?.length === 0) {
      setRestaurantName(restaurantDetail?.name_en);
      setDistanceIsFar(true);
      setOpenAddressPopup(false);
    } else {
      if (localStorage.getItem("isAsap") === "true") {
        for (let i = 0; i < branch?.length; i++) {
          const date = new Date();
          const options = { weekday: "long" };
          const dayName = date.toLocaleDateString("en-US", options);

          const findStatus = branch[i]?.branch_hours?.filter(
            (branch) => branch.week_day === dayName
          );

          if (findStatus[0].openingStatus === "Open") {
            setRestaurantIsOpen(false);
            navigate(paths?.cart);
            break;
          } else {
            setRestaurantIsOpen(true);
          }
        }
      } else {
        setRestaurantIsOpen(false);
        navigate(paths?.cart);
      }
    }
  };

  return (
    <div className="scrollable-container-wrapper">
      <div className="scrollable-container" id="scrollableDiv">
        <div className="menu_card_list_outer_container px-3 px-sm-4 pt-3 pt-sm-4 pb-5">
          <div className="menu_card_list_inner_container">
            {/* <div
              className={`card_list_title_search_container ${
                isSearchOpen ? "expanded_search" : ""
              }`}
            >
              <div className="card_list_title"></div>
              <div className="search">
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
            </div> */}
            <>
              {ItemsCategoryLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "70px !important",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Stack>
                  {categoryList && categoryList?.length > 0 && (
                    <div className="searchwrapper">
                      <img
                        src="/assets/img/Icon - Search.svg"
                        alt="search_icon"
                        className="searchicon"
                        onClick={toggleSearch}
                      />
                    </div>
                  )}
                  {Object.keys(categoriesWiseList).map((val, index) => {
                    return (
                      <>
                        <div
                          id={index + 1}
                          className="card_list_title"
                          style={{
                            marginTop: index == 0 ? "-3px" : "16px",
                          }}
                        >
                          {
                            itemCategoryList?.find((item) => item.id == val)
                              ?.name_en
                          }
                        </div>{" "}
                        {categoriesWiseList[val].map((item, index) => {
                          if (item.branch_status) {
                            return (
                              <MenuCard
                                allData={item}
                                key={index}
                                locationDeliver={locationDeliver}
                                resturantId={resturantId}
                                restaurantBranchHours={restaurantBranchHours}
                                restaurantDetail={restaurantDetail}
                                foodItem={item.name_en}
                                foodIngredients={item.description_en}
                                foodPrice={item.price}
                                foodImage={item.image}
                                id={item.id}
                                restaurant_id={item.restaurant_id}
                                showSubTractButton={
                                  item.has_extras === false &&
                                  item.has_variants === false &&
                                  item.has_options === false
                                }
                                setOpenModal={setOpenModal}
                                setSelectedItemToDeliver={
                                  setSelectedItemToDeliver
                                }
                                setNotDeliver={setNotDeliver}
                                setRestaurantOpen={setRestaurantOpen}
                                setOpenAddressPopup={setOpenAddressPopup}
                                setRestaurantIsOpen={setRestaurantIsOpen}
                              />
                            );
                          }
                        })}
                      </>
                    );
                  })}
                </Stack>
              )}
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
            "@media (max-width: 500px)": {
              maxWidth: "100%",
            },
          }}
          onClick={() => {
            localStorage.getItem("token") === null
              ? navigate(paths.cart)
              : isAfterNewLocation !== null &&
                isAfterNewLocation?.addNewAddress === true
              ? navigate(paths.address, {
                  state: {
                    latlng: {
                      lat: currentLocation?.lat,
                      lng: currentLocation?.lng,
                    },
                    name: currentLocation?.address,
                    path: "menu/restaurant",
                    restaurant_id: id,
                  },
                })
              : addressData?.length === 0 && cart.length
              ? navigate(paths.location, {
                  state: {
                    noAddress: true,
                    latlng: {
                      lat: currentLocation?.lat,
                      lng: currentLocation?.lng,
                    },
                    name: currentLocation?.address,
                    path: "menu/restaurant",
                    restaurant_id: id,
                  },
                })
              : // : localStorage.getItem("selected") === null &&
              //   cart?.length > 0 &&
              //   !locationDeliver
              // ? navigate(paths.location, {
              //     state: {
              //       path: "/cart",
              //       restaurant_id: restaurantDetail.id,
              //       restaurantName: restaurantDetail?.page_title_en,
              //       notSelected: true,
              //     },
              //   })
              addressData?.length > 0 &&
                localStorage.getItem("selected") === null
              ? setOpenAddressPopup(true)
              : navigate(paths.cart, {
                  state: {
                    fromMenu: true,
                    path: "menu/restaurant",
                    restaurant_id: cart[0]?.restaurant_id,
                  },
                });
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                py: 0.5,
                px: 2,
                borderRadius: 1,
                backgroundColor: "#ffffff24",
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
              backgroundColor: "#ffffff24",
            }}
          >
            KWD {Number(cartTotal).toFixed(3) || Number(0).toFixed(3)}
          </Box>
        </Box>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "none",
          overflowY: "hidden",
        }}
      >
        <div className="Modal_Search_Item" tabIndex="">
          <div className="closebtnmodal">
            <Button className="closebtn">
              <CloseIcon sx={{ color: "#000" }} onClick={handleClose} />
            </Button>
          </div>
          <div className="InputSearchModal">
            <input
              type="text"
              className="InputModal"
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => handleSearchChange(event)}
            />
          </div>

          <div className="list-menu-cards">
            {filteredItems?.map((item, index) => (
              <div className="categoryItemsList" key={index + 1}>
                <MenuCard
                  allData={item}
                  key={index}
                  locationDeliver={locationDeliver}
                  resturantId={resturantId}
                  restaurantBranchHours={restaurantBranchHours}
                  restaurantDetail={restaurantDetail}
                  foodItem={item.name_en}
                  foodIngredients={item.description_en}
                  foodPrice={item.price}
                  foodImage={item.image}
                  id={item.id}
                  restaurant_id={item.restaurant_id}
                  showSubTractButton={
                    item.has_extras === false &&
                    item.has_variants === false &&
                    item.has_options === false
                  }
                  setOpenModal={setOpenModal}
                  setSelectedItemToDeliver={setSelectedItemToDeliver}
                  setOpenAddressPopup={setOpenAddressPopup}
                  setRestaurantIsOpen={setRestaurantIsOpen}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <SelectLocation
        openAddressPopup={openAddressPopup}
        handleClose={() => setOpenAddressPopup(false)}
        chooseAddress={chooseAddress}
        navigateUser={navigateUser}
      />

      <DialogComponent
        notDeliver={distanceIsFar}
        setNotDeliver={setDistanceIsFar}
        restaurantName={restaurantName}
        fromDetail={true}
        resturantId={id}
        location={location}
        home={true}
        menuCard={true}
      />

      <SchedulePicker
        openSchedulePopup={openSchedulePopup}
        setOpenSchedulePopup={setOpenSchedulePopup}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        menuCard={true}
      />

      <ScheduleDialog
        restaurantOpen={restaurantIsOpen}
        setRestaurantOpen={setRestaurantIsOpen}
        setOpenSchedulePopup={setOpenSchedulePopup}
        menuCard={true}
      />
    </div>
  );
};

export default MenuCardListContainer;
