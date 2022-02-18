import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCourseDetail, getCourses } from './courses.actions';

export const NEW_REVIEW = "NEW_REVIEW"
export const GET_STUDENT_REVIEW = "GET_STUDENT_REVIEW"

const MySwal = withReactContent(Swal);

export const newReview = ({ score, courseId, studentId }) => async (dispatch) => {
    console.log({ score, courseId, studentId });
    try {
       const response = await axios.post(`/review/create`,  {score, courseId, studentId} );
       console.log(response.data)
        return dispatch({
            type: NEW_REVIEW,
            payload: response.data
        })            
    } catch (error) {
        MySwal.fire({
            position: "center-center",
            icon: "error",
            title: "ya dio review a este curso",
            showConfirmButton: false,
            timer: 2500,
        });
    }
};

export const getStudentReview = ({studentId, courseId}) => async (dispatch) => {
    try{
        console.log({courseId, studentId});
        const res = await axios.get(`review/verify?studentId=${studentId}&courseId=${courseId}` )
        console.log(res.data)
        return dispatch({
            type: GET_STUDENT_REVIEW,
            paylaod: res.data
        })
    }catch(error){
        console.log(error);
    }
}