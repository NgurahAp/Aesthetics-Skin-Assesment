import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2d4a2d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Aesthetic</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in achieving radiant, healthy skin through 
              science-backed skincare solutions and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Articles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Videos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Membership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">hello@aesthetic.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-2">Subscribe to Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-[#3a523a] border border-[#4c6a4c] rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6a9669]"
                />
                <button className="px-4 py-2 bg-[#6a9669] hover:bg-[#4c6a4c] rounded-r-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3a523a] mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Aesthetic. All rights reserved. Made with ❤️ for beautiful skin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;