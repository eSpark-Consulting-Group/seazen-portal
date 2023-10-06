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
import getItemCategoryList, {
  GET_ITEM_CATEGORY_LIST,
} from "../../../../../api/restaurant/getItemCategoryList";
import { useSearchParams } from "react-router-dom";

const DeliveryConditionalComponent = ({
  locationDeliver,
  setLocationDeliver,
  deliveryAvailable,
  setDeliveryAvailable,
  resturantId,
  errorMessage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = JSON.parse(localStorage.getItem("country"))

  const {
    data: getAllItemsByCategoryResponse,
    isLoading: itemsByCategoryLoading,
    error: itemsByCategoryError,
    isError: itemsByCategoryIsError,
  } = useQuery({
    queryKey: [
      GET_CATEGORY_LIST_ITEM,
      resturantId,
      searchParams.get("category"),
    ],
    queryFn: () =>
      getListItemByCategory(resturantId, searchParams.get("category"), country.id),
    onSuccess: (data) => {},
  });
  const {
    data: getItemsCategoryResponse,
    isLoading: ItemsCategoryLoading,
    error: ItemsCategoryError,
    isError: ItemsCategoryIsError,
  } = useQuery({
    queryKey: [GET_ITEM_CATEGORY_LIST, resturantId],
    queryFn: () => getItemCategoryList(resturantId),

    onSuccess: (data) => {},
  });
  const dispatch = useDispatch();
  const { data: itemDetail } = getAllItemsByCategoryResponse || {};
  const { data: itemCategoryList } = getItemsCategoryResponse || {};

  useEffect(() => {
    dispatch(getCategoryItemList(getAllItemsByCategoryResponse?.data));
  }, [getAllItemsByCategoryResponse]);
  return (
    <>
      <DeliveryDetails />
      {locationDeliver && <ErrorInformation errorMessage={errorMessage} />}
      <MenuItems itemDetail={itemDetail} itemCategoryList={itemCategoryList} />
      <MenuCardListContainer itemDetail={itemDetail} />
    </>
  );
};

export default DeliveryConditionalComponent;
