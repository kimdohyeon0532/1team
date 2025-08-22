import React, { useEffect, useMemo, useRef, useState } from "react";

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

export default function CultureSection() {
    const [page, setPage] = useState("TEA_WARE");
    const [offsets, setOffsets] = useState({ left: [-60, 10, 80], right: [40, 110, 180] });
    const wrapRef = useRef(null);
    const titleRef = useRef(null);
    const sceneRef = useRef(null);

    // 배경색을 CSS 변수에서 읽어 적용
    const background = useMemo(() => {
        const css = getComputedStyle(document.documentElement);
        return css.getPropertyValue(PAGES[page].colorVar).trim() || "#000";
    }, [page]);

    // 탭 바꾸면 카드/타이틀 살짝 페이드 인
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

    // 섹션 내부 휠/터치 → 패럴랙스
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
        const applyDelta = (delta) => {
            setOffsets((prev) => {
                const l = prev.left.map((y) => y - delta * 0.5);
                const r = prev.right.map((y) => y + delta * 0.5);
                return { left: l, right: r };
            });
        };

        const onWheel = (e) => {
            // 섹션 안에서만 살짝 움직이게
            if (!el.contains(e.target)) return;
            e.preventDefault();
            const d = clamp(e.deltaY, -80, 80);
            applyDelta(d);
        };

        let tsY = 0;
        const onTouchStart = (e) => (tsY = e.touches?.[0]?.clientY || 0);
        const onTouchMove = (e) => {
            if (!el.contains(e.target)) return;
            e.preventDefault();
            const y = e.touches?.[0]?.clientY || 0;
            const d = clamp(tsY - y, -80, 80);
            applyDelta(d);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    const imgs = PAGES[page].images;

    return (
        <section className="culture-section snap" ref={wrapRef} style={{ backgroundColor: background }}>
            <div className="page">
                <header>
                    <nav className="nav">
                        {Object.keys(PAGES).map((k) => (
                            <button
                                key={k}
                                className={k === page ? "active" : ""}
                                data-page={k}
                                onClick={() => setPage(k)}
                            >
                                {k.replace("_", "&")}
                            </button>
                        ))}
                    </nav>
                </header>

                <h1 className="main-title visible" ref={titleRef} dangerouslySetInnerHTML={{ __html: PAGES[page].titleHTML }} />

                <section className="scroll-scene visible" ref={sceneRef}>
                    <div className="columns">
                        <div className="column left-column">
                            {[0, 1, 2].map((i) => (
                                <article key={`l${i}`} className="card" style={{ transform: `translateY(${offsets.left[i]}px)` }}>
                                    <img src={imgs[i]} alt="" />
                                </article>
                            ))}
                        </div>
                        <div className="column right-column">
                            {[3, 4, 5].map((i, j) => (
                                <article key={`r${i}`} className="card" style={{ transform: `translateY(${offsets.right[j]}px)` }}>
                                    <img src={imgs[i]} alt="" />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}
