import axios from "axios";

export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const LOGIN_LOCAL = 'LOGIN_LOCAL';

export const loginGoogle = (userData) =>  async dispatch =>{
    const data  = await axios.post("http://localhost:3001/user/loginGoogle", userData)
    return dispatch ({
        type: LOGIN_GOOGLE,
        payload: data
    })
}

export const loginLocal = (userData) => async dispatch => {
    const data = await axios.post("http://localhost:3001/login", userData);
    console.log(data);
    return dispatch ({
        type: LOGIN_LOCAL,
        payload: data
    })
}