import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    useEffect(() => {
        // sticky header 높이 보정
        const setHeaderHeight = () => {
            const h = document.querySelector("header.nav")?.offsetHeight || 0;
            document.documentElement.style.setProperty("--header-h", `${h}px`);
        };
        setHeaderHeight();
        window.addEventListener("resize", setHeaderHeight);
        return () => window.removeEventListener("resize", setHeaderHeight);
    }, []);

    const active = ({ isActive }) => ({ color: isActive ? "#666" : undefined });

    return (
        <header className="nav">
            <div className="container">
                <div className="brand">
                    <Link to="/">
                        <img src="/img/CHAGANlogoText.png" alt="차간 로고" width="150" height="150" />
                    </Link>
                </div>
                <nav aria-label="주요 메뉴">
                    <div className="menu">
                        <NavLink to="/brand" style={active}>Brand</NavLink>
                        <NavLink to="/journal" style={active}>Journal</NavLink>
                        <NavLink to="/collection" style={active}>Collection</NavLink>
                        <NavLink to="/login" style={active}>Login</NavLink>
                        <NavLink to="/signup" style={active}>Sign up</NavLink>
                        <span style={{ fontSize: 25 }}>
                            <Link to="/cart"><i className="fa-solid fa-cart-shopping" /></Link>
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
}
