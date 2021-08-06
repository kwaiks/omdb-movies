import React from "react";

export default function MainLayout({children}: {children: React.ReactChild}) {
    return (
        <div className="main">
                <nav className="header">
                    <span>OMDB Movies</span>
                </nav>
                <div className="content">
                {children}
                </div>
        </div>
    )
}