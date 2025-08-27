import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const header = document.querySelector("header.nav");

        const onScroll = () => {
            const currentY = window.scrollY;
            if (!header) return;

            if (currentY > lastScrollY) {
                header.classList.add("hide");
                header.classList.remove("show");
            } else {
                header.classList.remove("hide");
                header.classList.add("show");
            }
            lastScrollY = currentY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const active = ({ isActive }) => ({ color: isActive ? "#666" : undefined });

    const handleMouseEnter = () => {
        // 메뉴 열기
        setShowDropdown(true);

        // 닫히는 타이머 있으면 취소
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        // 0.5초 후에 닫히도록 타이머 설정
        timerRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 500);
    };

    return (
        <>
            <style>{`
            .dropdown {
                position: relative;
                display: inline-block;
              }
              
              .sub-menu {
                position: absolute;
                top: 120%; /* Collection 밑 */
                left: -90px;
                display: flex;
                gap: 25px;
                background: white;
                padding: 8px 15px;
                z-index: 1000;
              }
              
              .sub-menu a {
                text-decoration: none;
                color: #555;
                font-size: 15px;
              }
              
              .sub-menu a:hover {
                color: #000;
              }
              
            `}</style>
    
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
    
                            {/* Collection + Dropdown */}
                            <div 
                                className="dropdown"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <NavLink to="/collection" style={active}>Collection</NavLink>
                                {showDropdown && (
                                    <div className="sub-menu">
                                        <NavLink to="/collection/teaware">TEAWARE</NavLink>
                                        <NavLink to="/collection/tableware">TABLEWARE</NavLink>
                                        <NavLink to="/collection">Art&Craft</NavLink>
                                    </div>
                                )}
                            </div>
    
                            <NavLink to="/login" style={active}>Login</NavLink>
                            <NavLink to="/signup" style={active}>Sign up</NavLink>
                            <span style={{ fontSize: 25 }}>
                                <Link to="/cart"><i className="fa-solid fa-cart-shopping" /></Link>
                            </span>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
