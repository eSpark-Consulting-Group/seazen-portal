import IconPositionTabs from "../tabs/index.js";
import DeliveryDetails from "../../restaurant/restaurant_delivery_details/index.js";
import MenuItems from "../../menu/menu_items/index.js";
import MenuCardListConatiner from "../../menu/menu_card_list_container/index.js";
import PickupDetails from "../../pickup/index.js";
import { useState } from "react";
import CateringDetails from "../../catering/index.js";

const TabsDynamicConditionalCoponent = () => {

    const [tabPosition, setTabPosition] = useState("dinein");

        switch(tabPosition) {
            case "dinein":
                return (<div>
            <IconPositionTabs tabPosition={tabPosition} setTabPosition={setTabPosition}/>
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