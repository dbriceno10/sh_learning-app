import axios from "axios";

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';


export const getProfile = (id) => async (dispatch) => {
    const data = await axios.get(`http://localhost:3001/students/detail/${id}`);
    return dispatch({
        type: GET_PROFILE,  
        payload: data.data,
    });
};

export const uptadeProfile = (id, payload) => async (dispatch) => {
    const data = await axios.put(`http://localhost:3001/students/uptade/${id}`, payload);
    return dispatch({
        type: UPDATE_PROFILE,
        payload: data,
    });
};
