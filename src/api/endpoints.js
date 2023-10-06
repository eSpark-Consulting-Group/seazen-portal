const API_ENDPOINTS = {
  HOME: {
    GET_ALL_POPULAR_ITEMS: "/homepage/popular-items",
    GET_ALL_RESTAURANT: "/homepage/restaurants",
  },
  RESTAURANT: {
    GET_RESTAURANT_DETAIL: "/restaurant/",
    GET_BRANCHES_AND_HOURS(restaurantId, language = "en") {
      return `/restaurant/${restaurantId}/branches?language=${language}`;
    },
  },
  USER: {
    EMAIL_LOGIN: "/email-login",
    MOBILE_LOGIN: "/mobile-login",
    CUSTOMER_REGISTRATION: "/customer/registration",
    UPDATE_PROFILE: "/customer/update-profile",
    VERIFY_OTP: "/customer/verify-otp",
    RESEND_OTP: "/customer/resend-otp",
  },
  CART: {
    ADD_TO_CART: "/add-to-cart",
    CART_LIST: "cart-list",
    DELETE_CART: "/delete-cart",
    UPDATE_CART: "/update-cart",
    CHECKOUT: "checkout/process",
  },
  PAYMENT_METHOD: {
    PAYMENT: "/payment-method",
  },
  MENU: {
    GET_MENU_ITEM_DETAILS: "/restaurant/",
  },
};

export default API_ENDPOINTS;
