import React, { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import SideSelection from "./SideSelection";
import ToppingSelection from "./ToppingSelection";

export default function OrderForm() {
  const [combinedTotal, setCombinedTotal] = useState(0);

  // Define a function to update the combined total whenever a section updates its total
  const updateCombinedTotal = (sectionTotal) => {
    setCombinedTotal(sectionTotal);
  };

  return (
    <div>
      <CheckboxGroup updateCombinedTotal={updateCombinedTotal} />
      <SideSelection updateCombinedTotal={updateCombinedTotal} />
      <ToppingSelection updateCombinedTotal={updateCombinedTotal} />

      {/* Display the combined total */}
      <p>Combined Total: {getFormattedPrice(combinedTotal)}</p>
    </div>
  );
}
