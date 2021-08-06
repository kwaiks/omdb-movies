import { MovieDetail } from "../../types/movie";
import { GET_MOVIE_DETAIL, ERROR, LOADING } from "../actionTypes"

interface DefaultState {
    detail: MovieDetail;
    error: any;
    loading: boolean;
}

const defaultState: DefaultState = {
    error: null,
    detail: {} as MovieDetail,
    loading: true
}

export default function MoviesReducer(state=defaultState, action:any) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true};
        case ERROR:
            return {...state, error: action.payload, loading: false} 
        case GET_MOVIE_DETAIL:
            if(action.payload["Error"]){
                return {...state, error:action.payload["Error"], loading: false}
            }
            return {...state, detail: action.payload, loading: false};
        default:
            return state;
    }
}