import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const GET_VIDEOS_CURSES = "GET_VIDEOS_CURSES";
export const GET_VIDEO_DETAIL = "GET_VIDEO_DETAIL";
export const NEW_REVIEW = "NEW_REVIEW";

const MySwal = withReactContent(Swal);

export const getVideosCurses = (id) => async (dispatch) => {
  const videos = await axios.get(`/video/course/${id}`);
  console.log(videos);
  return dispatch({
    type: GET_VIDEOS_CURSES,
    payload: videos.data,
  });
};

export const getVideosDetail = (id) => async (dispatch) => {
  const video = await axios.get(`/video/detail/${id}`);
  //console.log(videos)
  return dispatch({
    type: GET_VIDEO_DETAIL,
    payload: video.data,
  });
};

export const createVideo =
  ({ title, description, url, cursoId, img }) =>
  async (dispatch) => {
    console.log({ title, description, url, cursoId });
    try {
      await axios.post("/video/create", {
        title,
        description,
        url,
        cursoId,
        img,
      });
    } catch (err) {
      MySwal.fire({
        position: "center-center",
        icon: "error",
        title: "Hubo un error",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
