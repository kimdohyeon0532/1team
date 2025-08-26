import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <Header />
            <main className="container" style={{ padding: "60px 0" }}>
                <h1>404</h1>
                <p>페이지를 찾을 수 없습니다.</p>
                <Link to="/">홈으로</Link>
            </main>
            <Footer />
        </>
    );
}
