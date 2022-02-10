import { GET_COURSES,GET_CATEGORIES, GET_COURSE_DETAIL, CLEAR_PAGE} from "../Actions/courses.actions";

const initialState = {
  courses: [],
  categories:[],
  courseDetail: undefined,
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
      case GET_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: payload
      }
    case CLEAR_PAGE:
      return {
        ...state,
        courseDetail: undefined
      }
      default:
       return state
  } 
    
}

export default coursesReducer;