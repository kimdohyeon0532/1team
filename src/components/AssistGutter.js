import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Drop <AssistGutter /> near the root of your app (e.g., in App.jsx).
 * It adds: 1) a slim custom right-side scroll bar (progress rail)
 *          2) a floating chatbot toggle right next to that rail
 *          3) a chatbot window that slides out above content
 *
 * Styling: paste the CSS below into your global stylesheet (e.g., App.css).
 */
export default function AssistGutter() {
    const [chatOpen, setChatOpen] = useState(false);
    const [progress, setProgress] = useState(0); // 0..1
    const railRef = useRef(null);

    // Update scroll progress
    useEffect(() => {
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const denom = Math.max(1, scrollHeight - clientHeight);
            setProgress(scrollTop / denom);
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

    return (
        <>
            {/* Utility gutter anchored to right edge */}
            <div className="assist-gutter" aria-hidden>



                {/* Chatbot toggle button */}
                <button
                    type="button"
                    className="chatbot-toggle-btn"
                    aria-label={chatOpen ? "챗봇 닫기" : "챗봇 열기"}
                    onClick={() => setChatOpen((v) => !v)}
                >
                    💬
                </button>
            </div>

            {/* Chatbot window */}
            <div className={`chatbot-window ${chatOpen ? "open" : ""}`} role="dialog" aria-modal="false" aria-label="FINTO 상담봇">
                <div className="chatbot-header">FINTO 상담봇</div>
                <div className="chatbot-body">
                    <p>안녕하세요! FINTO AI ChatBot 입니다! 무엇을 도와드릴까요?</p>
                    {/* TODO: 챗봇 iframe 삽입 */}
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

