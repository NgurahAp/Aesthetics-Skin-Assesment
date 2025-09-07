"use client";
import React from "react";
import HeroSection from "@/components/section/Hero";
import PricingSection from "@/components/section/Pricing";
import ExpertArticlesSection from "@/components/section/Article";
import ExpertVideosSection from "@/components/section/Video";
import Footer from "@/components/section/Footer";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <ExpertArticlesSection />
      <ExpertVideosSection />
      <Footer />
    </>
  );
};

export default Home;
