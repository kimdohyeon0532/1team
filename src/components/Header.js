// src/components/Header.js
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null); // <-- 추가
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

    // 바깥 클릭 / ESC로 닫기
    const onDocClick = (e) => {
      if (!headerRef.current?.contains(e.target)) setActiveMenu(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setActiveMenu(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const active = ({ isActive }) => ({ color: isActive ? "#666" : undefined });

  return (
    <>
      <style>{`
        .dropdown { position: relative; display: inline-block; }
        .sub-menu {
          position: absolute; top: 120%; left: -90px;
          display: flex; gap: 25px; background: #fff;
          padding: 8px 15px; z-index: 1000;
          border: 1px solid #eee; border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0,0,0,.06);
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
            <div
              className="menu"
              // 메뉴 바 위 아무 곳이나 들어오면, 'collection' 아닌 영역이므로 닫히도록(아래 개별 항목에서도 처리하지만 안전망)
              onMouseEnter={(e) => {
                const isInsideDropdown = e.target.closest?.(".dropdown");
                if (!isInsideDropdown) setActiveMenu(null);
              }}
            >
              {/* 다른 섹션에 호버하면 닫혀야 하므로 onMouseEnter로 null */}
              <NavLink to="/brand" style={active} onMouseEnter={() => setActiveMenu(null)}>
                Brand
              </NavLink>

              <NavLink to="/journal" style={active} onMouseEnter={() => setActiveMenu(null)}>
                Journal
              </NavLink>

              {/* Collection + Dropdown */}
              <div
                className="dropdown"
                onMouseEnter={() => setActiveMenu("collection")} // <-- 올리는 순간 활성화 유지
                // onMouseLeave로 닫지 않는다!
                aria-haspopup="true"
                aria-expanded={activeMenu === "collection"}
              >
                <NavLink to="/collection" style={active}>Collection</NavLink>

                {activeMenu === "collection" && (
                  <div className="sub-menu" role="menu" aria-label="Collection submenu">
                    <NavLink
                      to="/collection/teaware"
                      className={({ isActive }) =>
                        isActive ? "submenu-link active" : "submenu-link"
                      }
                    >
                      TEAWARE
                    </NavLink>
                    <NavLink
                      to="/collection/tableware"
                      className={({ isActive }) =>
                        isActive ? "submenu-link active" : "submenu-link"
                      }
                    >
                      TABLEWARE
                    </NavLink>
                    <NavLink
                      to="/collection"
                      end   // ← 여기 중요: /collection/teaware 같은 자식 경로일 때는 active 안 되도록
                      className={({ isActive }) =>
                        isActive ? "submenu-link active" : "submenu-link"
                      }
                    >
                      Art&Craft
                    </NavLink>
                  </div>
                )}

              </div>

              {user ? (
                <>
                  <NavLink to="/mypage" style={active} onMouseEnter={() => setActiveMenu(null)}>
                    My Page
                  </NavLink>
                  <button
                    type="button"
                    className="nav-btn"
                    onClick={() => { logout(); navigate("/"); }}
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" style={active} onMouseEnter={() => setActiveMenu(null)}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" style={active} onMouseEnter={() => setActiveMenu(null)}>
                    Sign up
                  </NavLink>
                </>
              )}

              <span style={{ fontSize: 25 }} onMouseEnter={() => setActiveMenu(null)}>
                <Link to="/cart"><i className="fa-solid fa-cart-shopping" /></Link>
              </span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
