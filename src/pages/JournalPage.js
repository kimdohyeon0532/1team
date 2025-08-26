import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JournalPage() {
    return (
        <>
            <Header />
            <main className="container" style={{ padding: "60px 0" }}>
                <h1>Journal</h1>
                <p>저널/블로그 목록</p>
            </main>
            <Footer />
        </>
    );
}
