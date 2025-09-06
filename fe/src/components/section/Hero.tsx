"use client";
import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const HeroSection: React.FC = () => {
  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">Aesthetic</h2>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="text-sm font-medium">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="text-sm font-medium"
                  >
                    Articles
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className="text-sm font-medium"
                  >
                    Videos
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className="text-sm font-medium"
                  >
                    Membership
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Sign In
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-[#FAFAFA] -mt-8">
        <div className="flex items-center min-h-screen max-w-7xl mx-auto px-4">
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
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Your Journey
                </button>
                <button className="border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
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
    </>
  );
};

export default HeroSection;
