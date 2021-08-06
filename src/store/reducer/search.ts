import { GET_FIRST_MOVIES, LOAD_SEARCH_QUERIES, SET_QUERY } from "../actionTypes"

interface DefaultState {
    searchQueries: string[];
    query: string;
}

const defaultState: DefaultState = {
    searchQueries: [],
    query: ""
}

export default function SearchReducer(state=defaultState, action:any) {
    switch(action.type){
        case SET_QUERY:
            return {...state, query: action.payload}
        case LOAD_SEARCH_QUERIES: {
            const queries = localStorage.getItem("search");
            if(queries){
                return {
                    ...state,
                    searchQueries: JSON.parse(queries)
                }
            }
            return state;
        }
        case GET_FIRST_MOVIES: {
            const { searchQuery } = action.payload;
            const searchQueries = state.searchQueries;
            const exist = searchQueries.find((i) => i.toLowerCase() === searchQuery.toLowerCase());
            if(!exist){
                searchQueries.push(searchQuery);
            }

            localStorage.setItem("search", JSON.stringify(searchQueries));

            return {
                ...state,
                searchQueries
            };

        }
        default:
            return state;
    }
}