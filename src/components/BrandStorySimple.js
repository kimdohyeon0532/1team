import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * BrandStorySimple (refactored)
 * 요구사항 요약:
 * - 좌/우 화살표로 prev/current/next 이미지 구성 및 전환
 * - 각 이미지 카드에 hover 시: 이미지가 오른쪽으로 살짝 이동 + 왼쪽 캡션이 나타남
 * - 키보드 접근(:focus-within) 및 터치(탭)에서도 동일한 인터랙션
 * - 모바일에서는 탭하면 열리고, 바깥을 누르면 닫힘(토글)
 * - 기존 구조/데이터 호환 및 transition/가독성 개선
 */

const DATA = [
  { img: "/img/main2-4.png", desc: "빛의 농담濃淡,<br>김제형 작품전", link: "/exhibition2" },
  { img: "/img/main2-2.png", desc: "백수천경 白樹千景,<br>박지영 작품전", link: "/exhibition2" },
  { img: "/img/main2-3.png", desc: "일상다감 日常茶感,<br>토림도예 개인전", link: "/exhibition1" },
];

export default function BrandStorySimple() {
  const [idx, setIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [openSlot, setOpenSlot] = useState(null); // 0(prev), 1(current), 2(next) | null
  const sectionRef = useRef(null);

  const mod = (n, m) => (n % m + m) % m;

  const go = (direction) => {
    if (isSliding) return;
    setIsSliding(true);
    setOpenSlot(null); // 전환 시 열림상태 리셋
    setTimeout(() => {
      setIdx((prev) => mod(prev + direction, DATA.length));
      setIsSliding(false);
    }, 600);
  };

  // prev/current/next 데이터 계산
  const prev = DATA[mod(idx - 1, DATA.length)];
  const current = DATA[idx];
  const next = DATA[mod(idx + 1, DATA.length)];

  // 바깥 클릭 시 모바일 열림 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      if (!sectionRef.current) return;
      if (!sectionRef.current.contains(e.target)) {
        setOpenSlot(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Slot 렌더 유틸
  const SlideCard = ({ slotIndex, data, altLabel }) => {
    const isOpen = openSlot === slotIndex;

    const toggleOpen = () => {
      setOpenSlot((prev) => (prev === slotIndex ? null : slotIndex));
    };

    const onKeyDown = (e) => {
      // Space, Enter로 토글 (Space 기본 스크롤 방지)
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleOpen();
      }
    };

    const captionId = `slide-caption-${slotIndex}`;

    return (
      <div
        className={"slide" + (isOpen ? " is-open" : "")}
        role="button"
        tabIndex={0}
        aria-label={altLabel}
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls={captionId}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          const linkClicked = e.target.closest("a");
          if (linkClicked) return; // 링크는 원래 동작
          toggleOpen();
        }}
      >
        <div className="slide-inner">
          <img className="slide-img" src={data.img} alt={altLabel} />
          <div className="slide-caption" id={captionId}>
            <h3 className="cap-title">Exhibition</h3>
            <p className="cap-desc" dangerouslySetInnerHTML={{ __html: data.desc }} />
            <Link className="cap-link" to={data.link} aria-label={`${altLabel} 자세히 보기`}>
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="brand-story-simple" ref={sectionRef}>
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
        position: relative; isolation:isolate;
      }
      .brand-story-simple .slide-inner{ position:relative; width:100%; height:100%; }

      /* 이미지: 기본 꽉 채우고, hover/focus/open 시 오른쪽으로 슬라이드 */
      .brand-story-simple .slide-img{
        position:absolute; inset:0; width:100%; height:100%; display:block;
        object-fit:cover; object-position:center; transition:transform .45s ease, filter .3s ease;
        will-change: transform;
      }

      /* 캡션: 왼쪽에서 등장 */
      .brand-story-simple .slide-caption{
        position:absolute; top:0; bottom:0; left:0; width:min(55%, 520px);
        padding: clamp(14px, 2.2vw, 28px);
        display:flex; flex-direction:column; justify-content:center; gap:12px;
        background: linear-gradient(90deg, rgba(255,255,255,.94) 0%, rgba(255,255,255,.78) 55%, rgba(255,255,255,0) 100%);
        backdrop-filter: blur(1px);
        opacity:0; transform:translateX(-8%);
        transition: opacity .35s ease, transform .35s ease;
        pointer-events:none; /* 이미지 위 클릭 방해 X */
      }

      .brand-story-simple .cap-title{ font-family: 'Gowun Batang', serif; font-size:clamp(18px, 2.2vw, 22px); color:#111; margin:0; font-weight:700; }
      .brand-story-simple .cap-desc{ font-size: clamp(14px, 1.7vw, 16px); line-height:1.7; color:#000; margin:0; font-weight:700; }
      .brand-story-simple .cap-link{
        display:inline-block; margin-top:6px; padding:10px 18px; border-radius:999px;
        font-size:14px; text-decoration:none; background:#111; color:#fff; border:1px solid #111;
        transition: background .25s ease, color .25s ease;
        pointer-events:auto; /* 링크는 클릭 가능 */
      }
      .brand-story-simple .cap-link:hover{ background:#fff; color:#111; }

      /* 인터랙션: hover/focus/open 공통 */
      @media (hover: hover) and (pointer: fine) {
        .brand-story-simple .slide:hover .slide-img,
        .brand-story-simple .slide:focus-within .slide-img { transform: translateX(18%); }
        .brand-story-simple .slide:hover .slide-caption,
        .brand-story-simple .slide:focus-within .slide-caption { opacity:1; transform:translateX(0); }
      }
      /* 클릭(토글)로 열린 상태 */
      .brand-story-simple .slide.is-open .slide-img { transform: translateX(18%); }
      .brand-story-simple .slide.is-open .slide-caption { opacity:1; transform:translateX(0); }

      /* 기존 첫 카드 hover 투명도 규칙 무력화(충돌 방지) */
      .brand-story-simple .story-images .slide:first-child:hover img { opacity:1 !important; }

      @media (max-width:1280px){
        .brand-story-simple .story-slider{
          grid-template-columns:minmax(24px,1fr) minmax(320px,460px) minmax(52vw,1fr) minmax(24px,1fr);
        }
      }
      @media (max-width:960px){
        .brand-story-simple .story-slider{ grid-template-columns:1fr; gap:14px; }
        .brand-story-simple .story-images{ grid-column:1 / -1; grid-template-columns:1fr; }
        .brand-story-simple .slide{ height:clamp(320px, 56vh, 640px); }
        .brand-story-simple .arrow.left{ left:6px; } .brand-story-simple .arrow.right{ right:6px; }
      }
      `}</style>

      <button className="arrow left" onClick={() => go(-1)} aria-label="이전 전시 보기"><i className="fa-solid fa-chevron-left" /></button>
      <button className="arrow right" onClick={() => go(1)} aria-label="다음 전시 보기"> <i className="fa-solid fa-chevron-right" /></button>

      <div className="story-slider">
        <div className={`story-images ${isSliding ? "sliding" : ""}`}>
          <SlideCard slotIndex={0} data={prev} altLabel="이전 포스터" />
          <SlideCard slotIndex={1} data={current} altLabel="현재 포스터" />
          <SlideCard slotIndex={2} data={next} altLabel="다음 포스터" />
        </div>
      </div>
    </section>
  );
}
