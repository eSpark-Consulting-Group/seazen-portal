import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import BasicCard from "../../cards/index";

import ExpandedButton from "../expandableButton";

import getAllRestaurants, {
  GET_ALL_RESTAURANTS_QUERY_KEY,
} from "../../../api/home/getAllRestaurants";

import {
  getResturants,
  removeSelectedService,
  setSelectedService,
} from "../../../store/reducers/resturantsSlice";

import "./style.css";

// const OrderTypeButtonExpandable = ({
//   itemId,
//   iconSrc,
//   text,
//   handleButtonClickIndex,
//   buttonOneText,
//   buttonTwoText,
//   setIsButtonExpanded,
//   showDinein,
//   showDelivery,
//   showPickup,
//   showCatering,
//   isButtonExpanded,
//   clicked,
//   id,
//   handleOrderTypeFilter,
//   customButtonExpandedClass, // New prop to pass the custom class
//   setOpenAddressPopup,
//   setToggleFilterClassNear,
//   filterClassNear,
//   setFilterSelectedNow,
//   filterSelectedNow,
//   setTypesState,
//   typesState,
// }) => {
//   const [expanded, setToggleExpanded] = useState(false);
//   const [filterClassDelivery, setToggleFilterClassDelivery] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     handleOrderTypeFilter(
//       filterClassDelivery,
//       filterClassNear,
//       filterSelectedNow
//     );
//   }, [filterClassDelivery, filterClassNear]);

//   const handleFilterClick = (orderType) => {
//     if (!filterClassDelivery) {
//       orderType === "delivery" && setFilterSelectedNow(orderType);
//     }
//     if (!filterClassNear) {
//       if (orderType === "near") {
//         setFilterSelectedNow(orderType);
//         if (setOpenAddressPopup) {
//           setOpenAddressPopup(true);
//         }
//       }
//     }
//     if (orderType === "delivery") {
//       setToggleFilterClassDelivery(!filterClassDelivery);
//     } else {
//       setToggleFilterClassNear(!filterClassNear);
//     }
//   };

//   const handleClick = (selectedService, sID) => {
//     setSelectedId(sID);
//     dispatch(setSelectedService(selectedService.toLowerCase()));

//     if (selectedService !== "Catering") {
//       setToggleExpanded(!expanded);
//       // setIsButtonExpanded({ expanded: !expanded, id: id });
//       if (selectedService === "Dine In") {
//         setTypesState({
//           dinein: !typesState.dinein,
//           catering: !typesState.catering,
//           delivery: false,
//           pickup: false,
//         });
//       }

//       if (selectedService === "Delivery") {
//         setTypesState({
//           dinein: false,
//           catering: !typesState.catering,
//           delivery: !typesState.delivery,
//           pickup: false,
//         });
//       }

//       if (selectedService === "Pickup") {
//         setTypesState({
//           dinein: false,
//           catering: !typesState.catering,
//           delivery: false,
//           pickup: !typesState.pickup,
//         });
//       }

//       if (!expanded) {
//         // Set the delivery filter as active by default when expanding the button
//         setToggleFilterClassDelivery(true);
//         setToggleFilterClassNear(false);
//         setFilterSelectedNow("delivery");
//       }
//     } else {
//       setTypesState({
//         dinein: false,
//         catering: false,
//         delivery: false,
//         pickup: false,
//       });
//       // setIsButtonExpanded({ expanded: false });
//     }

//     handleButtonClickIndex(id);
//   };

