import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BrandStorySimple from "../components/BrandStorySimple";
import CultureSection from "../components/CultureSection";
import NewInCarousel from "../components/NewInCarousel";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";
import Splash from "../components/Splash";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <BrandStorySimple />
                <CultureSection />
                <NewInCarousel />
                <ReviewSection />
            </main>
            <Footer />
            {/* Splash는 홈 전용 권장 */}
            <Splash />
        </>
    );
}
