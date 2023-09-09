import IconPositionTabs from "../tabComponent/index.js";
import { useState } from "react";
import CateringDetails from "../../restaurant/catering/index.js";
import DineInCoditionalComponent from "../../restaurant/dineIn/dineInConditionalComponent/index.js";
import PickupConditionalComponent from "../../restaurant/pickup/pickupConditionalComponent/index.js";
import DeliveryConditionalComponent from "../../restaurant/delivery/deliveryDetails/deliveryConditionalComponent/index.js";

const TabsDynamicConditionalCoponent = () => {

    const [tabPosition, setTabPosition] = useState("dinein");
    const [locationDeliver, setLocationDeliver] = useState(false);
    const [deliveryAvailable, setDeliveryAvailable] = useState(false);

        switch(tabPosition) {
            case "dinein":
              return (<div>
                <IconPositionTabs
                tabPosition={tabPosition}
                setTabPosition={setTabPosition}
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                />
                <DineInCoditionalComponent />
              </div>);
            case "catering":
              return (<div>
                <IconPositionTabs
                tabPosition={tabPosition}
                setTabPosition={setTabPosition}
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                />
                <CateringDetails />
              </div>);
            case "delivery":
              return (<div>
                <IconPositionTabs
                tabPosition={tabPosition}
                setTabPosition={setTabPosition}
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                />
                <DeliveryConditionalComponent 
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                errorMessage={"We don’t deliver to your location!"}
                />
              </div>);
            case "pickup":
              return (<div>
                <IconPositionTabs
                tabPosition={tabPosition}
                setTabPosition={setTabPosition}
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                />
                <PickupConditionalComponent
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                errorMessage={"We don’t have delivery for this Restaurant!"}
                />
              </div>);
            default:
              return (<div>
                <IconPositionTabs
                tabPosition={tabPosition}
                setTabPosition={setTabPosition}
                locationDeliver={locationDeliver}
                setLocationDeliver={setLocationDeliver}
                deliveryAvailable={deliveryAvailable}
                setDeliveryAvailable={setDeliveryAvailable}
                />
                <DineInCoditionalComponent />
              </div>);
         }

}
 
export default TabsDynamicConditionalCoponent;