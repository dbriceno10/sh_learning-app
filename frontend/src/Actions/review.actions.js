import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const NEW_REVIEW = "NEW_REVIEW";

const MySwal = withReactContent(Swal);

export const newReview =
  ({ score, courseId, studentId }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`/review/create`, {
        score,
        courseId,
        studentId,
      });
      return dispatch({
        type: NEW_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      MySwal.fire({
        position: "center-center",
        icon: "error",
        title: "Ya dio review a este curso",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
