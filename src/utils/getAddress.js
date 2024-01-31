import { RequestType, geocode, setKey } from "react-geocode";

export const getFullAddress = (latitude, longitude, setFullAddress) => {
  setKey(process.env.REACT_APP_GOOGLE_API_KEY);

  geocode(RequestType.LATLNG, `${latitude},${longitude}`, {
    enable_address_descriptor: true,
  })
    .then(({ results }) => {
      const address = results[0].formatted_address;
      // const lat = results[0].geometry.location.lat;
      // const lng = results[0].geometry.location.lng;

      const addToRedux = {
        lat: +latitude,
        lng: +longitude,
        address: address,
      };
      setFullAddress(addToRedux);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectChooseAddress = (
  item,
  setAddressID,
  setDeliveryCharge,
  setDeliveryTime,
  // setMinOrderAmount,
  setNameEn,
  getFullAddress,
  setFunction
) => {
  const lat = +item.latitude;
  const lng = +item.longitude;

  setAddressID(item.id);

  setDeliveryCharge(
    item?.delivery_charge_area_info?.delivery_charges?.split(" ")[1]
  );
  setDeliveryTime(item?.delivery_charge_area_info?.delivery_time);
  // setMinOrderAmount(item?.delivery_charge_area_info?.minimum_order_amount);
  setNameEn(item?.delivery_charge_area_info?.name_en);

  localStorage.setItem("area_id", item?.delivery_charge_area_info.id);

  getFullAddress(lat, lng, setFunction);
};

export const getDistanceFromLatLonInKm = (lat2, lng2, lat1, lng1) => {
  const earthRadius = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in kilometers
  return distance;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const truncateString = (str, length) => {
  if (str) {
    if (str.length <= length) {
      return str;
    } else {
      return str.slice(0, length) + "...";
    }
  }
};
