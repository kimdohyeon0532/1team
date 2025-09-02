import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const slides = ["/img/main1-1.png", "/img/main1-2.png", "/img/main1-3.png", "/img/main1-4.png"];

/**
 * Props
 * - onSearch?: (query) => void
 * - suggestFn?: (q) => Promise<string[]> | string[]
 * - localCandidates?: string[]
 */
export default function Hero({ onSearch, suggestFn, localCandidates = [] }) {
    const [idx, setIdx] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [hi, setHi] = useState(-1); // 하이라이트 인덱스

    const nav = useNavigate();
    const inputRef = useRef(null);
    const wrapRef = useRef(null);
    const listboxId = "hero-suggest-listbox";

    // 슬라이드 자동 넘김
    useEffect(() => {
        const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), 6000);
        return () => clearInterval(t);
    }, []);

    // 검색창 페이드인
    useEffect(() => {
        const t = setTimeout(() => setShowSearch(true), 2000);
        return () => clearTimeout(t);
    }, []);

    // 바깥 클릭 시 드롭다운 닫기
    useEffect(() => {
        const onDoc = (e) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) {
                setOpen(false);
                setHi(-1);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    // 추천 로직 (200ms 디바운스)
    useEffect(() => {
        let stop = false;
        const h = setTimeout(async () => {
            const query = q.trim();
            if (!query) {
                setItems([]);
                setOpen(false);
                setHi(-1);
                return;
            }
            let res = [];
            if (suggestFn) {
                try {
                    const r = await Promise.resolve(suggestFn(query));
                    if (Array.isArray(r)) res = r;
                } catch {
                    res = [];
                }
            } else {
                const norm = query.toLowerCase();
                const head = localCandidates.filter((s) => s.toLowerCase().startsWith(norm));
                const tail = localCandidates.filter((s) => !s.toLowerCase().startsWith(norm) && s.toLowerCase().includes(norm));
                res = [...head, ...tail].slice(0, 8);
            }
            if (!stop) {
                setItems(res);
                setOpen(res.length > 0);
                setHi(res.length ? 0 : -1);
            }
        }, 200);
        return () => {
            stop = true;
            clearTimeout(h);
        };
    }, [q, suggestFn, localCandidates]);

    const goSearch = (query) => {
        const finalQ = (query || q).trim();
        if (!finalQ) return;
        if (typeof onSearch === "function") onSearch(finalQ);
        else nav(`/search?q=${encodeURIComponent(finalQ)}`);
        setOpen(false);
        setHi(-1);
    };

    const onKeyDown = (e) => {
        if (!open || items.length === 0) {
            if (e.key === "Enter") {
                e.preventDefault();
                goSearch(q);
            }
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHi((i) => (i + 1) % items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHi((i) => (i - 1 + items.length) % items.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const choice = items[hi] ?? q;
            goSearch(choice);
        } else if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            setHi(-1);
        } else if (e.key === "Tab") {
            if (hi >= 0 && items[hi]) setQ(items[hi]); // 탭으로 제안 채우기(선택 아님)
        }
    };

    const go = (i) => setIdx((i + slides.length) % slides.length);

    return (
        <section className="hero snap" id="hero">
            <button className="hero-arrow left" onClick={() => go(idx - 1)} aria-label="이전">‹</button>

            <div className="hero-track" style={{ transform: `translateX(${-idx * 100}%)` }}>
                {slides.map((s, i) => (
                    <div key={i} className="hero-slide" style={{ backgroundImage: `url(${s})` }} />
                ))}
            </div>

            <form
                ref={wrapRef}
                className={`search-wrap ${showSearch ? "show" : ""}`}
                onSubmit={(e) => { e.preventDefault(); goSearch(q); }}
                role="search"
                aria-label="사이트 검색"
            >
                <div className="combo">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="검색어를 입력하세요"
                        aria-label="검색어"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onFocus={() => { if (items.length) setOpen(true); }}
                        onKeyDown={onKeyDown}
                        autoComplete="off"

                        /* ✅ combobox 역할과 상태는 input에 */
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={open}
                        aria-controls={listboxId}
                        aria-haspopup="listbox"
                        aria-activedescendant={hi >= 0 ? `opt-${hi}` : undefined}
                    />
                    <button
                        type="submit"
                        className="search-btn"
                        aria-label="검색"
                        disabled={!q.trim()}
                        title={!q.trim() ? "검색어를 입력하세요" : "검색"}
                    >
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </div>

                {open && items.length > 0 && (
                    <ul id={listboxId} role="listbox" className="suggest">
                        {items.map((s, i) => (
                            <li
                                key={s + i}
                                id={`opt-${i}`}
                                role="option"
                                aria-selected={hi === i}
                                className={hi === i ? "active" : ""}
                                onMouseEnter={() => setHi(i)}
                                onMouseDown={(e) => e.preventDefault()}  // 인풋 포커스 유지
                                onClick={() => goSearch(s)}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </form>

            <button className="hero-arrow right" onClick={() => go(idx + 1)} aria-label="다음">›</button>
        </section>
    );
}
