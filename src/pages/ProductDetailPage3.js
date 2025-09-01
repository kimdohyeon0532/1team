// src/pages/ProductDetailPage.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/ProductDetailPage.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage3() {
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
        content: "두루두루 너무 편합니다! 크기도 적당해여 작은것도 하나 더 사려고 합니다.",
        photos: ["/img/p_detail3-6.png"]
      },
      {
        id: 1,
        name: "박**",
        date: "2025-08-13",
        rating: 5,
        content: "너무 마음에 들어요! 다음에 또 구입할 것 같습니다.",
        photos: ["/img/p_detail3-1.png"]
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
          <h1 className="product-title">Rim Oval Plate M</h1>
          <h2 className="product-brand">지승민의 공기</h2>

          <div className="main-image">
            <img src="/img/p_detail3-1.png" alt="대표 이미지" />
          </div>

          <p className="description">
            지승민 작가의 새로운 테이블 웨어 컬렉션 〈PATINA〉의 〈Rim Oval Plate M〉 <br />
            오발 형태의 심플한 디자인에 살짝 들린 Rim 디테일이 포인트가 됩니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail3-2.png" alt="서브1" />
          </div>

          <p className="description">
            거대한 돌을 조각해 꺼낸듯한 텍스쳐의 ‘Stone Beige’ <br />
            <br />
            빛의 움직임, 담아내는 음식에 따라 오묘한 아름다움을 느끼실 수 있어요.<br />바탕 흙의 색을 머금고 있어 유약이 발린 두께에 따라 자연스러운 겹겹의 톤이 돋보입니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail3-3.png" alt="세트 이미지" />
          </div>

          <p className="description">
            매트한 표면의 제품 특성상 김치나 카레 등 색이 강한 음식은 장시간 놓아둘 경우 표면에 색과 냄새가 남을 수 있습니다. <br />
            사용 후에는 가급적 바로 세척하거나 물에 담궈놓아 관리해 주세요.
          </p>

          <div className="main-image">
            <img src="/img/p_detail3-4.png" alt="디테일1" />
          </div>

          <ul className="detail-notes">
            <li>- 유광 그릇에 비해 색이 물들기 쉬우니 카레나 김치 같이 물들기 쉬운 음식은 피하는 것이 좋습니다.</li>
            <li>- 음영과 유약의 농담이 저마다 다른 것은 자연스러운 제품의 특징으로 불량이 아닌 점을 이해해 주시고 주문 부탁드립니다.</li>
          </ul>

          {/* ========== 관리방법 표 ========== */}
          <section className="spec-grid">
            <div className="spec-row">
              <div className="spec-label">재료</div>
              <div className="spec-value">자기</div>
              <div className="spec-label">크기&용량</div>
              <div className="spec-value">
                W265 x D195 x H30mm
              </div>
            </div>

            <div className="spec-row">
              <div className="spec-label">관리방법</div>
              <div className="spec-value">부드러운 수세미로 손세척 후 건조</div>
              <div className="spec-label">주의사항</div>
              <div className="spec-value">상세페이지 하단 표기</div>
            </div>
          </section>

          {/* ========== BUY ROW (이미지 · 정보 · 우측 버튼) ========== */}
          <section className="buy-row">
            {/* 좌측 이미지 */}
            <figure className="buy-photo">
              <img src="/img/p_detail3-5.png" alt="그릇" />
            </figure>

            {/* 가운데 정보 블록 */}
            <div className="buy-info">
              <div className="buy-brand">지승민의 공기</div>
              <h3 className="buy-title">Rim Oval Plate M</h3>
              <p className="buy-desc">섬세하게 표현해 낸 표면의 텍스쳐가 아름다운 컬렉션</p>

              <div className="buy-price">80,000원</div>

              {/* 총 상품금액 라인 + 수량 스피너 (인라인) */}
              <div className="buy-total">
                <span className="total-label">총 상품금액</span>
                <strong className="total-price">80,000원</strong>

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
