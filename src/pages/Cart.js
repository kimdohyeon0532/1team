import React from "react";
import "./Cart.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

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
                <img src="/img/newIn3-1.png" alt="장바구니상품1" />
                <div>
                  <strong>눈결개완</strong><br />
                  <span>[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 개완</span><br />
                </div>
              </td>
              <td>1개</td>
              <td>55,000원</td>
              <td>55,000원</td>
              <td>20만원 이상 무료<br />배송비 0원</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td className="item-info">
                <img src="/img/p_detail2-8.png" alt="장바구니상품2" />
                <div>
                  <strong>Herb Pot 0.5L</strong><br />
                  <span>[Timeless Craft] 분리가 가능한 찻잎 여과기가 함께 구성된 유리 찻주전자</span><br />
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
          <button className="gray" onClick={() => navigate("/order")}>선택상품 주문</button>
          <button className="black" onClick={() => navigate("/order")}>전체상품 주문</button>
        </div>
      </main>

      <Footer />
    </>
  );
}
