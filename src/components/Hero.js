// components/Hero.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
    "/img/main1-1.png",
    "/img/main1-2.png",
    "/img/main1-3.png",
    "/img/main1-4.png",
];

export default function Hero({ localCandidates = [], suggestTitle = "추천 검색어" }) {
    const [idx, setIdx] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [open, setOpen] = useState(false);

    const nav = useNavigate();
    const wrapRef = useRef(null);

    useEffect(() => {
        const t = setInterval(() => setIdx((v) => (v + 1) % SLIDES.length), 6000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setShowSearch(true), 2000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const onDoc = (e) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const go = (i) => setIdx((i + SLIDES.length) % SLIDES.length);

    const handleClick = (item) => {
        if (typeof item === "object" && item.path) {
            nav(item.path);
        } else {
            nav(`/page/${encodeURIComponent(item)}`);
        }
        setOpen(false);
    };

    return (
        <section className="hero snap" id="hero">
            <button className="hero-arrow left" onClick={() => go(idx - 1)} aria-label="이전">
                ‹
            </button>

            <div className="hero-track" style={{ transform: `translateX(${-idx * 100}%)` }}>
                {SLIDES.map((s, i) => (
                    <div key={i} className="hero-slide" style={{ backgroundImage: `url(${s})` }} />
                ))}
            </div>

            <div ref={wrapRef} className={`search-wrap ${showSearch ? "show" : ""}`}>
                <div className="combo" role="search">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요!"
                        onFocus={() => setOpen(true)}
                        readOnly
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        aria-controls="hero-suggest-list"
                    />
                    <button
                        type="button"
                        className="search-btn"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="추천 검색어 열기"
                    >
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </div>

                {open && localCandidates.length > 0 && (
                    <div className="suggest-popover" role="dialog" aria-label={suggestTitle}>
                        <div className="suggest-head" aria-hidden="false">
                            <span className="dot" />
                            <b className="title">{suggestTitle}:</b>
                            <span className="hint">탭/클릭 또는 Enter로 이동</span>
                        </div>

                        <ul id="hero-suggest-list" className="suggest" role="listbox">
                            {localCandidates.map((it, i) => {
                                const label = typeof it === "string" ? it : it.label;
                                const type = typeof it === "object" && it.type ? it.type : undefined;
                                return (
                                    <li
                                        key={i}
                                        role="option"
                                        tabIndex={0}
                                        data-type={type}
                                        onClick={() => handleClick(it)}
                                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(it)}
                                    >
                                        <span>{label}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            <button className="hero-arrow right" onClick={() => go(idx + 1)} aria-label="다음">
                ›
            </button>
        </section>
    );
}