//   return (
//     <div
//       className={`custom-button ${
//         (showDinein || showDelivery || showPickup) && selectedId === id
//           ? "expanded"
//           : ""
//       } ${clicked ? "clicked" : ""} ${customButtonExpandedClass}`}
//     >
//       <img
//         src={iconSrc}
//         alt="Icon"
//         className="orderTypebutton-icon"
//         onClick={() => handleClick(text, itemId)}
//       />
//       {(((showDinein || showDelivery || showPickup) && selectedId === id) ||
//         !showDinein ||
//         !showDelivery ||
//         !showPickup) && (
//         <span
//           onClick={() => handleClick(text, itemId)}
//           className={`orderTypebutton-text`}
//         >
//           {text}
//         </span>
//       )}
//       <span className="orderTypebutton-content">
//         {(showDinein || showDelivery || showPickup) && selectedId === id && (
//           <div className="options">
//             <button
//               className={`orderTypebutton-style-one ${
//                 filterClassDelivery && "orderTypebutton-style-one-active"
//               }`}
//               onClick={() => handleFilterClick("delivery")}
//             >
//               {buttonOneText}
//             </button>
//             <button
//               className={`orderTypebutton-style-two ${
//                 filterClassNear && "orderTypebutton-style-two-active"
//               }`}
//               onClick={() => handleFilterClick("near")}
//             >
//               {buttonTwoText}
//             </button>
//           </div>
//         )}
//       </span>
//     </div>
//   );
// };

