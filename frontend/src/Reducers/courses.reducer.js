import { GET_COURSES,GET_CATEGORIES} from "../Actions/courses.actions";

const initialState = {
  courses: [],
  categories:[]
}

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses: payload
      }
    
        case GET_CATEGORIES:
          return{
            ...state,
            categories:payload

          }
      default:
       return state
  } 
}

export default coursesReducer;