"use client";
import React from "react";
import HeroSection from "@/components/section/Hero";
import PricingSection from "@/components/section/Pricing";
import ExpertArticlesSection from "@/components/section/Article";
import ExpertVideosSection from "@/components/section/Video";
import Footer from "@/components/section/Footer";
import { useDashboard } from "@/hooks/dashboard-hook";

const Home: React.FC = () => {
  const { data, isLoading, error, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">
            {error?.message || "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  console.log("Dashboard Data:", data?.data.data.user_info.full_name);

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
