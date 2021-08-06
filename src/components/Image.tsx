import { MouseEvent } from "react";
import openModal from "./ImageModal";

export default function Image({src, height, width}:{src: string, height?: number, width?: number}){

    const handleClick = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        openModal(src)
    }

    return (
        <img 
        data-testid="poster-image"
        onClick={handleClick}
        src={src} height={height} width={width} alt=""/>
    )
}