import {
  haveCommonWord,
  removeDiacritics,
} from "../screens/location/stringCheck";

export const savingAreaIdForMatchingArea = (addresses, allAreas) => {
  const resultArray = addresses?.address_components?.map((address) => {
    let foundMatchingArea = null;

    allAreas.forEach((zone) => {
      const matchingArea = zone?.areas?.find((area) => {
        return (
          haveCommonWord(
            area.name_en.trim().toLowerCase(),
            removeDiacritics(address.long_name).trim().toLowerCase()
          ) ||
          (area?.name_en?.includes("-")
            ? area?.name_en
                .split("-")
                ?.join(" ")
                ?.includes(
                  removeDiacritics(address.long_name).split("-")?.join(" ")
                )
            : area?.name_en?.includes(" - ") &&
              area?.name_en
                .split(" - ")
                ?.join(" ")
                ?.includes(
                  removeDiacritics(address.long_name).split("-")?.join(" ")
                )) ||
          removeDiacritics(address.long_name).includes(area.name_en)
        );
      });

      if (matchingArea) {
        foundMatchingArea = {
          area_id: matchingArea.area_id,
        };
      }
    });

    if (foundMatchingArea === null) {
      return null;
    } else {
      return foundMatchingArea;
    }
  });

  const myresult = resultArray?.filter((result) => result !== null);

  if (allAreas?.length) {
    if (myresult?.length) {
      localStorage.setItem("area_id", myresult[0].area_id);
    }
  }
};
