import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewInCarousel from "../components/NewInCarousel";

export default function CollectionPage() {
    return (
        <>
            <Header />
            <main>
                <section className="container" style={{ padding: "60px 0" }}>
                    <h1>Collection</h1>
                    <p>카테고리/필터/리스트 영역</p>
                </section>
                <NewInCarousel />
            </main>
            <Footer />
        </>
    );
}
