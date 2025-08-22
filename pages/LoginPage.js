import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./LoginPage.css"; // 아래 CSS 파일

export default function LoginPage() {
    return (
        <>
            <Header />

            <div className="container">
                <main className="login-main">
                    <div className="login-container">
                        <h2>로그인</h2>
                        <h3>회원 로그인</h3>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="login-form-row">
                                <div className="input-column">
                                    <input type="text" placeholder="아이디" required />
                                    <input type="password" placeholder="비밀번호" required />
                                </div>
                                <button type="submit" className="login-button btn-text">로그인</button>
                            </div>

                            <label className="checkbox-group">
                                <input type="checkbox" />
                                <span>아이디 저장</span>
                            </label>
                        </form>

                        {/* 소셜 로그인 */}
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

                        {/* 회원/찾기 */}
                        <div id="bottom-menu">
                            <button className="common-btn btn-text">회원가입</button>
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
