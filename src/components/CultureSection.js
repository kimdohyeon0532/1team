import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGES = {
  TEA_WARE: {
    colorVar: "--color-TEA_WARE",
    titleHTML: "Tea<br>Ware",
    images: [
      "/img/art&craftCard1-1.png",
      "/img/art&craftCard1-2.png",
      "/img/art&craftCard1-3.png",
      "/img/art&craftCard1-4.png",
      "/img/art&craftCard1-5.png",
      "/img/art&craftCard1-6.png",
    ],
  },
  ART_CRAFT: {
    colorVar: "--color-ART_CRAFT",
    titleHTML: "Art&<br>Craft",
    images: [
      "/img/art&craftCard2-1.png",
      "/img/art&craftCard2-2.png",
      "/img/art&craftCard2-3.png",
      "/img/art&craftCard2-4.png",
      "/img/art&craftCard2-5.png",
      "/img/art&craftCard2-6.png",
    ],
  },
  TABLE_WARE: {
    colorVar: "--color-TABLE_WARE",
    titleHTML: "Table<br>Ware",
    images: [
      "/img/art&craftCard3-1.png",
      "/img/art&craftCard3-2.png",
      "/img/art&craftCard3-3.png",
      "/img/art&craftCard3-4.png",
      "/img/art&craftCard3-5.png",
      "/img/art&craftCard3-6.png",
    ],
  },
};

// 컬렉션 라우트 매핑
const PAGE_TO_PATH = {
  TEA_WARE: "/collection/teaware",
  ART_CRAFT: "/collection",
  TABLE_WARE: "/collection/tableware",
};

export default function CultureSection() {
  const [page, setPage] = useState("TEA_WARE");
  const [offsets, setOffsets] = useState({ left: [-60, 10, 80], right: [40, 110, 180] });

  const wrapRef = useRef(null);
  const titleRef = useRef(null);
  const sceneRef = useRef(null);
  const navigate = useNavigate();

  const pageOrder = ["TEA_WARE", "ART_CRAFT", "TABLE_WARE"];
  const THRESHOLD = 150;

  const background = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return css.getPropertyValue(PAGES[page].colorVar).trim() || "#000";
  }, [page]);

  // 타이틀/씬 페이드 인
  useEffect(() => {
    const t = titleRef.current;
    const s = sceneRef.current;
    t?.classList.remove("visible");
    s?.classList.remove("visible");
    const id = setTimeout(() => {
      t?.classList.add("visible");
      s?.classList.add("visible");
    }, 150);
    setOffsets({ left: [-60, 10, 80], right: [40, 110, 180] });
    return () => clearTimeout(id);
  }, [page]);

  // 페이지 전환 체크
  const checkForPageChange = (nextOffsets) => {
    const allUp =
      nextOffsets.left.every((v) => v <= -THRESHOLD) &&
      nextOffsets.right.every((v) => v <= -THRESHOLD);
    const allDown =
      nextOffsets.left.every((v) => v >= THRESHOLD) &&
      nextOffsets.right.every((v) => v >= THRESHOLD);

    const currentIndex = pageOrder.indexOf(page);
    if (allDown && currentIndex < pageOrder.length - 1) setPage(pageOrder[currentIndex + 1]);
    else if (allUp && currentIndex > 0) setPage(pageOrder[currentIndex - 1]);
  };

  // 스크롤/터치 처리
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const applyDelta = (delta) => {
      setOffsets((prev) => {
        const newLeft = prev.left.map((y) => y - delta * 0.5);
        const newRight = prev.right.map((y) => y + delta * 0.5);
        const nextOffsets = { left: newLeft, right: newRight };
        checkForPageChange(nextOffsets);
        return nextOffsets;
      });
    };

    const isInside = (target) => scene.contains(target);

    const onWheel = (e) => {
      if (!isInside(e.target)) return;
      e.preventDefault();
      const d = clamp(e.deltaY, -80, 80);
      applyDelta(d);
    };

    let tsY = 0;
    const onTouchStart = (e) => (tsY = e.touches?.[0]?.clientY || 0);
    const onTouchMove = (e) => {
      if (!isInside(e.target)) return;
      e.preventDefault();
      const y = e.touches?.[0]?.clientY || 0;
      const d = clamp(tsY - y, -80, 80);
      applyDelta(d);
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [page]);

  // 현재 페이지의 컬렉션으로 이동
  const goCollection = () => {
    const path = PAGE_TO_PATH[page];
    if (path) navigate(path);
  };

  // 키보드 접근성(Enter/Space)
  const onCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goCollection();
    }
  };

  const imgs = PAGES[page].images;

  return (
    <section className="culture-section snap" ref={wrapRef} style={{ backgroundColor: background }}>
      <div className="page">
        <header>
          <nav className="nav">
            {pageOrder.map((k) => (
              <button
                key={k}
                className={k === page ? "active" : ""}
                onClick={() => setPage(k)}
                aria-current={k === page ? "page" : undefined}
              >
                {k.replace("_", "&")}
              </button>
            ))}
          </nav>
        </header>

        <h1
          className="main-title visible"
          ref={titleRef}
          dangerouslySetInnerHTML={{ __html: PAGES[page].titleHTML }}
        />

        <section className="scroll-scene visible" ref={sceneRef}>
          <div className="columns">
            <div className="column left-column">
              {[0, 1, 2].map((i) => (
                <article
                  key={`l${i}`}
                  className="card"
                  style={{ transform: `translateY(${offsets.left[i]}px)`, cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-label="해당 컬렉션으로 이동"
                  onClick={goCollection}
                  onKeyDown={onCardKeyDown}
                >
                  <img src={imgs[i]} alt={`left-${i}`} />
                </article>
              ))}
            </div>

            <div className="column right-column">
              {[3, 4, 5].map((i, j) => (
                <article
                  key={`r${i}`}
                  className="card"
                  style={{ transform: `translateY(${offsets.right[j]}px)`, cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-label="해당 컬렉션으로 이동"
                  onClick={goCollection}
                  onKeyDown={onCardKeyDown}
                >
                  <img src={imgs[i]} alt={`right-${j}`} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
