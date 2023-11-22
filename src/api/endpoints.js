const API_ENDPOINTS = {
  HOME: {
    GET_ALL_POPULAR_ITEMS: "/homepage/popular-items",
    GET_ALL_RESTAURANT: "/homepage/restaurants",
    GET_ALL_RESTAURANTS_BANNER: "/homepage/banners",
  },
  RESTAURANT: {
    GET_RESTAURANT_DETAIL: "/restaurant/",
    GET_NEARBY_RESTAURANT: "/find-nearest-restaurants",
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
    INFO: "/customer",
  },
  CART: {
    ADD_TO_CART: "/add-to-cart",
    CART_LIST: "/cart-list",
    DELETE_CART: "/delete-cart",
    UPDATE_CART: "/update-cart",
    CHECKOUT: "/checkout/process",
    CLEAR_CART: "/empty-cart",
    APPLY_PROMO_CODE: "/apply-promo-code",
  },
  PAYMENT_METHOD: {
    PAYMENT: "/payment-method",
  },
  MENU: {
    GET_MENU_ITEM_DETAILS: "/restaurant/",
  },
  ADDRESS: {
    ADDRESS: "/address",
  },
  COMMON: {
    GET_ALL_COUNTRIES: "/common/countries",
    GET_DELIVERY_CHARGES: "/delivery-charges",
  },
  ORDER: {
    GET_ORDERS: "/order",
    GET_ORDER_DETAILS: "/order/",
    ORDER_RATING: "/order/rating",
    GET_ORDER_STATUS: "/order/status",
  },
};

export default API_ENDPOINTS;
