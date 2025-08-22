import React, { useState } from "react";

const DATA = [
    { img: "/img/main2-1.png", desc: "일상다감,<br>토림도예 개인전" },
    { img: "/img/main2-2.png", desc: "일상다감,<br>토림도예 개인전" },
    { img: "/img/main2-3.png", desc: "일상다감,<br>토림도예 개인전" },
];

export default function BrandStorySimple() {
    const [idx, setIdx] = useState(0);
    const mod = (n, m) => (n % m + m) % m;

    const prev = DATA[mod(idx - 1, DATA.length)];
    const current = DATA[idx];
    const next = DATA[mod(idx + 1, DATA.length)];

    const go = (i) => setIdx(mod(i, DATA.length));

    return (
        <section className="brand-story-simple snap" aria-label="브랜드 스토리">
            <button className="arrow left" onClick={() => go(idx - 1)} aria-label="이전">‹</button>
            <button className="arrow right" onClick={() => go(idx + 1)} aria-label="다음">›</button>
            <div className="story-grid">
                <figure className="prev"><img src={prev.img} alt="이전 포스터" /></figure>
                <div className="text">
                    <h2 className="title">Brand Story</h2>
                    <p className="desc" dangerouslySetInnerHTML={{ __html: current.desc }} />
                    <a className="link" href="#">자세히 보기</a>
                </div>
                <figure className="main" onClick={() => go(idx + 1)}>
                    <img src={current.img} alt="현재 포스터" />
                </figure>
                <figure className="next"><img src={next.img} alt="다음 포스터" /></figure>
            </div>
        </section>
    );
}
