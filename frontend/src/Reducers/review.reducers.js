import { NEW_REVIEW } from '../Actions/review.actions'

const initialState = {
    newReview: [],
}

function reviewReducer(state = initialState, { type, payload }) {
    switch (type) {
        case NEW_REVIEW:
            return {
                ...state,
               
            }
        default:
            return state;
    }

}


export default reviewReducer;