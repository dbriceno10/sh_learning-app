import axios from "axios";

export const GET_COURSES = "GET_COURSES";
export const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
export const CLEAR_PAGE = 'CLEAR_PAGE';

export const getCourses = () => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?_page=1_limit=10`)
    dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }
}

export const getCourseDetail = (id) => {
  return async (dispatch) => {
    const course = await axios.get(`http://localhost:3001/cursos/${id}`)
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