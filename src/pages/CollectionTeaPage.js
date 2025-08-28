import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { teaproducts } from "../data/TeaProducts";

export default function CollectionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 한 페이지에 보여줄 상품 수

  // 현재 페이지에 맞는 상품만 자르기
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = teaproducts?.slice(indexOfFirst, indexOfLast) || [];

  // 총 페이지 수
  const totalPages = Math.ceil(teaproducts.length / itemsPerPage);

  return (
    <>
      <Header />

      <style>{`
        .collection-container { padding: 50px 270px 150px; }
        .product-title { 
            text-align: center; 
            font-size: 38px; 
            font-family: "Solmoe KimDaeGeon"; 
            font-weight: 400; 
            margin-bottom: 40px; 
            border-bottom: 1px solid #a0a0a0; 
            border-top: 1px solid #a0a0a0; 
            padding: 30px; 
        }
        .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 70px 20px; }
        .product-card { display: flex; flex-direction: column; align-items: flex-start; }
        .product-card a {display: block; width: 100%;}
        .product-card img { width: 100%; height: auto; object-fit: cover; margin-bottom: 10px; }
        .product-brand { font-size: 15px; color: #555; margin-bottom: 5px; }
        .product-name { font-size: 16px; font-weight: bold; margin-bottom: 5px; }
        .product-desc { font-size: 14px; color: #777; margin-bottom: 5px; }
        .product-price { font-size: 14px; font-weight: bold; }
        .pagination { display: flex; justify-content: center; margin-top: 50px; gap: 10px; }
        .page-number { padding: 8px 14px; border: 1px solid #ccc; cursor: pointer; font-size: 14px; }
        .page-number.active { background-color: black; color: white; border-color: black; }
      `}</style>

      <div className="collection-container">
        <h2 className="product-title">TEA WARE</h2>
        <div className="product-grid">
        {currentProducts.map((item) => (
  <div key={item.id} className="product-card">
    {/* 상품 이미지와 제목을 클릭하면 상세페이지로 이동 */}
    {item.Link ? (
      <Link to={item.Link}>
        <img src={item.img} alt={item.title} />
      </Link>
    ) : (
      <img src={item.img} alt={item.title} />
    )}

    <div className="product-brand">{item.name}</div>
    <div className="product-name">{item.title}</div>
    <div className="product-desc">{item.desc}</div>
    <div className="product-price">{item.price}</div>
  </div>
))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
