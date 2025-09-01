import React, { useState } from "react";
import { Link } from "react-router-dom";

const DATA = [
  { img: "/img/main2-4.png", desc: "일상다감 日常茶感,<br>토림도예 개인전", link: "/exhibition1" },
  { img: "/img/main2-2.png", desc: "빛의 농담濃淡,<br>김제형 작품전", link: "/exhibition1" },
  { img: "/img/main2-3.png", desc: "백수천경 白樹千景,<br>박지영 작품전", link: "/exhibition2" },
];

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

  // 단순히 prev/current/next의 데이터만 계산
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
        overflow:hidden; margin:0;
        box-shadow:0 12px 40px rgba(0,0,0,.08); background:rgba(255,255,255,.4);
      }
      .brand-story-simple .slide img{ width:100%; height:100%; object-fit:cover; display:block;
        transition:transform .3s ease, filter .3s ease; /* filter도 transition에 추가 */ }
      .brand-story-simple .slide:hover img{ transform:scale(1.02); }
      .brand-story-simple .story-images .slide:first-child:hover img { opacity: 0.2; }


      .brand-story-simple .text-overlay{
        position:absolute; left:clamp(40px, 7vw, 160px); top:50%; transform:translateY(-50%);
        width:min(520px, 38vw); pointer-events:none; transition:opacity .35s ease;
      }
      .brand-story-simple .text-overlay.fade-in{ opacity:1; }
      .brand-story-simple .text-overlay.fade-out{ opacity:0; }
      .brand-story-simple .title{ font-size:clamp(30px, 5vw, 50px); font-family: 'Gowun Batang'; font-weight:700; margin-bottom:16px; color:#111; }
      .brand-story-simple .desc{ font-size:18px; font-weight: 800; line-height:1.8; color:#000; margin-bottom:18px; min-height:4.5em; 
      }
      .brand-story-simple .link{
        display:inline-block; padding:15px 50px; border-radius:50px;
        font-size:16px; transition:all .3s ease; text-decoration:none; color:#fff; background:#111; pointer-events:auto;
      }
      .brand-story-simple .link:hover{ background:#fff; color:#111; }

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
         {/* prev */}
         <div className="slide">
           <img src={prev.img} alt="이전 포스터" />
         </div>
         {/* current */}
         <div className="slide">
           <img src={current.img} alt="현재 포스터" />
         </div>
         {/* next */}
         <div className="slide">
           <img src={next.img} alt="다음 포스터" />
         </div>
       </div>
       
       {/* 텍스트 오버레이 */}
       <div className={`text-overlay ${isSliding ? "fade-out" : "fade-in"}`}>
         <h2 className="title">Exhibition story</h2>
         <p className="desc" dangerouslySetInnerHTML={{ __html: current.desc }} />
         {/* "자세히 보기"만 링크 */}
         <Link className="link" to={current.link}>자세히 보기</Link>
       </div>
      </div>
    </section>
  );
}
