import { GET_VIDEOS_CURSES, GET_VIDEO_DETAIL } from "../Actions/videos.actions";

const initialState = {
  videos_curses: [],
  videodetail: [],
};

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOS_CURSES:
      return {
        ...state,
        videos_curses: payload,
      };
    case GET_VIDEO_DETAIL:
      return {
        ...state,
        videosdetail: payload,
      };
    default:
      return state;
  }
};
export default videosReducer;
