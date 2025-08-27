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
        .quiz-content { background: #64886d; padding: 20px; border-radius: 10px; width: 500px; max-width: 90%; margin: 100px auto; box-shadow: 0px 5px 15px rgba(0,0,0,0.5); text-align: center; position: relative; }
        .quiz-close { position: absolute; right: 20px; top: 10px; font-size: 24px; cursor: pointer; }
        .quiz-question { font-weight: 800; margin-top: 20px; }
        .quiz-options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
        .answer-btn { background: #2a3d26; color: white; font-family: 'Gowun Batang'; font-size: 16px; border: none; border-radius: 6px; cursor: pointer; padding: 30px; }
        .answer-btn:hover { background: #121b11; }

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
            <h2 className="exhibition-title">백수천경 白樹千景</h2>
            <p className="exhibition-subtitle">박지영 작품전</p>
            <p className="exhibition-desc">
            한 줌의 흙이 뜨거운 불의 시간을 지나 무구한 흰 빛을 띕니다.
            백자를 통해 하늘에 뜬 햇빛, 여백이 이루는 만滿 의 경치를 그려냈던 작가는 이제 백자 본연의 빛으로 가까이 다가갑니다.
            이번 전시에서는 눈부신 흰 빛을 선사하는 작가의 신작과 함께 화조화를 <br /> 모티브로 한 청화(靑華) 백자, 차 도구를 비롯한 백자 기물을 선보입니다.
            </p>
          </section>

          {/* 포스터 */}
          <div className="poster-wrap">
            <img src="./img/main2-2.png" alt="백수대표포스터" />
            <p className="poster-text">
            "조선백자로부터 이어지는 영감을 바탕으로 고아하면서도 편안한 미감을 지닌 백자를 <br /> 제작하고 있습니다. <br />
                    <br />
                    직접 재료를 수배하여 태토와 유약을 만들고, 정성스레 도자기를 빚은 뒤 장작가마에 <br /> 불을 때어 소성합니다. <br />
                    <br />
                    감상자와 작품 사이의 공명을 떠올리며 다양한 규모의 작업을 이어가고 있습니다." <br />
            </p>
          </div>

          {/* 전시 전경 */}
          <section className="gallery-section">
            <h3 className="section-title">전시 전경</h3>
            <div className="gallery-3col">
              <img src="./img/j_detail2-1.png" alt="전경1" />
              <img src="./img/j_detail2-2.png" alt="전경2" />
              <img src="./img/j_detail2-3.png" alt="전경3" />
            </div>
          </section>

          {/* 전시 작품 */}
          <section className="gallery-section">
            <h3 className="section-title">전시 작품</h3>
            <div className="gallery-grid">
              <img src="./img/j_detail2-4.png" alt="작품1" />
              <img src="./img/j_detail2-7.png" alt="작품2" />
              <img src="./img/j_detail2-5.png" alt="작품3" />
              <img src="./img/j_detail2-8.png" alt="작품4" />
              <img src="./img/j_detail2-11.png" alt="작품5" />
              <img src="./img/j_detail2-10.png" alt="작품6" />
              <img src="./img/j_detail2-6.png" alt="작품7" />
              <img src="./img/j_detail2-9.png" alt="작품8" />
              <img src="./img/j_detail2-12.png" alt="작품9" />
            </div>
          </section>

          {/* 인터뷰 */}
          <section className="interview">
            <p className="interview-q">
            Q. 재료 수배와 성형, 소성 모두를 고전적인 방식으로 진행하고 계세요. 올해 전시작에는 특별한 나무가 사용되었다고 들었습니다.
                    관련한 에피소드에 대해 들어볼 수 있을까요?
            </p>
            <p className="interview-a">
            A. 소나무는 귀하기도 하고 건조기간이 필요해 여러번 소성할 만큼을 미리 준비해둬야 합니다.
                    기존 장작을 다 소진하고 개인적인 사유로 나무들이는 일을 미뤄둔 차에 전시 준비를 위한 장작을 급하게 마련해야 했습니다. <br />
                    여름 이후 주문한 곳에 문제가 생겨 소성을 한 달도 채 안 남기고 나무를 못 받게 되었고, 혹시나 하는 마음으로 예전에 거래했던 지역의 목재소를 찾아갔습니다.<br />
                    여러 소나무 더미 중 사장님 본인이 한옥을 지으려고 마련해두셨다가 건축이 미뤄져 한옥목재로는 때를 놓친 잘 마른 소나무가 있었는데,
                    이 나무들을 흔쾌히 내어 주셨습니다.<br />
                    껍질이 제거된 살좋은 소나무 장작을 구하게 되어 전화위복이 되었죠. 이번 전시 작품을 위해 한옥 한 채가 들어갔다고 생각하니 특별하게 여겨집니다.
            </p>

            <p className="interview-q">
            Q. 전시를 앞두고 고성에서 보내주신 기물 사진을 보고 감탄했던 기억이 떠오릅니다.
                    다면 多面 형태의 기물이 빛을 받아 환한 면과 자연스럽게 음영이 진 면이 대비되는 사진이었어요.<br />
                    올해 전시에서 다면 기법을 다양한 형태와 크기로 전개한 기물을 만나볼 수 있는데, 작업 동기가 궁금합니다.
            </p>
            <p className="interview-a">
            A. 저는 작품과 도구의 경계를 두지 않고 작업을 하고 있습니다. 작가의 철학이 기물의 카테고리에 따라 분별될 수는 없다고 생각합니다.<br />
                    빛과 시선에 따라 나타나는 백자의 다양한 모습을 느꼈으면 하는데 아무래도 쓰임이 있는 기물들은 사용처 자체에 감상이 갇혀있다 보니
                    이러한 의도가 잘 나타나지 않는 것 같았습니다.<br />
                    곡률적인 기교를 줄이고 평면적으로 직관성을 부각해 여러 비율로 면이 돋보이는 작업을 해보았습니다.
                    다면 작업들은 백자 표면의 빛에 더 집중할 수 있는 작품이 되길 바랍니다.
            </p>
          </section>

          {/* 퀴즈 버튼 */}
          <button id="quiz-btn" onClick={() => setQuizOpen(true)}>
            전시 퀴즈 풀러가기
          </button>

          {/* 전시 일정 */}
          <section className="schedule">
            <p>2025년 06월 20일 ~ 10월 17일</p>
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
                  퀴즈 Q2. 박지영 작가가 장작으로 사용한 특별한 나무는 ?
                  </p>
                  <div className="quiz-options">
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      감나무
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      은행나무
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(false)}>
                      느티나무
                    </button>
                    <button className="answer-btn" onClick={() => handleAnswer(true)}>
                      소나무
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
