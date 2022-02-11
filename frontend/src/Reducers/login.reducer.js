import { LOGIN_GOOGLE } from '../Actions/login.actions'

const initialState = {
    userGoogleData: []
}

function loginReducer(state = initialState, {type, payload}){
    switch(type){
        case LOGIN_GOOGLE:
        return{
            ...state,
            userGoogleData: [...state.userGoogleData, payload]
        }
        default:
        return state;
    }
    
}


export default loginReducer;