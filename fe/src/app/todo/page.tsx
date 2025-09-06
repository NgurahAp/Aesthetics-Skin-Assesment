"use client";
import React from "react";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="flex items-center min-h-screen max-w-7xl mx-auto px-4 pt-10">
        <div className="w-1/2 pr-8">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Journey to Radiant Skin
            </h1>

            <p className="text-md text-gray-700 mb-8 leading-relaxed">
              Discover the science behind beautiful skin with our curated
              collection of expert articles, video tutorials, and personalized
              skincare routines.
            </p>

            <div className="flex gap-4">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start Your Journey
              </button>
              <button className="border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Explore Content
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-screen flex items-center justify-center pl-8">
          <div className="relative w-full h-5/7 rounded-xl overflow-hidden">
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

export default Home;
