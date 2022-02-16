import { GET_PROFILE } from '../Actions/profile.action.js';

const initialState = {
    dataUser: []
}

function profileReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                dataUser: payload
            }
        default:
            return state;
    }
}

export default profileReducer;