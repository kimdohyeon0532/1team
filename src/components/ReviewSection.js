import React from "react";

export default function ReviewSection() {
    return (
        <section className="review container snap snap-center">
            <h3 className="section-title">
                REVIEW<br /><small>CHAGAN 리뷰</small>
            </h3>

            <div className="review-grid">
                <article className="rv-card">
                    <img src="/img/review1.png" alt="리뷰1" />
                    <div className="rv-meta">
                        <div className="thumbs">
                            <img src="/img/review1-1.png" alt="섬네일" />
                            <div>
                                <b>베르비에<br />눈결 개완</b><br />
                                <p>[Timeless Craft] <br />눈결의 섬세함을 닮은 수공예 유리 개완</p><br />
                                <span>55,000원</span>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="rv-card">
                    <img src="/img/review2.png" alt="리뷰2" />
                    <div className="rv-meta">
                        <div className="thumbs">
                            <img src="/img/review2-1.png" alt="섬네일" />
                            <div>
                                <b>반달 주전자</b><br />
                                <p>Timeless Craft의<br /> 전통미와 현대미의 균형</p><br />
                                <span>40,000원</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
