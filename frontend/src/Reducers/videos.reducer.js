import {GET_VIDEOS_CURSES} from "../Actions/videos.actions";



const initialState = {
    videos_curses: [],
    
  }

  const videosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_VIDEOS_CURSES:
        return {
          ...state,
          videos_curses: payload,
        } 
        default:
            return state;
    }
}
export default videosReducer;