import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function ExhibitionDetailPage() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 상태

  const handleAnswer = (correct) => {
    if (correct) {
      setIsCorrect(true);
    } else {
      // 오답일 때
      setIsCorrect(null); // 잠깐 초기화
      setTimeout(() => setIsCorrect(false), 10); // 다시 false로 설정 → 애니메이션 재실행
  
      // 진동도 함께
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  
    setQuizOpen(true);
  };
  const closeModal = () => {
    setQuizOpen(false);
    setIsCorrect(null);
  };

  // ✅ 정답일 때 3.5초 후 자동 닫힘
  useEffect(() => {
    let timer;
    if (quizOpen && isCorrect) {
      timer = setTimeout(() => {
        closeModal();
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [quizOpen, isCorrect]);

  return (
    <>
      <Header />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Gowun Batang', sans-serif; background: #f5f5f3; color: #1a1a1a; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }

        .exhibition { padding: 60px 0 100px; background: #fff; color: #1a1a1a; line-height: 1.7; }
        .exhibition-header { text-align: center; margin-bottom: 150px; }
        .exhibition-title { font-family: "Solmoe KimDaeGeon"; font-size: 40px; font-weight: 500; margin-bottom: 8px; }
        .exhibition-subtitle { font-size: 30px; font-family: "Solmoe KimDaeGeon"; margin-bottom: 50px; }
        .exhibition-desc { max-width: 870px; margin: 0 auto; font-size: 16px; font-weight: 600; line-height: 40px; color: #222; }

        .poster-wrap { display: flex; align-items: center; gap: 60px; max-width: 1200px; margin: 0 auto; }
        .poster-wrap img { width: 550px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
        .poster-text { flex: 1; font-size: 17px; font-weight:500; line-height: 2; color: #222; }

        .section-title { font-size: 25px; font-weight: 600; border-bottom: 1px solid #a0a0a0; padding-top: 30px; margin: 50px 0 30px; text-align: left; }

        .gallery-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .gallery-3col img { width: 100%; object-fit: cover; }

        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, auto); gap: 20px; max-width: 1500px; margin: 0 auto; }
        .gallery-grid img { width: 100%; height: auto; object-fit: cover; }

        .interview { margin: 60px 0; font-size: 15px; color: #222; }
        .interview-q { font-weight: 600; margin-bottom: 10px; }
        .interview-a { font-weight: 500; margin-bottom: 20px; line-height: 30px; }
        .interview-extra { font-weight: 500; color: #222; line-height: 28px; }

        .schedule {
          background-color: #f0f0f0;
          padding: 20px;
          text-align: left;
          margin-top: 60px;
          font-size: 15px;
          font-weight: 500;
          color: #222;
        }
        .schedule p { position: relative; top: 10px; }
        .schedule-credit { text-align: right; margin-top: 10px; font-weight: 600; }

        /* 퀴즈 모달 */
        .quiz-modal { display: flex; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; }
        .quiz-content { background: #edd9bc; padding: 20px; border-radius: 10px; width: 500px; max-width: 90%; margin: 100px auto; box-shadow: 0px 5px 15px rgba(0,0,0,0.5); text-align: center; position: relative; }
        .quiz-close { position: absolute; right: 20px; top: 10px; font-size: 24px; cursor: pointer; }
        .quiz-question { font-weight: 800; margin-top: 20px; }
        .quiz-options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
        .answer-btn { background: #c89b63; color: white; font-family: 'Gowun Batang'; font-size: 16px; border: none; border-radius: 6px; cursor: pointer; padding: 30px; }
        .answer-btn:hover { background: #a9743f; }

        #quiz-btn { font-family: 'Gowun Batang'; text-align: center; margin: 50px auto; display: block; background: #1a1a1a; color: #fff; padding: 14px 28px; font-size: 16px; cursor: pointer; }
        #quiz-btn:hover { background: #444; }

        @media (max-width: 768px) {
          .gallery-3col { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr 1fr; }
          .poster-wrap { flex-direction: column; text-align: center; }
          .poster-wrap img { width: 100%; max-width: 400px; margin: 0 auto; }
        }
      `}</style>

      <main className="exhibition">
        <div className="container">
          {/* 전시 헤더 */}
          <section className="exhibition-header">
            <h2 className="exhibition-title">일상다감 日常茶感</h2>
            <p className="exhibition-subtitle">토림도예 개인전</p>
            <p className="exhibition-desc">
              토림도예<br />
              부부작가인 신정현 작가와 김유미 작가가 운영하는 토림도예는 안성 한운리에 작업실을 두고 다양한 차 기물을 선보이고 있습니다.
              차를 낯설어하는 사람도 쉽게 차를 접할 수 있길 바라는 마음으로 다기를 만듭니다.
            </p>
          </section>

          {/* 포스터 */}
          <div className="poster-wrap">
            <img src="./img/main2-3.png" alt="토림대표포스터" />
            <p className="poster-text">
              "매일 편히 마시는 한 잔의 차'를 주제로 한 토림도예의 신작과 차 기물을 선보이는 자리입니다.<br/><br/>
              호박과 석류, 분재와 반려묘. 도포 자락이 휘날리도록 춤을 추는 이와 보름달을 바라보는 토끼의 모습.<br/><br/>
              흙의 온기를 품은 다기 위로 섬세하게 그려진 그림에는 반복되는 생활 속에서도 애틋한 순간과 계절의 기쁨, 소망과 같은 일상의 다감 多感 한 정서가 고루 담겨있습니다.<br/><br/>
              물처럼 마실 수 있는 대용차를 위한 큰 찻잔과 여행용 다구 세트, 청룡의 해를 기념하여 용을 그린 다기도 새롭게 소개합니다."
            </p>
          </div>

          {/* 전시 전경 */}
          <section className="gallery-section">
            <h3 className="section-title">전시 전경</h3>
            <div className="gallery-3col">
              <img src="./img/j_detail1-1.png" alt="전경1" />
              <img src="./img/j_detail1-2.png" alt="전경2" />
              <img src="./img/j_detail1-3.png" alt="전경3" />
            </div>
          </section>

          {/* 전시 작품 */}
          <section className="gallery-section">
            <h3 className="section-title">전시 작품</h3>
            <div className="gallery-grid">
              <img src="./img/j_detail1-4.png" alt="작품1" />
              <img src="./img/j_detail1-5.png" alt="작품2" />
              <img src="./img/j_detail1-6.png" alt="작품3" />
              <img src="./img/j_detail1-7.png" alt="작품4" />
              <img src="./img/j_detail1-8.png" alt="작품5" />
              <img src="./img/j_detail1-9.png" alt="작품6" />
              <img src="./img/j_detail1-10.png" alt="작품7" />
              <img src="./img/j_detail1-11.png" alt="작품8" />
              <img src="./img/j_detail1-12.png" alt="작품9" />
            </div>
          </section>

          {/* 인터뷰 */}
          <section className="interview">
            <p className="interview-q">
              Q. 동료이자 부부인 두 분이 토림도예에서 각각 어떤 역할을 맡고 계신지 궁금합니다.
            </p>
            <p className="interview-a">
              A. 아시는 분들은 아시겠지만, 물레작업은 도현작가, 조각이나 그림은 제형작가가 맡아서 하고 있습니다.
              <br />
              거시적인 흐름은 제형작가가 정하고 미시적인 계획들과 방향은 도현 작가가 정하는 편입니다.
              물론 모든 것을 결정할 때에 서로 상의하는 시간을 거치죠. 이제는 함께 토림도예를 꾸린지가 꽤 되어서 서로 합이 잘 맞아요.
            </p>

            <p className="interview-q">
              Q. 한편, 작업실 곁 차실을 통해 방문객 분들께도 차를 내어드리고 계세요. 작업을 하시는 중에도 차실을 여실만큼 차를 좋아하시게 된 계기가 있으실까요?
            </p>
            <p className="interview-a">
              A. 저(김도현)는 어려서부터 차를 마셨어요. 그냥 물처럼 마셔서 다도라던가 차의 맛이라던가 구분하지 않고 그냥 마셨죠.
              그래서 도자기를 업으로 삼기로 마음 먹었을 때 그냥 당연하게 다기를 만들어야겠다 <br /> 라고 생각했었어요.
              저(김제형)는 박지영 작가를 만나며 차를 마시기 시작했는데 지금은 훨씬 깊이 빠져버렸어요.
              기분에 따라, 계절에 따라 차를 고르는 시간부터 그에 맞는 다기를 고르는 시간이 다 재미있어요.
            </p>

            <p className="interview-extra">
              작업실에 있는 차실은 저희가 차를 마시는 공간 겸 쇼룸입니다. <br /><br />
              아무래도 도자기를 실제로 보고 구매하시려는 분들이 방문하시는데, 도자기를 보러 먼길을 오시는게 감사해서 뭐라도 해드리고 싶어, 차를 내어드리고 있습니다.<br />
              함께 차를 마시면서 대화를 나누면 돌아가실 때 대부분 기분좋게 가시는데 그 모습이 보람차기도 하구요.
              저희 둘 모두 차를 마시는 걸 좋아하고 이것을 즐기고 나누는 것이 좋다고 생각해요.
            </p>
          </section>

          {/* 퀴즈 버튼 */}
          <button id="quiz-btn" onClick={() => setQuizOpen(true)}>
            전시 퀴즈 풀러가기
          </button>

          {/* 전시 일정 */}
          <section className="schedule">
            <p>2025년 08월 14일 ~ 10월 31일</p>
            <p>Tue - Sun, 12 ~ 7 PM (Monday Closed)</p>
            <p>CHAGAN</p>
            <p>02-000-0000</p>
            <p className="schedule-credit">전시 기획: CHAGAN</p>
          </section>

          {/* 퀴즈 모달 */}
          <AnimatePresence>
            {quizOpen && (
              <div id="quiz-modal" className="quiz-modal">
                <motion.div
                  key="quiz-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    isCorrect === false
                      ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, scale: 1 } // 오답 → 흔들림
                      : { scale: 1, opacity: 1 }
                  }
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="quiz-content"
                >
                  <span
                    id="close-modal"
                    className="quiz-close"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2>전시 퀴즈 Q.</h2>
                  <p className="quiz-question">
                    퀴즈 Q1. 김도현 작가님의 전시 시작 날짜는?
                  </p>
                  <div className="quiz-options">
                    <button className="answer-btn" onClick={() => handleAnswer(true)}>
                      25년 8월 14일
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      25년 7월 14일
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      25년 8월 11일
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      25년 9월 13일
                    </button>
                  </div>

                  {/* 정답/오답 메시지 */}
                  {isCorrect === true && (
                    <p className="mt-4 text-green-700 font-bold">
                      🎉 정답! 마이페이지 쿠폰함을 확인하세요.
                    </p>
                  )}
                  {isCorrect === true && (
                    <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={300}
                    gravity={0.5}
                    recycle={false}
                    origin={{ x: Math.random(), y: 0 }} // x 랜덤, y는 상단
                  />
                  )}
                  {isCorrect === false && (
                    <>
                      <p className="mt-4 text-red-700 font-bold">
                        🤔 오답입니다. 다시 도전하세요!
                      </p>
                    </>
                  )}

                  {/* 정답일 때 confetti */}
                  {isCorrect === true && <Confetti />}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
}
