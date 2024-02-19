import { removeDiacritics } from "../screens/location/stringCheck";

export const saveMatchedAreaName = (nameArray, allAreas) => {
  let matchingArea = null;

  // Loop through each component's long_name
  for (const component of nameArray) {
    const addressLongNameNormalized = removeDiacritics(
      component.long_name.toLowerCase().replace(/\s/g, "")
    );

    for (const area of allAreas) {
      const areaNameNormalized = removeDiacritics(
        area.name_en.toLowerCase().replace(/\s/g, "")
      );

      const areaNameNormalizedAr = removeDiacritics(
        area.name_ar.toLowerCase().replace(/\s/g, "")
      );

      if (
        addressLongNameNormalized === areaNameNormalized ||
        addressLongNameNormalized === areaNameNormalizedAr
      ) {
        matchingArea = {
          area_name_en: area.name_en,
          area_name_ar: area.name_ar,
        };
        break; // Stop searching if a match is found
      }
    }

    if (matchingArea) {
      break; // Stop searching if a match is found
    }
  }

  if (matchingArea !== null) {
    localStorage.setItem("matchingArea", JSON.stringify(matchingArea));
  }
};
