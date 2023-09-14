import PickupDetails from "..";
import ErrorInformation from "../../../errorInformation";
import MenuCardListConatiner from "../../menu/menu_card_list_container";
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
                <MenuCardListConatiner />
            </>);
        case false:
            return(<>
                <PickupDetails />
                <ErrorInformation errorMessage={errorMessage} />
                <MenuItems />
                <MenuCardListConatiner />
            </>);
        default:
            return(<>
                <PickupDetails />
                <MenuItems />
                <MenuCardListConatiner />
            </>);
    }
    
}
 
export default PickupConditionalComponent;