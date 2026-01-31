import React, { useState } from "react";
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
  scheduleForLater,
  fromDetail,
  setFromDetail,
  setNotDeliver,
  setRestaurantOpen,
  onDelivery,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = useSelector((state) => state.auth.country);
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.resturants.branchId);

  const [itemsData, setItemsData] = useState();

  const fetchAllItems = () => {
    if (branchId != null) {
      getListItemByCategory(
        resturantId,
        branchId,
        searchParams.get("category"),
        country?.id
      )
        .then((res) => setItemsData(res))
        .catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    const restaurantId = localStorage.getItem("restaurantID");
    if (
      !categoryList ||
      categoryList?.length == 0 ||
      restaurantId != categoryList[0]?.restaurant_id
    ) {
      fetchAllItems();
    }
  }, [country, branchId]);

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

  const { data: itemDetail } = itemsData || {};
  const { data: itemCategoryList } = getItemsCategoryResponse || {};

  useEffect(() => {
    if (itemsData?.data) {
      dispatch(getCategoryItemList(itemsData?.data));
    }
  }, [itemsData]);

  return (
    <>
      <DeliveryDetails
        setLocationDeliver={setLocationDeliver}
        restaurantBranchHours={restaurantBranchHours}
        scheduleForLater={scheduleForLater}
        fromDetail={fromDetail}
        setFromDetail={setFromDetail}
        onDelivery={onDelivery}
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
        setNotDeliver={setNotDeliver}
        setRestaurantOpen={setRestaurantOpen}
        ItemsCategoryLoading={ItemsCategoryLoading}
      />
    </>
  );
};

export default DeliveryConditionalComponent;
