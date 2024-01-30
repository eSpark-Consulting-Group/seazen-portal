export const setPermissionsForLocation = (
  PermissionStatus,
  location,
  selected,
  makeCenter,
  getAdd,
  currentLocation,
  token
) => {
  // If user has granted permission
  if (PermissionStatus.state == "granted") {
    if (
      location?.state?.editLocation === undefined &&
      location?.state?.latlng === undefined
    ) {
      if (selected !== null) {
        // If User selected any location
        // const selected = JSON.parse(localStorage.getItem("selected"));

        if (location?.state?.toCurrent !== undefined) {
          makeCenter();
        } else {
          getAdd(selected.lat, selected.lng);
        }

        // If User didn't selected any location
      } else if (currentLocation !== null) {
        // const currentLocation = JSON.parse(
        //   localStorage.getItem("location")
        // );

        if (location?.state?.toCurrent !== undefined) {
          makeCenter();
        } else {
          getAdd(currentLocation.lat, currentLocation.lng);
        }
      }
    }
    //
    // If user permission is off
  } else if (PermissionStatus.state == "prompt") {
    if (token === null && selected === null && currentLocation === null) {
      getAdd(29.3140728, 47.68022);
      // If User selected any location
    } else if (selected !== null) {
      // const selected = JSON.parse(localStorage.getItem("selected"));

      getAdd(selected.lat, selected.lng);
      // If User didn't selected any location
    } else if (currentLocation !== null) {
      // const currentLocation = JSON.parse(
      //   localStorage.getItem("location")
      // );

      if (location?.state?.toCurrent !== undefined) {
        makeCenter();
      } else {
        getAdd(currentLocation.lat, currentLocation.lng);
      }
    } else if (
      token !== null &&
      selected === null &&
      currentLocation === null
    ) {
      getAdd(29.3140728, 47.68022);
    }
    //
    // If user has denied permission
  } else {
    if (token === null && selected === null && currentLocation === null) {
      getAdd(29.3140728, 47.68022);
      // If User selected any location
    } else if (selected !== null) {
      // const selected = JSON.parse(localStorage.getItem("selected"));

      getAdd(selected.lat, selected.lng);
      // If User didn't selected any location
    } else if (currentLocation !== null) {
      // const currentLocation = JSON.parse(
      //   localStorage.getItem("location")
      // );

      if (location?.state?.toCurrent !== undefined) {
        makeCenter();
      } else {
        getAdd(currentLocation.lat, currentLocation.lng);
      }
    } else if (
      token !== null &&
      selected === null &&
      currentLocation === null
    ) {
      getAdd(29.3140728, 47.68022);
    }
  }
};
