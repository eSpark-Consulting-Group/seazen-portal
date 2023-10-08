import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  GoogleMap,
  InfoWindowF,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

import { setKey, geocode, RequestType } from "react-geocode";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Box,
  Stack,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

// import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

// import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
// import SearchIcon from "../../assets/icons/Icon - Search.jpg";
import LocationGreen from "../../assets/icons/location-green.png";
import LocationRed from "../../assets/icons/location-red.png";

// import LocationOnIcon from "@mui/icons-material/LocationOn";
import { paths } from "../../routes/paths";

import "./style.css";
import { useQuery } from "@tanstack/react-query";
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours";
import { useDispatch } from "react-redux";
import { addAddressDetail } from "../../store/reducers/addressSlice";

const containerStyle = {
  width: "100%",
  height: "90vh",
  marginTop: "0",
};

const defaultMapOptions = {
  scaleControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  rotateControl: false,
  disableDefaultUI: true,
  keyboardShortcuts: false,
  clickableIcons: false,
  draggable: true,
};

const lib = ["places"];

function LocationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: lib,
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    setKey(process.env.REACT_APP_GOOGLE_API_KEY);
  }, []);

  // get current location of user and set it as center
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    if (location?.state?.latlng !== undefined) {
      const lat = location?.state?.latlng.lat;
      const lng = location?.state?.latlng.lng;
      setCenter({ lat, lng });
      setAddress(location?.state?.name);
    }
  }, [location?.state]);

  useEffect(() => {
    if (location?.state?.latlng === undefined) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          getAdd(position.coords.latitude, position.coords.longitude);
        },
        () => {}
      );
    }
  }, []);

  const { data } = useQuery({
    queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY],
    queryFn: () => getRestaurantBranchHours(location.state.restaurant_id),
    onSuccess: (data) => {},
  });

  useLayoutEffect(() => {
    if (data) {
      if (data?.status === "ok") {
        data.data?.forEach((res) => {
          const resLat = +res.latitude;
          const resLng = +res.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            center.lat,
            center.lng
          );

          if (distance > 50) {
            setDistanceIsFar(true);
          } else {
            setDistanceIsFar(false);
          }
        });
      }
    }
  }, [data, center]);

  const getAdd = async (lat, lng) => {
    geocode(RequestType.LATLNG, `${lat},${lng}`, {
      enable_address_descriptor: true,
    })
      .then(({ results }) => {
        const address = results[0].formatted_address;
        const lat = results[0].geometry.location.lat;
        const lng = results[0].geometry.location.lng;
        setAddress(address);
        setCenter({ lat, lng });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCenter({ lat, lng });
      setAddress(autocomplete.getPlace().formatted_address);
    }
  };

  const handleLoad = (map) => {
    mapRef.current = map;
  };

  const handleCenterChanged = async () => {
    if (!mapRef.current) return;
    const lat = await mapRef?.current?.center?.lat();
    const lng = await mapRef?.current?.center?.lng();
    getAdd(lat, lng);
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const confirmLocation = () => {
    navigate(paths.address, {
      state: { name: address, latlng: center },
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        position: "relative",
      }}
      className="parent-stack"
    >
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          position: "absolute",
          zIndex: (theme) => theme.zIndex.appBar,
          top: 0,
          p: 3,
          backgroundColor: "transparent",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ backgroundColor: "transparent" }}
        >
          <IconButton
            size="large"
            sx={{
              boxShadow: (theme) => theme.shadows[16],
            }}
            edge="start"
            onClick={() => navigate(-1)}
          >
            <ArrowBackRoundedIcon fontSize="large" />
          </IconButton>
          <div className="d-flex align-items-center logo">
            <img src="/assets/img/Logo.png" alt="Logo" />
          </div>
          <IconButton
            size="large"
            sx={{
              boxShadow: (theme) => theme.shadows[16],
            }}
            edge="end"
            onClick={() => navigate(-1)}
          >
            <SvgIcon component={ProfileIcon} fontSize="large" />
          </IconButton>
        </Stack>

        {isLoaded ? (
          <Autocomplete
            className="autocomplete"
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <div className="dp-fl">
              {/* <img src={SearchIcon} alt="Search Icon" className="icon" /> */}
              <input
                id="autocomplete"
                type="text"
                placeholder="Search an address"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </Autocomplete>
        ) : null}

        {/* <PlacesAutocomplete
          setSelected={setCenter}
          setAddress={setAddress}
          address={address}
          location={location.state}
        />  */}
      </Stack>
      {!isLoaded ? (
        <div className="progress-bar">
          <CircularProgress className="bar" />
        </div>
      ) : (
        <GoogleMap
          onLoad={handleLoad}
          onDragEnd={handleCenterChanged}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={defaultMapOptions}
          ref={mapRef}
          mapContainerClassName="GOOGLE"
        >
          <div className="marker">
            <img src={distanceIsFar ? LocationRed : LocationGreen} />
          </div>

          {/* <MarkerF
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
            icon={{
              url: LocationGreen,
            }}
          /> */}

          {/* <InfoWindowF
              position={{
                lat: center.lat,
                lng: center.lng,
              }} */}

          {distanceIsFar ? (
            <Box className="info-window-box">
              <Typography variant="h5">
                {location.state.restaurantName} dosen&apos;t deliver here
              </Typography>
              <Typography variant="h5">
                Please choose another location
              </Typography>
            </Box>
          ) : null}

          {/* </InfoWindowF> */}
        </GoogleMap>
      )}

      <Stack
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography fontWeight="semi-bold" gutterBottom>
          Pinned Address: {isLoaded ? address : null}
        </Typography>
        <Button
          size="large"
          fullWidth
          variant="contained"
          className="confirm-button"
          onClick={() => confirmLocation()}
          disabled={address === ""}
        >
          Confirm Your Location
        </Button>
      </Stack>
    </Stack>
  );
}

export default LocationPage;

const PlacesAutocomplete = ({ setSelected, setAddress, address, location }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [remov, setRemov] = useState(false);

  const handleSelect = async (address) => {
    setRemov(true);
    setAddress(address);
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  useEffect(() => {
    if (address !== "") {
      setValue(address, false);
    }
  }, [address]);

  const [loc, setLoc] = useState(null);

  useEffect(() => {
    if (address === "") {
      setLoc(null);
    } else {
      setLoc(location);
    }
  }, [address]);

  useEffect(() => {
    if (loc === null) {
      setRemov(true);
    }
  }, [loc]);

  return (
    <Combobox onSelect={handleSelect} className="combobox">
      <ComboboxInput
        value={loc === null ? value : address}
        onChange={(e) => {
          setRemov(false);
          loc === null ? setValue(e.target.value) : setAddress(e.target.value);
        }}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
        onClick={() => loc === null && setRemov(false)}
      />

      {!remov ? (
        <ComboboxPopover className="combobox-popover">
          <ComboboxList className="combobox-list">
            {status === "OK" &&
              data.map(({ place_id, description }, index) => (
                <div key={place_id} className="combobox-parent">
                  <ComboboxOption
                    value={description}
                    className="combobox-option"
                  />
                  {data.length - 1 === index ? null : (
                    <span className="border" />
                  )}
                </div>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      ) : (
        false
      )}
    </Combobox>
  );
};
