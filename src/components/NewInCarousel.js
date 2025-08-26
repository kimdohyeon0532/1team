import React, { useEffect, useMemo, useRef, useState } from "react";

const ITEMS = [
    { img: "/img/newIn1-1.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn1-2.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn1-3.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn1-4.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn2-1.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn2-2.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn2-3.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn2-4.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn3-1.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn3-2.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn3-3.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn3-4.png", name: "베르비에 눈결 개완", desc: "눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
];

export default function NewInCarousel() {
    const trackRef = useRef(null);
    const itemRefs = useRef([]);
    const [page, setPage] = useState(0);
    const perView = 4;
    const pagesCnt = useMemo(() => Math.ceil(ITEMS.length / perView), []);

    // 현재 페이지 → 트랙 이동
    const render = () => {
        const firstIdx = page * perView;
        const el = itemRefs.current[firstIdx];
        const track = trackRef.current;
        if (!el || !track) return;
        const x = -el.offsetLeft;
        track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
    };

    useEffect(() => {
        render();
        const onResize = () => render();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const prev = () => setPage((p) => Math.max(0, p - 1));
    const next = () => setPage((p) => Math.min(pagesCnt - 1, p + 1));

    return (
        <section className="newin container">
            <h3 className="section-title">
                NEW IN <br /><small>이번주 신상품</small>
            </h3>

            <button className="carousel-arrow left" aria-label="이전" onClick={prev} disabled={page === 0}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="carousel">
                <div className="track" ref={trackRef}>
                    {ITEMS.map((it, i) => (
                        <a
                            key={i}
                            className="card item"
                            href="#"
                            ref={(el) => (itemRefs.current[i] = el)}
                        >
                            <img src={it.img} alt="" />
                            <div className="info">
                                <b>{it.name}</b>
                                <p>{it.desc}</p>
                                <span>{it.price}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <button
                className="carousel-arrow right"
                aria-label="다음"
                onClick={next}
                disabled={page >= pagesCnt - 1}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </section>
    );
}
