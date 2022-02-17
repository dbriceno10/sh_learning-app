
import axios from "axios";
export const GET_VIDEOS_CURSES = "GET_VIDEOS_CURSES";


 const getVideosCurses = (id) => async (dispatch) => {


    const videos = await axios.get(`http://localhost:3001/video/course/${id}`)
    console.log(videos)
    return dispatch({
      type: GET_VIDEOS_CURSES,
      payload: videos.data
    })
  }
  export default getVideosCurses;