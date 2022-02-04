import axios from "axios";

export const GET_COURSES = "GET_COURSES";

export const getCourses = (page) => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?_page=${page}_limit=5`)
    dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }
}