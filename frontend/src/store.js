import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { newReviewReducer, productDetailsReducer, productsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import { forgotPasswordReducer, resetPasswordReducer, updatePasswordReducer } from "./reducers/passwordReducer"
import { cartReducer } from './reducers/cartReducer';
import { profileReducer } from "./reducers/profileReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  updatePasswordReducer: updatePasswordReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  resetPasswordReducer: resetPasswordReducer,
  cart: cartReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
  newOrder: newOrderReducer,
  allOrders: allOrdersReducer,
  newReview: newReviewReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },


};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // Redux DevTools are enabled from start
});

export default store;