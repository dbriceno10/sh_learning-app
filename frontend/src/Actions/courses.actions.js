import axios from "axios";

export const GET_COURSES = "GET_COURSES";

export const getCourses = () => {
  return async (dispatch) => {
    const courses = await axios.get("http://localhost:3001/cursos")
    dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }
}