import React, { useState, useEffect } from "react";

const slides = [
    "/img/main1-1.png",
    "/img/main1-2.png",
    "/img/main1-3.png",
    "/img/main1-4.png",
];

export default function Hero() {
    const [idx, setIdx] = useState(0);
    const [showSearch, setShowSearch] = useState(false);

    const go = (i) => setIdx((i + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(() => go(idx + 1), 6000);
        return () => clearInterval(timer);
    }, [idx]);

    // 검색창 나타나는 애니메이션 (Splash 끝난 뒤)
    useEffect(() => {
        const t = setTimeout(() => setShowSearch(true), 2000);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="hero snap" id="hero">
            <button className="hero-arrow left" onClick={() => go(idx - 1)} aria-label="이전">‹</button>
            <div className="hero-track" style={{ transform: `translateX(${-idx * 100}%)` }}>
                {slides.map((s, i) => (
                    <div key={i} className="hero-slide" style={{ backgroundImage: `url(${s})` }}></div>
                ))}
            </div>

            <div className={`search-wrap ${showSearch ? "show" : ""}`}>
                <input type="text" placeholder="검색어를 입력하세요" aria-label="검색어" />
                <button className="search-btn" aria-label="검색">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <button className="hero-arrow right" onClick={() => go(idx + 1)} aria-label="다음">›</button>
        </section>
    );
}
