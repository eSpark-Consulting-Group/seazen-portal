import React from "react";
import Navbar from "../../components/header/generalHeader/index.js";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services/index.js";
import { useQuery } from "@tanstack/react-query";
import getRestaurantDetails, {
  GET_RESTAURANT_DETAILS_QUERY_KEY,
} from "../../api/restaurant/getRestaurantDetails";
import "./style.css";
import { useLocation, useParams } from "react-router";
import getRestaurantBranchHours , {GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY} from "../../api/restaurant/getRestaurantBranchHours.js";

const Menu = () => {
  const location = useLocation();
  const {
    data: restaurantDetail,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
    queryFn: () => getRestaurantDetails(location.state.restaurantId),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const {
    data: restaurantBranchHours,
    isLoading: restaurantBranchHoursLoading,
    error: restaurantBranchHoursError,
    isError: restaurantBranchHoursIsError,
  } = useQuery({
    queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY],
    queryFn: () => getRestaurantBranchHours(location.state.restaurantId),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  return (
    <div className="menu_outer_container">
      <Navbar restaurantDetail={restaurantDetail} />
      <RestaurantOptionsServicesContainer restaurantDetail={restaurantDetail} restaurantBranchHours={restaurantBranchHours}/>
    </div>
  );
};

export default Menu;
