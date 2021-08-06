import { ChangeEvent,  useCallback, useState, KeyboardEvent, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/movies";
import { ERROR, GET_FIRST_MOVIES, GET_NEXT_MOVIES, LOADING, SET_QUERY } from "../store/actionTypes";
import throttle from "../utils/throttle";
import { MovieListItem } from "../types/movie";
const InfiniteScroll = lazy(()=>import("../components/InfiniteScroll"));
const Search = lazy(()=>import("../components/Search"));
const ListItem = lazy(() => import("../components/movie/ListItem"))

export default function HomeView() {
    const [page, setPage] = useState(1);
    const [hideAutoComplete, setHideAutoComplete] = useState(true);

    const {
            list, 
            loading, 
            total,
            searchQuery
        } = useSelector((state:any) => (
        {
            list: state.movies.list, 
            loading: state.loading, 
            total: state.movies.total,
            searchQuery: state.search.query
        }
    ))

    const dispatch = useDispatch();

    const fetchData = useCallback(async(index: number, str?: string) => {
        try {
            dispatch({type: LOADING})
            const res = await getMovies(str ?? searchQuery, index);
            if(index > 1){
                dispatch({type: GET_NEXT_MOVIES, payload: {
                    data: res,
                    searchQuery: str ??searchQuery
                }});
                return;
            }
            dispatch({type: GET_FIRST_MOVIES, payload: {
                data: res,
                searchQuery: str ??searchQuery
            }});
            setPage(1)
        } catch (e) {
            dispatch({type: ERROR, payload: "Error"})
        }
    },[searchQuery, dispatch]);

    const fetchNext = throttle(() => {
        setPage(prev => prev+1);
        fetchData(page+1);
    },500)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setHideAutoComplete(false);
        dispatch({type: SET_QUERY, payload:e.target.value})
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            fetchData(1);
            setHideAutoComplete(true);
        }
    }

    const handleItemClick = (e: string) => {
        dispatch({type: SET_QUERY, payload:e})
        fetchData(1, e);
        setHideAutoComplete(true);
    }

    return (
        <div data-testid="home-view">
            <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <Search
                    onItemClick={handleItemClick}
                    hide={hideAutoComplete}
                    onKeyDown={handleKeyDown}
                    onChange={handleInput}
                    value={searchQuery}
                    style={{
                        width: "100%",
                        padding: "4px 8px"}}
                />
                <button 
                style={{
                    marginLeft: "30px"
                }}
                onClick={()=>{
                    setHideAutoComplete(true);
                    fetchData(1)}}
                type="button">
                    Search
                </button>
            </div>
            <div style={{marginTop: "10px"}}>
                {list.length <= 0 && <div style={{width: "100%", textAlign: "center"}}>Type movie name</div>}
                <InfiniteScroll
                    hasMore={total > list.length}
                    isLoading={loading}
                    loader={"Loading"}
                    next={fetchNext}
                >
                    {list.map((item: MovieListItem) => (
                        <ListItem movie={item} key={item.imdbID}/>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}