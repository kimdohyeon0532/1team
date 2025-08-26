import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../pages/ProductDetailPage.css"; 


export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <Header />
            <main className="product-detail">
                <section className="product-title">
                    <h1>눈결 개완</h1>
                    <h2>토림도예</h2>
                </section>

                <section className="product-main">
                    <img src="/img/product/main.jpg" alt="눈결 개완 대표 이미지" />
                    <p>유백색의 <strong>눈결 개완</strong>은 섬세한 표면 질감이 특징입니다. 사계절의 고요한 기운을 담아내듯, 손끝에서의 감각이 깊이 전달됩니다.</p>
                </section>

                <section className="product-gallery">
                    <div className="gallery-images">
                        <img src="/img/product/sub1.jpg" alt="서브 이미지 1" />
                        <img src="/img/product/sub2.jpg" alt="서브 이미지 2" />
                        <img src="/img/product/sub3.jpg" alt="서브 이미지 3" />
                    </div>
                    <p>자기 시유면은 눈처럼 부드러운 표면을 가지며, 그 위에 흐르는 유약의 흐름은 각각의 개완마다 독특한 표정을 만듭니다.</p>
                </section>

                <section className="product-set">
                    <img src="/img/product/set.jpg" alt="찻잔 세트 이미지" />
                    <p>차와 기물을 함께 두었을 때, 고요한 감성이 어우러집니다.</p>
                </section>

                <section className="product-detail-images">
                    <div className="detail-grid">
                        <img src="/img/product/detail1.jpg" alt="디테일 1" />
                        <img src="/img/product/detail2.jpg" alt="디테일 2" />
                        <img src="/img/product/detail3.jpg" alt="디테일 3" />
                        <img src="/img/product/detail4.jpg" alt="디테일 4" />
                    </div>
                    <ul className="detail-notes">
                        <li>수작업 제품으로 작은 기포/흠집/흐림이 있을 수 있으며 불량이 아닙니다.</li>
                        <li>이로 인한 교환/반품은 어려우며, 제품의 고유한 개성으로 이해 부탁드립니다.</li>
                    </ul>
                </section>

                <section className="product-purchase">
                    <img src="/img/product/thumb.jpg" alt="제품 썸네일" />
                    <div className="info">
                        <h3>[Torim Ceramic] 눈결 개완</h3>
                        <p>₩50,000</p>
                        <label>수량:
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </label>
                        <div className="actions">
                            <button className="buy-now">바로 구매</button>
                            <button className="add-cart">장바구니</button>
                        </div>
                    </div>
                </section>

                <section className="product-reviews">
                    <h3>REVIEW</h3>
                    <form className="review-form">
                        <textarea placeholder="최소 15자 이상 작성해주세요."></textarea>
                        <button>작성하기</button>
                    </form>
                    <ul className="review-list">
                        <li>
                            <strong>★★★★★</strong>
                            <p>너무 예뻐요! 따뜻한 느낌을 주네요 ☺️</p>
                            <small>2025-08-13</small>
                        </li>
                        <li>
                            <strong>★★★★☆</strong>
                            <p>섬세하고 매트한 질감이 좋았습니다.</p>
                            <small>2025-07-10</small>
                        </li>
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}
