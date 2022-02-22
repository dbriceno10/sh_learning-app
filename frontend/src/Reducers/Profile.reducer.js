import { GET_PROFILE_STUDENT, GET_PROFILE_TEACHER } from '../Actions/profile.action.js';

const initialState = {
    dataUser: []
}

function profileReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROFILE_STUDENT:
            return {
                ...state,
                dataUser: payload
            }
    
        case GET_PROFILE_TEACHER:
            return{
                ...state,
                dataUser: payload
            }
    
        default:
            return state;
    }
}

export default profileReducer;