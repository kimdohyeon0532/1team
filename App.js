import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/BrandPage";
import JournalPage from "./pages/JournalPage";
import CollectionPage from "./pages/CollectionPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/brand" element={<BrandPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
