import axios from "axios";

export const GET_COURSES = "GET_COURSES";

export const GET_CATEGORIES='GET_CATEGORIES'


export const getCourses = (payload) => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/cursos?category=${payload.category}&&order=${payload.order}&&name=${payload.name}_page=1_limit=10`)
    dispatch({
      type: GET_COURSES,
      payload: courses.data
    })
  }
}


export const getCategories = () => {
  return async (dispatch) => {
    const courses = await axios.get(`http://localhost:3001/category?_page=1_limit=10`)
    dispatch({
      type: GET_CATEGORIES,
      payload: courses.data
    })
  }
}
