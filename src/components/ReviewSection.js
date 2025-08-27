    import { small } from "framer-motion/client";
    import React from "react";

    export default function ReviewSection() {
        return (
    <>  
                <style>{`
                .rv-title-gray {
                    color: #9a9797;
                }
                
                .thumbs p {
                    font-weight: 600;
                }      
                `}</style>
        
                <section className="review container snap snap-center">
                    <h3 className="section-title">
                        NEW IN <br /><small>이번주 신상품</small>
                    </h3>
        
                    <div className="review-grid">
                <article className="rv-card">
                    <img src="/img/review1.png" alt="리뷰1" />
                    <div className="rv-meta">
                        <div className="thumbs">
                            <img src="/img/review1-1.png" alt="섬네일" />
                            <div>
                                <b>
                                    <span className="rv-title-gray">베르비에</span><br />
                                    눈결개완
                                </b>
                                <p>[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 개완</p><br />
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
                                <b>
                                    <span className="rv-title-gray">Craft U</span><br />
                                    Herb Pot 0.5L
                                </b>
                                <p>[Timeless Craft] 분리가 가능한 찻잎 여과기가 함께 구성된<br />유리 찻주전자</p><br />
                                <span>40,000원</span>
                            </div>
                        </div>
                    </div>
                </article>
        
                    </div>
                </section>
    </>
        );
    }
