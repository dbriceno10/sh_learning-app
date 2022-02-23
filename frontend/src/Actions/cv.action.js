import axios from "axios";

export const GET_CV = 'GET_CV';
export const GET_CV_DETAIL = 'GET_CV_DETAIL';
export const CREATE_CV = 'CREATE_CV';

export const getAllCvs = () => async (dispatch) => {
    const cvs = (await axios.get(`/cv`)).data;
    return dispatch({
        type: GET_CV,
        payload: cvs,
    });
};

export const getCvDetail = (id) => async (dispatch) => {
    const cvDetail = (await axios.get(`/cv/detail/${id}`)).data;
    return dispatch({
        type: GET_CV_DETAIL,
        payload: cvDetail,
    });
};

export const createCv = (payload) => async (dispatch) => {
    const createCvResult = await axios.post(`/cv/create`, payload);
    return dispatch({
        type: CREATE_CV,
        payload: createCvResult,
    });
};
