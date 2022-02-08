import axios from "axios";

export const GET_COURSES = "GET_COURSES";
export const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const GET_CATEGORIES='GET_CATEGORIES'
export const SET_ORDER = 'SET_ORDER'


export const getCourses = (name, category, order) => async (dispatch) => {

    const courses = await axios.get(`/cursos?category=${category ? category : ""}&order=${order ? order : ""}&name=${name}&_page=1_limit=10`)
    return  dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }

export const getCategories = () => {
  return async (dispatch) => {
    const courses = await axios.get(`/category?_page=1_limit=10`)
    dispatch({
      type: GET_CATEGORIES,
      payload: courses.data
    })
  }
}

export const getCourseDetail = (id) => {
  return async (dispatch) => {
    const course = await axios.get(`/cursos/${id}`)
    dispatch({
      type: GET_COURSE_DETAIL,
      payload: course.data
    })
  }
}

export const clearPage = () => {
  return {
    type: CLEAR_PAGE
  }
}

export const setOrder = (payload) => {
  return{
    type: SET_ORDER,
    payload: payload
  }
}
