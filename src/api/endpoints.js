const API_ENDPOINTS = {
  HOME: {
    GET_ALL_POPULAR_ITEMS: "/homepage/popular-items",
    GET_ALL_RESTAURANT: "/homepage/restaurants",
    GET_ALL_RESTAURANTS_BANNER: "/homepage/banners",
  },
  RESTAURANT: {
    GET_RESTAURANT_DETAIL: "/restaurant/",
  },
  USER: {
    EMAIL_LOGIN: "/email-login"
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
  COMMON: {
    GET_ALL_COUNTRIES: "/common/countries",
  },
};

export default API_ENDPOINTS;
