import DeliveryDetails from "..";
import ErrorInformation from "../../../../errorInformation";
import MenuCardListConatiner from "../../../menu/menu_card_list_container";
import MenuItems from "../../../menu/menu_items";

const DeliveryConditionalComponent = ({
    locationDeliver,
    setLocationDeliver,
    deliveryAvailable,
    setDeliveryAvailable,
    errorMessage,
}) => {

    switch(locationDeliver){
        case true:
            return(<>
                <DeliveryDetails />
                <MenuItems />
                <MenuCardListConatiner />
            </>);
        case false:
            return(<>
                <DeliveryDetails />
                <ErrorInformation errorMessage={errorMessage} />
                <MenuItems />
                <MenuCardListConatiner />
            </>);
        default:
            return(<>
                <DeliveryDetails />
                <MenuItems />
                <MenuCardListConatiner />
            </>);
    }

}
 
export default DeliveryConditionalComponent;