const RestaurantsOrderTypeButton = (props) => {
  const {
    setOpenAddressPopup,
    setToggleFilterClassNear,
    filterClassNear,
    filterSelectedNow,
    setFilterSelectedNow,
    goToRestaurantMenuPage,
    setRestaurantId,
    setRestaurantName,
    filterClassDelivery,
    setToggleFilterClassDelivery,
    selectedText,
    setSelectedText,
  } = props;

  const dispatch = useDispatch();
  const country = useSelector((state) => state.auth.country);

  const {
    data: getAllResturantsResponse,
    isLoading: resturantsDataLoading,
    error: resturantsDataError,
    isError: resturantsDataIsError,
    refetch,
  } = useQuery({
    queryKey: [GET_ALL_RESTAURANTS_QUERY_KEY],
    queryFn: () => getAllRestaurants(country.id),

    onSuccess: (data) => {},
    enabled: false,
  });
  const { data: restaurantsData } = getAllResturantsResponse || {};

  useEffect(() => {
    dispatch(getResturants(restaurantsData));
  }, [restaurantsData]);

  useEffect(() => {
    refetch();
  }, [country]);

  const data = [
    {
      iconSrc: "/assets/img/Dinein.svg",
      OrderType: "Dine In",
      locations: "Dine In Locations",
      where: "Near Me",
      id: 0,
    },
    {
      iconSrc: "/assets/img/Catering.svg",
      OrderType: "Catering",
      locations: "Dine In Locations",
      where: "Near Me",
      id: 1,
    },
    {
      iconSrc: "/assets/img/Delivery.svg",
      OrderType: "Delivery",
      locations: "Available for Delivery",
      where: "Delivers to Me",
      id: 2,
    },
    {
      iconSrc: "/assets/img/Pickup.svg",
      OrderType: "Pickup",
      locations: "Available for Pickup",
      where: "Near Me",
      id: 3,
    },
  ];

  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [orderTypeFilter, setOrderTypeFilter] = useState();
  const [expanded, setToggleExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const parentDiv = document?.getElementById("parent-of-all");
  const parentIcon = document?.getElementsByClassName("inner-svg-container");
  const divs = parentDiv?.getElementsByClassName("restaurantCards");

  const removeClasses = () => {
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("delivery-true");
    }
    for (let j = 0; j < parentIcon?.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("delivers-image");
        }
      });
    }
  };

  const removeBrownClasses = () => {
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("add-brown-border");
    }
    for (let j = 0; j < parentIcon?.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("bg-brown");
        }
      });
    }
  };

  const handleOrderTypeFilter = (
    deliveryFilter,
    nearFilter,
    filterSelectedNow
  ) => {
    setOrderTypeFilter({
      delivery: deliveryFilter,
      near: nearFilter,
      selectedNow: filterSelectedNow,
    });
  };

  const handleButtonClickIndex = (index) => {
    if (index === clickedButtonIndex) {
      // If the same button is clicked again, remove the border
      setClickedButtonIndex(null);
    } else {
      // If a different button is clicked, set the border for that button
      setClickedButtonIndex(index);
    }
  };

  const [typesState, setTypesState] = useState({
    dinein: false,
    catering: false,
    delivery: false,
    pickup: false,
  });

  const handleFilterClick = (orderType) => {
    if (!filterClassDelivery) {
      (orderType === "Dine In Locations" ||
        orderType === "Available for Delivery" ||
        orderType === "Available for Pickup") &&
        setFilterSelectedNow(orderType);
    }
    if (!filterClassNear) {
      if (orderType === "Near Me") {
        setFilterSelectedNow(orderType);
      }

      if (orderType === "Delivers to Me") {
        setFilterSelectedNow(orderType);
        if (setOpenAddressPopup) {
          setOpenAddressPopup(true);
        }
      }
    }
    if (
      orderType === "Dine In Locations" ||
      orderType === "Available for Delivery" ||
      orderType === "Available for Pickup"
    ) {
      setToggleFilterClassDelivery(!filterClassDelivery);
    } else {
      setToggleFilterClassNear(!filterClassNear);
    }
  };

  const handleClick = (selectedService, id) => {
    setSelectedId(id);
    setSelectedText(selectedService);
    if (selectedService === "Dine In") {
      const removeSpace = "dinein";
      dispatch(setSelectedService(removeSpace));
    } else {
      dispatch(setSelectedService(selectedService.toLowerCase()));
    }

    setToggleFilterClassDelivery(true);

    if (selectedService !== "Catering") {
      setToggleExpanded(!expanded);
      if (selectedService === "Dine In") {
        setTypesState({
          dinein: !typesState.dinein,
          catering: false,
          delivery: false,
          pickup: false,
        });
        removeClasses();
        removeBrownClasses();
      }

      if (selectedService === "Delivery") {
        setTypesState({
          dinein: false,
          catering: false,
          delivery: !typesState.delivery,
          pickup: false,
        });
      }

      if (selectedService === "Pickup") {
        setTypesState({
          dinein: false,
          catering: false,
          delivery: false,
          pickup: !typesState.pickup,
        });
        removeClasses();
        removeBrownClasses();
      }

      if (!expanded) {
        // Set the delivery filter as active by default when expanding the button
        setToggleFilterClassDelivery(true);
        setToggleFilterClassNear(false);
        setFilterSelectedNow("delivery");
      }
    } else {
      setTypesState({
        dinein: false,
        catering: !typesState.catering,
        delivery: false,
        pickup: false,
      });
      removeClasses();
      removeBrownClasses();
    }

    handleButtonClickIndex(id);
  };

  useEffect(() => {
    if (!typesState.delivery) {
      removeClasses();
      removeBrownClasses();
    }

    if (
      (typesState.dinein || typesState.delivery || typesState.pickup) &&
      filterClassNear
    ) {
      setFilterSelectedNow("");
      setToggleFilterClassNear(false);
      removeBrownClasses();
      removeClasses();
    }

    if (
      !typesState.dinein &&
      !typesState.catering &&
      !typesState.delivery &&
      !typesState.pickup
    ) {
      dispatch(removeSelectedService());
    }
  }, [typesState]);

  return (
    <>
      <div className="restaurant-title">
        <h4>Restaurants</h4>
      </div>
      <div className="orderType-button-container">
        <ExpandedButton
          iconSrc={data[0].iconSrc}
          text={
            (!typesState.dinein &&
              !typesState.delivery &&
              !typesState.pickup) ||
            selectedText === "Catering"
              ? data[0].OrderType
              : ""
          }
          hideOther={selectedText === "Dine In"}
          otherText={"Dine In"}
          buttonOneText={data[0].locations}
          buttonTwoText={data[0].where}
          clicked={false}
          handleClick={handleClick}
          id={data[0].id}
          handleOrderTypeFilter={handleOrderTypeFilter}
          filterClassDelivery={filterClassDelivery}
          filterClassNear={filterClassNear}
          filterSelectedNow={filterSelectedNow}
          isButtonExpanded={typesState.dinein}
          selectedId={selectedId}
          customButtonExpandedClass={
            typesState.dinein ? "custom-button-expanded" : ""
          }
          handleFilterClick={handleFilterClick}
          notIncludes={
            !typesState.dinein && (typesState.delivery || typesState.pickup)
              ? "shrink-expanded"
              : ""
          }
        />

        <ExpandedButton
          iconSrc={data[1].iconSrc}
          text={
            (!typesState.dinein &&
              !typesState.delivery &&
              !typesState.pickup) ||
            selectedText === "Catering"
              ? data[1].OrderType
              : ""
          }
          otherText={"Catering"}
          clicked={selectedId === 1 ? clickedButtonIndex === 1 : false}
          handleClick={handleClick}
          id={1}
          handleOrderTypeFilter={handleOrderTypeFilter}
          filterClassNear={filterClassNear}
          filterSelectedNow={filterSelectedNow}
          setFilterSelectedNow={setFilterSelectedNow}
          isButtonExpanded={false}
          selectedId={selectedId}
          handleFilterClick={handleFilterClick}
          typesState={typesState}
          customButtonExpandedClass={""}
          notIncludes={
            !typesState.catering &&
            (typesState.dinein || typesState.delivery || typesState.pickup)
              ? "shrink-expanded"
              : ""
          }
          filterClassDelivery={filterClassDelivery}
          selectedText={selectedText}
        />

        <ExpandedButton
          iconSrc={data[2].iconSrc}
          text={
            (!typesState.dinein &&
              !typesState.delivery &&
              !typesState.pickup) ||
            selectedText === "Catering"
              ? data[2].OrderType
              : ""
          }
          hideOther={selectedText === "Delivery"}
          otherText={"Delivery"}
          buttonOneText={data[2].locations}
          buttonTwoText={data[2].where}
          clicked={false}
          handleClick={handleClick}
          id={2}
          handleOrderTypeFilter={handleOrderTypeFilter}
          filterClassNear={filterClassNear}
          filterSelectedNow={filterSelectedNow}
          setFilterSelectedNow={setFilterSelectedNow}
          isButtonExpanded={typesState.delivery}
          selectedId={selectedId}
          customButtonExpandedClass={
            typesState.delivery ? "custom-button-expanded" : ""
          }
          notIncludes={
            !typesState.delivery && (typesState.dinein || typesState.pickup)
              ? "shrink-expanded"
              : ""
          }
          handleFilterClick={handleFilterClick}
          filterClassDelivery={filterClassDelivery}
        />

        <ExpandedButton
          iconSrc={data[3].iconSrc}
          text={
            (!typesState.dinein &&
              !typesState.delivery &&
              !typesState.pickup) ||
            selectedText === "Catering"
              ? data[3].OrderType
              : ""
          }
          hideOther={selectedText === "Pickup"}
          otherText={"Pickup"}
          buttonOneText={data[3].locations}
          buttonTwoText={data[3].where}
          clicked={false}
          handleClick={handleClick}
          id={3}
          handleOrderTypeFilter={handleOrderTypeFilter}
          filterClassNear={filterClassNear}
          filterSelectedNow={filterSelectedNow}
          setFilterSelectedNow={setFilterSelectedNow}
          isButtonExpanded={typesState.pickup}
          selectedId={selectedId}
          customButtonExpandedClass={
            typesState.pickup ? "custom-button-expanded" : ""
          }
          notIncludes={
            !typesState.pickup && (typesState.dinein || typesState.delivery)
              ? "shrink-expanded"
              : ""
          }
          handleFilterClick={handleFilterClick}
          filterClassDelivery={filterClassDelivery}
        />
      </div>
      {/* Pass the clickedButtonIndex to BasicCard */}
      {restaurantsData?.length > 0 && (
        <BasicCard
          clickedButtonIndex={clickedButtonIndex}
          orderTypeFilter={orderTypeFilter}
          restaurantsData={restaurantsData}
          setOpenAddressPopup={setOpenAddressPopup}
          goToRestaurantMenuPage={goToRestaurantMenuPage}
          setRestaurantId={setRestaurantId}
          setRestaurantName={setRestaurantName}
          selectedText={selectedText}
          filterSelectedNow={filterSelectedNow}
          typesState={typesState}
        />
      )}
    </>
  );
};

export default RestaurantsOrderTypeButton;
