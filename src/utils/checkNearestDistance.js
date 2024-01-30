import { removeDiacritics } from "../screens/location/stringCheck";

export const checkNearestDistanceOfBranch = (distancesLessThan50) => {
  const smallestDistance = Math.min(
    ...distancesLessThan50.map((item) => item.distance)
  );
  const smallestDistanceLocation = distancesLessThan50.find(
    (item) => item.distance === smallestDistance
  );

  return smallestDistanceLocation;
};

export const branchDelivers = (
  setIsDeliveryZones,
  pushedDistanceWithDetails,
  setRestaurant_id,
  setBranchId,
  autocomplete,
  setNoRegion,
  setAddressComponents,
  setNotOperational,
  countries,
  setCenter,
  setAddress
) => {
  setIsDeliveryZones(true);

  // Find the smallest distance and associated location
  const smallestDistance = Math.min(
    ...pushedDistanceWithDetails.map((item) => item.distance)
  );
  const smallestDistanceLocation = pushedDistanceWithDetails.find(
    (item) => item.distance === smallestDistance
  );

  if (smallestDistanceLocation) {
    if (localStorage?.getItem("restaurantID") === null) {
      setRestaurant_id(smallestDistanceLocation.restaurant_id);
      setBranchId(smallestDistanceLocation.id);
    }

    const restrictToRegion = autocomplete
      .getPlace()
      .formatted_address.split(",");

    const lastElem = restrictToRegion[restrictToRegion.length - 1];
    const findCountry = lastElem?.split(" ");
    let forCondition = findCountry[findCountry.length - 1];

    if (forCondition === "Arabia") {
      forCondition = "Saudia Arabia";
    }

    if (forCondition == "Emirates") {
      forCondition = "UAE";
    }

    let countriesName = [];

    if (countries.length) {
      countriesName = countries.map((obj) => obj.name_en);
    }

    if (countriesName.includes(forCondition)) {
      setNoRegion(false);
      setAddressComponents(autocomplete.getPlace());

      // if (addressComponents.length !== 0) {
      //   findOperationalArea(autocomplete.getPlace());
      // } else {
      // }
    } else {
      setNoRegion(true);
      setNotOperational(false);
    }
  }
};

export const findOperationalArea = (
  addresses,
  allAreas,
  setCenter,
  setAddress,
  setSelectedAreaId,
  setSelectedAddress,
  setNotOperational,
  setDistanceIsFar,
  noRegion
) => {
  const result =
    addresses?.address_components
      .map((addressComponent) => {
        const matchingAreaGroup = allAreas?.find((areaGroup) =>
          areaGroup?.areas?.some(
            (area) =>
              area?.name_en.trim().toLowerCase() ===
                removeDiacritics(
                  addressComponent?.long_name.trim().toLowerCase()
                ) ||
              (addresses?.name &&
                area?.name_en.trim().toLowerCase() ===
                  removeDiacritics(addresses?.name?.trim().toLowerCase()))
          )
        );

        if (matchingAreaGroup) {
          const matchingArea = matchingAreaGroup?.areas?.find((area) => {
            return (
              area?.name_en.trim().toLowerCase() ===
                removeDiacritics(
                  addressComponent?.long_name.trim().toLowerCase()
                ) ||
              (addresses?.name &&
                area?.name_en.trim().toLowerCase() ===
                  removeDiacritics(addresses?.name?.trim().toLowerCase()))
            );
          });

          // if (
          //   addresses &&
          //   addresses?.geometry &&
          //   addresses?.geometry?.location &&
          //   addresses?.geometry?.location.lat &&
          //   addresses?.geometry?.location.lng
          // ) {
          //   const lat = addresses?.geometry?.location.lat;
          //   const lng = addresses?.geometry?.location.lng;

          //   setCenter({ lat, lng });
          //   setAddress(addresses?.formatted_address);
          // }

          return {
            area_id: matchingArea.area_id,
            name_en: matchingArea.name_en,
            delivery_charges: matchingArea.delivery_charges,
            delivery_time: matchingArea.delivery_time,
            minOrderAmount: matchingArea.minimum_order_amount,
            zone_id: matchingAreaGroup.zone_id,
          };
        }

        return null;
      })
      .find((result) => result !== null) || null;

  if (allAreas?.length) {
    if (result !== null) {
      setSelectedAreaId(result?.area_id);
      // savingAreaIdForMatchingArea(addresses, allAreas);
      setSelectedAddress({
        ...result,
        address: addresses?.formatted_address,
      });
      setNotOperational(false);
      setDistanceIsFar(false);
    } else {
      if (!noRegion) {
        if (location?.state?.restaurant_id !== undefined) {
          setDistanceIsFar(true);
        } else {
          setDistanceIsFar(false);

          setNotOperational(true);
        }
      }
    }
  } else {
    setNotOperational(false);
    setDistanceIsFar(false);
  }
};
