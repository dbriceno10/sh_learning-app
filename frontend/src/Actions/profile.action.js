import axios from "axios";

export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = (id) => async (dispatch) => {
    const data = await axios.post(`http://localhost:3001/students/student/${id}`);
    return dispatch({
        type: GET_PROFILE,
        payload: data,
    });
};