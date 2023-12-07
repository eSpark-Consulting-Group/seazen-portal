export const getVariantAPIFormat = (
  variantID,
  variantData,
  menuItemDetails
) => {
  const data = menuItemDetails?.data;
  const getSelectedItemsIds = variantData?.map((val) => val.id);

  const dataVariants = data?.variants?.find((val) => val.id === variantID);
  if (!dataVariants) return [];
  const dataOptions = dataVariants.options?.map((val) => {
    return {
      option_id: val.id,
      option_quantity: getSelectedItemsIds.find((val2) => val2 == val.id)
        ? variantData.find((val3) => val3.id == val.id).quantity
        : 0,
    };
  });
  return dataOptions;
};
