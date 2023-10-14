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
import { useDispatch, useSelector } from "react-redux";
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
  restaurantBranchHours,
  restaurantDetail,
  setOpenModal,
  setSelectedItemToDeliver,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = useSelector((state) => state.auth.country);
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );
  const dispatch = useDispatch();

  const {
    data: getAllItemsByCategoryResponse,
    isLoading: itemsByCategoryLoading,
    error: itemsByCategoryError,
    isError: itemsByCategoryIsError,
    refetch,
  } = useQuery({
    queryKey: [
      GET_CATEGORY_LIST_ITEM,
      resturantId,
      searchParams.get("category"),
    ],
    queryFn: () =>
      getListItemByCategory(
        resturantId,
        searchParams.get("category"),
        country?.id
      ),
    onSuccess: (data) => {},
    enabled: false,
  });

  useEffect(() => {
    const restaurantId = localStorage.getItem("restaurantID");
    if (
      !categoryList ||
      categoryList?.length == 0 ||
      restaurantId != categoryList[0]?.restaurant_id
    ) {
      refetch();
    }
  }, [country]);

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

  const { data: itemDetail } = getAllItemsByCategoryResponse || {};
  const { data: itemCategoryList } = getItemsCategoryResponse || {};

  useEffect(() => {
    dispatch(getCategoryItemList(getAllItemsByCategoryResponse?.data));
  }, [getAllItemsByCategoryResponse]);

  return (
    <>
      <DeliveryDetails
        setLocationDeliver={setLocationDeliver}
        restaurantBranchHours={restaurantBranchHours}
      />
      {locationDeliver && <ErrorInformation errorMessage={errorMessage} />}
      <MenuItems itemDetail={itemDetail} itemCategoryList={itemCategoryList} />
      <MenuCardListContainer
        itemDetail={itemDetail}
        itemCategoryList={itemCategoryList}
        locationDeliver={locationDeliver}
        resturantId={resturantId}
        restaurantBranchHours={restaurantBranchHours}
        restaurantDetail={restaurantDetail}
        setOpenModal={setOpenModal}
        setSelectedItemToDeliver={setSelectedItemToDeliver}
      />
    </>
  );
};

export default DeliveryConditionalComponent;
