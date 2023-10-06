import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar, { NavbarVariants } from "../../components/header";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Footer } from "../../components/footer/footerContent";
import { paths } from "../../routes/paths";
import customerRegistration from "../../api/customer/customerRegistration";

function PhoneNumberVerificationIndex() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [mobileCountryCode, setMobileCountryCode] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "country-code") {
      setMobileCountryCode(value);
    } else if (id === "phone-number") {
      setMobileNumber(value);
    }
  };

  const sendOTP = () => {
    // remove + from mobileCountryCode
    const mobileCountryCodeWithoutPlus = mobileCountryCode.substring(1);

    // navigate with query params
    navigate(
      paths.phone_verification_otp +
        "?" +
        createSearchParams({
          mobile: mobileNumber,
          mobile_country_code: mobileCountryCodeWithoutPlus,
        })
    );
  };

  const { mutate: registration, isLoading } = useMutation({
    mutationFn: customerRegistration,
    onSuccess: (data) => {
      sendOTP();
    },
  });

  const handleCustomerRegistration = () => {
    registration({
      first_name: searchParams.get("first_name"),
      last_name: searchParams.get("last_name"),
      email: searchParams.get("email"),
      mobile_number: mobileNumber,
      mobile_country_code: mobileCountryCode,
    });
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
        <Navbar variant={NavbarVariants.backWithProfile} />
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
              value={mobileCountryCode}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              id="phone-number"
              variant="outlined"
              placeholder="Mobile Number"
              sx={{
                flex: 3,
              }}
              value={mobileNumber}
              onChange={handleChange}
            />
          </Stack>

          <Button
            size="large"
            variant="contained"
            onClick={handleCustomerRegistration}
            disabled={isLoading}
          >
            Continue
          </Button>

          <Typography variant="body1" align="center" gutterBottom>
            Terms & Conditions apply
          </Typography>
        </Stack>

        <Footer showFooterSection={false} />
      </Stack>
    </>
  );
}

export default PhoneNumberVerificationIndex;
