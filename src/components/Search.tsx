import { HTMLProps, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SEARCH_QUERIES } from "../store/actionTypes";

interface Props extends HTMLProps<HTMLInputElement> {
    value: string;
    hide: boolean;
    onItemClick?: (str: string) => void
}

export default function Search({onItemClick, hide, ...props}: Props) {
    const list = useSelector((state: any) => state.search.searchQueries);
    const [queries, setQueries] = useState<string[]>([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: LOAD_SEARCH_QUERIES})
    },[])

    useEffect(()=>{
        const query = list.filter((i:string) => i.toLowerCase().indexOf(props.value.toLowerCase()) > -1);
        setQueries(query);
    },[props.value, list])

    const handleClick = (str: string) => {
        if(onItemClick){
            onItemClick(str)
        }
    }

    return (
        <div className="search-wrapper">
            <input {...props}/>
            {
                !hide && queries.length > 0 && props.value && 
                <div className="autocomplete">
                    {queries.map((item:string) => (
                        <div 
                        onClick={()=>handleClick(item)}
                        className="item"
                        key={item}>{item}</div>
                    ))}
                </div>
            }
        </div>
    )
}