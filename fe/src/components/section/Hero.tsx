"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 text-[#3a523a] hover:text-[#2d4a2d] px-3 py-2 text-sm font-medium rounded-md hover:bg-[#faf6ed] transition-colors"
      >
        <div className="w-8 h-8 bg-[#4c6a4c] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.full_name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="hidden md:block">{user?.full_name || "User"}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-[#f0ebd9] py-1 z-50">
          <div className="px-4 py-2 border-b border-[#f5f0e3]">
            <p className="text-sm font-medium text-[#2d4a2d]">
              {user?.full_name}
            </p>
            <p className="text-xs text-[#4c6a4c]">{user?.email}</p>
          </div>

          <button
            onClick={() => setIsDropdownOpen(false)}
            className="block w-full text-left px-4 py-2 text-sm text-[#3a523a] hover:bg-[#faf6ed] transition-colors"
          >
            Profile
          </button>

          <button
            onClick={() => setIsDropdownOpen(false)}
            className="block w-full text-left px-4 py-2 text-sm text-[#3a523a] hover:bg-[#faf6ed] transition-colors"
          >
            Settings
          </button>

          <div className="border-t border-[#f5f0e3] mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AuthButtons = () => (
    <div className="flex gap-2">
      <Link
        href={"/"}
        className="text-[#4c6a4c] hover:text-[#2d4a2d] px-3 py-2 text-sm font-medium"
      >
        Sign In
      </Link>
      <Link
        href={"/signUp"}
        className="bg-[#4c6a4c] hover:bg-[#3a523a] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <>
      <header className="w-full bg-white border-b border-[#f0ebd9] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#2d4a2d]">Aesthetic</h2>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="text-sm font-medium text-[#3a523a] hover:text-[#2d4a2d]"
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/articles"
                    className="text-sm font-medium text-[#3a523a] hover:text-[#2d4a2d]"
                  >
                    Articles
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/videos"
                    className="text-sm font-medium text-[#3a523a] hover:text-[#2d4a2d]"
                  >
                    Videos
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/membership"
                    className="text-sm font-medium text-[#3a523a] hover:text-[#2d4a2d]"
                  >
                    Membership
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Conditional rendering based on auth state */}
            {isAuthenticated ? <UserDropdown /> : <AuthButtons />}
          </div>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-[#fefcf7] to-[#faf6ed] -mt-8">
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
    </>
  );
};

export default HeroSection;
