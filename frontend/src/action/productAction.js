import axios from "axios";

import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, CLEAR_ERRORS } from "../constants/productConstants"

//Get all products
export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })

    let products_url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      products_url += `&category=${category}`
    }


    const { data } = await axios.get(products_url)

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    })


  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message })
  }
}

//Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};