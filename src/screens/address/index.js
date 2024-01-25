import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDispatch,
  // useSelector,
} from "react-redux";

import { useQuery } from "@tanstack/react-query";

// import Select from "react-select";

import { RequestType, geocode, setKey } from "react-geocode";

import { toast } from "react-toastify";

import { HomeAdress } from "../../components/address/forms/homeForm";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";
import AddressTypeSelector from "../../components/address/addressButton";
import MyAddresses from "../../components/header/myAdresses";

// import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg";
// import { ReactComponent as ErrorDropdown } from "../../assets/icons/error-icon.svg";

import {
  checkIfIncludesPlus,
  checkNumberLength,
  isArabicCountryMCC,
} from "../../utils/numberCheck";

// import { selectStyles } from "./selectStyles";

import { paths } from "../../routes/paths";

import addAddressApiCall from "../../api/address/addAddress";
import updateAddressApiCall from "../../api/address/updateAddress";
import getAllAddress from "../../api/address/getAddress";
// import getAllArea from "../../api/address/areas";

import {
  // getAreas,
  getAddress,
} from "../../store/reducers/addressSlice";
import { addSelectedAddress } from "../../store/reducers/userLocationSlice";

import "./style.css";

const toastList = new Set();
const MAX_TOAST = 1;

const AddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addressName, setAddressName] = useState("");

  // const { data: areas } = useQuery({
  //   queryFn: () => getAllArea(token),
  //   onSuccess: (data) => {
  //     dispatch(getAreas(data.data));
  //   },
  // });

  useEffect(() => {
    if (
      location?.state?.fromCart !== undefined ||
      location?.state?.fromHome !== undefined ||
      location?.state?.fromMenu !== undefined ||
      location?.state?.fromDetail !== undefined
    ) {
      const getAdd = async (latitude, longitude) => {
        // eslint-disable-next-line no-undef
        setKey(process.env.REACT_APP_GOOGLE_API_KEY);
        geocode(RequestType.LATLNG, `${latitude},${longitude}`, {
          enable_address_descriptor: true,
        })
          .then(({ results }) => {
            const address = results[0].formatted_address;

            setAddressName(address);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      getAdd(location?.state?.latlng.lat, location?.state?.latlng.lng);
    }
  }, [location?.state]);

  const token = localStorage.getItem("token");
  const selectedAddress = JSON.parse(localStorage.getItem("selected"));
  const country = JSON.parse(localStorage.getItem("country"));
  const restaurantID = localStorage.getItem("restaurantID");
  const branchId = localStorage.getItem("branchId");
  const isAfterNewLocation = JSON.parse(
    sessionStorage?.getItem("storeAddress")
  );
  // const allAreas = useSelector((state) => state.address.allAreas);

  const [addressType, setAddressType] = useState("house"); // Default to 'house'
  const [address, setAddress] = useState({
    delivery_charge_area_id:
      isAfterNewLocation !== null && isAfterNewLocation?.addNewAddress === true
        ? isAfterNewLocation?.area_id
        : selectedAddress === null || selectedAddress?.area_id === undefined
        ? location?.state?.selectedAddress?.area_id
        : selectedAddress?.area_id,
    delivery_zone_id:
      isAfterNewLocation !== null && isAfterNewLocation?.addNewAddress === true
        ? isAfterNewLocation?.zone_id
        : selectedAddress === null || selectedAddress?.zone_id === undefined
        ? location?.state?.selectedAddress?.zone_id
        : selectedAddress?.zone_id,
    delivery_charge_area_name_en:
      isAfterNewLocation !== null && isAfterNewLocation?.addNewAddress === true
        ? isAfterNewLocation?.name_en
        : selectedAddress === null || selectedAddress?.name_en === undefined
        ? location?.state?.selectedAddress?.name_en === undefined
          ? location?.state?.name
          : location?.state?.selectedAddress?.name_en
        : location?.state?.selectedAddress?.name_en,
    country_id:
      country === null || country?.id === undefined ? "" : String(country?.id),
    restaurant_id: restaurantID === null ? "" : restaurantID,
    branch_id: branchId === null ? "" : branchId,
    block: "",
    street: "",
    avenue: "",
    house_no: "",
    address_label: "",
    additional_direction: "",
    building: "",
    floor: "",
    apartment_no: "",
    company_name: "",
    country_code: "",
    mobile_number: "",
    address_type: addressType,
    latitude: location?.state?.latlng.lat?.toString(),
    longitude: location?.state?.latlng.lng?.toString(),
  });
  const [errorState, setErrorState] = useState({
    blockErr: false,
    buildingErr: false,
    floorErr: false,
    companyNameErr: false,
    additionalDirErr: false,
    countryCodeErr: false,
  });
  const [clickEv, setClickEv] = useState(false);
  // const [area, setArea] = useState(null);

  useLayoutEffect(() => {
    if (location?.state?.edit) {
      const state = location?.state?.data;
      setAddress({
        delivery_charge_area_id: state.delivery_charge_area_info?.id
          ? state.delivery_charge_area_info?.id
          : "",
        delivery_zone_id: state.delivery_zone_info?.id
          ? state.delivery_zone_info?.id
          : "",
        delivery_charge_area_name_en: state.delivery_charge_area_info?.name_en
          ? state.delivery_charge_area_info?.name_en
          : "",
        country_id: state.delivery_charge_area_info?.country_id
          ? state.delivery_charge_area_info?.country_id
          : "",
        restaurant_id: state.delivery_charge_area_info?.restaurant_id
          ? state.delivery_charge_area_info?.restaurant_id
          : "",
        branch_id: state.delivery_charge_area_info?.branch_id
          ? state.delivery_charge_area_info?.branch_id
          : "",
        block: state.block ? state.block : "",
        street: state.street ? state.street : "",
        avenue: state.avenue ? state.avenue : "",
        house_no: state.house_no ? state.house_no : "",
        address_label: state.address_label ? state.address_label : "",
        additional_direction: state.additional_direction
          ? state.additional_direction
          : "",
        building: state.building ? state.building : "",
        floor: state.floor ? state.floor : "",
        apartment_no: state.apartment_no ? state.apartment_no : "",
        company_name: state.company_name ? state.company_name : "",
        country_code: state.phone_country_code
          ? parseInt(state.phone_country_code)
          : "",
        mobile_number: state.phone_no ? parseInt(state.phone_no) : "",
        address_type: state?.address_type
          ? state.address_type.toLowerCase()
          : "",
        latitude: location?.state?.latlng.lat.toString(),
        longitude: location?.state?.latlng.lng.toString(),
      });
      setAddressType(state?.address_type?.toLowerCase());
      // setArea({
      //   label: state?.delivery_charge_area_info.name_en,
      //   value: state?.delivery_charge_area_info.id,
      //   zone_id: state?.delivery_zone_info?.id,
      // });
    }
  }, [location?.state?.edit]);

  const handleAddressTypeChange = (type) => {
    setClickEv(false);
    setAddressType(type);
    setErrorState({
      blockErr: false,
      streetErr: false,
      houseNoErr: false,
      buildingErr: false,
      floorErr: false,
      apartmentNoerr: false,
      companyNameErr: false,
      additionalDirErr: false,
    });
    setAddress((prevState) => ({
      ...prevState,
      address_type: type,
    }));
  };

  const handleChange = (key, value) => {
    if (key === "mobile_number") {
      // Use regex to allow only digits and optional spaces or dashes
      const regex = /^[0-9]*[-\s]?[0-9]*$/;
      if (regex.test(value)) {
        setAddress((prevAddress) => ({
          ...prevAddress,
          mobile_number: value,
        }));
      }
      //
    } else {
      setAddress((prevAddress) => ({ ...prevAddress, [key]: value }));
    }
  };

  const apiCall = () => {
    let updateAddress = {};

    if (address.country_code !== "") {
      updateAddress = {
        ...address,
        mobile_number: address.mobile_number.toString(),
        country_code: checkIfIncludesPlus(address.country_code),
      };
    } else {
      updateAddress = address;
    }
    addAddressApiCall(updateAddress, token).then((res) => {
      if (res.success === "ok") {
        fetchFunction();

        const checkInSessionTrue =
          isAfterNewLocation !== null &&
          isAfterNewLocation?.addNewAddress === true;

        const area_id = checkInSessionTrue
          ? isAfterNewLocation?.area_id
          : selectedAddress === null
          ? location?.state?.selectedAddress?.area_id
          : selectedAddress?.area_id;

        if (area_id) {
          localStorage.setItem("area_id", area_id);
        }

        if (
          location?.state?.path === "/cart" ||
          location?.state?.path === "/home" ||
          location?.state?.path?.includes("menu-item-details") ||
          location?.state?.path === "menu/restaurant"
        ) {
          let addToStorage = {
            lat: location?.state?.latlng?.lat,
            lng: location?.state?.latlng?.lng,
            address: location?.state?.selectedAddress?.address,
            addressId: res?.data?.id,
          };

          if (location?.state?.selectedAddress?.name_en) {
            addToStorage = {
              ...addToStorage,
              delivery_time: checkInSessionTrue
                ? isAfterNewLocation?.delivery_time
                : location?.state?.selectedAddress?.delivery_time,
              delivery_charges: checkInSessionTrue
                ? isAfterNewLocation?.delivery_charges?.split(" ")[1]
                : location?.state?.selectedAddress?.delivery_charges?.split(
                    " "
                  )[1],
              minOrderAmount: checkInSessionTrue
                ? isAfterNewLocation?.minOrderAmount
                : location?.state?.selectedAddress?.minOrderAmount,
              name_en: checkInSessionTrue
                ? isAfterNewLocation?.name_en
                : location?.state?.selectedAddress?.name_en,
            };
          }

          localStorage.setItem("selected", JSON.stringify(addToStorage));
          dispatch(addSelectedAddress(addToStorage));

          if (isAfterNewLocation !== null) {
            const storeAddress = {
              ...isAfterNewLocation,
              addNewAddress: false,
            };

            sessionStorage.setItem(
              "storeAddress",
              JSON.stringify(storeAddress)
            );
          }

          const checkInSessionFalse =
            sessionStorage?.getItem("storeAddress") !== null &&
            JSON.parse(sessionStorage?.getItem("storeAddress"))
              ?.addNewAddress === false;

          if (
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            if (location?.state?.noAddress) {
              navigate(paths.cart, {
                state: { noAddress: location?.state?.noAddress },
              });
            } else if (location?.state?.addNew) {
              navigate(paths.cart);
            } else if (location?.state?.fromMenu !== undefined) {
              navigate(paths.cart, {
                state: { fromMenu: location?.state?.fromMenu },
              });
            } else if (location?.state?.fromDetail !== undefined) {
              navigate(paths.cart, {
                state: { fromDetail: location?.state?.fromDetail },
              });
            } else if (checkInSessionFalse) {
              navigate(paths.cart, {});
            } else {
              navigate(
                `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
              );
            }
          } else if (location?.state?.fromHome !== undefined) {
            navigate(paths.cart, {
              state: { fromHome: location?.state?.fromHome },
            });
          } else if (location?.state?.notSelected !== undefined) {
            navigate(paths.cart, {
              state: {
                fromMenu: true,
                path: "menu/restaurant",
                restaurant_id: location?.state?.restaurant_id,
              },
            });
          } else {
            navigate(paths.cart);
          }
        } else if (location?.state?.path === "/profile") {
          navigate(paths.addresses, { state: { path: location?.state?.path } });
        } else {
          navigate(paths.addresses, { state: { path: location.pathname } });
        }
      }
    });
  };

  const updateApiCall = () => {
    let updateAddress = {};

    if (address.country_code !== "") {
      updateAddress = {
        ...address,
        mobile_number: address.mobile_number.toString(),
        country_code: checkIfIncludesPlus(address.country_code),
      };
    } else {
      updateAddress = address;
    }

    updateAddressApiCall(updateAddress, location?.state?.data.id, token).then(
      (res) => {
        if (res.success === "ok") {
          // fetchFunction();

          const area_id = selectedAddress?.area_id;

          if (area_id) {
            localStorage.setItem("area_id", area_id);
          }

          let commonData = {
            lat: location?.state?.latlng?.lat,
            lng: location?.state?.latlng?.lng,
            addressId: res?.data?.id,
          };

          if (selectedAddress?.minOrderAmount) {
            commonData = {
              ...commonData,
              delivery_time: selectedAddress?.delivery_time,
              delivery_charges:
                selectedAddress?.delivery_charges?.split(" ")[1],
              minOrderAmount: selectedAddress?.minOrderAmount,
              name_en: selectedAddress?.name_en,
            };
          }

          if (
            location?.state?.path === "/cart" ||
            location?.state?.path === "/home" ||
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            if (
              location?.state?.fromCart !== undefined ||
              location?.state?.fromHome !== undefined ||
              location?.state?.fromMenu !== undefined ||
              location?.state?.fromDetail !== undefined
            ) {
              const addToStorage = {
                address: addressName,
                ...commonData,
              };

              localStorage.setItem("selected", JSON.stringify(addToStorage));
              dispatch(addSelectedAddress(addToStorage));
            } else {
              const addToStorage = {
                address: location?.state?.name,
                ...commonData,
              };

              localStorage.setItem("selected", JSON.stringify(addToStorage));
              dispatch(addSelectedAddress(addToStorage));
            }

            if (
              location?.state?.path?.includes("menu-item-details") ||
              location?.state?.path === "menu/restaurant"
            ) {
              if (location?.state?.noAddress) {
                navigate(paths.cart, {
                  state: { noAddress: location?.state?.noAddress },
                });
              } else if (location?.state?.addNew) {
                navigate(paths.cart);
              } else if (location?.state?.fromMenu !== undefined) {
                navigate(paths.cart, {
                  state: { fromMenu: location?.state?.fromMenu },
                });
              } else if (location?.state?.fromDetail !== undefined) {
                navigate(paths.cart, {
                  state: { fromDetail: location?.state?.fromDetail },
                });
              } else {
                navigate(
                  `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
                );
              }
            } else if (location?.state?.fromHome !== undefined) {
              navigate(paths.cart, {
                state: { fromHome: location?.state?.fromHome },
              });
            } else {
              navigate(paths.cart);
            }
          } else if (location?.state?.path === "/profile") {
            const addToStorage = {
              address: selectedAddress?.address,
              ...commonData,
            };

            localStorage.setItem("selected", JSON.stringify(addToStorage));
            dispatch(addSelectedAddress(addToStorage));

            navigate(paths.addresses, {
              state: { path: location?.state?.path },
            });
          } else {
            navigate(paths.addresses, { state: { path: location.pathname } });
          }
        }
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic here, e.g., save the form data
    setClickEv(true);

    if (addressType === "house") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.house_no !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
    if (addressType === "apartment") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.apartment_no !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
    if (addressType === "office") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.company_name !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
  };

  const callApiAfterNumCheck = () => {
    if (address.mobile_number !== "") {
      if (!checkNumberLength(address.mobile_number)) {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Mobile number must be exactly 8 digits", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (address.country_code === "") {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Add country code", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (!isArabicCountryMCC(address.country_code)) {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Please enter valid mobile country code", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (
        address.country_code !== "" &&
        checkNumberLength(address.mobile_number) &&
        isArabicCountryMCC(address.country_code)
      ) {
        apiCallFunc();
      }
    } else {
      apiCallFunc();
    }
  };

  const apiCallFunc = () => {
    if (location?.state?.edit) {
      updateApiCall();
    } else {
      apiCall();
    }
  };

  const { refetch: fetchFunction } = useQuery({
    queryFn: () => getAllAddress(token),
    onSuccess: (data) => {
      dispatch(getAddress(data.data));
    },
    enabled:
      !!token &&
      JSON.parse(sessionStorage?.getItem("storeAddress"))?.addNewAddress ===
        true,
  });

  useEffect(() => {
    if (clickEv) {
      if (addressType === "house") {
        setErrorState((prevState) => ({
          ...prevState,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          houseNoErr: address.house_no === "" ? true : false,
        }));
      } else if (addressType === "apartment") {
        setErrorState((prevState) => ({
          ...prevState,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          buildingErr: address.building === "" ? true : false,
          floorErr: address.floor === "" ? true : false,
          apartmentNoerr: address.apartment_no === "" ? true : false,
        }));
      } else if (addressType === "office") {
        setErrorState((prevState) => ({
          ...prevState,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          buildingErr: address.building === "" ? true : false,
          floorErr: address.floor === "" ? true : false,
          companyNameErr: address.company_name === "" ? true : false,
        }));
      }
    }
  }, [addressType, address, clickEv]);

  const truncateString = (str) => {
    if (str) {
      if (str.length <= 12) {
        return str;
      } else {
        return str.slice(0, 12) + "...";
      }
    }
  };

  // const selectHandler = (selectedOption) => {
  //   setArea(selectedOption);
  //   setAddress((address) => ({
  //     ...address,
  //     delivery_charge_area_id: selectedOption.value,
  //     delivery_zone_id: selectedOption.zone_id,
  //   }));
  // };

  // const groupedOptions = allAreas.map((zone) => ({
  //   label: zone.name_en,
  //   options: zone.areas.map((area) => ({
  //     label: area.name_en,
  //     value: area.area_id,
  //     zone_id: zone.zone_id,
  //   })),
  // }));

  return (
    <>
      <MyAddresses
        title={`${location?.state?.edit ? "Edit" : "Save New"} Address`}
        path={location?.state?.path}
        fromAllAddresses={false}
        edit={location?.state?.edit}
        noAddress={location?.state?.noAddress}
        addNew={location?.state?.addNew}
        restaurant_id={location?.state?.restaurant_id}
        fromCart={location?.state?.fromCart}
        fromHome={location?.state?.fromHome}
        fromMenu={location?.state?.fromMenu}
        fromDetail={location?.state?.fromDetail}
        detailPath={location?.state?.detailPath}
        backToCart={true}
        notSelected={location?.state?.notSelected}
        addFromDropdown={location?.state?.addFromDropdown}
      />

      <div className="button-style">
        <AddressTypeSelector
          addressType={addressType}
          handleAddressTypeChange={
            !location?.state?.edit && handleAddressTypeChange
          }
          edit={location?.state?.edit}
        />

        {location?.state?.edit ? null : (
          <div className="edit-container px-3">
            <p className="address-name">
              {truncateString(location?.state?.name)}
            </p>
            <button
              className="edit-button"
              onClick={() =>
                navigate(paths.location, {
                  state: {
                    name: location?.state?.name,
                    latlng: location?.state?.latlng,
                    editLocation: true,
                    path: location?.state?.path,
                    fromHome: location?.state?.fromHome,
                    fromMenu: location?.state?.fromMenu,
                    fromDetail: location?.state?.fromDetail,
                    detailPath: location?.state?.detailPath,
                  },
                })
              }
            >
              <span className="edit-text">Edit Location</span>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Add the form element and onSubmit handler */}

          {location?.state?.edit ? null : (
            <div className="container-style px-3">
              <input
                className={`form-style m-0 disabled-input`}
                type="text"
                name="Area"
                placeholder="Area"
                value={
                  sessionStorage?.getItem("storeAddress") !== null &&
                  JSON.parse(sessionStorage?.getItem("storeAddress"))
                    ?.addNewAddress === true
                    ? isAfterNewLocation?.name_en
                    : location?.state?.selectedAddress?.name_en === undefined
                    ? location?.state?.name
                    : location?.state?.selectedAddress?.name_en
                }
                disabled={true}
              />
              {/* <Select
              value={area}
              onChange={selectHandler}
              options={groupedOptions}
              isSearchable
              placeholder="Areas"
              components={{
                DropdownIndicator: errorState?.areaErr
                  ? ErrorDropdown
                  : Dropdown,
              }}
              styles={selectStyles(errorState)}
            /> */}
            </div>
          )}

          {addressType === "house" && (
            <HomeAdress
              handleChange={handleChange}
              address={address}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              houseNoErr={errorState.houseNoErr}
            />
          )}
          {addressType === "apartment" && (
            <AppartmentAdress
              handleChange={handleChange}
              address={address}
              setAddress={setAddress}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              buildingErr={errorState.buildingErr}
              floorErr={errorState.floorErr}
              apartmentNoerr={errorState.apartmentNoerr}
            />
          )}
          {addressType === "office" && (
            <OfficeAdress
              handleChange={handleChange}
              address={address}
              setAddress={setAddress}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              buildingErr={errorState.buildingErr}
              floorErr={errorState.floorErr}
              companyNameErr={errorState.companyNameErr}
            />
          )}
          <div className="contact-style">
            <div className="contact-section">
              <h3>Contact Details</h3>
            </div>
            <div className="contact-field">
              <input
                className="country-code-input"
                type="number"
                name="CountryCode"
                placeholder="+965"
                value={address.country_code}
                onChange={(e) => handleChange("country_code", e.target.value)}
              />

              <input
                className="phone-number-input"
                type="number"
                name="PhoneNumber"
                placeholder="Alternative Phone Number"
                value={address.mobile_number}
                onChange={(e) => handleChange("mobile_number", e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="address-button">
            {/* Use type='submit' to make it a submit button */}
            <span className="address-text">
              {location?.state?.edit ? "Save Changes" : "Save"}
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
