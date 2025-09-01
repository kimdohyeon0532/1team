import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export default function BrandPage() {
  useEffect(() => {
    // 기존 스크립트 제거
    const existingScript = document.querySelector(
      "script[src^='https://dapi.kakao.com']"
    );
    if (existingScript) existingScript.remove();

    // 카카오맵 스크립트 추가
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.308409, 126.851066), // 지도 중심 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(
          37.308409,
          126.851066
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        // InfoWindow 생성
        const content = `
          <div style="width:250px; padding:10px; font-family: 'Gowun Batang'; font-size:14px; text-align:center; 
                      border-radius:8px; background:#fff; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">
            <h3 style="margin:0; padding:0; color:#333; font-size:16px;">차간 茶潤</h3>
            <p style="margin:5px 0 10px; color:#666; font-size:12px;">
              안산시 00구 000동 123나길 56
            </p>
            <button onclick="window.open('https://map.kakao.com/link/to/차간,37.308409,126.851066')" 
                    style="margin-top:10px; padding:5px 10px; border:none; background:#007BFF; color:#fff; border-radius:5px; cursor:pointer;">
              길찾기
            </button>
          </div>
        `;
        const infowindow = new window.kakao.maps.InfoWindow({ content });
        window.kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker);
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Header />

      <main className="brand-page container">
        <section className="brand-intro">
          <h2>
            차간 茶潤
            <br />
            <span className="sub">브랜드 소개</span>
          </h2>
          <p className="brand-eng">CHAGAN</p>
          <p className="brand-quote">“정제된 감성으로 일상의 여백을 채우다”</p>

          <div className="brand-content">
            <div className="brand-logo">
              <img src="./img/CHAGANlogoO.png" alt="차간 브랜드 로고" />
            </div>
            <ul className="brand-desc">
              <li>전통 소재 감성을 현대적으로 재해석, 일상 속 여백을 채우는 오브제 제작</li>
              <li>손의 온기, 자연의 결, 재료의 흐름을 느낄 수 있는 제품</li>
              <li>도자기 · 목공 · 금속 등 자연 기반 소재 융합</li>
              <li>전통 공예품과 작가 작품을 오늘날 생활에 맞게 감각적으로 활용</li>
            </ul>
          </div>
        </section>

        <section className="location">
          <h3>오시는 길</h3>
          <div
            id="map"
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "400px",
              margin: "0 auto",
              border: "1px solid #ddd",
            }}
          ></div>

          <div className="location-info">
            <p>
              <strong>[차간 茶潤]</strong>
              <br />
              안산시 00구 000동 123나길 56
              <br />
              영업시간 : 화–일 12-7PM (월요일 휴무)
              <br />
              전화 : 02-123-4567
            </p>
          </div>

          <div className="transport">
            <h4>대중교통 이용을 추천드려요</h4>
            <p>지하철 4호선 000역 3번 출구, 도보 10분</p>
            <p className="tip">
              ✅ tip! 000역 엘리베이터 이용 후 육교로 이동하면 가장 편리
            </p>
          </div>

          <div className="parking">
            <h4>주차 안내</h4>
            <p>
              - 별도 주차 공간이 없어 대중교통 이용 권장
              <br />
              - 인근 유료주차장 서비스: 20만 원 이상 구매 시 최대 2시간 주차 지원
            </p>
            <ul>
              <li>00주차장: 안산 00구 000동 123-4</li>
              <li>11주차장: 안산 00구 000길 1221</li>
              <li>22번길 주차장: 안산 00구 000동 567</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Gowun Batang', sans-serif; background: #fff; color: #1a1a1a; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        .brand-page { padding: 80px 20px; line-height: 1.8; }
        .brand-intro { text-align: center; margin-bottom: 80px; }
        .brand-intro h2 { font-family: "Solmoe KimDaeGeon"; font-size: 50px; font-weight: 500; margin-bottom: 10px; }
        .brand-intro .sub { font-size: 30px; font-weight: 400; display: block; margin-top: -10px; }
        .brand-eng { margin-top: 30px; font-weight: 800; font-size: 20px; }
        .brand-quote { font-size: 18px; font-style: italic; margin: 20px 0; }
        .brand-content { display: flex; align-items: center; justify-content: center; gap: 60px; margin-top: 100px; }
        .brand-logo img { max-width: 350px; height: auto; }
        .brand-desc { list-style: none; max-width: 500px; font-size: 16px; line-height: 1.8; }
        .brand-desc li { margin-bottom: 20px; }
        .location h3 { font-size: 24px; border-top: 1px solid #ccc; padding-top: 40px; margin-bottom: 20px; }
        .location-info { background: #f5f5f5; padding: 20px; margin: 30px 0; font-size: 16px; }
        .transport, .parking { margin: 30px 0; }
        .transport h4, .parking h4 { font-size: 18px; margin-bottom: 10px; }
        .transport .tip { color: #b60000; font-weight: 500; margin-top: 8px; }
        .parking ul { list-style: disc; padding-left: 20px; }
        @media (max-width: 768px) { .brand-content { flex-direction: column; text-align: center; } }
      `}</style>
    </>
  );
}
