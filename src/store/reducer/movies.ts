import { GET_FIRST_MOVIES, GET_MOVIE_DETAIL, ERROR, LOADING, GET_NEXT_MOVIES } from "../actionTypes"

interface DefaultState {
    loading: boolean;
    error: any;
    list: any[],
    total: number
}

const defaultState: DefaultState = {
    loading: true,
    error: null,
    list: [],
    total: 0
}

export default function MoviesReducer(state=defaultState, action:any) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true};
        case ERROR:
            return {...state, error: action.payload, loading: false}
        case GET_FIRST_MOVIES: {
            const { data } = action.payload;

            if(data["Error"]){
                return {...state, loading: false, error: true}
            }

            return {
                ...state, 
                list: data["Search"],
                total: data["totalResults"],
                loading: false
            };

        }
        case GET_NEXT_MOVIES:{
            const { data } = action.payload;

            if(data["Error"]){
                return {...state, loading: false, error: true}
            }

            return {
                ...state, 
                list: [...state.list, ...data["Search"]],
                total: data["totalResults"],
                loading: false
            };
        }
            
        case GET_MOVIE_DETAIL:
            return {...state, movie: action.payload};
        default:
            return state;
    }
}