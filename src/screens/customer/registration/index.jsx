import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Stack, Button, TextField, Typography } from "@mui/material";

import Navbar from // NavbarVariants
"../../../components/header";
import { Footer } from "../../../components/footer/footerContent";

import updateProfile from "../../../api/customer/updateProfile";

import { addUserInfo } from "../../../store/reducers/authSlice";

import { paths } from "../../../routes/paths";

import "./style.css";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
};

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  last_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  email: Yup.string().email().required(),
});

function CustomerRegistration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem("token");

  const formikCustomerRegistration = useFormik({
    initialValues: initialState,
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      const mobile_country_code = "+" + searchParams.get("mobile_country_code");
      const mobile_number = searchParams.get("mobile");

      const userInfo = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        mobile_country_code: mobile_country_code,
        mobile_number: mobile_number,
      };

      updateCustomerInfo({
        token,
        data: userInfo,
      });
    },
  });

  const { mutate: updateCustomerInfo, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const info = {
        customer_id: data?.data?.customer_id,
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        email: data?.data?.email,
        mobile_country_code: data?.data?.mobile_country_code,
        mobile_no: data?.data?.mobile_no,
      };
      dispatch(addUserInfo(info));

      navigate(paths.profile);
    },
  });

  const { first_name, last_name } = formikCustomerRegistration.errors;
  const isFormError = first_name || last_name;

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
      justifyContent="space-between"
      spacing={2}
    >
      <div style={{ padding: "20px 12px 0px 8px" }}>
        <Navbar backIcon logo languageIcon />
      </div>{" "}
      <Stack
        spacing={5}
        sx={{
          p: 3,
        }}
      >
        <Stack>
          <Typography variant="h5" align="center" gutterBottom>
            Enter Your Details
          </Typography>

          <Typography variant="body1" align="center" gutterBottom>
            Please fill the fields below.
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
                  ...(Boolean(formikCustomerRegistration.errors.first_name) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"first_name"}
              value={formikCustomerRegistration.values.first_name}
              onChange={formikCustomerRegistration.handleChange}
              error={
                formikCustomerRegistration.touched.first_name &&
                Boolean(formikCustomerRegistration.errors.first_name)
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
                  ...(Boolean(formikCustomerRegistration.errors.last_name) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"last_name"}
              value={formikCustomerRegistration.values.last_name}
              onChange={formikCustomerRegistration.handleChange}
              error={
                formikCustomerRegistration.touched.last_name &&
                Boolean(formikCustomerRegistration.errors.last_name)
              }
            />
          </Stack>

          <TextField
            fullWidth
            id="email"
            variant="outlined"
            placeholder="Email"
            sx={{
              flex: 1,
            }}
            name={"email"}
            value={formikCustomerRegistration.values.email}
            onChange={formikCustomerRegistration.handleChange}
            error={
              formikCustomerRegistration.touched.email &&
              Boolean(formikCustomerRegistration.errors.email)
            }
            helperText={
              formikCustomerRegistration.touched.email &&
              formikCustomerRegistration.errors.email
            }
          />
        </Stack>
        <Button
          size="large"
          variant="contained"
          disabled={!!isFormError}
          fullWidth
          onClick={formikCustomerRegistration.handleSubmit}
        >
          Continue
        </Button>

        <Typography variant="body1" align="center" gutterBottom>
          Terms & Conditions apply
        </Typography>
      </Stack>
      <Footer showCommentOption={false} />
    </Stack>
  );
}

export default CustomerRegistration;
