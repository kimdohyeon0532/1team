import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGES = {
  TEA_WARE: {
    colorVar: "--color-TEA_WARE",
    titleHTML: "Tea<br>Ware",
    images: [
      "/img/art&craftCard3-1.png",
      "/img/art&craftCard3-2.png",
      "/img/art&craftCard3-3.png",
      "/img/art&craftCard3-4.png",
      "/img/art&craftCard3-5.png",
      "/img/art&craftCard3-6.png",
    ],
  },
  ART_CRAFT: {
    colorVar: "--color-ART_CRAFT",
    titleHTML: "Art&<br>Craft",
    images: [
      "/img/art&craftCard1-1.png",
      "/img/art&craftCard1-2.png",
      "/img/art&craftCard1-3.png",
      "/img/art&craftCard1-4.png",
      "/img/art&craftCard1-5.png",
      "/img/art&craftCard1-6.png",
    ],
  },
  TABLE_WARE: {
    colorVar: "--color-TABLE_WARE",
    titleHTML: "Table<br>Ware",
    images: [
      "/img/art&craftCard2-1.png",
      "/img/art&craftCard2-2.png",
      "/img/art&craftCard2-3.png",
      "/img/art&craftCard2-4.png",
      "/img/art&craftCard2-5.png",
      "/img/art&craftCard2-6.png",
    ],
  },
};

const PAGE_TO_PATH = {
  TEA_WARE: "/collection/teaware",
  ART_CRAFT: "/collection",
  TABLE_WARE: "/collection/tableware",
};

// 모션/엣지 파라미터
const MIN_OFFSET = -700;
const MAX_OFFSET = 700;
const MOVE_GAIN = 0.5;
const DELTA_CLAMP = 80;
const EDGE_TRIGGER = 140;
const COOLDOWN_MS = 450;
const RESET_OFFSETS = { left: [-60, 10, 80], right: [40, 110, 180] };

export default function CultureSection() {
  const [page, setPage] = useState("TEA_WARE");
  const [offsets, setOffsets] = useState(RESET_OFFSETS);

  const wrapRef = useRef(null);
  const titleRef = useRef(null);
  const sceneRef = useRef(null);
  const navigate = useNavigate();

  const pageOrder = ["TEA_WARE", "ART_CRAFT", "TABLE_WARE"];

  // 엣지 오버스크롤 누적 & 쿨다운
  const edgeDownAccumRef = useRef(0); // 아래로 넘기기(다음)
  const edgeUpAccumRef = useRef(0);   // 위로 넘기기(이전)
  const isSwitchingRef = useRef(false);

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // SSR 가드 포함
  const background = useMemo(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return "#000";
    const css = getComputedStyle(document.documentElement);
    return css.getPropertyValue(PAGES[page].colorVar).trim() || "#000";
  }, [page]);

  // 타이틀/씬 페이드 인 + 오프셋 & 누적치 리셋
  useEffect(() => {
    const t = titleRef.current;
    const s = sceneRef.current;
    t?.classList.remove("visible");
    s?.classList.remove("visible");
    const id = setTimeout(() => {
      t?.classList.add("visible");
      s?.classList.add("visible");
    }, 150);
    setOffsets(RESET_OFFSETS);
    edgeDownAccumRef.current = 0;
    edgeUpAccumRef.current = 0;
    return () => clearTimeout(id);
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

  // 같은 페이지 내 #newin 섹션으로 스크롤 (마지막 이후)
  const scrollToNextSection = () => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const el = document.querySelector("#newin");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 페이지 전환 실행
  const switchPage = (dir) => {
    if (isSwitchingRef.current) return;
    const idx = pageOrder.indexOf(page);
    const nextIdx = dir === "next" ? idx + 1 : idx - 1;

    if (nextIdx < 0) return;

    // 마지막(TABLE_WARE)보다 더 가면 아래 섹션으로 스크롤
    if (nextIdx >= pageOrder.length) {
      isSwitchingRef.current = true;
      scrollToNextSection();
      setTimeout(() => {
        isSwitchingRef.current = false;
      }, COOLDOWN_MS);
      return;
    }

    isSwitchingRef.current = true;
    setPage(pageOrder[nextIdx]);
    setTimeout(() => {
      isSwitchingRef.current = false;
    }, COOLDOWN_MS);
  };

  // 스크롤/터치 처리
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || typeof window === "undefined" || typeof document === "undefined") return;

    const isInside = (target) => scene.contains(target);
    const applyDelta = (rawDelta) => {
      if (isSwitchingRef.current) return;
      const delta = clamp(rawDelta, -DELTA_CLAMP, DELTA_CLAMP);

      setOffsets((prev) => {
        const tryLeft = prev.left.map((y) => y - delta * MOVE_GAIN);
        const tryRight = prev.right.map((y) => y + delta * MOVE_GAIN);

        const newLeft = tryLeft.map((y) => clamp(y, MIN_OFFSET, MAX_OFFSET));
        const newRight = tryRight.map((y) => clamp(y, MIN_OFFSET, MAX_OFFSET));

        const leftAtMin = newLeft.every((y) => y === MIN_OFFSET);
        const leftAtMax = newLeft.every((y) => y === MAX_OFFSET);
        const rightAtMin = newRight.every((y) => y === MIN_OFFSET);
        const rightAtMax = newRight.every((y) => y === MAX_OFFSET);

        if (delta > 0 && leftAtMin && rightAtMax) {
          edgeDownAccumRef.current += delta;
          edgeUpAccumRef.current = 0;
          if (edgeDownAccumRef.current >= EDGE_TRIGGER) {
            edgeDownAccumRef.current = 0;
            switchPage("next");
          }
        } else if (delta < 0 && leftAtMax && rightAtMin) {
          edgeUpAccumRef.current += -delta;
          edgeDownAccumRef.current = 0;
          if (edgeUpAccumRef.current >= EDGE_TRIGGER) {
            edgeUpAccumRef.current = 0;
            switchPage("prev");
          }
        } else {
          edgeDownAccumRef.current = 0;
          edgeUpAccumRef.current = 0;
        }

        return { left: newLeft, right: newRight };
      });
    };

    const onWheel = (e) => {
      if (!isInside(e.target)) return;
      e.preventDefault();
      applyDelta(e.deltaY || 0);
    };

    let tsY = 0;
    const onTouchStart = (e) => {
      tsY = e.touches?.[0]?.clientY || 0;
    };
    const onTouchMove = (e) => {
      if (!isInside(e.target)) return;
      e.preventDefault();
      const y = e.touches?.[0]?.clientY || 0;
      const d = tsY - y; // 아래로 스와이프 → d > 0
      applyDelta(d);
      tsY = y; // 연속 이동도 부드럽게
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

  const imgs = PAGES[page].images;

  return (
    <section className="culture-section snap" ref={wrapRef} style={{ backgroundColor: background }}>
      <div className="page">
        <header>
          <nav className="nav">
            {["TEA_WARE", "ART_CRAFT", "TABLE_WARE"].map((k) => (
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
