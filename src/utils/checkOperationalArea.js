export const findOperationalArea = (
  addresses,
  allAreas,
  setNotOperational,
  setSelectedAddress
) => {
  const resultArray = addresses?.address_components?.map((address) => {
    let foundMatchingArea = null;

    allAreas.forEach((zone) => {
      const matchingArea = zone.areas.find((area) => {
        return (
          area.name_en.trim().toLowerCase() ===
            address.long_name.trim().toLowerCase() ||
          area.name_en.includes(address.long_name)
        );
      });

      if (matchingArea) {
        foundMatchingArea = {
          area_id: matchingArea.area_id,
          name_en: matchingArea.name_en,
          delivery_charges: matchingArea.delivery_charges,
          delivery_time: matchingArea.delivery_time,
          minOrderAmount: zone.minimum_order_amount,
          zone_id: zone.zone_id,
        };
      }
    });

    if (foundMatchingArea === null) {
      return null;
    } else {
      allAreas;
      return foundMatchingArea;
    }
  });

  const myresult = resultArray.filter((result) => result !== null);

  if (allAreas.length) {
    if (!myresult?.length) {
      setNotOperational(true);
    } else {
      if (token !== null && current !== null) {
        setSelectedAddress({
          ...myresult[0],
          address: addresses?.formatted_address,
        });
        setNotOperational(false);
      }
    }
  }
};
