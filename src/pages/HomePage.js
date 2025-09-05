// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BrandStorySimple from "../components/BrandStorySimple";
import CultureSection from "../components/CultureSection";
import NewInCarousel from "../components/NewInCarousel";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";
import Splash from "../components/Splash";
import { PAGE_TO_PATH } from "../constants/catalogRoutes";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero
                    localCandidates={[
                        { label: "TEA & WARE", path: PAGE_TO_PATH.TEA_WARE },
                        { label: "ART & CRAFT", path: PAGE_TO_PATH.ART_CRAFT },
                        { label: "TABLE & WARE", path: PAGE_TO_PATH.TABLE_WARE },
                    ]}
                />
                <BrandStorySimple />
                <CultureSection />
                <NewInCarousel />
                <ReviewSection />
            </main>
            <Footer />
            <Splash />
        </>
    );
}
