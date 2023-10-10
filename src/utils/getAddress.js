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
