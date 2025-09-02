import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AssistGutter() {
    const [chatOpen, setChatOpen] = useState(false);
    const [progress, setProgress] = useState(0); // 0..1
    const [showTop, setShowTop] = useState(false); // 맨위 버튼 노출
    const railRef = useRef(null);

    // Update scroll progress
    useEffect(() => {
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const denom = Math.max(1, scrollHeight - clientHeight);
            setProgress(scrollTop / denom);
            setShowTop(scrollTop > 160); // 원하는 노출 임계값
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // Click on rail to jump scroll
    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        const onClick = (e) => {
            const rect = rail.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const pct = y / rect.height;
            const { scrollHeight, clientHeight } = document.documentElement;
            const target = (scrollHeight - clientHeight) * pct;
            window.scrollTo({ top: target, behavior: "smooth" });
        };
        rail.addEventListener("mousedown", onClick);
        return () => rail.removeEventListener("mousedown", onClick);
    }, []);

    // Keyboard: Esc closes chatbot
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setChatOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const thumbStyle = useMemo(() => {
        // Thumb height proportional to viewport/scrollHeight (min 12%)
        const { clientHeight, scrollHeight } = document.documentElement;
        const minPct = 12; // min visible size
        const dynamicPct = (clientHeight / Math.max(scrollHeight, 1)) * 100;
        const h = Math.max(minPct, dynamicPct);
        const travel = 100 - h; // available track for translateY
        return {
            height: `${h}%`,
            transform: `translateY(${progress * travel}%)`,
        };
    }, [progress]);

    const scrollToTop = () => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    };

    return (
        <>
            {/* 오른쪽 전체 거터 */}
            <div className="assist-gutter" aria-hidden>

                {/* 레일 왼쪽, 버튼들 가로 정렬 컨테이너 */}
                <div className="assist-floating" aria-hidden="false">
                    {/* 맨 위로 버튼 */}
                    <button
                        type="button"
                        className={`scroll-top-btn ${showTop ? "show" : ""}`}
                        aria-label="페이지 맨 위로 이동"
                        title="맨 위로"
                        onClick={scrollToTop}
                    >
                        ▲
                    </button>

                    {/* 챗봇 토글 버튼 */}
                    <button
                        type="button"
                        className="chatbot-toggle-btn"
                        aria-label={chatOpen ? "챗봇 닫기" : "챗봇 열기"}
                        title={chatOpen ? "챗봇 닫기" : "챗봇 열기"}
                        onClick={() => setChatOpen((v) => !v)}
                    >
                        💬
                    </button>
                </div>
            </div>

            {/* 챗봇 창 */}
            <div
                className={`chatbot-window ${chatOpen ? "open" : ""}`}
                role="dialog"
                aria-modal="false"
                aria-label="FINTO 상담봇"
            >
                <div className="chatbot-header">FINTO 상담봇</div>
                <div className="chatbot-body">
                    <p>안녕하세요! FINTO AI ChatBot 입니다! 무엇을 도와드릴까요?</p>
                    {/* <iframe src="https://your-bot" title="FINTO Chat" /> */}
                </div>
                <div className="chatbot-footer">
                    <input type="text" placeholder="질문을 입력하세요..." className="chat-input" />
                    <button className="send-btn">전송</button>
                </div>
            </div>
        </>
    );
}
