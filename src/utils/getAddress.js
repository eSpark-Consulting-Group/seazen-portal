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
  setMinOrderAmount,
  setNameEn,
  getFullAddress,
  setFunction
) => {
  const lat = +item.latitude;
  const lng = +item.longitude;

  setAddressID(item.id);

  if (!Array.isArray(item?.delivery_charge_area_info)) {
    setDeliveryCharge(
      item?.delivery_charge_area_info?.delivery_charges?.split(" ")[1]
    );
    setDeliveryTime(item?.delivery_charge_area_info?.delivery_time);
    setMinOrderAmount(item?.delivery_charge_area_info?.minimum_order_amount);
    setNameEn(item?.delivery_charge_area_info?.name_en);

    localStorage.setItem("area_id", item?.delivery_charge_area_info.id);
  }

  getFullAddress(lat, lng, setFunction);
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
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
