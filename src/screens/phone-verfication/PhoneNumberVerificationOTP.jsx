import React, { useEffect } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar, { NavbarVariants } from "../../components/header";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Footer } from "../../components/footer/footerContent";
import { paths } from "../../routes/paths";
import InfoModal from "../../components/modal/InfoModal";
import { useMutation } from "@tanstack/react-query";
import verifyOTP from "../../api/customer/verifyOTP";
import resendOTP from "../../api/customer/resendOTP";
import getUserInfo from "../../api/customer/getUserInfo";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import addToCartApiCall from "../../api/cart/addToCart";
import { addToCart } from "../../store/reducers/cartSlice";
import { addUserInfo } from "../../store/reducers/authSlice";

const MODAL_INFO_TYPE = {
  INVALID_OTP: "invalid-otp",
  OTP_TIMEOUT: "otp-timeout",
};

function PhoneNumberVerificationOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [otpTimeout, setOtpTimeout] = React.useState(60);
  const [infoType, setInfoType] = React.useState(MODAL_INFO_TYPE.INVALID_OTP);
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [mobileCountryCode, setMobileCountryCode] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const { mutate: verifyOtp } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);

      getUserInfo(data.data.token).then((res) => {
        const { first_name, last_name } = res.data;
        const mobileCountryCodeWithoutPlus = mobileCountryCode.substring(1);

        if (location?.state?.guest !== undefined) {
          const cartItem = location?.state?.ItemDataObject;
          const token = data.data.token;

          dispatch(addToCart(cartItem));
          addToCartApiHandler(cartItem, token);
        }

        if (location?.state?.autoRedirect !== undefined) {
          const cartItemDataForApi = location?.state?.cartItemDataForApi;
          const inCart = location?.state?.addtoCart;
          const token = data.data.token;

          dispatch(addToCart(inCart));
          addToCartApiCall(cartItemDataForApi, token)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        }

        dispatch(addUserInfo(res.data));

        first_name && last_name
          ? location?.state?.guest !== undefined ||
            location?.state?.autoRedirect !== undefined
            ? navigate(
                `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
              )
            : navigate(paths.home)
          : navigate(
              paths.customer_registration +
                "?" +
                createSearchParams({
                  mobile: mobileNumber,
                  mobile_country_code: mobileCountryCodeWithoutPlus,
                })
            );
      });
    },
    onError: (error) => {
      setInfoType(MODAL_INFO_TYPE.INVALID_OTP);
      setOpen(true);
    },
  });

  const variantsForApi = (variantID, optionId, quantity) => {
    const menuItemDetails = location?.state?.menuItemDetails;
    const { data } = menuItemDetails;

    const dataVariants = data.variants?.find((val) => val.id === variantID);

    if (!dataVariants) return [];
    const dataOptions = dataVariants.options?.map((val, index) => {
      return {
        option_id: val.id,
        option_quantity:
          val.id == (optionId[index] || optionId)
            ? quantity[index]?.quantity || 1
            : 0,
      };
    });
    return dataOptions;
  };

  const getSelectedItemsIds = (selectedItems) => {
    const idsArr = selectedItems.map((val) => val.id);

    return idsArr;
  };

  const addToCartApiHandler = (cartItem, token) => {
    const sideVariant = cartItem?.variants?.sideVariant[0]?.variantId;
    const sizeVariant = cartItem?.variants?.sizeVariant?.variantId;
    const toppingVariant = cartItem?.variants?.toppingVariant[0]?.variantId;
    const customVariant = cartItem?.variants?.customVariant[0]?.variantId;

    const cartItemDataForApi = {
      item_code: cartItem.item_code,
      item_id: cartItem.id,
      quantity: cartItem.quantity,
      topping_variant_id: toppingVariant || null,
      side_variant_id: sideVariant || null,
      size_variant_id: sizeVariant || null,
      custom_variant_id: customVariant || null,
      size_variant: variantsForApi(
        sizeVariant,
        cartItem.variants?.sizeVariant?.id
      ),
      topping_variant: variantsForApi(
        toppingVariant,
        getSelectedItemsIds(cartItem.variants?.toppingVariant),
        cartItem.variants?.toppingVariant[0]?.quantity
      ),
      custom_variant: variantsForApi(
        customVariant,
        getSelectedItemsIds(cartItem.variants?.customVariant),
        cartItem.variants?.customVariant
      ),
      side_variant: variantsForApi(
        sideVariant,
        getSelectedItemsIds(cartItem.variants?.sideVariant)
      ),
      branch_id: cartItem?.branch_id,
    };

    addToCartApiCall(cartItemDataForApi, token)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const { mutate: resendOtp } = useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      setOtpTimeout(60);
      setOpen(false);
      setOtp("");
    },
  });

  useEffect(() => {
    if (otpTimeout > 0) {
      let timer1 = setTimeout(() => setOtpTimeout(otpTimeout - 1), 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [otpTimeout]);

  const validateOTP = () => {
    const mobile_country_code = "+" + searchParams.get("mobile_country_code");
    const mobile_number = searchParams.get("mobile");

    setMobileCountryCode(mobile_country_code);
    setMobileNumber(mobile_number);

    verifyOtp({ mobile_country_code, mobile_number, otp });
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
          minHeight: "70vh",
          color: "text.primary",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
        justifyContent="space-between"
        spacing={2}
      >
        <div style={{ padding: 8 }}>
          <Navbar
            backIcon
            logo
            languageIcon
            location={location?.state}
            path={location?.state?.path}
            autoRedirect={location?.state?.autoRedirect}
            register={location?.state?.register}
          />
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
              Please enter one time password below.
            </Typography>
          </Stack>

          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            TextFieldsProps={{
              className: "otp-input",
              type: "number",
              placeholder: "0",
              disabled: otp.length === 4,
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    fontSize: "2rem",
                  },
                  "& input:focus::placeholder ": {
                    color: "transparent",
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
              resendOtp({
                mobile_country_code:
                  "+" + searchParams.get("mobile_country_code"),
                mobile_number: searchParams.get("mobile"),
              });
            }}
          >
            Resend OTP
          </Button>
        </Stack>

        <Footer showFooterSection={false} />
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
          resendOtp({
            mobile_country_code: "+" + searchParams.get("mobile_country_code"),
            mobile_number: searchParams.get("mobile"),
          });
        }}
      />
    </>
  );
}

export default PhoneNumberVerificationOTP;
