import axios from "axios";

export const LOGIN_GOOGLE = "LOGIN_GOOGLE";
export const GET_CREDENTIALS = "GET_CREDENTIALS";

export const getUserCredentials = () => {
  return async (dispatch) => {
    const credentials = JSON.parse(localStorage.getItem("userCredentials"));
    dispatch({
      type: GET_CREDENTIALS,
      payload: credentials,
    });
  };
};

export const loginGoogle = (userData) => async (dispatch) => {
  const data = await axios.post("/user/loginGoogle", userData);
  return dispatch({
    type: LOGIN_GOOGLE,
    payload: data,
  });
};
