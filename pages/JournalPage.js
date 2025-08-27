import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JournalPage() {
  const posters = [
    {
      src: "./img/main2-3.png",
      title: "일상다감 日常茶感\n토림도예 개인전",
      alt: "포스터1",
      link: "/exhibition1",
    },
    {
      src: "./img/main2-2.png",
      title: "백수천경 白樹千景\n박지영 작품전",
      alt: "포스터2",
      link: "/exhibition2",
    },
    {
      src: "./img/main2-1.png",
      title: "영원으로의 걸음\n김제형 작품전",
      alt: "포스터3",
    },
    {
      src: "./img/main2-4.png",
      title: "빛의 농담濃淡\n박지영 개인전",
      alt: "포스터4",
    },
    {
      src: "./img/main2-5.png",
      title: "틈 빛 실\n김도현 작품전",
      alt: "포스터5",
    },
    {
      src: "./img/main2-7.png",
      title: "일월소랑 日月小浪\n김제형 개인전",
      alt: "포스터7",
    },
    {
      src: "./img/main2-6.png",
      title: "오롯이 우주\n김도현 개인전",
      alt: "포스터6",
    },
    // 반복 이미지 추가
    {
      src: "./img/main2-3.png",
      title: "일상다감 日常茶感\n토림도예 개인전",
      alt: "포스터1",
    },
    {
      src: "./img/main2-2.png",
      title: "백수천경 白樹千景\n박지영 작품전",
      alt: "포스터2",
    },
    {
      src: "./img/main2-1.png",
      title: "영원으로의 걸음\n김제형 작품전",
      alt: "포스터3",
    },
    {
      src: "./img/main2-4.png",
      title: "빛의 농담濃淡\n박지영 개인전",
      alt: "포스터4",
    },
    {
      src: "./img/main2-5.png",
      title: "틈 빛 실\n김도현 작품전",
      alt: "포스터5",
    },
    {
      src: "./img/main2-7.png",
      title: "일월소랑 日月小浪\n김제형 개인전",
      alt: "포스터7",
    },
    {
      src: "./img/main2-6.png",
      title: "오롯이 우주\n김도현 개인전",
      alt: "포스터6",
    },
  ];

  return (
    <>
    <style>{`
    .journal {
        padding: 60px 0 100px;
        background: #f5f5f3;
        text-align: center;
    }
    
    .journal-title {
        font-family: "Solmoe KimDaeGeon";
        font-size: 45px;
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .journal-subtitle {
        font-family: "Solmoe KimDaeGeon";
        font-size: 30px;
        font-weight: 300;
        margin-bottom: 80px;
        color: #333;
    }
    
    .poster-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 40px;
        justify-items: center;
    }
    
    .poster {
        position: relative;
        width: 100%;
        max-width: 350px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .poster img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s;
    }
    
    .poster:hover img {
        transform: scale(1.05);
    }
    
    .poster-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #F3CB99;
        font-size: 18px;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 2;
        text-align: center;
        line-height: 30px;
        white-space: pre-line; /* 줄바꿈 적용 */
    }
    
    .poster::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(30, 30, 30, 0.7);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1;
    }
    
    .poster:hover::after {
        opacity: 1;
    }
    
    .poster:hover .poster-title {
        opacity: 1;
    }
    
    `}</style>

    <Header />
      <main className="journal" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 className="journal-title">Journal</h2>
          <p className="journal-subtitle">전시 소개</p>

          <div className="poster-grid">
            {posters.map((poster, index) => (
              <Link
                to={poster.link}
                key={index}
                className="poster"
                style={{ textDecoration: "none" }}
              >
                <img src={poster.src} alt={poster.alt} />
                <span className="poster-title">{poster.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    <Footer />
    </>
  );
}
