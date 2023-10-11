import React from "react";
import Navbar from "../../components/header/generalHeader/index.js";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services/index.js";
import { useQuery } from "@tanstack/react-query";
import getRestaurantDetails, {
  GET_RESTAURANT_DETAILS_QUERY_KEY,
} from "../../api/restaurant/getRestaurantDetails";
import "./style.css";
import { useLocation, useParams } from "react-router";
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setThemeColor } from "../../store/reducers/themeSlice.js";
import { useState } from "react";
import { DialogComponent } from "../../components/dialog/index.js";

const Menu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.auth.country);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItemToDeliver, setSelectedItemToDeliver] = useState({});

  const {
    data: restaurantDetailResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
    queryFn: () => getRestaurantDetails(id, country?.id),
    onSuccess: (data) => {},
  });
  const { data: restaurantDetail } = restaurantDetailResponse || {};

  dispatch(
    setThemeColor({
      main: restaurantDetail?.primary_color,
      secondary: restaurantDetail?.secondary_color,
    })
  );

  const {
    data: restaurantBranchHours,
    isLoading: restaurantBranchHoursLoading,
    error: restaurantBranchHoursError,
    isError: restaurantBranchHoursIsError,
  } = useQuery({
    queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY],
    queryFn: () => getRestaurantBranchHours(id),
    onSuccess: (data) => {},
  });

  useEffect(() => {
    refetch();
  }, [country]);

  return (
    <div>
      <Navbar restaurantDetail={restaurantDetail} />
      <RestaurantOptionsServicesContainer
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
        resturantId={id}
        setOpenModal={setOpenModal}
        setSelectedItemToDeliver={setSelectedItemToDeliver}
      />

      <DialogComponent
        notDeliver={openModal}
        setNotDeliver={setOpenModal}
        selectedItemToDeliver={selectedItemToDeliver}
        // location={location}
        fromDetail={false}
      />
    </div>
  );
};

export default Menu;
