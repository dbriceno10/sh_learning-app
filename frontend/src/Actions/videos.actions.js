
import axios from "axios";
export const GET_VIDEOS_CURSES = "GET_VIDEOS_CURSES";
export const GET_VIDEO_DETAIL='GET_VIDEO_DETAIL';

  export const getVideosCurses = (id) => async (dispatch) => {


      const videos = await axios.get(`/video/course/${id}`)
      console.log(videos)
      return dispatch({
        type: GET_VIDEOS_CURSES,
        payload: videos.data
      })
    };

  export const getVideosDetail = (id) => async (dispatch) => {

    const video = await axios.get(`/video/detail/${id}`)
    //console.log(videos)
    return dispatch({
      type: GET_VIDEO_DETAIL,
      payload: video.data
    })
  };

  export const createVideo = ({ title, description,  url, cursoId }) => async (dispatch) => {
    try{
      await axios.post('/video/create', {title, description, url, cursoId})
    }catch(err){
      console.log(err);
    }
  }