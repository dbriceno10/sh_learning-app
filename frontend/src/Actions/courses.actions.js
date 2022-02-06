import axios from "axios";

export const GET_COURSES = "GET_COURSES";
export const GET_COURSES_FILTER='GET_COURSES_FILTER'
export const GET_COURSES_ORDER='GET_COURSES_ORDER'

export const getCourses = () => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?_page=1_limit=10`)
    dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }
}
export const getCoursescategories = (payload) => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?category=${payload}&&_page=1_limit=10`)
    dispatch({
      type: GET_COURSES_FILTER,
      payload: courses.data
    })
  }
}
export const getCoursesorder = (payload) => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?order=${payload}&&_page=1_limit=10`)
    dispatch({
      type: GET_COURSES_ORDER,
      payload: courses.data
    })
  }
}