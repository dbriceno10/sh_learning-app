import axios from "axios";




export const changePassword = (payload) => {
    return async (dispatch) => {
        const user = axios.put('/confirmput/forgotpassword', payload);
    }
}