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

export const findNearestBranch = (userLat, userLong, branches) => {
  // Implement logic to find the nearest branch within 50km from the location
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

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula for calculating distance between two sets of latitude and longitude coordinates
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

// const toRad = (degrees) => {
//   return degrees * (Math.PI / 180);
// };

export const calculateLevenshteinDistance = (a, b) => {
  const distanceMatrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;

      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // Deletion
        distanceMatrix[j - 1][i] + 1, // Insertion
        distanceMatrix[j - 1][i - 1] + cost // Substitution
      );
    }
  }

  return distanceMatrix[b.length][a.length];
};

export const returnMatchedDataToAddAddress = (
  nameArray,
  branches,
  lat,
  lng,
  filterAllAreas,
  setSelectedAreaId,
  setSelectedAddress,
  setNotOperational,
  setDistanceIsFar,
  noRegion,
  addressComponents
) => {
  let matchingArea = null;

  // Sort branches based on distance in ascending order
  branches = branches?.slice()?.sort((a, b) => {
    const distanceA = calculateDistance(lat, lng, +a.latitude, +a.longitude);
    const distanceB = calculateDistance(lat, lng, +b.latitude, +b.longitude);
    return distanceA - distanceB;
  });

  // Loop through each component's long_name
  for (const component of nameArray) {
    const addressLongNameNormalized = removeDiacritics(
      component.long_name.toLowerCase().replace(/\s/g, "")
    );

    // Calculate distance for each branch and check for a match
    for (const branch of branches) {
      const distance = calculateDistance(
        lat,
        lng,
        +branch.latitude,
        +branch.longitude
      );

      if (distance < 50) {
        // Adjust the threshold as needed
        // Check if any area's name_en matches the normalized address long_name
        for (const area of filterAllAreas) {
          const areaNameNormalized = removeDiacritics(
            area.name_en.toLowerCase().replace(/\s/g, "")
          );

          if (
            addressLongNameNormalized === areaNameNormalized &&
            branch.restaurant_id === area.restaurant_id
          ) {
            matchingArea = {
              ...area,
              latitude: lat,
              longitude: lng,
            };
            break; // Stop searching if a match is found
          }
        }
      }

      if (matchingArea) {
        break; // Stop searching if a match is found
      }
    }

    if (matchingArea) {
      break; // Stop searching if a match is found
    }
  }

  if (matchingArea?.branch_id !== undefined) {
    setSelectedAreaId(matchingArea?.area_id);
    setSelectedAddress({
      ...matchingArea,
      address: addressComponents?.formatted_address,
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
};

// export const findOperationalArea = (
//   addresses,
//   allAreas,
//   setSelectedAreaId,
//   setSelectedAddress,
//   setNotOperational,
//   setDistanceIsFar,
//   noRegion
// ) => {
//   const result =
//     addresses?.address_components
//       .map((addressComponent) => {
//         const matchingArea = allAreas?.find((area) => {
//           return (
//             area?.name_en.trim().toLowerCase() ===
//               removeDiacritics(
//                 addressComponent?.long_name.trim().toLowerCase()
//               ) ||
//             (addresses?.name &&
//               area?.name_en.trim().toLowerCase() ===
//                 removeDiacritics(addresses?.name?.trim().toLowerCase()))
//           );
//         });

//         if (matchingArea) {
//           return {
//             area_id: matchingArea.area_id,
//             name_en: matchingArea.name_en,
//             delivery_charges: matchingArea.delivery_charges,
//             delivery_time: matchingArea.delivery_time,
//             // minOrderAmount: matchingArea.minimum_order_amount,
//             zone_id: matchingArea.zone_id,
//           };
//         }

//         return null;
//       })
//       .find((result) => result !== null) || null;

//   if (allAreas?.length) {
//     if (result !== null) {
//       setSelectedAreaId(result?.area_id);
//       setSelectedAddress({
//         ...result,
//         address: addresses?.formatted_address,
//       });
//       setNotOperational(false);
//       setDistanceIsFar(false);
//     } else {
//       if (!noRegion) {
//         if (location?.state?.restaurant_id !== undefined) {
//           setDistanceIsFar(true);
//         } else {
//           setDistanceIsFar(false);

//           setNotOperational(true);
//         }
//       }
//     }
//   } else {
//     setNotOperational(false);
//     setDistanceIsFar(false);
//   }
// };
