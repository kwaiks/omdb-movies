import { Link } from "react-router-dom";
import { MovieListItem } from "../../types/movie";
import Image from "../Image";

export default function ListItem({movie}:{movie:MovieListItem}) {
    return (
        <div 
            className="list-item"
            key={movie.imdbID}>
                <div>
                    <Image src={movie.Poster} height={80} width={80}/>
                </div>

                <Link 
                data-testid="list-content-test"
                to={`/view/${movie.imdbID}`} className="list-content">
                    <span className="list-title">{movie.Title}</span>
                    <span className="list-type">{movie.Type}</span>
                    <span>{movie.Year}</span>
                </Link>
        </div>
    )
}