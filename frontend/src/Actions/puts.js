import axios from "axios";

export const CONFIRM_USER = "CONFIRM_USER"


export const changePassword = (payload) => {
    return async (dispatch) => {
        const user = axios.put('/confirmput/forgotpassword', payload);
    }
}

export const confirmUser = (payload) => {
    return async (dispatch) => {
        axios.put('/confirmput/confirm', payload);
        return dispatch({
            type: CONFIRM_USER,
            payload
        })
    }
}