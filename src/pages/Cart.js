// src/pages/CartPage.js
import React from "react";
import "./Cart.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartPage() {
  return (  
    <main className="cart container">
      <h2>장바구니</h2>
      <div className="step">
        <span className="active">01 장바구니</span>
        <span>02 주문서 작성/결제</span>
        <span>03 주문완료</span>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>상품 / 옵션 정보</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>합계금액</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="item-info">
              <img src="/img/main1-2.png" alt="상품1" />
              <div>
                <strong>ReIRABO Bowl L - 4종</strong><br />
                <span>색상 : Spring Mint Green</span><br />
                <span>₩55,000</span>
              </div>
            </td>
            <td>1개</td>
            <td>55,000원</td>
            <td>55,000원</td>
            <td>7만원 이상 무료<br />배송비 0원</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td className="item-info">
              <img src="/img/main1-2.png" alt="상품2" />
              <div>
                <strong>[Timeless Craft] 밴드메이드 민무늬 수욕</strong><br />
                <span>사이즈: L</span><br />
                <span>₩40,000</span>
              </div>
            </td>
            <td>2개</td>
            <td>40,000원</td>
            <td>80,000원</td>
            <td>0원</td>
          </tr>
        </tbody>
      </table>

      <div className="cart-actions">
        <button className="delete">선택상품 삭제</button>
      </div>

      <div className="summary">
        <div>
          <strong>총 2개의 상품금액</strong><br />
          <span>135,000원</span>
        </div>
        <i className="fa-solid fa-plus"></i>
        <div>
          <strong>배송비</strong><br />
          <span>3,500원</span>
        </div>
        <span><i className="fa-solid fa-equals"></i></span>
        <div>
          <strong>합계금액</strong><br />
          <span className="total">138,500원</span>
        </div>
      </div>

      <div className="order-buttons">
        <button className="gray">선택상품 주문</button>
        <button className="black">전체상품 주문</button>
      </div>
    </main>
  );
}
