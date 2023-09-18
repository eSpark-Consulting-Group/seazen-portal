import React from "react";
import DeliveryDetails from "..";
import ErrorInformation from "../../../../errorInformation";
import MenuCardListContainer from "../../../menu/menu_card_list_container";
import MenuItems from "../../../menu/menu_items";

const DeliveryConditionalComponent = ({
  locationDeliver,
  setLocationDeliver,
  deliveryAvailable,
  setDeliveryAvailable,
  errorMessage,
}) => {
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
