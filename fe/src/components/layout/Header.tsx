"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

const Header: React.FC = () => {
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
        href={"/signIn"}
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
              <Link href="/">
                <h2 className="text-2xl font-bold text-[#2d4a2d] cursor-pointer">
                  Aesthetic
                </h2>
              </Link>
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

            {isAuthenticated ? <UserDropdown /> : <AuthButtons />}
          </div>
        </div>
      </header>

      {/* Dropdown overlay */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;