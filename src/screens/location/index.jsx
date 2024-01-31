import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

import { useQuery } from "@tanstack/react-query";

import { setKey, geocode, RequestType } from "react-geocode";

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
import "@reach/combobox/styles.css";

// import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import Navbar from "../../components/header"; // , { NavbarVariants }

import LocationGreen from "../../assets/icons/location-green.png";
import LocationRed from "../../assets/icons/location-red.png";

import getAllArea from "../../api/address/areas";
import getBranchByArea from "../../api/restaurant/branches/getBranchByArea";

// import { savingAreaIdForMatchingArea } from "../../utils/checkOperationalArea";
import { removeDiacritics } from "./stringCheck";

import { getAreas } from "../../store/reducers/addressSlice";

import { paths } from "../../routes/paths";

import "./style.css";
import { getDistanceFromLatLonInKm } from "../../utils/getAddress";
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours";
import {
  getBranchHours,
  setBranchID,
} from "../../store/reducers/resturantsSlice";
import {
  branchDelivers,
  checkNearestDistanceOfBranch,
  findOperationalArea,
} from "../../utils/checkNearestDistance";
import { setPermissionsForLocation } from "../../utils/navigate";

const containerStyle = {
  width: "100%",
  height: "90vh",
  marginTop: "0",
};

const defaultMapOptions = {
  scaleControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  rotateControl: false,
  disableDefaultUI: true,
  keyboardShortcuts: false,
  clickableIcons: false,
  draggable: true,
  panControl: true,
  zoomControl: false,
  overviewMapControl: true,
};

const lib = ["places"];

function LocationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.auth.countries);
  const allAreas = useSelector((state) => state.address.allAreas);
  const branchHours = useSelector((state) => state.resturants.branchHours);

  const selected = JSON.parse(localStorage.getItem("selected"));
  const currentLocation = JSON.parse(localStorage.getItem("location"));
  const restaurantID = JSON.parse(localStorage.getItem("restaurantID"));
  // const branchId = JSON.parse(localStorage.getItem("branchId"));
  const token = localStorage.getItem("token");

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: lib,
  });

  const [isDeliveryZones, setIsDeliveryZones] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [restaurant_id, setRestaurant_id] = useState(null);
  const [branchId, setBranchId] = useState(null);

  // const { refetch: emptyState } = useQuery({
  //   queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY, branchHours.length === 0],
  //   queryFn: () => getRestaurantBranchHours(restaurant_id),
  //   onSuccess: (res) => {
  //     dispatch(getBranchHours(res.data));
  //   },
  //   enabled: branchHours.length === 0,
  // });

  // useEffect(() => {
  //   if (branchHours.length === 0) {
  //     emptyState();
  //   }
  // }, [branchHours, restaurant_id]);

  const { refetch: fetchAreasAgain } = useQuery({
    queryFn: () =>
      getAllArea(
        location?.state?.restaurant_id !== undefined
          ? location?.state?.restaurant_id
          : restaurant_id,
        location?.state?.branch_id !== undefined
          ? location?.state?.branch_id
          : branchId
      ),
    onSuccess: (data) => {
      setIsDeliveryZones(false);
      dispatch(getAreas(data.data));
      // setRestaurant_id(null);
      // setBranchId(null);
    },
  });

  useEffect(() => {
    if (
      (branchId !== null && restaurant_id !== null) ||
      restaurantID !== null ||
      (location?.state?.restaurant_id !== undefined &&
        location?.state?.branch_id !== undefined)
    ) {
      fetchAreasAgain();
    }
  }, [branchId, restaurant_id, restaurantID]);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [noRegion, setNoRegion] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [placeChanged, setPlaceChanged] = useState(false);
  const [addressComponents, setAddressComponents] = useState([]);
  const [notOperational, setNotOperational] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [disableButton, setdisableButton] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          // If user has granted permission
          if (PermissionStatus.state == "granted") {
            if (
              location?.state?.editLocation === undefined &&
              location?.state?.latlng === undefined
            ) {
              if (selected !== null) {
                // If User selected any location
                // const selected = JSON.parse(localStorage.getItem("selected"));

                if (location?.state?.toCurrent !== undefined) {
                  makeCenter();
                } else {
                  if (restaurant_id === null) {
                    getAdd(selected.lat, selected.lng);
                  }
                }

                // If User didn't selected any location
              } else if (currentLocation !== null) {
                // const currentLocation = JSON.parse(
                //   localStorage.getItem("location")
                // );

                if (location?.state?.toCurrent !== undefined) {
                  makeCenter();
                } else {
                  if (restaurant_id === null) {
                    getAdd(currentLocation.lat, currentLocation.lng);
                  }
                }
              }
            }
            //
            // If user permission is off
          } else if (PermissionStatus.state == "prompt") {
            if (
              token === null &&
              selected === null &&
              currentLocation === null
            ) {
              getAdd(29.3140728, 47.68022);
              // If User selected any location
            } else if (selected !== null) {
              // const selected = JSON.parse(localStorage.getItem("selected"));

              getAdd(selected.lat, selected.lng);
              // If User didn't selected any location
            } else if (currentLocation !== null) {
              // const currentLocation = JSON.parse(
              //   localStorage.getItem("location")
              // );

              if (location?.state?.toCurrent !== undefined) {
                makeCenter();
              } else {
                getAdd(currentLocation.lat, currentLocation.lng);
              }
            } else if (
              token !== null &&
              selected === null &&
              currentLocation === null
            ) {
              getAdd(29.3140728, 47.68022);
            }
            //
            // If user has denied permission
          } else {
            if (
              token === null &&
              selected === null &&
              currentLocation === null
            ) {
              getAdd(29.3140728, 47.68022);
              // If User selected any location
            } else if (selected !== null) {
              // const selected = JSON.parse(localStorage.getItem("selected"));

              getAdd(selected.lat, selected.lng);
              // If User didn't selected any location
            } else if (currentLocation !== null) {
              // const currentLocation = JSON.parse(
              //   localStorage.getItem("location")
              // );

              if (location?.state?.toCurrent !== undefined) {
                makeCenter();
              } else {
                getAdd(currentLocation.lat, currentLocation.lng);
              }
            } else if (
              token !== null &&
              selected === null &&
              currentLocation === null
            ) {
              getAdd(29.3140728, 47.68022);
            }
          }
        });
  }, [allAreas]);

  useEffect(() => {
    if (
      location?.state?.editLocation === true &&
      location?.state?.latlng !== undefined
    ) {
      const lat = location?.state?.latlng.lat;
      const lng = location?.state?.latlng.lng;

      getAdd(lat, lng);
    }
  }, [location?.state, allAreas, branchHours]);

  useEffect(() => {
    if (
      location?.state?.latlng !== undefined &&
      location?.state?.editLocation === undefined
    ) {
      getAdd(+location?.state?.latlng?.lat, +location?.state?.latlng?.lng);
    }
  }, [location?.state, allAreas, branchHours, branchId]);

  useEffect(() => {
    if (addressComponents?.address_components?.length && noRegion === false) {
      findOperationalArea(
        addressComponents,
        allAreas,
        setCenter,
        setAddress,
        setSelectedAreaId,
        setSelectedAddress,
        setNotOperational,
        setDistanceIsFar,
        noRegion
      );
    }
  }, [
    allAreas,
    addressComponents?.address_components,
    noRegion,
    branchHours,
    branchId,
    restaurant_id,
    localStorage,
  ]);

  useEffect(() => {
    if (addressComponents?.address_components?.length) {
      if (
        (branchId !== null && restaurant_id !== null) ||
        restaurantID !== null
      ) {
        findOperationalArea(
          addressComponents,
          allAreas,
          setCenter,
          setAddress,
          setSelectedAreaId,
          setSelectedAddress,
          setNotOperational,
          setDistanceIsFar,
          noRegion
        );
      }
    }
  }, [
    branchId,
    restaurant_id,
    addressComponents?.address_components,
    restaurantID,
  ]);

  const getAdd = async (latitude, longitude) => {
    // eslint-disable-next-line no-undef
    setKey(process.env.REACT_APP_GOOGLE_API_KEY);
    geocode(RequestType.LATLNG, `${+latitude},${+longitude}`, {
      enable_address_descriptor: true,
    })
      .then(({ results }) => {
        const address = results[0].formatted_address;

        // if (addressComponents.length !== 0) {
        // findOperationalArea(results[0]);
        // } else {
        setAddressComponents(results[0]);
        // }

        setAddress(address);
        setCenter({ lat: +latitude, lng: +longitude });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    // const userSelected = localStorage.getItem("selected");
    // const userLocation = localStorage.getItem("location");

    // if (token !== null) {
    if (
      selected === null &&
      currentLocation === null &&
      location?.state?.latlng === undefined &&
      location?.state?.editLocation === undefined
    ) {
      //
      const getCountry = address.split(",");
      const lastElem = getCountry[getCountry.length - 1];
      const findCountry = lastElem?.split(" ");
      let forCondition = findCountry[findCountry.length - 1];

      if (forCondition === "Arabia") {
        forCondition = "Saudia Arabia";
      }

      if (forCondition == "Emirates") {
        forCondition = "UAE";
      }

      if (!placeChanged) {
        servicePlaceCheck(forCondition.trim());
      }

      //
    } else if (
      selected === null &&
      currentLocation !== null &&
      location?.state?.latlng === undefined &&
      location?.state?.editLocation === undefined
    ) {
      //
      // const parsedUserLocation = JSON.parse(userLocation);

      const getCountry = currentLocation.address.split(",");
      const lastElem = getCountry[getCountry.length - 1];
      const findCountry = lastElem?.split(" ");
      let forCondition = findCountry[findCountry.length - 1];

      // let forCondition = checkCountry(parsedUserLocation);

      if (forCondition === "Arabia") {
        forCondition = "Saudia Arabia";
      }

      if (forCondition == "Emirates") {
        forCondition = "UAE";
      }

      if (!placeChanged) {
        servicePlaceCheck(forCondition.trim());
      }

      //
    } else if (
      selected === null &&
      currentLocation !== null &&
      location?.state?.latlng !== undefined &&
      location?.state?.editLocation === undefined
    ) {
      //
      // const parsedUserLocation = JSON.parse(userLocation);

      const getCountry = currentLocation.address.split(",");
      const lastElem = getCountry[getCountry.length - 1];
      const findCountry = lastElem?.split(" ");
      let forCondition = findCountry[findCountry.length - 1];

      // let forCondition = checkCountry(parsedUserLocation);

      if (forCondition === "Arabia") {
        forCondition = "Saudia Arabia";
      }

      if (forCondition == "Emirates") {
        forCondition = "UAE";
      }

      if (!placeChanged) {
        servicePlaceCheck(forCondition.trim());
      }

      //
    } else if (
      selected !== null &&
      currentLocation !== null &&
      location?.state?.latlng === undefined &&
      location?.state?.editLocation === undefined
    ) {
      //
      // const parsedUserLocation = JSON.parse(userSelected);

      const getCountry = selected.address.split(",");
      const lastElem = getCountry[getCountry.length - 1];
      const findCountry = lastElem?.split(" ");
      let forCondition = findCountry[findCountry.length - 1];
      // let forCondition = checkCountry(parsedUserLocation);

      if (forCondition === "Arabia") {
        forCondition = "Saudia Arabia";
      }

      if (forCondition == "Emirates") {
        forCondition = "UAE";
      }

      if (!placeChanged) {
        servicePlaceCheck(forCondition.trim());
      }
    }
    // }
  }, [
    localStorage,
    address,
    placeChanged,
    location,
    allAreas,
    branchId,
    branchHours,
  ]);

  const servicePlaceCheck = (fullAddress) => {
    let countriesName = [];

    if (countries.length) {
      countriesName = countries.map((obj) => obj.name_en);
    }

    if (countriesName.includes(fullAddress)) {
      setNoRegion(false);
      setAddressComponents(addressComponents);
      // findOperationalArea(addressComponents);
    } else {
      setNoRegion(true);

      setNotOperational(false);
    }
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    let pushedDistanceWithDetails = [];

    setPlaceChanged(true);

    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      const restId =
        localStorage?.getItem("restaurantID") === null
          ? restaurant_id
          : localStorage?.getItem("restaurantID");

      const filterBranches = branchHours?.filter(
        (branch) => branch?.restaurant_id === +restId
      );

      if (filterBranches?.length && restaurantID !== null) {
        for (const branchData of filterBranches) {
          const reslat = +branchData?.latitude;
          const reslng = +branchData?.longitude;

          const distance = getDistanceFromLatLonInKm(reslat, reslng, lat, lng);

          if (distance > 50) {
            setNotOperational(true);
          } else {
            pushedDistanceWithDetails.push({
              ...branchData,
              distance,
            });

            branchDelivers(
              setIsDeliveryZones,
              pushedDistanceWithDetails,
              setRestaurant_id,
              setBranchId,
              autocomplete,
              setNoRegion,
              setAddressComponents,
              setNotOperational,
              countries,
              setCenter,
              setAddress
            );
          }
        }

        setCenter({ lat, lng });
        setAddress(autocomplete.getPlace().formatted_address);

        fetchAreasAgain();
      } else if (
        branchHours?.length > 0 &&
        filterBranches?.length === 0 &&
        localStorage?.getItem("restaurantID") === null
      ) {
        for (const branch of branchHours) {
          const reslat = +branch?.latitude;
          const reslng = +branch?.longitude;

          const distance = getDistanceFromLatLonInKm(reslat, reslng, lat, lng);

          if (distance > 50) {
            setNotOperational(true);
          } else {
            pushedDistanceWithDetails.push({
              ...branch,
              distance,
            });

            branchDelivers(
              setIsDeliveryZones,
              pushedDistanceWithDetails,
              setRestaurant_id,
              setBranchId,
              autocomplete,
              setNoRegion,
              setAddressComponents,
              setNotOperational,
              countries
            );
          }
        }

        setCenter({ lat, lng });
        setAddress(autocomplete.getPlace().formatted_address);
        fetchAreasAgain();
      }
    }
  };

  const handleLoad = (map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (
      restaurant_id === null &&
      localStorage.getItem("restaurantID") !== null &&
      token !== null
    ) {
      let pushedDistanceWithDetails = [];

      const restId = localStorage?.getItem("restaurantID");

      const filterBranches = branchHours?.filter(
        (branch) => branch?.restaurant_id === +restId
      );

      if (filterBranches?.length && restaurantID !== null) {
        for (const branchData of filterBranches) {
          const reslat = +branchData?.latitude;
          const reslng = +branchData?.longitude;

          const distance = getDistanceFromLatLonInKm(
            reslat,
            reslng,
            center.lat,
            center.lng
          );

          if (distance > 50) {
            setNotOperational(true);
          } else {
            pushedDistanceWithDetails.push({
              ...branchData,
              distance,
            });

            const findedRest = checkNearestDistanceOfBranch(
              pushedDistanceWithDetails
            );

            if (findedRest) {
              setRestaurant_id(findedRest.restaurant_id);
              setBranchId(findedRest.id);
            }
          }
        }
      }
    }
  }, [restaurant_id, localStorage, branchHours, center]);

  useEffect(() => {
    if (
      restaurant_id === null &&
      localStorage.getItem("restaurantID") === null &&
      token !== null
    ) {
      let pushedDistanceWithDetails = [];

      if (branchHours?.length) {
        for (const branchData of branchHours) {
          const reslat = +branchData?.latitude;
          const reslng = +branchData?.longitude;

          const distance = getDistanceFromLatLonInKm(
            reslat,
            reslng,
            center.lat,
            center.lng
          );

          if (distance > 50) {
            setNotOperational(true);
          } else {
            pushedDistanceWithDetails.push({
              ...branchData,
              distance,
            });

            const findedRest = checkNearestDistanceOfBranch(
              pushedDistanceWithDetails
            );

            if (findedRest) {
              setRestaurant_id(findedRest.restaurant_id);
              setBranchId(findedRest.id);
            }
          }
        }
      }
    }
  }, [restaurant_id, localStorage, branchHours, center]);

  const handleCenterChanged = async () => {
    if (!mapRef.current) return;
    if (mapRef.current.center) {
      const lat = await mapRef?.current?.center?.lat();
      const lng = await mapRef?.current?.center?.lng();
      if (lat && lng) {
        getAdd(lat, lng);
      }
    }
  };

  const makeCenter = () => {
    setClicked(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        getAdd(position.coords.latitude, position.coords.longitude);
      },
      () => {}
    );

    setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  useEffect(() => {
    if (token === null) {
      if (selectedAddress?.area_id) {
        const storeAddress = {
          ...selectedAddress,
          addNewAddress: true,
        };

        sessionStorage.setItem("storeAddress", JSON.stringify(storeAddress));
      }
    }
  }, [token, selectedAddress]);

  const addLocationGuest = (address) => {
    localStorage.setItem("location", JSON.stringify(address));
  };

  const confirmLocation = () => {
    setdisableButton(true);

    if (branchId === null) {
      if (token === null) {
        setdisableButton(false);
        const fullAddress = {
          address,
          lat: center.lat,
          lng: center.lng,
        };

        addLocationGuest(fullAddress);

        if (location?.state?.guestUser) {
          if (location?.state?.path === "menu/restaurant") {
            // if (selectedAddress.minOrderAmount !== undefined) {
            //   addLocationGuest({
            //     ...fullAddress,
            //     minOrderAmount: selectedAddress.minOrderAmount,
            //   });
            // }

            navigate(
              `${paths.menu}/restaurant/${+location?.state
                ?.restaurant_id}/delivery`
            );
          } else {
            navigate(paths.home);
          }
        } else {
          navigate(paths.phone_verification_index, {
            state: location?.state,
          });
        }
      } else {
        setdisableButton(false);

        navigate(paths.address, {
          state: {
            name: address,
            latlng: center,
            path: location?.state?.path,
            fromHome: location?.state?.fromHome,
            fromMenu: location?.state?.fromMenu,
            fromDetail: location?.state?.fromDetail,
            editLocation: location?.state?.editLocation,
            selectedAddress: { ...selectedAddress, branchId, restaurant_id },
          },
        });
      }
    } else {
      const country_id = JSON.parse(localStorage.getItem("country"))?.id;

      const object = {
        country_id,
        delivery_charge_area_id: selectedAreaId,
      };

      getBranchByArea(restaurant_id, object, dispatch)
        .then((res) => {
          setdisableButton(false);

          if (token === null) {
            const fullAddress = {
              address,
              lat: center.lat,
              lng: center.lng,
            };

            addLocationGuest(fullAddress);

            if (location?.state?.guestUser) {
              if (location?.state?.path === "menu/restaurant") {
                // addLocationGuest({
                //   ...fullAddress,
                //   minOrderAmount: selectedAddress.minOrderAmount,
                // });

                navigate(
                  `${paths.menu}/restaurant/${+location?.state
                    ?.restaurant_id}/delivery`
                );
              } else {
                navigate(paths.home);
              }
            } else {
              navigate(paths.phone_verification_index, {
                state: location?.state,
              });
            }
          } else if (
            location?.state?.path === "/cart" ||
            location?.state?.path === "/home" ||
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            if (
              location?.state?.path?.includes("menu-item-details") ||
              location?.state?.path === "menu/restaurant"
            ) {
              if (location?.state?.addNew !== undefined) {
                navigate(paths.address, {
                  state: {
                    name: address,
                    latlng: center,
                    path: location?.state?.path,
                    restaurant_id: +location?.state?.restaurant_id,
                    addNew: true,
                    selectedAddress: {
                      ...selectedAddress,
                      branchId,
                      restaurant_id,
                    },
                  },
                });
              } else if (location?.state?.fromMenu !== undefined) {
                navigate(paths.address, {
                  state: {
                    name: address,
                    latlng: center,
                    path: location?.state?.path,
                    restaurant_id: +location?.state?.restaurant_id,
                    fromMenu: location?.state?.fromMenu,
                    selectedAddress: {
                      ...selectedAddress,
                      branchId,
                      restaurant_id,
                    },
                  },
                });
              } else if (location?.state?.fromDetail !== undefined) {
                navigate(paths.address, {
                  state: {
                    name: address,
                    latlng: center,
                    path: location?.state?.path,
                    restaurant_id: +location?.state?.restaurant_id,
                    fromDetail: location?.state?.fromDetail,
                    detailPath: location?.state?.detailPath,
                    selectedAddress: {
                      ...selectedAddress,
                      branchId,
                      restaurant_id,
                    },
                  },
                });
              } else if (location?.state?.noAddress !== undefined) {
                navigate(paths.address, {
                  state: {
                    ...location?.state,
                    latlng: center,
                    selectedAddress: {
                      ...selectedAddress,
                      branchId,
                      restaurant_id,
                    },
                  },
                });
              } else {
                navigate(paths.address, {
                  state: {
                    name: address,
                    latlng: center,
                    path: location?.state?.path,
                    restaurant_id: +location?.state?.restaurant_id,
                    addFromDropdown: location?.state?.addFromDropdown,
                    selectedAddress: {
                      ...selectedAddress,
                      branchId,
                      restaurant_id,
                    },
                  },
                });
              }
            } else if (location?.state?.notSelected !== undefined) {
              navigate(paths.address, {
                state: {
                  name: address,
                  latlng: center,
                  path: "/cart",
                  restaurant_id: +location?.state?.restaurant_id,
                  notSelected: location?.state?.notSelected,
                  selectedAddress: {
                    ...selectedAddress,
                    branchId,
                    restaurant_id,
                  },
                },
              });
            } else if (location?.state?.fromHome !== undefined) {
              navigate(paths.address, {
                state: {
                  name: address,
                  latlng: center,
                  path: location?.state?.path,
                  fromHome: location?.state?.fromHome,
                  selectedAddress: {
                    ...selectedAddress,
                    branchId,
                    restaurant_id,
                  },
                },
              });
            } else {
              navigate(paths.address, {
                state: {
                  name: address,
                  latlng: center,
                  path: location?.state?.path,
                  selectedAddress: {
                    ...selectedAddress,
                    branchId,
                    restaurant_id,
                  },
                },
              });
            }
          } else {
            navigate(paths.address, {
              state: {
                name: address,
                latlng: center,
                path: location?.state?.path,
                fromHome: location?.state?.fromHome,
                fromMenu: location?.state?.fromMenu,
                fromDetail: location?.state?.fromDetail,
                editLocation: location?.state?.editLocation,
                selectedAddress: {
                  ...selectedAddress,
                  branchId,
                  restaurant_id,
                },
              },
            });
          }
        })
        .catch((err) => {
          setdisableButton(false);
        });
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        position: "relative",
      }}
      className={`parent-stack ${!isLoaded ? "load-center" : ""}`}
    >
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          position: "absolute",
          zIndex: (theme) => theme.zIndex.appBar,
          top: 0,
          backgroundColor: "transparent",
        }}
      >
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ backgroundColor: "transparent" }}
        >
          <IconButton
            size="large"
            sx={{
              boxShadow: (theme) => theme.shadows[16],
            }}
            edge="start"
            onClick={() => navigate(-1)}
            className="back-location"
          >
            <ArrowBackRoundedIcon
              fontSize="large"
              sx={{ width: "24px", height: "24px" }}
            />
          </IconButton>
          <div className="d-flex align-items-center logo">
            <img
              style={{ width: "90px", marginRight: "-5px" }}
              src="/assets/img/order seazen logo.svg"
              alt="Logo"
            />{" "}
          </div>
          <IconButton
            size="large"
            sx={{
              boxShadow: (theme) => theme.shadows[16],
              marginTop: "2px",
            }}
            edge="end"
            onClick={() => navigate(-1)}
            className="right-icon"
          >
            <img src="/assets/img/options icon.svg" alt="Options"></img>
          </IconButton>
        </Stack> */}
        <Stack
          sx={{
            // minHeight: "70vh",
            color: "text.primary",
            paddingLeft: "16px !important",
            paddingRight: "16px !important",
            padding: "0",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <div style={{ padding: "8px", marginTop: "12px" }}>
            <Navbar
              backIcon
              logo
              languageIcon
              guestUser={location.state?.guestUser ? true : false}
              autoRedirect={location?.state?.autoRedirect}
              path={location?.state?.path}
              location={location?.state}
              locationNavbar={true}
            />
          </div>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            padding: "24px 24px 0px 24px",
          }}
        >
          {isLoaded ? (
            <div>
              <Autocomplete
                className="autocomplete"
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <div className="dp-fl">
                  <input
                    id="autocomplete"
                    type="text"
                    placeholder="Search an address"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Autocomplete>
            </div>
          ) : null}

          {/* <PlacesAutocomplete
          setSelected={setCenter}
          setAddress={setAddress}
          address={address}
          location={location.state}
        />  */}
        </Stack>
      </Stack>
      {!isLoaded || isDeliveryZones ? (
        <div className="map-progress-bar">
          <CircularProgress className="bar" />
        </div>
      ) : (
        <GoogleMap
          onLoad={handleLoad}
          onDragEnd={handleCenterChanged}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={defaultMapOptions}
          ref={mapRef}
          mapContainerClassName="GOOGLE"
        >
          {!isDeliveryZones ? (
            <div className="marker">
              <img
                src={
                  (location?.state?.fromBranch === undefined &&
                    distanceIsFar &&
                    noRegion) ||
                  (location?.state?.fromBranch === undefined &&
                    distanceIsFar &&
                    !noRegion) ||
                  (location?.state?.fromBranch === undefined &&
                    !distanceIsFar &&
                    noRegion) ||
                  notOperational ||
                  (selectedAddress?.name_en !== undefined &&
                    selected !== null &&
                    selected?.name_en === undefined)
                    ? LocationRed
                    : LocationGreen
                }
              />
            </div>
          ) : null}

          {/* <MarkerF
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
            draggable={true}
            icon={{
              url: LocationRed,
            }}
            animation={"Drop"}
          /> */}

          {!isDeliveryZones &&
            ((distanceIsFar && !noRegion) ||
            (selected !== null && selected?.name_en === undefined) ? (
              <Box className="info-window-box">
                <Typography variant="h5">
                  {location?.state?.restaurantName !== undefined
                    ? location?.state?.restaurantName
                    : localStorage.getItem("restaurantName")}{" "}
                  dosen&apos;t deliver to this area
                </Typography>
                <Typography variant="h5">
                  Please choose another location
                </Typography>
              </Box>
            ) : null)}

          {!isDeliveryZones ? (
            (location?.state?.fromBranch === undefined &&
              distanceIsFar &&
              noRegion) ||
            (location?.state?.fromBranch === undefined &&
              !distanceIsFar &&
              noRegion) ? (
              <Box className="info-window-box">
                <Typography variant="h5">
                  No services in your country right now
                </Typography>
              </Box>
            ) : null
          ) : null}

          {!isDeliveryZones
            ? !distanceIsFar &&
              notOperational && (
                <Box className="info-window-box">
                  <Typography variant="h5">
                    {localStorage?.getItem("restaurantName") !== null
                      ? `${localStorage?.getItem("restaurantName")} dosen't`
                      : "We don't"}{" "}
                    deliver to this area
                  </Typography>
                </Box>
              )
            : null}

          <div
            className={clicked ? "recenter-div clicked" : "recenter-div"}
            onClick={() => makeCenter()}
          >
            <img src="/assets/img/recenter.png" alt="" />
          </div>
        </GoogleMap>
      )}

      <Stack
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography fontWeight="semi-bold" gutterBottom>
          Pinned Address: {isLoaded ? address : null}
        </Typography>

        {location?.state?.fromBranch === undefined ? (
          <Button
            size="large"
            fullWidth
            variant="contained"
            className="confirm-button"
            onClick={() => confirmLocation()}
            disabled={
              address === "" ||
              distanceIsFar ||
              noRegion ||
              notOperational ||
              disableButton ||
              isDeliveryZones ||
              (selectedAddress?.name_en !== undefined &&
                selected !== null &&
                selected?.name_en === undefined)
            }
          >
            Confirm Your Location
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}

export default LocationPage;

// const PlacesAutocomplete = ({ setSelected, setAddress, address, location }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const [remov, setRemov] = useState(false);

//   const handleSelect = async (address) => {
//     setRemov(true);
//     setAddress(address);
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   useEffect(() => {
//     if (address !== "") {
//       setValue(address, false);
//     }
//   }, [address]);

//   const [loc, setLoc] = useState(null);

//   useEffect(() => {
//     if (address === "") {
//       setLoc(null);
//     } else {
//       setLoc(location);
//     }
//   }, [address]);

//   useEffect(() => {
//     if (loc === null) {
//       setRemov(true);
//     }
//   }, [loc]);

//   return (
//     <Combobox onSelect={handleSelect} className="combobox">
//       <ComboboxInput
//         value={loc === null ? value : address}
//         onChange={(e) => {
//           setRemov(false);
//           loc === null ? setValue(e.target.value) : setAddress(e.target.value);
//         }}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search an address"
//         onClick={() => loc === null && setRemov(false)}
//       />

//       {!remov ? (
//         <ComboboxPopover className="combobox-popover">
//           <ComboboxList className="combobox-list">
//             {status === "OK" &&
//               data.map(({ place_id, description }, index) => (
//                 <div key={place_id} className="combobox-parent">
//                   <ComboboxOption
//                     value={description}
//                     className="combobox-option"
//                   />
//                   {data.length - 1 === index ? null : (
//                     <span className="border" />
//                   )}
//                 </div>
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       ) : (
//         false
//       )}
//     </Combobox>
//   );
// };
