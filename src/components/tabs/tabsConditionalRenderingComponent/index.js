import IconPositionTabs from "../tabComponent/index.js";
import DeliveryDetails from "../../restaurant/delivery/deliveryDetails/index.js";
import MenuItems from "../../restaurant/menu/menu_items/index.js";
import MenuCardListConatiner from "../../restaurant/menu/menu_card_list_container/index.js";
import PickupDetails from "../../restaurant/pickup/index.js";
import { useState } from "react";
import CateringDetails from "../../restaurant/catering/index.js";
import DineInCoditionalComponent from "../../restaurant/dineIn/dineInConditionalComponent/index.js";

const TabsDynamicConditionalCoponent = () => {

    const [tabPosition, setTabPosition] = useState("dinein");

        switch(tabPosition) {
            case "dinein":
                return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
            <DineInCoditionalComponent />
          </div>);
            case "catering":
            return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
            <CateringDetails />
          </div>);
          case "delivery":
            return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
            <DeliveryDetails />
            <MenuItems />
            <MenuCardListConatiner />
          </div>);
          case "pickup":
            return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
            <PickupDetails />
            <MenuItems />
            <MenuCardListConatiner />
          </div>);
         default:
          return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
          </div>);
         }

}
 
export default TabsDynamicConditionalCoponent;