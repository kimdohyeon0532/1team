// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/auth";

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
import Order from "./pages/Order"

export default function App() {
  return (
   <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
  
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/exhibition1" element={<ExhibitionDetailPage1 />} />
        <Route path="/exhibition2" element={<ExhibitionDetailPage2 />} />
  
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/tableware" element={<CollectionTablePage />} />
        <Route path="/collection/teaware" element={<CollectionTeaPage />} />
  
        <Route path="/productdetailpage" element={<ProductDetailPage />} />
        <Route path="/productdetailpage2" element={<ProductDetailPage2 />} />
        <Route path="/productdetailpage3" element={<ProductDetailPage3 />} />
        <Route path="/productdetailpage4" element={<ProductDetailPage4 />} /> 
  
        <Route path="/product/:id" element={<ProductDetailPage />} />
  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
  
        <Route path="/ordercomplete" element={<OrderCompletePage />} />
        <Route path="/order" element={<Order />} />


  
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypageEdit" element={<MypageEdit />} />
        <Route path="/accountprofileform" element={<AccountProfileForm />} />
  
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
   </AuthProvider>
  );
}
