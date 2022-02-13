import { LOGIN_GOOGLE, GET_CREDENTIALS } from '../Actions/login.actions'

const initialState = {
    userGoogleData: [],
    userCredentials: []
}

function loginReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN_GOOGLE:
            return {
                ...state,
                userGoogleData: [...state.userGoogleData, payload]
            }
        case GET_CREDENTIALS:
            return {
                ...state,
                userCredentials: payload
            }
        default:
            return state;
    }

}


export default loginReducer;