import axios from "axios";

export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

export const loginGoogle = (tokenId) =>  async dispatch =>{
    const data  = await axios.post("/user/loginGoogle", {tokenId})
    return dispatch ({
        type: LOGIN_GOOGLE,
        payload: data
    })
}