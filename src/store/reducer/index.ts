import { combineReducers } from "redux";
import movies from "./movies";
import search from "./search";
import movie from "./movie";

export default combineReducers({
    movies,
    movie,
    search
})