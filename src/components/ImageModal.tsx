import { createRef, useEffect } from "react";
import { unmountComponentAtNode, render } from "react-dom";

const modalID = "modal-wrapper";

const Modal = ({src}:{src: string}) => {
    const contentRef = createRef<HTMLDivElement>();

    useEffect(()=>{
        const clickHandler = (e: MouseEvent) => {
            if(contentRef.current && !contentRef.current.contains(e.target as Node)){
                closeModal();
            }
        }

        document.addEventListener("click", clickHandler);

        return function cleanup () {
            document.removeEventListener("click", clickHandler)
        }
    },[contentRef])

    return (
        <div 
        data-testid="poster-image-modal-wrapper"
        className="modal-wrapper">
                <div 
                data-testid="poster-image-modal"
                className="modal-content"
                ref={contentRef}>
                    <img src={src}  width="300px" alt="modal-preview"/>
                </div>
        </div>
    )
}

const closeModal = () => {
    const target = document.getElementById(modalID);
    if(target){
        unmountComponentAtNode(target);
        target.parentNode?.removeChild(target);
    }
}

export default function openModal(src: string) {
    let target = document.getElementById(modalID);
    if(!target){
        target = document.createElement('div');
        target.id = modalID;
        document.body.appendChild(target);
    }

    render(<Modal src={src}/> ,target);
}