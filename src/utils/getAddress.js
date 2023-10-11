import { RequestType, geocode, setKey } from "react-geocode";

export const getFullAddress = (lat, lng, setFullAddress) => {
  setKey(process.env.REACT_APP_GOOGLE_API_KEY);

  geocode(RequestType.LATLNG, `${lat},${lng}`, {
    enable_address_descriptor: true,
  })
    .then(({ results }) => {
      const address = results[0].formatted_address;
      const lat = results[0].geometry.location.lat;
      const lng = results[0].geometry.location.lng;

      const addToRedux = {
        lat: lat,
        lng: lng,
        address: address,
      };
      setFullAddress(addToRedux);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2)  =>{
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
}

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}