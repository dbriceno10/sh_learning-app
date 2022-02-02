import {LOGIN_GOOGLE} from '../Actions/login.actions'


const initialState = {
    nose: [],
}


function loginReducer(state = initialState, {type, payload}){
    switch(type){
        case LOGIN_GOOGLE:
        return{
            ...state,
            userData: [...state.userData, payload]
        }
        default:
        return state;
    }
    
}


export default loginReducer;