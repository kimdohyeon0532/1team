import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/BrandPage";
import JournalPage from "./pages/JournalPage";
import ExhibitionDetailPage1 from "./pages/ExhibitionDetailPage1";
import ExhibitionDetailPage2 from "./pages/ExhibitionDetailPage2";

import CollectionPage from "./pages/CollectionPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CollectionTablePage from "./pages/CollectionTablePage";
import CollectionTeaPage from "./pages/CollectionTeaPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/brand" element={<BrandPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/exhibition1" element={<ExhibitionDetailPage1 />} />
      <Route path="/exhibition2" element={<ExhibitionDetailPage2 />} />

      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/collection/tableware" element={<CollectionTablePage />} />
      <Route path="/collection/teaware" element={<CollectionTeaPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}
