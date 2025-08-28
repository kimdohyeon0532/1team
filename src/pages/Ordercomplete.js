import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Ordercomplete.css";

export default function OrderCompletePage() {
  return (
    <>
      <Header />

      <div className="container">
        <main className="order-complete" role="main" aria-labelledby="order-complete-title">
          {/* 상단 단계 표시 */}
          <div id="Topmenu">
            <h1 id="order-complete-title">주문완료</h1>
            <ul aria-label="주문 단계">
              <li>01 장바구니</li>
              <li>02 주문서 작성/결제</li>
              <li className="active">03 주문완료</li>
            </ul>
          </div>

          {/* 완료 메시지 */}
          <p className="success-message">✔ 주문이 완료 되었습니다!</p>
          <p className="thank-message">차간과 함께해 주셔서 감사합니다.</p>

          {/* 주문 정보 */}
          <section className="order-info" aria-label="주문 정보">
            <p>주문번호 : 0000-0000-0000</p>
            <p>주문일시 : 2025.08.13 / 16:01</p>
            <p>결제수단 : 신용카드 / 138,500원</p>
          </section>

          {/* 버튼 */}
          <div id="menus">
            <button type="button">주문내역 보기</button>
            <button type="button">쇼핑 계속하기</button>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
