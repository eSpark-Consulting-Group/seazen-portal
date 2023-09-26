import React from "react";
import DeliveryDetails from "..";
import ErrorInformation from "../../../../errorInformation";
import MenuCardListContainer from "../../../menu/menu_card_list_container";
import MenuItems from "../../../menu/menu_items";
import { useQuery } from "@tanstack/react-query";
import getListItemByCategory, {
  GET_CATEGORY_LIST_ITEM,
} from "../../../../../api/restaurant/getListItemsByCategory";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoryItemList } from "../../../../../store/reducers/resturantsSlice";

const DeliveryConditionalComponent = ({
  locationDeliver,
  setLocationDeliver,
  deliveryAvailable,
  setDeliveryAvailable,
  resturantId,
  errorMessage,
}) => {
  const {
    data: getAllItemsByCategoryResponse,
    isLoading: itemsByCategoryLoading,
    error: itemsByCategoryError,
    isError: itemsByCategoryIsError,
  } = useQuery({
    queryKey: [GET_CATEGORY_LIST_ITEM, resturantId],
    queryFn: () => getListItemByCategory(resturantId),

    onSuccess: (data) => {},
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryItemList(getAllItemsByCategoryResponse?.data));
  }, [getAllItemsByCategoryResponse]);
  return (
    <>
      <DeliveryDetails />
      {locationDeliver && <ErrorInformation errorMessage={errorMessage} />}
      <MenuItems />
      <MenuCardListContainer />
    </>
  );
};

export default DeliveryConditionalComponent;
