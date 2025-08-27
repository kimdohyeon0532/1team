import React, { useState } from "react";


const DATA = [
  { img: "/img/main2-1.png", desc: "일상다감,<br>토림도예 개인전" },
  { img: "/img/main2-2.png", desc: "일상다감,<br>토림도예 개인전" },
  { img: "/img/main2-3.png", desc: "일상다감,<br>토림도예 개인전" },
];

export default function BrandStorySimple() {
  const [idx, setIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const mod = (n, m) => (n % m + m) % m;

  const go = (direction) => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setIdx(mod(idx + direction, DATA.length));
      setIsSliding(false);
    }, 600);
  };

  const prev = DATA[mod(idx - 1, DATA.length)];
  const current = DATA[idx];
  const next = DATA[mod(idx + 1, DATA.length)];

  return (
    <section className="brand-story-simple">
      <button className="arrow left" onClick={() => go(-1)}>‹</button>
      <button className="arrow right" onClick={() => go(1)}>›</button>

      <div className="story-slider">
        <div className={`story-images ${isSliding ? "sliding" : ""}`}>
          <figure className="slide"><img src={prev.img} alt="이전 포스터" /></figure>
          <figure className="slide"><img src={current.img} alt="현재 포스터" /></figure>
          <figure className="slide"><img src={next.img} alt="다음 포스터" /></figure>
        </div>

        <div className={`text-overlay ${isSliding ? "fade-out" : "fade-in"}`}>
          <h2 className="title">Brand Story</h2>
          <p className="desc" dangerouslySetInnerHTML={{ __html: current.desc }} />
          <a className="link" href="#">자세히 보기</a>
        </div>
      </div>
    </section>
  );
}
