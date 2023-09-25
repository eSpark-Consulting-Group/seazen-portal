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
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions } from "@mui/material";

let CART_ITEMS = [
  {
    id: 1,
    item: {
      name: "Burrito Vegetarian in a Bowl",
      price: 15.58,
      image: "/assets/img/7.png",
      variant: "450g",
    },
    quantity: 1,
  },
  {
    id: 2,
    item: {
      name: "Burrito Vegetarian in a Bowl",
      price: 15.58,
      image: "/assets/img/7.png",
      variant: "450g",
    },
    quantity: 1,
  },
  {
    id: 3,
    item: {
      name: "Burrito Vegetarian in a Bowl",
      price: 15.58,
      image: "/assets/img/7.png",
      variant: "450g",
    },
    quantity: 1,
  },
];

function CartPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tipValue, setTipValue] = React.useState(0.25);
  const [cartItems, setCartItems] = React.useState(CART_ITEMS);
  const [paymentMethod, setPaymentMethod] = React.useState("CASH");
  const DISCOUNT_AMOUNT = Number(1).toFixed(3);
  const DELIVERY_CHARGE = Number(1).toFixed(3);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  // Function to handle closing the dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    let isCartEmpty = searchParams.get("empty");

    if (isCartEmpty === "true") {
      setCartItems((prevState) => {
        prevState = [];
        return prevState;
      });
    }
  }, []);

  const getItemTotal = () => {
    return CART_ITEMS.reduce((acc, cartItem) => {
      return acc + cartItem.item.price * cartItem.quantity;
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
                      bgcolor: "#026754",
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
                <Typography variant="h5" sx={{ color: "#026754" }}>
                  14 August, ASAP
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
            >
              Schedule
            </Button>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="h5">
              Your Items
              {CART_ITEMS.length > 0 ? ` (s)` : ""}
            </Typography>

            {CART_ITEMS.length > 0 ? (
              CART_ITEMS.map((cartItem) => {
                return <CartItem key={cartItem.id} {...cartItem} />;
              })
            ) : (
              <Typography variant="body1">No items in your cart</Typography>
            )}
          </Stack>

          <TextField
            id="special-instructions"
            placeholder="Special Instructions (Optional)"
            multiline
            rows={2}
            variant="outlined"
          />

          <TextField
            id="promo-code"
            placeholder="Promo Code"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
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
                  onClick={handleDialogOpen} // Open the dialog on button click
                >
                  Apply
                </Button>
              ),
            }}
          />

          {/* Dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            sx={{
              "& .MuiDialog-paper": {
                height: "178px",
                width: "327px",
                textAlign: "center",
                overflowY:"hidden",
                
                "@media (min-width: 600px)": {
                  left: "0",
                  position: "fixed",
                  margin: "20px",
                },
              },
            }}
          >
            <DialogTitle>
              <img src="/assets/img/exclaim.svg"></img>
            </DialogTitle>
            <DialogContent sx={{padding:"0",}}>
              <div
                style={{
                  font: "normal normal bold 16px/18px Titillium Web",
                  color: "#959FA8",
                }}
              >
                You&apos;ve entered an invalid <br /> Promo Code!
              </div>
              <Button
                onClick={handleDialogClose}
                sx={{
                  background: "#98694E 0% 0% no-repeat padding-box",
                  border: "1px solid #707070",
                  borderRadius: "12px",
                  opacity: "1",
                  width: "116px",
                  height: "29px",
                  marginTop:"20px",
                  "&:hover": {
                    background: "#98694E 0% 0% no-repeat padding-box",
                  },
                  
                }}
              >
                <span
              style={{
                font: "normal normal 600 16px/24px Titillium Web",
                color: "#ffffff",
              }}
            >
              Go Back
            </span>
              </Button>
            </DialogContent>
          </Dialog>

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
                {CART_ITEMS.length > 1 ? `(s)` : ""} Total
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
                  icon: (
                    <CreditCardOutlinedIcon
                      fontSize="large"
                      sx={{
                        ml: 0.5,
                        mb: 1,
                      }}
                    />
                  ),
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

          <Button variant="contained" size="large">
            Pay Now
          </Button>
        </React.Fragment>
      ) : (
        <Stack justifyContent="center" alignItems="center" sx={{ pt: 5 }}>
          <Typography variant="h5" fontWeight={500}>
            Your cart is empty
          </Typography>

          <Box>
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
            }}
          >
            {`Looks like you have not added anything\n to your cart.\n Go ahead & explore something`}
          </Typography>

          <Button variant="contained" size="large" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default CartPage;
