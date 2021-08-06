import axios from "axios";
import { API_KEY, API_URL } from "../config/constants";

export const getMovies = async (query: string, page: number = 1) => {
    try {
        const url = `${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        throw e;
    }
}

export const getMovieDetail = async (id: string) => {
    try {
        const url = `${API_URL}?apikey=${API_KEY}&i=${id}`;
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        throw e;
    }
}