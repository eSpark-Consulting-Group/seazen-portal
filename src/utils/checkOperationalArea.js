import { removeDiacritics } from "../screens/location/stringCheck";

export const savingAreaIdForMatchingArea = (addresses, allAreas) => {
  const result =
    addresses?.address_components
      .map((addressComponent) => {
        const matchingAreaGroup = allAreas?.find((areaGroup) =>
          areaGroup?.areas?.some(
            (area) =>
              area?.name_en.trim().toLowerCase() ===
              removeDiacritics(addressComponent?.long_name.trim().toLowerCase())
          )
        );

        if (matchingAreaGroup) {
          const matchingArea = matchingAreaGroup?.areas?.find((area) => {
            return (
              area?.name_en.trim().toLowerCase() ===
              removeDiacritics(addressComponent?.long_name.trim().toLowerCase())
            );
          });

          return {
            area_id: matchingArea.area_id,
          };
        }

        return null;
      })
      .find((result) => result !== null) || null;

  if (allAreas?.length) {
    if (result !== null) {
      localStorage.setItem("area_id", result.area_id);
    }
  }
};
