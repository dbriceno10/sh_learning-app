// import axios from "axios";

import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_LOCAL_STORAGE = "GET_LOCAL_STORAGE";
export const POST_PURCHASE_ORDER = "POST_PURCHASE_ORDER";


export const addToCart = (course) => (dispatch) => {
  return dispatch({
    type: ADD_TO_CART,
    payload: course
  })
} 

export const getLocalStorage = () => (dispatch) => {
  return dispatch({
    type: GET_LOCAL_STORAGE
  })
}

export const deleteFromCart = (id) => (dispatch) => {
  return dispatch({
    type: REMOVE_ONE_FROM_CART,
    payload: id 
  })
}

export const postPurchaseOrder = (orderObj) => async (dispatch) => {
  await axios.post('/stripe/generate', orderObj);
}

export const clearCart = () => ({type: CLEAR_CART});
