import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CartItem from "../../components/shared/cart/CartItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ReactComponent as DollarIcon } from "../../assets/icons/dollar.svg";
import { ReactComponent as KNETIcon } from "../../assets/icons/knet.svg";
import { paths } from "../../routes/paths";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import { setThemeColor } from "../../store/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import cartList from "../../api/cart/cartList";
import CircularProgress from '@mui/material/CircularProgress';
import checkout from "../../api/cart/checkout";

function CartPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tipValue, setTipValue] = React.useState(0.25);
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartItems, setCartItems] = React.useState();
  const [specialIns, setSpecialIns] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("CASH");
  const DISCOUNT_AMOUNT = Number(1).toFixed(3);
  const DELIVERY_CHARGE = Number(1).toFixed(3);

  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cart.cart);

  const checkoutData = {
    payment_method_id: "1",
    order_total_price: "2.10",
    currency_id: "3",
    country_id: "3",
    restaurant_id: "2",
    branch_id: "1",
    driver_id: "1",
    address_id: "1",
    service_type: "pickup",
    tip_id: "1",
    pick_from_store: "",
    pickup_from_car: "",
    delivery_charges: "0",
    promo_code: "Test1",
    comments: specialIns
  }

  useEffect(() => {
    setCartItems(cart)
    setIsLoading(false)
  }, [cart])

  const checkoutHandler = () => {
     checkout(checkoutData, token)
      .then((res) => {
        window.location.href = res.data.checkout_url
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    let isCartEmpty = searchParams.get("empty");

    if(cart.length > 0){
      setCartItems(cart)
    }

    if (isCartEmpty === "true") {
      setCartItems((prevState) => {
        prevState = [];
        return prevState;
      });
    }
  }, []);

  useEffect(() => {
      cartRefetch()
  }, []);

  const cartRefetch = () => {
    if(cart.length == 0) {
    setTimeout(() => {
      cartList(token).then((res) => {
        setCartItems(res.data)
        setIsLoading(false)
      }).catch((err) => {
          setCartItems([])
        setIsLoading(false)
      })
      }, 500);
    }
  }

  const getItemTotal = () => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + (cartItem.unit_price || cartItem.totalPrice) * cartItem.quantity;
      // return acc + 100 * cartItem.quantity;
    }, 0).toFixed(3);
  };

  const getTipAmount = () => {
    return tipValue.toFixed(3);
  };

  const getDiscountAmount = () => {
    return DISCOUNT_AMOUNT;
  };

  const getDeliveryCharge = () => {
    return DELIVERY_CHARGE;
  };

  const getGrandTotal = () => {
    return (
      Number(getItemTotal()) +
      Number(getTipAmount()) -
      Number(getDiscountAmount()) +
      Number(getDeliveryCharge())
    ).toFixed(3);
  };
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(
    "14 August 2023, ASAP"
  );

  const scheduleOptions = [
    "14 August 2023, ASAP",
    "12 August 2023, 11:00 pm - 11:30 pm",
    "12 August 2023, 11:30 pm - 12:00 am",
    "12 August 2023, 12:00 am - 12:30 am",
    "12 August 2023, 12:30 am - 01:00 am",
    "12 August 2023, 01:00 am - 01:30 am",
    "12 August 2023, 01:30 am - 02:00 am",
  ];

  const handleScheduleOptionClick = (option) => {
    setSelectedSchedule(option);
    setOpenSchedulePopup(false); // Close the dialog after selecting an option
  };

  return (
    <Stack
      sx={{
        p: 3,
        minHeight: "100vh",
        color: "text.primary",
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          py: 1,
        }}
      >
        <IconButton
          size="medium"
          sx={{
            position: "absolute",
            left: 0,
            boxShadow: (theme) => theme.shadows[16],
          }}
          edge="start"
          onClick={() => navigate(paths.home)}
        >
          <ArrowBackRoundedIcon fontSize="medium" />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          sx={{
            mb: 0,
          }}
        >
          Your Cart
        </Typography>
        <div className="cartHeaderoption">
          <div className="cartHeaderoption-icon">
            <img src="/assets/img/Group 256.svg" alt="Option Icon" />
          </div>
        </div>
      </Stack>

      {cartItems && cartItems.length > 0 ? (
        <React.Fragment>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 2,
              bgcolor: "#F0F6F5",
              borderRadius: "12px",
            }}
            spacing={1}
          >
            <Typography variant="h6" fontWeight={400}>
              Your order from
            </Typography>

            <Box
              sx={{
                width: "132px",
                display: "flex",
                alignItems: "center",
                "& img": {
                  width: "100%",
                  height: "auto",
                },
              }}
            >
              <img src="/assets/img/Group 15.svg" alt="Restaurant Logo" />
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FAFAFA",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6">Delivering To</Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  display: "flex",
                  maxWidth: "200px",
                }}
              >
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                1234, Street Name, City Name, Country Name
              </Typography>
            </Stack>

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
                "& .MuiButton-endIcon > *:nth-of-type(1)": {
                  fontSize: "16px",
                },
              }}
              onClick={() => navigate(paths.location)}
            >
              Change
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FAFAFA",
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={1}>
              <Typography>Estimated Delivery Time:</Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    maxWidth: "200px",
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: (theme) => theme.palette.themeColor.main,
                      color: "common.white",
                      p: 1,
                      borderRadius: "8px",
                    }}
                    spacing={0}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      sx={{
                        lineHeight: 1,
                      }}
                    >
                      30
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={300}
                      sx={{
                        lineHeight: 1,
                      }}
                    >
                      minutes
                    </Typography>
                  </Stack>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#026754",
                    fontFamily: "Titillium Web, sans-serif", // Set the font family
                    fontWeight: 600, // Set the font weight
                    fontSize: "14px", // Set the font size
                    lineHeight: "24px", // Set the line height
                  }}
                >
                  {selectedSchedule}
                </Typography>
              </Stack>
            </Stack>

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
                "& .MuiButton-endIcon > *:nth-of-type(1)": {
                  fontSize: "16px",
                },
              }}
              onClick={() => setOpenSchedulePopup(true)}
            >
              Schedule
            </Button>
          </Stack>
          <Dialog
            open={openSchedulePopup}
            onClose={() => setOpenSchedulePopup(false)}
            
            sx={{
              margin: "0",
              textAlign: "center",
            }}
            PaperProps={{
              sx: {
                overflow: "visible",
                margin: "0",
                height: "275px",
                bottom: "0",
                position: "fixed",
                width: "375px",
                left: "0",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                paddingTop: "20px",
                '@media (max-width: 600px)': {
                  width: '100%', 
                },
              },
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenSchedulePopup(false)}
              sx={{
                position: "absolute",
                top: "-16px",
                right: "18px",
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle>Select time</DialogTitle>
            <DialogContent
              sx={{
                fontFamily: "Titillium Web, sans-serif", // Set the font family
                fontWeight: 600, // Set the font weight
              }}
            >
              {scheduleOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleScheduleOptionClick(option)}
                  style={{
                    cursor: "pointer",

                    color: selectedSchedule === option ? "#026754" : "inherit",
                  }}
                >
                  {option}
                </div>
              ))}
            </DialogContent>
          </Dialog>
          <Stack spacing={2}>
            <Typography variant="h5">
              Your Items
              {cartItems.length > 0 ? ` (s)` : ""}
            </Typography>

            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => {
                return <CartItem key={cartItem.id} {...cartItem} cartRefetch={cartRefetch} />;
              })
            ) : (
              <Typography variant="body1">No items in your cart</Typography>
            )}
          </Stack>

          <TextField
            id="special-instructions"
            placeholder="Special Instructions (Optional)"
            InputProps={{ disableUnderline: true }}
            multiline
            onChange={(text) => setSpecialIns(text.target.value)}
            value={specialIns}
            rows={2}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FAFAFA",
                border: "none",
              },
            }}
            variant="outlined"
          />

          <TextField
            id="promo-code"
            placeholder="Promo Code"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FAFAFA",
                "& input": {
                  "&::placeholder": {
                    fontWeight: 700,
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#44D7B6",
                    "&:hover": {
                      bgcolor: "#44D7B6",
                    },
                  }}
                  disableElevation
                  disableRipple
                >
                  Apply
                </Button>
              ),
            }}
          />

          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Tip the Driver
            </Typography>

            <Stack direction="row" justifyContent="space-between" spacing={1}>
              {[0.25, 0.5, 1.0].map((tip) => (
                <Box
                  key={tip + "tip"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "8px",
                    height: "88px",
                    width: "88px",
                    bgcolor: "primary.main",
                    color: "common.white",
                    cursor: "pointer",
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    ...(tipValue !== tip && {
                      bgcolor: "common.white",
                      color: "text.secondary",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }),
                    boxShadow: (theme) => theme.shadows[7],
                  }}
                  onClick={() => setTipValue(tip)}
                >
                  <SvgIcon
                    fontSize="large"
                    inheritViewBox
                    component={DollarIcon}
                    sx={{
                      mb: 1,
                    }}
                  />

                  <Typography variant="body1" fontWeight={600}>
                    {`KWD ${Number(tip).toFixed(3)}`}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Order summary
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">
                Item
                {cartItems.length > 1 ? `(s)` : ""} Total
              </Typography>
              <Typography variant="body1">{`KWD ${getItemTotal()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Tip</Typography>
              <Typography variant="body1">{`KWD ${getTipAmount()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1">{`KWD -${getDiscountAmount()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Delivery Cost</Typography>
              <Typography variant="body1">{`KWD ${getDeliveryCharge()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Total Payment</Typography>
              <Typography variant="body1">{`KWD ${getGrandTotal()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" spacing={1}>
              {[
                {
                  icon: (
                    <SvgIcon
                      fontSize="large"
                      inheritViewBox
                      component={DollarIcon}
                      sx={{
                        mb: 1,
                      }}
                    />
                  ),
                  name: "CASH",
                },
                {
                  icon: (
                    <SvgIcon
                      fontSize="large"
                      inheritViewBox
                      component={KNETIcon}
                      sx={{
                        mb: 1,
                      }}
                    />
                  ),
                  name: "KNET",
                },
                {
                  icon: <img src="/assets/img/credit card.png"></img>,
                  name: "Credit Card",
                },
              ].map((method) => (
                <Box
                  key={method.name + "method"}
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "8px",
                    height: "88px",
                    width: "88px",
                    cursor: "pointer",
                    bgcolor: "common.white",
                    color: "text.secondary",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    boxShadow: (theme) => theme.shadows[7],
                  }}
                  onClick={() => setPaymentMethod(method.name)}
                >
                  {method.icon}

                  {paymentMethod === method.name && (
                    <CheckCircleIcon
                      sx={{
                        position: "absolute",
                        right: "-5px",
                        top: "-5px",
                        color: "#32C5FF",
                      }}
                      fontSize="small"
                    />
                  )}

                  <Typography variant="body1" fontWeight={600}>
                    {method.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Button onClick={() => checkoutHandler()} variant="contained" size="large">
            Pay Now
          </Button>
        </React.Fragment>
      ) : (
       <> {!isLoading ? <Stack justifyContent="center" alignItems="center" sx={{ pt: 15 }}>
          <Typography variant="h5" fontWeight={500}>
            Your cart is empty
          </Typography>

          <Box sx={{ pt: 5 }}>
            <img src="/assets/img/cart.svg" alt="Empty Cart" />
          </Box>

          <Typography
            variant="body1"
            align="center"
            fontWeight={400}
            gutterBottom
            gap={1}
            sx={{
              whiteSpace: "pre-line",
              mb: 2,
              pt: 4,
            }}
          >
            {`Looks like you have not added anything\n to your cart.\n Go ahead & explore something`}
          </Typography>

          <Button
            sx={{
              width: "184px",
              height: "56px",
              mt: 5,
            }}
            variant="contained"
            size="large"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack> : 
        <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "100px !important" }}>
          <CircularProgress />
        </Box>
        }
        </>
      )}
    </Stack>
  );
}

export default CartPage;
