import React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "../../components/header";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Footer } from "../../components/footer";
import { paths } from "../../routes/paths";

function PhoneNumberVerificationIndex() {
  const navigate = useNavigate();

  const sendOTP = () => {
    navigate(paths.phone_verification_otp);
  };

  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          color: "text.primary",
        }}
        justifyContent="space-between"
        spacing={2}
      >
        <Navbar />
        <Stack
          spacing={5}
          sx={{
            p: 3,
          }}
        >
          <Stack>
            <Typography variant="h5" align="center" gutterBottom>
              Verify Your Mobile Number
            </Typography>

            <Typography variant="body1" align="center" gutterBottom>
              You’ll receive a one time password shortly.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              id="country-code"
              variant="outlined"
              placeholder="+365"
              sx={{
                flex: 1,
              }}
            />

            <TextField
              fullWidth
              id="phone-number"
              variant="outlined"
              placeholder="Mobile Number"
              sx={{
                flex: 3,
              }}
            />
          </Stack>

          <Button size="large" variant="contained" fullWidth onClick={sendOTP}>
            Continue
          </Button>

          <Typography variant="body1" align="center" gutterBottom>
            Terms & Conditions apply
          </Typography>
        </Stack>

        <Footer showCommentOption={false} />
      </Stack>
    </>
  );
}

export default PhoneNumberVerificationIndex;
