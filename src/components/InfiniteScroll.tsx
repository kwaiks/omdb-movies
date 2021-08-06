import React, { useCallback, useRef } from "react";

interface Props {
    children: React.ReactChild;
    hasMore: boolean;
    next: () => void;
    className? :string;
    isLoading: boolean;
    loader: React.ReactNode;
}

export default function InfiniteScroll(
    {
        children, 
        hasMore, 
        loader, 
        next, 
        isLoading, 
        className
    }:Props) {

    const observer = useRef<IntersectionObserver>();
        

    const lastBookElementRef = useCallback(  // (*)
        (node:any) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                next();
            }
        },{
            threshold: 1
        });
        if (node && observer.current) observer.current.observe(node);
        },
        [isLoading, observer, hasMore, next]
    );

    return (
        <div className={className}>
            {children}
            <div ref={lastBookElementRef}></div>
            <div>{hasMore && loader}</div>
        </div>
    )
}