// BrandPage.jsx
import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// CRA(.env): REACT_APP_KAKAO_API_KEY=... / Vite(.env): VITE_KAKAO_API_KEY=...
const KAKAO_API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_KAKAO_API_KEY) ||
  process.env.REACT_APP_KAKAO_API_KEY;

// Kakao SDK를 안전하게 1회만 로드하는 함수
function loadKakaoSdk(appkey) {
  if (!appkey) return Promise.reject(new Error("Kakao JavaScript 키가 없습니다."));
  // 이미 로드된 경우
  if (window.kakao?.maps) {
    return new Promise((resolve) => window.kakao.maps.load(resolve));
  }
  // 이미 script 태그가 있는 경우
  if (document.getElementById("kakao-sdk")) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(check);
          window.kakao.maps.load(resolve);
        }
      }, 50);
    });
  }
  // 최초 로드
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(resolve);
    script.onerror = (e) => reject(new Error("Kakao SDK 로드 실패"));
    document.head.appendChild(script);
  });
}

export default function BrandPage() {
  const mapEl = useRef(null);

  useEffect(() => {
    const LAT = 37.308409;
    const LNG = 126.851066;
    const PLACE_NAME = "차간";

    loadKakaoSdk(KAKAO_API_KEY)
      .then(() => {
        const { kakao } = window;
        const center = new kakao.maps.LatLng(LAT, LNG);

        const map = new kakao.maps.Map(mapEl.current, {
          center,
          level: 3,
        });

        const marker = new kakao.maps.Marker({ position: center, map });
        const dirUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
          PLACE_NAME
        )},${LAT},${LNG}`;

        const content = `
          <div style="width:250px; padding:10px; font-family: 'Gowun Batang', sans-serif; font-size:14px; text-align:center; 
                      border-radius:8px; background:#fff; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">
            <h3 style="margin:0; padding:0; color:#333; font-size:16px;">차간 茶潤</h3>
            <p style="margin:5px 0 10px; color:#666; font-size:12px;">
              안산시 00구 000동 123나길 56
            </p>
            <button onclick="window.open('${dirUrl}','_blank')"
                    style="margin-top:10px; padding:5px 10px; border:none; background:#007BFF; color:#fff; border-radius:5px; cursor:pointer;">
              길찾기
            </button>
          </div>
        `;

        const infowindow = new kakao.maps.InfoWindow({ content });
        kakao.maps.event.addListener(marker, "click", () => infowindow.open(map, marker));
        // 기본으로 열어두고 싶으면 아래 주석 해제
        infowindow.open(map, marker);
      })
      .catch((err) => {
        console.error(err);
        alert("지도를 불러오지 못했어요. 콘솔 에러를 확인해 주세요.");
      });
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
            ref={mapEl}
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "400px",
              margin: "0 auto",
              border: "1px solid #ddd",
            }}
          />
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
            <p className="tip">✅ tip! 000역 엘리베이터 이용 후 육교로 이동하면 가장 편리</p>
          </div>

          <div className="parking">
            <h4>주차 안내</h4>
            <p>
              - 별도 주차 공간이 없어 대중교통 이용 권장
              <br />- 인근 유료주차장 서비스: 20만 원 이상 구매 시 최대 2시간 주차 지원
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
    </>
  );
}
