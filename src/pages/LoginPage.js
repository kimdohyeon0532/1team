// src/pages/LoginPage.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 화면용 더미 로그인 (실제 인증 로직은 여기에 붙이면 됨)
    login({ id: "user123", name: "김도현" });
    navigate("/"); // 또는 navigate("/mypage")
  };

  return (
    <>
      <Header />

      <div className="container">
        <main className="login-main">
          <div className="login-container">
            <h2>로그인</h2>
            <h3>회원 로그인</h3>

            {/* 폼 제출로 로그인 처리 */}
            <form onSubmit={handleLogin}>
              <div className="login-form-row">
                <div className="input-column">
                  <input type="text" placeholder="아이디" required />
                  <input type="password" placeholder="비밀번호" required />
                </div>
                <button type="submit" className="login-button btn-text">
                  로그인
                </button>
              </div>

              <label className="checkbox-group">
                <input type="checkbox" />
                <span>아이디 저장</span>
              </label>
            </form>

            {/* 소셜 로그인 (추후 실제 핸들러 연결) */}
            <div className="button-container">
              <button id="naver-btn" aria-label="네이버로 로그인">
                <img src="/img/naver_btn.png" alt="naver" />
              </button>
              <button id="kakao-btn" aria-label="카카오로 로그인">
                <img src="/img/kakao_login_btn.png" alt="kakao" />
              </button>
              <button id="google-btn" aria-label="구글로 로그인">
                <img src="/img/google_btn.png" alt="google" />
              </button>
            </div>

            {/* 회원/찾기 (원하면 navigate로 라우팅 추가) */}
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
