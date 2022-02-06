import { GET_COURSES,GET_COURSES_FILTER,GET_COURSES_ORDER } from "../Actions/courses.actions";

const initialState = {
  courses: [],
}

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses: payload
      }
      case GET_COURSES_FILTER:
        return{
          ...state,
          courses:payload
      }
      case GET_COURSES_ORDER:
        return {
          ...state,
          courses:payload
        }
      default:
       return state
  } 
}

export default coursesReducer;