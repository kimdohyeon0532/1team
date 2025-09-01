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
        content: "차가 잘 우러나고 좋아요:)",
        photos: ["/img/p_detail2-8.png"]
      },
      {
        id: 1,
        name: "박**",
        date: "2025-08-13",
        rating: 5,
        content: "주전자를 구매하고 차를 자주 우려 마시게 되었습니다!",
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
          <h1 className="product-title">Herb Pot 0.5L</h1>
          <h2 className="product-brand">Craft U</h2>

          <div className="main-image">
            <img src="/img/p_detail2-1.png" alt="대표 이미지" />
          </div>

          <p className="description">
            니가타현의 유리 공방 〈Craft U〉의 〈Herb Pot 0.5L〉를 소개합니다. <br />
            우아한 실루엣이 아름다운 내열 유리 찻주전자로, 분리 가능한 유리 여과기가 함께 구성되어 간편하게 차를 우릴 수 있는 제품입니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail2-2.png" alt="서브1" />
          </div>

          <p className="description">
            잎차의 색과 형태, 천천히 우러나는 모습을 눈으로 감상하는 것은 유리 다기를 사용하는 즐거움. <br />
            <br />
            깔끔한 출수가 가능한 물대의 구조와 세심한 디테일까지, 바라볼수록 세심한 만듦새에 감탄하게 됩니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail2-5.png" alt="세트 이미지" />
          </div>

          <p className="description">
            차를 우릴 때에는 끓는 물을 숙우에 한김 식혀 잎차에 알맞은 온도로 맞춘 후, 다관에 천천히 부어주세요.  <br />
            <br />
            대류 공간을 극대화하는 둥근 형태의 바디는 뜨거운 물을 부을 때 찻잎이 위아래로 움직이게 하여 차의 향과 풍미를 더욱 높여줍니다.
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
              <div className="spec-value">내열유리</div>
              <div className="spec-label">크기&용량</div>
              <div className="spec-value">
                W155 x D108 x H205mm<br />
                적정용량 약 450ml
              </div>
            </div>

            <div className="spec-row">
              <div className="spec-label">관리방법</div>
              <div className="spec-value">부드러운 스펀지 or 천</div>
              <div className="spec-label">주의사항</div>
              <div className="spec-value">상세페이지 하단 표기</div>
            </div>
          </section>

          {/* ========== BUY ROW (이미지 · 정보 · 우측 버튼) ========== */}
          <section className="buy-row">
            {/* 좌측 이미지 */}
            <figure className="buy-photo">
              <img src="/img/p_detail2-7.png" alt="티팟" />
            </figure>

            {/* 가운데 정보 블록 */}
            <div className="buy-info">
              <div className="buy-brand">Craft U</div>
              <h3 className="buy-title">Herb Pot 0.5L</h3>
              <p className="buy-desc">[Timeless Craft] 분리가 가능한 찻잎 여과기가 함께 구성된 유리 찻주전자</p>

              <div className="buy-price">40,000원</div>

              {/* 총 상품금액 라인 + 수량 스피너 (인라인) */}
              <div className="buy-total">
                <span className="total-label">총 상품금액</span>
                <strong className="total-price">40,000원</strong>

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
