import React from "react";
import PickupDetails from "..";
import ErrorInformation from "../../../errorInformation";
import MenuCardListContainer from "../../menu/menu_card_list_container";
import MenuItems from "../../menu/menu_items";

const PickupConditionalComponent = ({
    locationDeliver,
    setLocationDeliver,
    deliveryAvailable,
    setDeliveryAvailable,
    errorMessage,
}) => {

    switch(deliveryAvailable) {
        case true:
            return(<>
                <PickupDetails />
                <MenuItems />
                <MenuCardListContainer />
            </>);
        case false:
            return(<>
                <PickupDetails />
                <ErrorInformation errorMessage={errorMessage} />
                <MenuItems />
                <MenuCardListContainer />
            </>);
        default:
            return(<>
                <PickupDetails />
                <MenuItems />
                <MenuCardListContainer />
            </>);
    }
    
}
 
export default PickupConditionalComponent;