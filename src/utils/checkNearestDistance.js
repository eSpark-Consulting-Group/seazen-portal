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
  setBranchId
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
    setRestaurant_id(smallestDistanceLocation.restaurant_id);
    setBranchId(smallestDistanceLocation.id);
  }
};

export const findNearestBranch = (userLat, userLong, branches) => {
  // Implement logic to find the nearest branch within 50km from the user's location
  // This function now takes the array of branches as a parameter
  let nearestBranch = null;
  let minDistance = Number.MAX_VALUE;

  for (const branch of branches) {
    const distance = calculateDistance(
      userLat,
      userLong,
      +branch.latitude,
      +branch.longitude
    );

    if (distance < 50 && distance < minDistance) {
      minDistance = distance;
      nearestBranch = branch;
    }
  }

  if (!nearestBranch) {
    throw new Error("No branches within 50km found.");
  }

  return nearestBranch;
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula for calculating distance between two sets of latitude and longitude coordinates
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

export const findOperationalArea = (
  addresses,
  allAreas,
  setSelectedAreaId,
  setSelectedAddress,
  setNotOperational,
  setDistanceIsFar,
  noRegion,
  pushedDistanceWithDetails
) => {
  const result =
    addresses?.address_components
      .map((addressComponent) => {
        // const matchingAreaGroup = allAreas?.find((areaGroup) =>
        //   areaGroup?.areas?.some(
        //     (area) =>
        //       area?.name_en.trim().toLowerCase() ===
        //         removeDiacritics(
        //           addressComponent?.long_name.trim().toLowerCase()
        //         ) ||
        //       (addresses?.name &&
        //         area?.name_en.trim().toLowerCase() ===
        //           removeDiacritics(addresses?.name?.trim().toLowerCase()))
        //   )
        // );

        // if (matchingAreaGroup) {
        const matchingArea = allAreas?.find((area) => {
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

        if (matchingArea) {
          return {
            area_id: matchingArea.area_id,
            name_en: matchingArea.name_en,
            delivery_charges: matchingArea.delivery_charges,
            delivery_time: matchingArea.delivery_time,
            // minOrderAmount: matchingArea.minimum_order_amount,
            zone_id: matchingArea.zone_id,
          };
        }

        // }

        return null;
      })
      .find((result) => result !== null) || null;

  if (allAreas?.length) {
    if (result !== null) {
      setSelectedAreaId(result?.area_id);
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
