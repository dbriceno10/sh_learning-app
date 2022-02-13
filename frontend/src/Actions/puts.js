import axios from "axios";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";


export const changePassword = (payload) => {
    return async (dispatch) => {
        const user = axios.put('/confirmput/forgotpassword', payload);
        return dispatch({
            type: CHANGE_PASSWORD,
            payload
        })
    }
}