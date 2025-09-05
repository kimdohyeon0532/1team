import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AssistGutter() {
  const [chatOpen, setChatOpen] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [showTop, setShowTop] = useState(false); // 맨위 버튼 노출
  const railRef = useRef(null);

  // 챗봇 관련 상태
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatbotData, setChatbotData] = useState(null);
  const messagesEndRef = useRef(null);

  // 스크롤 자동 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update scroll progress
  useEffect(() => {
    const fetchChatbotData = async () => {
      try {
        const response = await fetch("/data/AssistGutterData.json");
        if (!response.ok) throw new Error("데이터를 가져오지 못했습니다.");
        const data = await response.json();
        setChatbotData(data);
      } catch (error) {
        console.error("Fetch 에러:", error);
      }
    };
    /* 챗봇 스크롤 */
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const denom = Math.max(1, scrollHeight - clientHeight);
      setProgress(scrollTop / denom);
      setShowTop(scrollTop > 160);
    };

    fetchChatbotData();
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

  // 스크롤바 thumb 스타일
  const thumbStyle = useMemo(() => {
    const { clientHeight, scrollHeight } = document.documentElement;
    const minPct = 12;
    const dynamicPct = (clientHeight / Math.max(scrollHeight, 1)) * 100;
    const h = Math.max(minPct, dynamicPct);
    const travel = 100 - h;
    return {
      height: `${h}%`,
      transform: `translateY(${progress * travel}%)`,
    };
  }, [progress]);

  // 챗봇 메시지 전송
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !chatbotData) return;

    const userMessage = { type: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);

    const response = chatbotData.responses.find((item) =>
      inputMessage
        .toLowerCase()
        .trim()
        .includes(item.keyword.toLowerCase().trim())
    );
    /* 챗봇 대화 객체와 이미지 객체 */
    const botMessage = {
      type: "bot",
      text: response ? response.response : chatbotData.defaultResponse,
      image: response?.image || null,
      images: response?.images || null,
    };

    setMessages((prev) => [...prev, botMessage]);
    setInputMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <>
      {/* 오른쪽 전체 거터 */}
      <div className="assist-gutter" aria-hidden>
        {/* 레일 + 버튼 컨테이너 */}
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
        aria-label="CHAGAN 상담봇"
      >
        <div className="chatbot-header">CHAGAN 상담봇</div>

        <div className="chatbot-body">
          {messages.length === 0 && (
            <p className="bot-message">
              안녕하세요! CHAGAN AI ChatBot 입니다! 무엇을 도와드릴까요?
            </p>
          )}
          {/* 메시지 리스트 */}
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`message-item ${
                message.type === "user" ? "user-message" : "bot-message"
              }`}
            >
              {/* 말풍선 + 이미지 묶음 (세로) */}
              <div className="message-content">
                {/* 텍스트 말풍선 */}
                {message.text && (
                  <div className="message-bubble">{message.text}</div>
                )}

                {/* 단일 이미지 */}
                {message.image && (
                  <div className="message-images">
                    <img
                      src={message.image}
                      alt="추천 상품"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* 여러 이미지 */}
                {Array.isArray(message.images) && message.images.length > 0 && (
                  <div className="message-images">
                    {message.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`추천 상품 ${i + 1}`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-footer">
          <input
            type="text"
            placeholder="질문을 입력하세요..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <button className="send-btn" onClick={handleSendMessage}>
            전송
          </button>
        </div>
      </div>
    </>
  );
}
