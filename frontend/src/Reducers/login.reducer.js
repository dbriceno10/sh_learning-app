import {LOGIN_GOOGLE, LOGIN_LOCAL} from '../Actions/login.actions'


const initialState = {
    userGoogleData: [],
    userLocalData: [],
}


function loginReducer(state = initialState, {type, payload}){
    switch(type){
        case LOGIN_GOOGLE:
        return{
            ...state,
            userGoogleData: [...state.userGoogleData, payload]
        }
        case LOGIN_LOCAL:
            return {
                ...state,
                userLocalData: [...state.userLocalData, payload]
            }
        default:
        return state;
    }
    
}


export default loginReducer;