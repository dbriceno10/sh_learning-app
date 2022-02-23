import {
  GET_CV,
  GET_CV_DETAIL,
  CREATE_CV,
} from "../Actions/videos.actions";

const initialState = {
  allCvs: [],
  cvDetail: [],
}

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CV:
      return {
        ...state,
        allCvs: payload,
      }
    case GET_CV_DETAIL:
      return {
        ...state,
        cvDetail: payload,
      }
    default:
      return state;
  }
}
export default videosReducer;