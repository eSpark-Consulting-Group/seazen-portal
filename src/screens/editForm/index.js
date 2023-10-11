import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
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
import { addUserInfo } from "../../store/reducers/authSlice";

const updateProfileFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  last_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i)
    .max(40)
    .required(),
  email: Yup.string().email().required(),
  mobile_no: Yup.string()
  .matches(/^\d{8}$/, 'Mobile number must be exactly 8 digits')
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

export const UpdateCustomerProfile = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const initialState = {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    email: userInfo?.email,
    mobile_no: userInfo?.mobile,
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
      dispatch(addUserInfo(values));
      updateCustomerProfileInfo({
        token,
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          mobile_country_code: values.mobile_country_code,
          mobile_number: values.mobile_no,
        },
      });
    },
  });

  const isFormError = Boolean(
    formikUpdateCustomerProfile?.errors.first_name ||
      formikUpdateCustomerProfile?.errors.last_name ||
      formikUpdateCustomerProfile?.errors.email ||
      formikUpdateCustomerProfile?.errors.mobile_country_code ||
      formikUpdateCustomerProfile?.errors.mobile_no
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
                    formikUpdateCustomerProfile?.errors.first_name
                  ) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"first_name"}
              value={formikUpdateCustomerProfile?.values.first_name}
              onChange={formikUpdateCustomerProfile?.handleChange}
              error={
                formikUpdateCustomerProfile?.touched.first_name &&
                Boolean(formikUpdateCustomerProfile?.errors.first_name)
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
                  ...(Boolean(
                    formikUpdateCustomerProfile?.errors.last_name
                  ) && {
                    color: "error.main",
                  }),
                },
              }}
              name={"last_name"}
              value={formikUpdateCustomerProfile?.values.last_name}
              onChange={formikUpdateCustomerProfile?.handleChange}
              error={
                formikUpdateCustomerProfile?.touched.last_name &&
                Boolean(formikUpdateCustomerProfile?.errors.last_name)
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
            value={formikUpdateCustomerProfile?.values.email}
            onChange={formikUpdateCustomerProfile?.handleChange}
            error={
              formikUpdateCustomerProfile?.touched.email &&
              Boolean(formikUpdateCustomerProfile?.errors.email)
            }
            helperText={
              formikUpdateCustomerProfile?.touched.email &&
              formikUpdateCustomerProfile?.errors.email
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
              value={formikUpdateCustomerProfile?.values.mobile_country_code}
              onChange={formikUpdateCustomerProfile?.handleChange}
              error={
                formikUpdateCustomerProfile?.touched.mobile_country_code &&
                Boolean(formikUpdateCustomerProfile?.errors.mobile_country_code)
              }
              helperText={
                formikUpdateCustomerProfile?.touched.mobile_country_code &&
                formikUpdateCustomerProfile?.errors.mobile_country_code
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
              value={formikUpdateCustomerProfile?.values.mobile_no}
              onChange={formikUpdateCustomerProfile?.handleChange}
              error={
                formikUpdateCustomerProfile?.touched.mobile_no &&
                Boolean(formikUpdateCustomerProfile?.errors.mobile_no)
              }
              helperText={
                formikUpdateCustomerProfile?.touched.mobile_no &&
                formikUpdateCustomerProfile?.errors.mobile_no
              }
            />
          </Stack>
          <Button
            size="large"
            variant="contained"
            disabled={!!isFormError}
            fullWidth
            onClick={formikUpdateCustomerProfile?.handleSubmit}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
