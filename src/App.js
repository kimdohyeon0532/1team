// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./store/auth";

// pages
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/BrandPage";
import CartPage from "./pages/Cart";
import JournalPage from "./pages/JournalPage";
import ExhibitionDetailPage1 from "./pages/ExhibitionDetailPage1";
import ExhibitionDetailPage2 from "./pages/ExhibitionDetailPage2";

import CollectionPage from "./pages/CollectionPage";
import CollectionTablePage from "./pages/CollectionTablePage";
import CollectionTeaPage from "./pages/CollectionTeaPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";

import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDetailPage2 from "./pages/ProductDetailPage2";
import ProductDetailPage3 from "./pages/ProductDetailPage3";
import ProductDetailPage4 from "./pages/ProductDetailPage4";

import OrderCompletePage from "./pages/Ordercomplete";
import MypageEdit from "./pages/MypageEdit";
import AccountProfileForm from "./components/AccountProfileForm";
import Order from "./pages/Order";

import AssistGutter from "./components/AssistGutter";
import NewInCarousel from "./components/NewInCarousel";

// 페이지 전환 시 스크롤 상단으로 올려주는 유틸
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 스냅/부드러운 스크롤 사용하는 경우도 정상 동작
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      {/* ✅ 모든 페이지에서 우측 레일/챗봇이 보이도록 전역으로 렌더 */}
      <AssistGutter />

      {/* ✅ 라우팅 */}
      <ScrollToTop />
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomePage />} />

        {/* 브랜드/저널/전시 */}
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/exhibition1" element={<ExhibitionDetailPage1 />} />
        <Route path="/exhibition2" element={<ExhibitionDetailPage2 />} />

        {/* 컬렉션 */}
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/tableware" element={<CollectionTablePage />} />
        <Route path="/collection/teaware" element={<CollectionTeaPage />} />

        {/* 상품 상세 */}
        <Route path="/productdetailpage" element={<ProductDetailPage />} />
        <Route path="/productdetailpage2" element={<ProductDetailPage2 />} />
        <Route path="/productdetailpage3" element={<ProductDetailPage3 />} />
        <Route path="/productdetailpage4" element={<ProductDetailPage4 />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />


        {/* 장바구니/주문 */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ordercomplete" element={<OrderCompletePage />} />
        <Route path="/order" element={<Order />} />

        {/* 계정/마이페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypageEdit" element={<MypageEdit />} />
        <Route path="/accountprofileform" element={<AccountProfileForm />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
