import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar, { NavbarVariants } from "../../components/header";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Footer } from "../../components/footer";
import { paths } from "../../routes/paths";
import InfoModal from "../../components/modal/InfoModal";

const MODAL_INFO_TYPE = {
  INVALID_OTP: "invalid-otp",
  OTP_TIMEOUT: "otp-timeout",
};

function PhoneNumberVerificationOTP() {
  const navigate = useNavigate();

  const [otpTimeout, setOtpTimeout] = React.useState(60);
  const [infoType, setInfoType] = React.useState(MODAL_INFO_TYPE.INVALID_OTP);
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const handleChange = (otp) => {
    setOtp(otp);
    if (otp.length === 6) {
      navigate(paths.home);
    }
  };

  useEffect(() => {
    if (otpTimeout > 0) {
      let timer1 = setTimeout(() => setOtpTimeout(otpTimeout - 1), 100);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [otpTimeout]);

  const validateOTP = () => {
    setOtpTimeout(60);
    setInfoType(MODAL_INFO_TYPE.INVALID_OTP);
    setOpen(true);
  };

  useEffect(() => {
    if (otpTimeout === 0) {
      setInfoType(MODAL_INFO_TYPE.OTP_TIMEOUT);
      setOpen(true);
    }
  }, [otpTimeout]);

  useEffect(() => {
    if (otp.length === 4) {
      validateOTP();
    }
  }, [otp]);

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
              Please enter one time password below.
            </Typography>
          </Stack>

          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            TextFieldsProps={{
              placeholder: "0",
              disabled: otp.length === 4,
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    fontSize: "2rem",
                  },
                },
              },
            }}
          />

          <Typography variant="body1" align="center" gutterBottom>
            Enter the OTP in {otpTimeout} seconds
          </Typography>

          <Button
            variant="text"
            color="inherit"
            size="medium"
            disableRipple
            disableElevation
            sx={{
              p: 0,
              minHeight: "auto",
              minWidth: "auto",
              textTransform: "none",
              textDecoration: "underline",
              "&:hover": {
                backgroundColor: "inherit",
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              setOtpTimeout(60);
              setOpen(false);
              setOtp("");
            }}
          >
            Resend OTP
          </Button>
        </Stack>

        <Footer showCommentOption={false} />
      </Stack>

      <InfoModal
        open={open}
        setOpen={setOpen}
        infoText={
          infoType === MODAL_INFO_TYPE.INVALID_OTP
            ? "You’ve entered wrong OTP."
            : "You didn’t enter OTP."
        }
        actionButtonLabel="Resend OTP"
        actionButtonOnClick={() => {
          setOtpTimeout(60);
          setOpen(false);
          setOtp("");
        }}
      />
    </>
  );
}

export default PhoneNumberVerificationOTP;
