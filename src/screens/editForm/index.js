import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar, { NavbarVariants } from "../../components/header";
import updateProfile from "../../api/customer/updateProfile";
import { paths } from "../../routes/paths";
import "./style.css";
import { useSelector } from "react-redux";

const updateProfileFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  last_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  email: Yup.string().email(),
  mobile_number: Yup.string().required(),
  mobile_country_code: Yup.string().required(),
});

export const UpdateCustomerProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Initialize state variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const userInfo = useSelector((state) => {
    state.auth.user;
  });

  const initialState = {
    first_name: userInfo?.name,
    last_name: userInfo?.name,
    email: userInfo?.email,
    mobile_number: userInfo?.mobile,
    mobile_country_code: userInfo?.mobile_country_code,
  };

  const { mutate: updateCustomerProfileInfo, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      navigate(paths.profile);
    },
  });

  const formikUpdateCustomerProfile = useFormik({
    initialValues: initialState,
    validationSchema: updateProfileFormSchema,
    onSubmit: (values) => {
      updateCustomerProfileInfo({
        token,
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          mobile_country_code: values.mobile_country_code,
          mobile_number: values.mobile_number,
        },
      });
    },
  });

  const isFormError = Boolean(
    formikUpdateCustomerProfile.errors.first_name ||
      formikUpdateCustomerProfile.errors.last_name ||
      formikUpdateCustomerProfile.errors.email ||
      formikUpdateCustomerProfile.errors.mobile_country_code ||
      formikUpdateCustomerProfile.errors.mobile_number
  );

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        color: "text.primary",
      }}
      spacing={2}
    >
      <Navbar variant={NavbarVariants.backWithProfile} />
      <Stack
        spacing={5}
        justifyContent="center"
        sx={{
          p: 3,
          height: `calc(100vh - 56px)`,
        }}
      >
        <Stack>
          <Typography variant="h5" align="center" gutterBottom>
            Edit Your Profile
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              id="first-name"
              variant="outlined"
              placeholder="First Name"
              sx={{
                flex: 1,
                "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                  ...(Boolean(
                    formikUpdateCustomerProfile.errors.first_name
                  ) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"first_name"}
              value={formikUpdateCustomerProfile.values.first_name}
              onChange={formikUpdateCustomerProfile.handleChange}
              error={
                formikUpdateCustomerProfile.touched.first_name &&
                Boolean(formikUpdateCustomerProfile.errors.first_name)
              }
            />

            <TextField
              fullWidth
              id="last-name"
              variant="outlined"
              placeholder="Last Name"
              sx={{
                flex: 1,
                "& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder": {
                  ...(Boolean(formikUpdateCustomerProfile.errors.last_name) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"last_name"}
              value={formikUpdateCustomerProfile.values.last_name}
              onChange={formikUpdateCustomerProfile.handleChange}
              error={
                formikUpdateCustomerProfile.touched.last_name &&
                Boolean(formikUpdateCustomerProfile.errors.last_name)
              }
            />
          </Stack>

          <TextField
            fullWidth
            id="email"
            variant="outlined"
            placeholder="Email (optional)"
            sx={{
              flex: 1,
            }}
            name={"email"}
            InputProps={{
              autoComplete: "email",
            }}
            value={formikUpdateCustomerProfile.values.email}
            onChange={formikUpdateCustomerProfile.handleChange}
            error={
              formikUpdateCustomerProfile.touched.email &&
              Boolean(formikUpdateCustomerProfile.errors.email)
            }
            helperText={
              formikUpdateCustomerProfile.touched.email &&
              formikUpdateCustomerProfile.errors.email
            }
          />

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
              value={formikUpdateCustomerProfile.values.mobile_country_code}
              onChange={formikUpdateCustomerProfile.handleChange}
              error={
                formikUpdateCustomerProfile.touched.mobile_country_code &&
                Boolean(formikUpdateCustomerProfile.errors.mobile_country_code)
              }
              helperText={
                formikUpdateCustomerProfile.touched.mobile_country_code &&
                formikUpdateCustomerProfile.errors.mobile_country_code
              }
            />

            <TextField
              fullWidth
              id="mobile_number"
              variant="outlined"
              placeholder="Mobile Number"
              sx={{
                flex: 3,
              }}
              inputProps={{
                autoComplete: "phone",
              }}
              name={"mobile_number"}
              value={formikUpdateCustomerProfile.values.mobile_number}
              onChange={formikUpdateCustomerProfile.handleChange}
              error={
                formikUpdateCustomerProfile.touched.mobile_number &&
                Boolean(formikUpdateCustomerProfile.errors.mobile_number)
              }
              helperText={
                formikUpdateCustomerProfile.touched.mobile_number &&
                formikUpdateCustomerProfile.errors.mobile_number
              }
            />
          </Stack>
          <Button
            size="large"
            variant="contained"
            disabled={!!isFormError}
            fullWidth
            onClick={formikUpdateCustomerProfile.handleSubmit}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
