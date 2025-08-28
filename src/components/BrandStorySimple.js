import React, { useState } from "react";
import { Link } from "react-router-dom";

const DATA = [
  { img: "/img/main2-1.png", desc: "일상다감,<br>토림도예 개인전" },
  { img: "/img/main2-2.png", desc: "일상다감,<br>토림도예 개인전" },
  { img: "/img/main2-3.png", desc: "일상다감,<br>토림도예 개인전" },
];

const DETAIL_PATH = "/exhibition1"; // 필요하면 "/exhibition1" 로 바꿔도 됨

export default function BrandStorySimple() {
  const [idx, setIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const mod = (n, m) => (n % m + m) % m;

  const go = (direction) => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setIdx((prev) => mod(prev + direction, DATA.length));
      setIsSliding(false);
    }, 600);
  };

  const prev = DATA[mod(idx - 1, DATA.length)];
  const current = DATA[idx];
  const next = DATA[mod(idx + 1, DATA.length)];

  return (
    <section className="brand-story-simple">
      <style>{`
        .brand-story-simple {
          position: relative; width: 100%; height: 100vh;
          padding: min(12px, 1vw) 2vw;
          background: linear-gradient(135deg, #f9f8f5, #ffffff);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .brand-story-simple .arrow{
          position:absolute; top:50%; transform:translateY(-50%);
          z-index:5; border:none; cursor:pointer; width:46px; height:46px;
          border-radius:50%; display:grid; place-items:center; font-size:28px;
          background:rgba(0,0,0,.5); color:#fff; transition:.2s ease-in-out;
        }
        .brand-story-simple .arrow.left{ left:1.2vw; }
        .brand-story-simple .arrow.right{ right:1.2vw; }
        .brand-story-simple .arrow:hover{ background:rgba(0,0,0,.75); transform:translateY(-50%) scale(1.08); }

        .brand-story-simple .story-slider{
          position:relative; display:grid;
          grid-template-columns:minmax(40px,1fr) minmax(320px,520px) minmax(48vw,1fr) minmax(40px,1fr);
          gap:min(2vw,24px); width:100%; max-width:1600px; align-items:center;
        }
        .brand-story-simple .story-images{
          grid-column:2 / span 2; display:grid; grid-template-columns:1fr 1fr 1fr;
          gap:min(2vw,24px); align-items:stretch; transition:transform .6s ease;
        }

        .brand-story-simple .slide{
          width:100%; height:clamp(420px, 70vh, 900px);
          border-radius:14px; overflow:hidden; margin:0;
          box-shadow:0 12px 40px rgba(0,0,0,.08); background:rgba(255,255,255,.4);
        }
        .brand-story-simple .slide img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s ease; }
        .brand-story-simple .slide:hover img{ transform:scale(1.02); }

        .brand-story-simple .text-overlay{
          position:absolute; left:clamp(40px, 7vw, 160px); top:50%; transform:translateY(-50%);
          width:min(520px, 38vw); pointer-events:none; transition:opacity .35s ease;
        }
        .brand-story-simple .text-overlay.fade-in{ opacity:1; }
        .brand-story-simple .text-overlay.fade-out{ opacity:0; }
        .brand-story-simple .title{ font-size:clamp(40px, 5vw, 64px); font-weight:700; margin-bottom:16px; color:#111; }
        .brand-story-simple .desc{ font-size:18px; line-height:1.8; color:#444; margin-bottom:18px; min-height:4.5em; }
        .brand-story-simple .link{
          display:inline-block; padding:10px 18px; border:1px solid #111; border-radius:999px;
          font-size:16px; transition:all .3s ease; text-decoration:none; color:#111; background:#fff; pointer-events:auto;
        }
        .brand-story-simple .link:hover{ background:#111; color:#fff; }

        @media (max-width:1280px){
          .brand-story-simple .story-slider{
            grid-template-columns:minmax(24px,1fr) minmax(320px,460px) minmax(52vw,1fr) minmax(24px,1fr);
          }
        }
        @media (max-width:960px){
          .brand-story-simple .story-slider{ grid-template-columns:1fr; gap:14px; }
          .brand-story-simple .story-images{ grid-column:1 / -1; grid-template-columns:1fr; }
          .brand-story-simple .text-overlay{ position:static; transform:none; width:100%; margin-bottom:10px; }
          .brand-story-simple .slide{ height:clamp(320px, 50vh, 560px); }
          .brand-story-simple .arrow.left{ left:6px; } .brand-story-simple .arrow.right{ right:6px; }
        }
      `}</style>

      <button className="arrow left" onClick={() => go(-1)}>‹</button>
      <button className="arrow right" onClick={() => go(1)}>›</button>

      <div className="story-slider">
        <div className={`story-images ${isSliding ? "sliding" : ""}`}>
          {/* ← 이전 / 현재 / 다음 슬라이드 전부 클릭하면 상세로 이동 */}
          <Link to={DETAIL_PATH} className="slide" aria-label="이전 포스터로 이동">
            <img src={prev.img} alt="이전 포스터" />
          </Link>
          <Link to={DETAIL_PATH} className="slide" aria-label="현재 포스터로 이동">
            <img src={current.img} alt="현재 포스터" />
          </Link>
          <Link to={DETAIL_PATH} className="slide" aria-label="다음 포스터로 이동">
            <img src={next.img} alt="다음 포스터" />
          </Link>
        </div>

        <div className={`text-overlay ${isSliding ? "fade-out" : "fade-in"}`}>
          <h2 className="title">Brand Story</h2>
          <p className="desc" dangerouslySetInnerHTML={{ __html: current.desc }} />
          <Link className="link" to={DETAIL_PATH}>자세히 보기</Link>
        </div>
      </div>
    </section>
  );
}
