import { NEW_REVIEW, GET_STUDENT_REVIEW } from '../Actions/review.actions'

const initialState = {
    newReview: [],
    responseReview:null
}

function reviewReducer(state = initialState, { type, payload }) {
    switch (type) {
        case NEW_REVIEW:
            return {
                ...state,
               
            }
        case GET_STUDENT_REVIEW:
            return {
                ...state,
                responseReview: payload
            }
        default:
            return state;
    }

}


export default reviewReducer;