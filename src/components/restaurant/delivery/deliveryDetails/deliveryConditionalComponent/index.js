import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import DeliveryDetails from "..";
import ErrorInformation from "../../../../errorInformation";
import MenuCardListContainer from "../../../menu/menu_card_list_container";
import MenuItems from "../../../menu/menu_items";

import getListItemByCategory from "../../../../../api/restaurant/getListItemsByCategory"; // GET_CATEGORY_LIST_ITEM,
import getItemCategoryList from "../../../../../api/restaurant/getItemCategoryList"; // GET_ITEM_CATEGORY_LIST,

import {
  getCategoryItemList,
  getCategoryList,
  toggleCategoryListLoading,
} from "../../../../../store/reducers/resturantsSlice";

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
  setOrderAmFromDelivery,
}) => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const country = useSelector((state) => state.auth.country);
  const categoryList = useSelector(
    (state) => state?.resturants?.listItemByCategory
  );
  const categories = useSelector((state) => state?.resturants?.listCategory);
  const categoryLoading = useSelector(
    (state) => state?.resturants?.categoryLoading
  );
  const branchId = useSelector((state) => state.resturants.branchId);

  useEffect(() => {
    const restaurantId = localStorage.getItem("restaurantID");

    if (
      !categoryLoading ||
      categoryList?.length === 0 ||
      +restaurantId != categoryList[0]?.restaurant_id
    ) {
      if (categoryList.length === 0) {
        fetchAllItems();
      }
    }
  }, [categoryList, branchId]);

  const fetchAllItems = () => {
    if (branchId != null) {
      dispatch(toggleCategoryListLoading());

      getListItemByCategory(
        resturantId,
        branchId,
        searchParams.get("category"),
        country?.id
      )
        .then((res) => {
          dispatch(getCategoryItemList(res?.data));
        })
        .catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    if (
      !categoryLoading ||
      categories?.length === 0 ||
      resturantId != categories[0]?.restaurant_id
    )
      if (categories.length === 0) {
        fetchAllCategories();
      }
  }, [branchId, categories]);

  const fetchAllCategories = () => {
    getItemCategoryList(resturantId)
      .then((res) => {
        dispatch(getCategoryList(res?.data));
      })
      .catch((e) => console.error(e));
  };

  // const {
  //   data: getItemsCategoryResponse,
  //   isLoading: ItemsCategoryLoading,
  //   error: ItemsCategoryError,
  //   isError: ItemsCategoryIsError,
  // } = useQuery({
  //   queryKey: [GET_ITEM_CATEGORY_LIST, resturantId],
  //   queryFn: () => getItemCategoryList(resturantId),

  //   onSuccess: (data) => {
  //     dispatch(getCategoryList(data?.data));
  //   },
  // });

  // useEffect(() => {
  //   if (itemsData?.data) {
  //     dispatch(getCategoryItemList(itemsData?.data));
  //   }
  // }, [itemsData]);

  return (
    <>
      <DeliveryDetails
        setLocationDeliver={setLocationDeliver}
        restaurantBranchHours={restaurantBranchHours}
        scheduleForLater={scheduleForLater}
        fromDetail={fromDetail}
        setFromDetail={setFromDetail}
        onDelivery={onDelivery}
        setOrderAmFromDelivery={setOrderAmFromDelivery}
      />
      {locationDeliver && <ErrorInformation errorMessage={errorMessage} />}
      <MenuItems itemDetail={categoryList} itemCategoryList={categories} />
      <MenuCardListContainer
        itemDetail={categoryList}
        itemCategoryList={categories}
        locationDeliver={locationDeliver}
        resturantId={resturantId}
        restaurantBranchHours={restaurantBranchHours}
        restaurantDetail={restaurantDetail}
        setOpenModal={setOpenModal}
        setSelectedItemToDeliver={setSelectedItemToDeliver}
        setNotDeliver={setNotDeliver}
        setRestaurantOpen={setRestaurantOpen}
        ItemsCategoryLoading={categoryLoading}
      />
    </>
  );
};

export default DeliveryConditionalComponent;
