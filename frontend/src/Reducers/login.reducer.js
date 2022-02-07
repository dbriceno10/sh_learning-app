import {LOGIN_GOOGLE} from '../Actions/login.actions'


const initialState = {
    cardsHardC: [
        {
            img: 'https://image.freepik.com/fotos-gratis/ilustracao-3d-de-um-robo-humanoide-lendo-livro-e-resolvendo-matematica_31965-9300.jpg',
            cat: 'Mathematics',
            name: 'Mate con julio',
            rating: 3,
            price: '100 usd'
        },
        {
            img: 'https://reactjs.org/logo-og.png',
            cat: 'Technology',
            name: 'React curso',
            rating: 1,
            price: '40 usd'
        },
        {
            img: 'https://st.depositphotos.com/1158615/1849/i/600/depositphotos_18498541-stock-photo-g-key-and-empty-tact.jpg',
            cat: 'Music',
            name: 'Guitar lesson',
            rating: 1,
            price: '1 usd'
        },
        {
            img: 'https://image.freepik.com/fotos-gratis/ilustracao-3d-de-um-robo-humanoide-lendo-livro-e-resolvendo-matematica_31965-9300.jpg',
            cat: 'Mathematics',
            name: 'Mate con julio',
            rating: 3,
            price: '100 usd'
        },
        {
            img: 'https://reactjs.org/logo-og.png',
            cat: 'Technology',
            name: 'React curso',
            rating: 1,
            price: '40 usd'
        },
        {
            img: 'https://reactjs.org/logo-og.png',
            cat: 'Technology',
            name: 'React curso',
            rating: 1,
            price: '40 usd'
        },
        {
            img: 'https://st.depositphotos.com/1158615/1849/i/600/depositphotos_18498541-stock-photo-g-key-and-empty-tact.jpg',
            cat: 'Music',
            name: 'Guitar lesson',
            rating: 1,
            price: '1 usd'
        },
        {
            img: 'https://image.freepik.com/fotos-gratis/ilustracao-3d-de-um-robo-humanoide-lendo-livro-e-resolvendo-matematica_31965-9300.jpg',
            cat: 'Mathematics',
            name: 'Mate con julio',
            rating: 3,
            price: '100 usd'
        },       
    ],
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