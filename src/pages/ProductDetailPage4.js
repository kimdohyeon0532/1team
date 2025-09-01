// src/pages/ProductDetailPage.js

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/ProductDetailPage.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage4() {
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
        content: "모양이 너무 귀여워요.",
        photos: ["/img/p_detail4-6.png"]
      },
      {
        id: 1,
        name: "박**",
        date: "2025-08-13",
        rating: 5,
        content: "이름도 모양도 예쁜 호롱. 저녁마다 조명대신 켜놓으니 차분해져요!",
        photos: ["/img/p_detail4-4.png"]
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
          <h1 className="product-title">청자 미니 호롱 - 조롱박</h1>
          <h2 className="product-brand">박소희</h2>

          <div className="main-image">
            <img src="/img/p_detail4-1.png" alt="대표 이미지" />
          </div>

          <p className="description">
          전통 등잔을 현대적인 미감으로 해석한 박소희 작가의 〈미니 호롱 - 조롱박〉입니다.  <br />
          한국의 유물인 향합과 연적의 형태에서 영감을 받은 단아한 생김새와 작가만의 독특한 유약이 아름다운 제품입니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail4-2.png" alt="서브1" />
          </div>

          <p className="description">
            기름을 먹인 명주실 심지를 태워 방 안에 환한 불빛을 만들었던 등잔의 과거 풍경을 상상해 봅니다. <br />
            <br />
            전기 조명과는 다른 은은한 불빛이 만들어내는 온기, 고즈넉하고 다정한 분위기가 떠오릅니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail4-3.png" alt="세트 이미지" />
          </div>

          <p className="description">
          파라핀 오일과 답비가 함께 구성된 패키지로, 깔끔하고 정갈한 선물용으로도 추천해 드립니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail4-4.png" alt="디테일1" />
          </div>

          <ul className="detail-notes">
            <li>- 한 점 한 점 작가의 손을 통해 제작되는 제품으로, 모든 제품은 조금씩 유약의 흐름과 색, 크기의 미묘한 차이가 있습니다. <br /> 
            이는 자연스러운 현상으로 기물 각각의 고유한 표정으로 여겨주세요.</li>
            <li>- 심지구멍으로 나온 실의 길이가 길면 불꽃이 커지거나 그을음이 발생할 수 있고, 짧으면 불이 금방 꺼질 수 있으니 유의해 주세요.</li>
            <li>- 호롱 사용 후에는 환기를 시켜주세요. 파라핀 오일이 부족하지 않은 이상 불은 꺼지지 않습니다.</li>
          </ul>

          {/* ========== 관리방법 표 ========== */}
          <section className="spec-grid">
            <div className="spec-row">
              <div className="spec-label">재료</div>
              <div className="spec-value">도자기</div>
              <div className="spec-label">크기&용량</div>
              <div className="spec-value">
              약 W40 x D40 x H55mm
              </div>
            </div>

            <div className="spec-row">
              <div className="spec-label">관리방법</div>
              <div className="spec-value">부드러운 천</div>
              <div className="spec-label">주의사항</div>
              <div className="spec-value">상세페이지 하단 표기</div>
            </div>
          </section>

          {/* ========== BUY ROW (이미지 · 정보 · 우측 버튼) ========== */}
          <section className="buy-row">
            {/* 좌측 이미지 */}
            <figure className="buy-photo">
              <img src="/img/p_detail4-5.png" alt="눈결 개완" />
            </figure>

            {/* 가운데 정보 블록 */}
            <div className="buy-info">
              <div className="buy-brand">박소희</div>
              <h3 className="buy-title">청자 미니 호롱 - 조롱박</h3>
              <p className="buy-desc">[Timeless Craft] 전통 등잔을 현대적인 미감으로 표현한 미니 도자 호롱</p>

              <div className="buy-price">60,000원</div>

              {/* 총 상품금액 라인 + 수량 스피너 (인라인) */}
              <div className="buy-total">
                <span className="total-label">총 상품금액</span>
                <strong className="total-price">60,000원</strong>

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
