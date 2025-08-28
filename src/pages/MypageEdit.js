// src/pages/MypageEdit.jsx  (그대로 붙여 사용)
import React from "react";
 import { useNavigate } from "react-router-dom";
 import Header from "../components/Header";
 import Footer from "../components/Footer";
 import AccountProfileForm from "../components/AccountProfileForm";
export default function MypageEdit() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <AccountProfileForm
          initial={{
            id: "kimdohyun",
            name: "김도현",
            email: "user@naver.com",
            phone: "010-1234-5678",
          }}
          onSubmit={async (payload) => {
            console.log("제출 데이터:", payload);
           // TODO: fetch/axios 로 회원정보 업데이트 API 연동
           alert("회원정보가 수정되었습니다.");
           navigate("/", { replace: true }); // 메인으로 이동 (히스토리 대체)
        }}
          onCancel={() => window.history.back()}
          onFindAddress={() => {
            alert("주소 찾기 클릭");
            // TODO: 카카오/다음 주소검색 모달 연동
          }}
        />
      </main>
      <Footer />
    </>
  );
}
