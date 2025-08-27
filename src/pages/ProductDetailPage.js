import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/ProductDetailPage.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  // --- 리뷰 상태 ---
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 2,
      name: "김**",
      date: "2025-07-10",
      rating: 4,
      content: "섬세하고 매트한 질감이 좋았습니다.",
    },
    {
      id: 1,
      name: "박**",
      date: "2025-08-13",
      rating: 5,
      content: "너무 예뻐요! 따뜻한 느낌을 줘요 ☺️",
    },
  ].sort((a,b)=> (a.date < b.date ? 1 : -1))); // 최신순

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
    };
    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setHover(0);
    setReviewText("");
  };

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="container">
          <h1 className="product-title">눈결 개완</h1>
          <h2 className="product-brand">베르비에</h2>

          <div className="main-image">
            <img src="/img/p_detail1-1.png" alt="대표 이미지" />
          </div>

          <p className="description">
            유백색의 <strong>눈결 개완</strong>은 섬세한 표면 질감이 특징입니다.
            사계절의 고요한 기운을 담아내듯, 손끝에서의 감각이 깊이 전달됩니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail1-2.png" alt="서브1" />
          </div>

          <p className="description">
            자기 시유면은 눈처럼 부드러운 표면을 가지며, 그 위에 흐르는 유약의 흐름은 각각의 개완마다 독특한 표정을 만듭니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail1-5.png" alt="세트 이미지" />
          </div>

          <p className="description">
            차와 기물을 함께 두었을 때, 고요한 감성이 어우러집니다.
          </p>

          <div className="main-image">
            <img src="/img/p_detail1-6.png" alt="디테일1" />
          </div>

          <ul className="detail-notes">
            <li>수작업 제품으로 작은 기포/흠집/흐림이 있을 수 있으며 불량이 아닙니다.</li>
            <li>이로 인한 교환/반품은 어려우며, 제품의 고유한 개성으로 이해 부탁드립니다.</li>
          </ul>

       <div className="purchase-box">
  <img src="/img/p_detail1-4.png" alt="썸네일" className="purchase-thumbnail" />

  <div className="purchase-info">
    <h3 className="product-name">[Torim Ceramic] 눈결 개완</h3>
    <p className="price">₩50,000</p>

    <div className="quantity-control">
      <label htmlFor="quantity">수량:</label>
      <input
        type="number"
        id="quantity"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </div>

    <div className="purchase-buttons">
      <button className="btn black">바로 구매</button>
      <button className="btn gray">장바구니</button>
    </div>
  </div>
</div>
          {/* ==================== REVIEW 영역 ==================== */}
         <div className="reviews-section">
  <h3 className="reviews-title">REVIEW</h3>

  <form className="review-form" onSubmit={submitReview}>
    <textarea
      placeholder="최소 15자 이상 작성해주세요."
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
    />

    <div className="rating-row">
      <div className="stars-input" aria-label="별점 선택">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            className="star-btn"
            onClick={() => setRating(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
          >
            <FontAwesomeIcon
              icon={faStar}
              className={s <= (hover || rating) ? "star filled" : "star"}
            />
          </button>
        ))}
      </div>

      <button type="submit" className="review-submit">
        <FontAwesomeIcon icon={faPaperPlane} />
        <span>리뷰등록</span>
      </button>
    </div>
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
        <small className="review-author">{r.name}님의 리뷰 입니다.</small>
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
