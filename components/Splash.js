import React, { useEffect, useRef, useState } from "react";

export default function Splash() {
    const [phase, setPhase] = useState("show"); // show → shrink → hide
    const splashRef = useRef(null);
    const panelRef = useRef(null);

    // 히어로 위치/높이 측정 → CSS 변수 반영
    const measureHero = () => {
        const hero = document.getElementById("hero");
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const top = Math.max(0, rect.top);
        const minH = 700;
        const height = Math.max(rect.height, minH);
        document.documentElement.style.setProperty("--hero-top", `${Math.round(top)}px`);
        document.documentElement.style.setProperty("--hero-height", `${Math.round(height)}px`);
    };

    useEffect(() => {
        measureHero();
        window.addEventListener("resize", measureHero);
        const t1 = setTimeout(() => setPhase("shrink"), 700); // 잠깐 노출 후 접힘
        const safe = setTimeout(() => setPhase("hide"), 3500); // 안전장치
        return () => {
            window.removeEventListener("resize", measureHero);
            clearTimeout(t1);
            clearTimeout(safe);
        };
    }, []);

    // 패널 트랜지션이 끝나면 hide로 전환
    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const onEnd = (e) => {
            if (!["height", "clip-path", "top"].includes(e.propertyName)) return;
            setTimeout(() => setPhase("hide"), 250);
        };
        if (phase === "shrink") panel.addEventListener("transitionend", onEnd, { once: true });
        return () => panel.removeEventListener?.("transitionend", onEnd);
    }, [phase]);

    if (phase === "hide") return null;

    return (
        <div className={`splash ${phase === "shrink" ? "shrink" : ""} ${phase === "hide" ? "hide" : ""}`} ref={splashRef} aria-hidden="true">
            <div className="splash-panel" ref={panelRef}>
                <h1>차분함을 담은 오브제, 차간</h1>
                <img src="/img/CHAGANlogo.png" alt="로고" />
            </div>
        </div>
    );
}
