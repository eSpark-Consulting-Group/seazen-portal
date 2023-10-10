import React from "react";
import "./style.css";
import getRestaurantDetails, {
  GET_RESTAURANT_DETAILS_QUERY_KEY,
} from "../../../api/restaurant/getRestaurantDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const BranchContent = () => {
  const { id } = useParams();
  const country = useSelector((state) => state.auth.country);
  const {
    data: restaurantDetailResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
    queryFn: () => getRestaurantDetails(id, country.id),
    onSuccess: (data) => {},
  });

  return (
    <div>
      <div className="branch-content">
        <img
          className="branch-img"
          src={restaurantDetailResponse?.data?.logo}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        </p>
      </div>
    </div>
  );
};

export default BranchContent;
