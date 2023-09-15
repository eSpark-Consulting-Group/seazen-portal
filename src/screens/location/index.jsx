import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Autocomplete from "@mui/material/Autocomplete";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
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
  const [placeDetails, setPlaceDetails] = React.useState(null);

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

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  React.useEffect(() => {
    // fetch place details for the first element in placePredictions array
    console.log(placesService, "placesService");
    console.log(placePredictions, "placePredictions");
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => setPlaceDetails(placeDetails)
      );
  }, [placePredictions]);

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
            onClick={() => navigate(paths.cart)}
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
        <Box
          sx={{
            boxSizing: "border-box",
            px: 1.5,
            py: 1,
            width: "100%",
            backgroundColor: "background.paper",
            borderRadius: 1,
            boxShadow: (theme) => theme.shadows[16],
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SvgIcon
            sx={{
              stroke: (theme) => theme.palette.primary.main,
              fill: "none",
              width: "1.5rem",
            }}
            component={SearchIcon}
            fontSize="large"
          />

          <Autocomplete
            style={{
              width: "calc(100% - 2rem)",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              outline: "none",
              border: "none",
            }}
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            onPlaceSelected={(place) => {
              console.log(place);
              setCenter({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
              setPlaceDetails(place);
            }}
          />
        </Box>

        {/* // <Autocomplete
        //   sx={{
        //     "& .MuiFormControl-root": {
        //       backgroundColor: "background.paper",
        //       borderRadius: 1,
        //     },
        //   }}
        //   onChange={(event, value) => {
        //     console.log(value, "value");
        //     getPlacePredictions({
        //       input: value,
        //     });
        //   }}
        //   options={placePredictions.map((prediction) => prediction.description)}
        //   loading={isPlacePredictionsLoading}
        //   renderInput={(params) => (
        //     <TextField
        //       InputProps={{
        //         startAdornment: (
        //           <SvgIcon component={SearchIcon} fontSize="large" />
        //         ),
        //       }}
        //       {...params}
        //       label="Search"
        //       variant="outlined"
        //     />
        //   )}
        // /> */}
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
          <Marker
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
            // icon={<LocationOnIcon color="primary" />}
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
          Pinned Address: {placeDetails?.formatted_address}
        </Typography>
        <Button size="large" fullWidth variant="contained">
          Confirm Your Location
        </Button>
      </Stack>
    </Stack>
  );
}

export default LocationPage;
