// src/components/Header.js
import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const timerRef = useRef(null);
  const headerRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const header = headerRef.current;
      if (!header) return;
      const currentY = window.scrollY;
      if (currentY > lastScrollY) {
        header.classList.add("hide");
        header.classList.remove("show");
      } else {
        header.classList.remove("hide");
        header.classList.add("show");
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const active = ({ isActive }) => ({ color: isActive ? "#666" : undefined });

  const handleMouseEnter = () => {
    setShowDropdown(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setShowDropdown(false), 500);
  };

  return (
    <>
      <style>{`
        .dropdown { position: relative; display: inline-block; }
        .sub-menu {
          position: absolute; top: 120%; left: -90px;
          display: flex; gap: 25px; background: #fff;
          padding: 8px 15px; z-index: 1000;
          border: 1px solid #eee; border-radius: 8px;
        }
        .sub-menu a { text-decoration: none; color: #555; font-size: 15px; }
        .sub-menu a:hover { color: #000; }

        .nav-btn {
          background: none; border: none; padding: 0 6px;
          cursor: pointer; font: inherit; color: #333; font-size: 15px;
        }
        .nav-btn:hover { color: #000; }

        header.nav.hide { transform: translateY(-100%); transition: transform .25s ease; }
        header.nav.show { transform: translateY(0); transition: transform .25s ease; }
      `}</style>

      <header className="nav show" ref={headerRef}>
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
                  <div className="sub-menu" role="menu" aria-label="Collection submenu">
                    <NavLink to="/collection/teaware">TEAWARE</NavLink>
                    <NavLink to="/collection/tableware">TABLEWARE</NavLink>
                    <NavLink to="/collection">Art&Craft</NavLink>
                  </div>
                )}
              </div>

              {/* 로그인/회원가입 ↔ 마이페이지/로그아웃 토글 (중복 없이 한 곳에서만 렌더) */}
              {user ? (
                <>
                  <NavLink to="/mypage" style={active}>My Page</NavLink>
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={() => { logout(); navigate("/"); }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" style={active}>Login</NavLink>
                  <NavLink to="/signup" style={active}>Sign up</NavLink>
                </>
              )}

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
