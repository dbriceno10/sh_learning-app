import axios from "axios";

export const UPDATE_PROFILE_STUDENT = "UPDATE_PROFILE_STUDENT";
export const GET_PROFILE_STUDENT = "GET_PROFILE_STUDENT";
export const UPDATE_PROFILE_TEACHER = "UPDATE_PROFILE_TEACHER";
export const GET_PROFILE_TEACHER = "GET_PROFILE_TEACHER";

export const getProfileStudent = (id) => async (dispatch) => {
  const data = await axios.get(`/students/detail/${id}`);
  return dispatch({
    type: GET_PROFILE_STUDENT,
    payload: data.data,
  });
};

export const uptadeProfileStudent = (id, payload) => async (dispatch) => {
  const data = await axios.put(`/students/update/${id}`, payload);
  return dispatch({
    type: UPDATE_PROFILE_STUDENT,
    payload: data,
  });
};

export const getProfileTeacher = (id) => async (dispatch) => {
  const data = await axios.get(`/teachers/detail/${id}`);
  return dispatch({
    type: GET_PROFILE_TEACHER,
    payload: data.data,
  });
};

export const uptadeProfileTeacher = (id, payload) => async (dispatch) => {
  const data = await axios.put(`/teachers/update/${id}`, payload);
  return dispatch({
    type: UPDATE_PROFILE_TEACHER,
    payload: data,
  });
};
