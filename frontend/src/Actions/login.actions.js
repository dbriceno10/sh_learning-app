import axios from "axios";

export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

export const loginGoogle = (userData) =>  async dispatch =>{
    const data  = await axios.post("/user/loginGoogle", userData)
    return dispatch ({
        type: LOGIN_GOOGLE,
        payload: data
    })
}