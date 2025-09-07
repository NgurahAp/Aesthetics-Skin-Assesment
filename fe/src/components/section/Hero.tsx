"use client";
import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefcf7] to-[#faf6ed]">
      <div className="flex items-center min-h-screen max-w-7xl mx-auto px-4">
        <div className="w-1/2 pr-8">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-[#2d4a2d] mb-4 leading-tight">
              Your Journey to Radiant Skin
            </h1>

            <p className="text-md text-[#4c6a4c] mb-8 leading-relaxed">
              Discover the science behind beautiful skin with our curated
              collection of expert articles, video tutorials, and personalized
              skincare routines.
            </p>

            <div className="flex gap-4">
              <button className="bg-[#4c6a4c] hover:bg-sage-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                Start Your Journey
              </button>
              <button className="border border-[#6a9669] text-[#4c6a4c] hover:bg-[#6a9669] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Content
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-screen flex items-center justify-center pl-8">
          <div className="relative w-full h-4/6 rounded-xl overflow-hidden shadow-2xl border-4 border-[#f0ebd9]">
            <Image
              src="/hero-img.webp"
              alt="Skincare Product"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;