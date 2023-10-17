import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar, { NavbarVariants } from "../../components/header";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Footer } from "../../components/footer/footerContent";
import { paths } from "../../routes/paths";
import mobileLogin from "../../api/customer/mobileLogin";
import "./style.css";

const mobileLoginSchema = Yup.object().shape({
  mobile_no: Yup.string()
    .matches(/^\d{8}$/, "Mobile number must be exactly 8 digits")
    .required(),
  mobile_country_code: Yup.string()
    .matches(
      /^\+?(971|966|965|974|968|962|961|973|967|963|961|964|20|249|212|213|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|250|251|252|253|254|255|256|257|258|260|261|262|263|264|265|266|267|268|269|291|297|298|299|350|351|352|353|354|355|356|357|358|359|36|370|371|372|373|374|375|376|377|378|379|380|381|382|383|385|386|387|388|389|420|421|422|423|43|44|45|46|47|48|49)\d{0,3}$/
    )
    .test("is-valid-country-code", "Invalid country code", function (value) {
      if (!value) return true;
      if (value.startsWith("+")) {
        return /^\+\d{3}$/.test(value);
      } else {
        return /^\d{3}$/.test(value);
      }
    })
    .required(),
});

const initialState = {
  mobile_no: "",
  mobile_country_code: "",
};

function PhoneNumberVerificationIndex() {
  const navigate = useNavigate();
  const [mobileCountryCode, setMobileCountryCode] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");

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
    mutationFn: mobileLogin,
    onSuccess: (data) => {
      sendOTP();
    },
  });

  const formikUserMobileLogin = useFormik({
    initialValues: initialState,
    validationSchema: mobileLoginSchema,
    onSubmit: (values) => {
      setMobileCountryCode(values.mobile_country_code);
      setMobileNumber(values.mobile_no);

      registration({
        mobile: values.mobile_no,
        mobile_country_code: values.mobile_country_code,
      });
    },
  });

  const isFormError = Boolean(
    formikUserMobileLogin?.errors.mobile_country_code ||
      formikUserMobileLogin?.errors.mobile_no
  );

  return (
    <>
      <Stack
        sx={{
          minHeight: "70vh",
          color: "text.primary",
        }}
        justifyContent="space-between"
        spacing={2}
      >
        <div className="Phone-Nav">
          <Navbar variant={NavbarVariants.backWithProfile} />
        </div>
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
              id="mobile_country_code"
              variant="outlined"
              placeholder="+365"
              sx={{
                flex: 1,
              }}
              inputProps={{
                autoComplete: "country-code",
              }}
              name={"mobile_country_code"}
              value={formikUserMobileLogin?.values.mobile_country_code}
              onChange={formikUserMobileLogin?.handleChange}
              error={
                formikUserMobileLogin?.touched.mobile_country_code &&
                Boolean(formikUserMobileLogin?.errors.mobile_country_code)
              }
              helperText={
                formikUserMobileLogin?.touched.mobile_country_code &&
                formikUserMobileLogin?.errors.mobile_country_code
              }
            />

            <TextField
              fullWidth
              id="mobile_no"
              variant="outlined"
              placeholder="Mobile Number"
              sx={{
                flex: 3,
              }}
              inputProps={{
                autoComplete: "phone",
              }}
              name={"mobile_no"}
              value={formikUserMobileLogin?.values.mobile_no}
              onChange={formikUserMobileLogin?.handleChange}
              error={
                formikUserMobileLogin?.touched.mobile_no &&
                Boolean(formikUserMobileLogin?.errors.mobile_no)
              }
              helperText={
                formikUserMobileLogin?.touched.mobile_no &&
                formikUserMobileLogin?.errors.mobile_no
              }
            />
          </Stack>

          <Button
            size="large"
            variant="contained"
            onClick={formikUserMobileLogin?.handleSubmit}
            disabled={isLoading || !!isFormError}
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
