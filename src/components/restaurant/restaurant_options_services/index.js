import "./style.css";
import RestaurantDetails from "../restaurant_details/index.js"
import TabsDynamicConditionalCoponent from "../../tab_components/tabs_dynamic_conditional_component/index.js";

const RestaurantOptionsServicesContainer = () => {
  return (
    <div className="options_services_outer_container">
      <RestaurantDetails />
      <TabsDynamicConditionalCoponent />
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
