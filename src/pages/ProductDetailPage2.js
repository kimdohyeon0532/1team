// src/pages/ProductDetailPage.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/ProductDetailPage.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage2() {
  const [quantity, setQuantity] = useState(1);

  // --- 리뷰 상태 ---
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState([]); // dataURL 미리보기들 (최대 3장)

  const [reviews, setReviews] = useState(
    [
      {
        id: 2,
        name: "김**",
        date: "2025-07-10",
        rating: 4,
        content: "섬세하고 매트한 질감이 좋았습니다.",
        photos: ["/img/p_detail2-2.png"]
      },
      {
        id: 1,
        name: "박**",
        date: "2025-08-13",
        rating: 5,
        content: "너무 예뻐요! 따뜻한 느낌을 줘요 ☺️",
        photos: ["/img/p_detail2-4.png"]
      },
    ].sort((a, b) => (a.date < b.date ? 1 : -1))
  ); // 최신순

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remain = Math.max(0, 3 - photos.length);
    const pick = files.slice(0, remain);

    const readers = await Promise.all(
      pick.map(
        (f) =>
          new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = rej;
            r.readAsDataURL(f);
          })
      )
    );
    setPhotos((prev) => [...prev, ...readers]);
    e.target.value = "";
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (reviewText.trim().length < 15) {
      alert("리뷰는 최소 15자 이상 작성해주세요.");
      return;
    }
    const newReview = {
      id: Date.now(),
      name: "익명",
      date: new Date().toISOString().slice(0, 10),
      rating,
      content: reviewText.trim(),
      photos,
    };
    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setHover(0);
    setReviewText("");
    setPhotos([]);
  };

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="container">
          <h1 className="product-title">눈결 개완</h1>
          <h2 className="product-brand">베르비에</h2>

          <div className="main-image">
            <img src="/img/p_detail2-1.png" alt="대표 이미지" />
          </div>

          <p className="description">
            유리공예가 〈베르비에〉의 〈눈결 개완〉을 소개합니다. <br />
            서늘하고 포근함이 공존하는 눈雪 의 속성처럼 맑으면서도 모호한 표면이 아름다운 유리 개완입니다.
            약 95ml 용량으로 1-2인의 차를 우리기 알맞은 용량이에요.
          </p>

          <div className="main-image">
            <img src="/img/p_detail2-2.png" alt="서브1" />
          </div>

          <p className="description">
            눈결 시리즈는 “눈이 쌓여 이룬 상태나 무늬, 눈에 슬쩍 뜨이는 잠깐동안 마음이 눈에 드러난 상태” 라는 의미를 지닌 <br /> 우리말 “눈결”을 모티브로 한 유하나 작가의 유리 공예 기물입니다. <br />
            <br />
            모든 기물은 형태를 흙으로 빚고 내화물을 바르고 굳힌 뒤, 조형틀에 유리 파우더와 알갱이를 켜켜이 쌓고 가마에 굽는 유리캐스팅 기법으로 제작합니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail2-3.png" alt="세트 이미지" />
          </div>

          <p className="description">
            차의 수색이 투명하게 비치는 것도 유리 다기를 사용하는 즐거움. <br />
            다양한 차를 우리기 좋은 차도구이자 소장가치가 높은 공예품으로 권해드립니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail2-4.png" alt="디테일1" />
          </div>

          <ul className="detail-notes">
            <li>- 수공예 작업으로 같은 기물이라도 사이즈와 형태가 조금씩 다릅니다.</li>
            <li>- 유리 특성상 급격한 온도 변화나 강한 열, 충격이 가해지면 파손될 위험이 있으니 유의해 주세요.</li>
            <li>- 식기세척기, 전자레인지, 오븐 등의 사용은 불가합니다.</li>
            <li>- 세척시에는 부드러운 스펀지나 천을 통해 세척해 주세요.</li>
          </ul>

          {/* ========== 관리방법 표 ========== */}
          <section className="spec-grid">
            <div className="spec-row">
              <div className="spec-label">재료</div>
              <div className="spec-value">백자토</div>
              <div className="spec-label">크기&용량</div>
              <div className="spec-value">
                (받침포함) 높이 70mm · 받침 Ø95 x H15mm<br />
                한 잔 용량 약 95ml
              </div>
            </div>

            <div className="spec-row">
              <div className="spec-label">관리방법</div>
              <div className="spec-value">세제없이 물로만 세척</div>
              <div className="spec-label">주의사항</div>
              <div className="spec-value">상세페이지 하단 표기</div>
            </div>
          </section>

          {/* ========== BUY ROW (이미지 · 정보 · 우측 버튼) ========== */}
          <section className="buy-row">
            {/* 좌측 이미지 */}
            <figure className="buy-photo">
              <img src="/img/p_detail1-7.png" alt="눈결 개완" />
            </figure>

            {/* 가운데 정보 블록 */}
            <div className="buy-info">
              <div className="buy-brand">베르비에</div>
              <h3 className="buy-title">눈결 개완</h3>
              <p className="buy-desc">[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 개완</p>

              <div className="buy-price">55,000원</div>

              {/* 총 상품금액 라인 + 수량 스피너 (인라인) */}
              <div className="buy-total">
                <span className="total-label">총 상품금액</span>
                <strong className="total-price">55,000원</strong>

                <div className="buy-qty inline">
                  <div className="spinner">
                    <input
                      id="qty"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    />
                    <div className="spin-btns">
                      <button type="button" aria-label="수량 증가" onClick={() => setQuantity(q => q + 1)}>▲</button>
                      <button type="button" aria-label="수량 감소" onClick={() => setQuantity(q => Math.max(1, q - 1))}>▼</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 세로 버튼 */}
            <aside className="buy-actions">
              <button className="btn-ghost">장바구니</button>
              <button className="btn-solid">바로구매</button>
            </aside>
          </section>

          {/* ==================== REVIEW 영역 ==================== */}
          <div className="reviews-section">
            <h3 className="reviews-title">REVIEW</h3>

            <form className="review-form" onSubmit={submitReview}>
              <textarea
                placeholder="최소 15자 이상 작성해주세요."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <div className="review-form-bottom">
                <div className="stars-input" aria-label="별점 선택">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="star-btn"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      aria-pressed={rating === s}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className={s <= (hover || rating) ? "star filled" : "star"}
                      />
                    </button>
                  ))}
                </div>

                <div className="review-actions">
                  <div className="upload-wrap">
                    <input
                      id="reviewPhotos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      hidden
                    />
                    <label htmlFor="reviewPhotos" className="btn-upload">
                      <FontAwesomeIcon icon={faPlus} />
                      <span>사진첨부</span>
                    </label>
                    <span className="upload-hint">(최대 3장)</span>
                  </div>

                  <button type="submit" className="review-submit">
                    <span>리뷰등록</span>
                  </button>
                </div>
              </div>

              {photos.length > 0 && (
                <ul className="preview-list">
                  {photos.map((src, i) => (
                    <li key={i} className="preview-item">
                      <img src={src} alt={`preview-${i}`} />
                      <button
                        type="button"
                        className="preview-del"
                        onClick={() => removePhoto(i)}
                        aria-label="사진 삭제"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <ul className="review-list">
              {reviews.map((r) => (
                <li key={r.id} className="review-item">
                  <div className="review-head">
                    <div className="stars-static" aria-label={`별점 ${r.rating}점`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FontAwesomeIcon
                          key={s}
                          icon={faStar}
                          className={s <= r.rating ? "star filled" : "star"}
                        />
                      ))}
                    </div>
                    <small className="review-date">{r.date}</small>
                  </div>

                  <p className="review-content">{r.content}</p>

                  {r.photos?.length > 0 && (
                    <ul className="review-photos">
                      {r.photos.map((src, i) => (
                        <li key={i} className="review-photo">
                          <img src={src} alt={`review-${r.id}-${i}`} />
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="review-foot">
                    <small className="review-author">{r.name}님의 리뷰 입니다.</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
