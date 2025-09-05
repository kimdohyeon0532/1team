// src/pages/LoginPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const REMEMBER_ID_KEY = "rememberId";

// 안전 파서
function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [error, setError] = useState("");

  // 저장된 아이디 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_ID_KEY);
    if (saved) {
      setId(saved);
      setRememberId(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = readUsers();
    const user = users.find((u) => u.username === id.trim());

    if (!user || user.password !== pw) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    // remember id
    if (rememberId) {
      localStorage.setItem(REMEMBER_ID_KEY, id.trim());
    } else {
      localStorage.removeItem(REMEMBER_ID_KEY);
    }

    // 간단 세션 저장
    const current = { username: user.username, name: user.name, email: user.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current));

    // 전역 auth 업데이트
    login(current);

    // 이동
    navigate("/"); // 또는 navigate("/mypage");
  };

  return (
    <>
      <Header />

      <div className="container">
        <main className="login-main">
          <div className="login-container">
            <h2>로그인</h2>
            <h3>회원 로그인</h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="login-form-row">
                <div className="input-column">
                  <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                    autoComplete="username"
                    aria-invalid={!!error}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    required
                    autoComplete="current-password"
                    aria-invalid={!!error}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  />
                </div>
                <button type="submit" className="login-button btn-text">
                  로그인
                </button>
              </div>

              {error && <p className="form-error" role="alert">{error}</p>}

              <label className="checkbox-group">
                <input
                  type="checkbox"
                  checked={rememberId}
                  onChange={(e) => setRememberId(e.target.checked)}
                />
                <span>아이디 저장</span>
              </label>
            </form>

            {/* 소셜 로그인 (추후 실제 핸들러 연결) */}
            <div className="button-container">
              <button id="naver-btn" aria-label="네이버로 로그인">
                <img src="/img/btnG_naver.png" alt="naver" />
              </button>
              <button id="kakao-btn" aria-label="카카오로 로그인">
                <img src="/img/kakao_login_large_narrow.png" alt="kakao" />
              </button>
              <button id="google-btn" aria-label="구글로 로그인">
                <img src="/img/google_btn.png" alt="google" style={{ height: "65px", width: "auto", marginLeft: "-15px" }} />
              </button>
            </div>

            <div id="bottom-menu">
              <button className="common-btn btn-text" onClick={() => navigate("/signup")}>
                회원가입
              </button>
              <button className="common-btn btn-text">아이디 찾기</button>
              <button className="common-btn btn-text">비밀번호 찾기</button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
