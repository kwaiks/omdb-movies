import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getMovieDetail } from "../api/movies";
import { ERROR, GET_MOVIE_DETAIL, LOADING } from "../store/actionTypes";
import { MovieDetail } from "../types/movie";
import Image from "../components/Image";

export default function DetailView() {
    const location: {id: string} = useParams();
    const history = useHistory()
    const dispatch = useDispatch();
    const loading: boolean = useSelector((state:any) => state.movie.loading)
    const movie: MovieDetail = useSelector((state:any) => state.movie.detail)

    const fetchData = useCallback(async () => {
        try {
            dispatch({type: LOADING})
            const res = await getMovieDetail(location.id);
            dispatch({type: GET_MOVIE_DETAIL, payload:res})
        } catch (e) {
            dispatch({type: ERROR})
        }
    },[location.id, dispatch]);

    useEffect(()=>{
        fetchData()
    },[fetchData])
    
    const handleBack = () => {
        history.goBack()
    }

    return (
        <div data-testid="detail-view">
            <div 
            onClick={handleBack}
            style={{
                width: "60px",
                display: "flex", alignItems: "center", marginBottom: 10, cursor: "pointer"}}>
                <img src="/icons/chevron-left.svg" height={20} alt="back"/>
                <span style={{marginLeft: 6}}>Back</span>
            </div>
            {
                !loading &&
                <div className="movie-detail">
                    <div>
                        <Image src={movie.Poster} width={200}/>
                    </div>
                    <div className="stat"
                    >
                        <div className="title">{movie.Title} ({movie.Year})</div>
                        <div className="plot">{movie.Plot}</div>
                        <div className="desc">
                            <span className="title">Rating</span>
                            <span className="value">{movie.Rated}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Genre</span>
                            <span className="value">{movie.Genre}</span>
                        </div>

                        <div className="desc">
                            <span className="title">Type</span>
                            <span className="value">{movie.Type}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Language</span>
                            <span className="value">{movie.Language}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Country</span>
                            <span className="value">{movie.Country}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Director</span>
                            <span className="value">{movie.Director}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Writer</span>
                            <span className="value">{movie.Writer}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Actors</span>
                            <span className="value">{movie.Actors}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Production</span>
                            <span className="value">{movie.Production}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Runtime</span>
                            <span className="value">{movie.Runtime}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Released</span>
                            <span className="value">{movie.Released}</span>
                        </div>
                        <div className="desc">
                            <span className="title">DVD</span>
                            <span className="value">{movie.DVD}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Box Office</span>
                            <span className="value">{movie.BoxOffice}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Awards</span>
                            <span className="value">{movie.Awards}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Meta Score</span>
                            <span className="value">{movie.Metascore}</span>
                        </div>
                        <div className="desc">
                            <span className="title">IMDB Rating</span>
                            <span className="value">{movie.imdbRating} ({movie.imdbVotes} votes)</span>
                        </div>
                        <div className="desc">
                            <span className="title">Website</span>
                            <span className="value">{movie.Website}</span>
                        </div>
                        <div className="desc">
                            <span className="title">Rating</span>
                            <span className="value">{movie.Ratings.map((i,idx)=>(
                                <div key={idx}>
                                    {i.Value} ({i.Source})
                                </div>
                            ))}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}