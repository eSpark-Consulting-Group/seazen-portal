import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { paths } from "../../routes/paths";


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
};

function LocationPage() {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // get current location of user and set it as center
  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {}
    );
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        position: "relative",
      }}
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

        <PlacesAutocomplete setSelected={setCenter} />
      </Stack>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={defaultMapOptions}
        >
          <MarkerF
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
            icon={<LocationOnIcon color="primary" />}
          />
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
          Pinned Address: {center.lat}, {center.lng}
        </Typography>
        <Button
          size="large"
          fullWidth
          variant="contained"
          onClick={() => {
            navigate(paths.address);
          }}
        >
          Confirm Your Location
        </Button>
      </Stack>
    </Stack>
  );
}

export default LocationPage;

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
