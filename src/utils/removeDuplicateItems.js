import _ from "lodash";

export const removeDuplicateItem = (array) => {
  const consolidatedData = _.chain(array)
    .groupBy((item) =>
      JSON.stringify(
        _.pick(item, [
          "side_variant",
          "size_variant",
          "topping_variant",
          "custom_variant",
          "menu_item",
        ])
      )
    )
    .map((groupedItems) => {
      const combinedItem = _.cloneDeep(groupedItems[0]);
      combinedItem.quantity = _.sumBy(groupedItems, "quantity");
      return combinedItem;
    })
    .value();

  return consolidatedData;
};
