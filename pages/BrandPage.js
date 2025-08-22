import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BrandPage() {
    return (
        <>
            <Header />
            <main className="container" style={{ padding: "60px 0" }}>
                <h1>Brand</h1>
                <p>브랜드 소개 콘텐츠</p>
            </main>
            <Footer />
        </>
    );
}
