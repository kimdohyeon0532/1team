import React from "react";

export default function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <div className="container">
                    <div className="footer-left">
                        <img src="/img/simbol2.png" alt="로고" width="150" height="150" />
                        <div className="footer-text">
                            <div className="footer-title">ONLINE SHOP</div>
                            <div className="footer-desc">
                                온라인 숍 상담: 11AM - 4PM<br />
                                (점심시간 1PM-2PM / 토, 일, 공휴일 휴무)<br /><br />
                                오프라인 숍 영업 화-일 / 12PM-7PM (월요일 휴무)
                            </div>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>HELP</h4>
                        <ul>
                            <li>고객센터</li>
                            <li>주문/배송 조회</li>
                            <li>공지사항</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>CONTACT</h4>
                        <ul>
                            <li>B2B 문의</li>
                            <li>입점 문의</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>ABOUT</h4>
                        <ul>
                            <li>BRAND STORY</li>
                            <li>JOURNEL</li>
                            <li>회원가입</li>
                            <li>매장안내</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-left">
                        <span>회사소개</span><span>회원약관</span><span>인재채용</span><span>사이트맵</span>
                        <span>이용약관</span><span>개인정보처리방침</span><span>개인정보관리자 박지영</span>
                        <span>@CHAGAN All Rights Reserved.</span>
                    </div>
                    <div className="footer-social">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-facebook-f"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}
