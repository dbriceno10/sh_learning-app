import axios from "axios";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

export const CONFIRM_USER = "CONFIRM_USER"



export const changePassword = (payload) => {
    return async (dispatch) => {
        const user = axios.put('/confirmput/forgotpassword', payload);
        return dispatch({
            type: CHANGE_PASSWORD,
            payload
        })
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