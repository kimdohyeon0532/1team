import React, { useEffect, useMemo, useRef, useState } from "react";

const ITEMS = [
    { img: "/img/newIn1-1.png", name: ["Kimura Glass", "BATHTUB 5oz Cocktail"], desc: "섬세한 두께감과 감각적인 실루엣의 핸드메이드 칵테일 잔", price: "112,000원" },
    { img: "/img/newIn1-2.png", name: ["Kimura Glass", "BATHTUB 7oz Conte"], desc: "섬세한 두께감과 감각적인 실루엣의 핸드메이드 칵테일 잔", price: "112,000원" },
    { img: "/img/newIn1-3.png", name: ["Kimura Glass", "BATHTUB 5oz Campagne Cocktail"], desc: "섬세한 두께감과 감각적인 실루엣의 핸드메이드 칵테일 잔", price: "100,000원" },
    { img: "/img/newIn1-4.png", name: ["Kimura Glass", "BATHTUB 10oz Highball"], desc: "섬세한 두께감과 감각적인 실루엣의 핸드메이드 칵테일 잔", price: "100,000원" },
    { img: "/img/newIn2-1.png", name: ["박소희", "청자 미니 호롱 오발"], desc: "[Timeless Craft] 전통 등잔을 현대적인 미감으로 표현한 미니 도자 호롱", price: "60,000원" },
    { img: "/img/newIn2-2.png", name: ["박소희", "청자 미니 호롱 - 조롱박"], desc: "[Timeless Craft] 전통 등잔을 현대적인 미감으로 표현한 미니 도자 호롱", price: "60,000원" },
    { img: "/img/newIn2-3.png", name: ["박소희", "청자 양이 호롱"], desc: "[Timeless Craft] 전통 등잔을 현대적인 미감으로 표현한 미니 도자 호롱", price: "140,000원" },
    { img: "/img/newIn2-4.png", name: ["박소희", "청자 사과 호롱"], desc: "[Timeless Craft] 전통 등잔을 현대적인 미감으로 표현한 미니 도자 호롱", price: "120,000원" },
    { img: "/img/newIn3-1.png", name: ["베르비에", "눈결개완"], desc: "[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 개완", price: "55,000원" },
    { img: "/img/newIn3-2.png", name: ["베르비에", "눈결 좁은잔"], desc: "[Timeless Craft] 눈결의 섬세함을 닮은 수공예 유리 찻잔", price: "40,000원" },
    { img: "/img/newIn3-3.png", name: ["FOH 포","목련잎 찻잔 받침"], desc: "[Timeless Craft] 목련잎의 형태를 섬세하게 표현한 찻잔 받침", price: "35,000원" },
    { img: "/img/newIn3-4.png", name: ["FOH 포","국화문 찻잔 받침"], desc: "[Timeless Craft] 국화꽃의 형태를 섬세하게 표현한 찻잔 받침", price: "35,000원" },
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
        <>
            <style>{`
            .newin .card .info {
                margin-top: 10px;
            }
            
            .newin .card .info b {
                display: block;
                line-height: 1.2;
            }
            
            .newin .card .info b .brand {
                color: #888; 
                font-size: 0.85rem; /* 조금 작게 */
                font-weight: 500;
                display: block;
            }
            
            .newin .card .info b .product {
                font-size: 0.9rem;   /* 기본 크기 */
                font-weight: 700;
                margin-bottom: 20px; /* 설명과 간격 */
                display: block;
            }
            .newin .card .info b .product {
                font-size: 0.8rem;   /* 기본 크기 */
                font-weight: 700;
                margin-top: 10px; /* 설명과 간격 */
                display: block;
            }
            
            .newin .card .info p {
                margin: 0;
                font-size: 0.8rem;
                font-weight: 800;
                line-height: 1.4;
                color: #333;
            }
            
            `}</style>
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
                                <img src={it.img} alt="신상품이미지" />
                                <div className="info">
                                 <b>
                                     <span className="brand">{it.name[0]}</span>
                                     <span className="product">{it.name[1]}</span>
                                 </b>
                                 <p>{it.desc}</p>
                                 <span className="price">{it.price}</span>
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
        </>
    );
}
