import { GET_COURSES } from "../Actions/courses.actions";

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
      default:
       return state
  } 
}

export default coursesReducer;