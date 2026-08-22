"use client";

import React from "react";
import { Menu, X, Calendar } from "lucide-react";
import Image from "next/image";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Treatments", href: "#" },
    { name: "Your Consultation", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0E3F73] shadow-md">
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/img/logo.jpg"
              alt="MedAesthetics Bristol"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border-2 border-[#C8A45A] object-cover"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-[#C8A45A] transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#C8A45A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b6934a] transition-all duration-300 flex items-center gap-2 shadow-sm">
              <Calendar size={16} />
              Book a Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#C8A45A] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0E3F73] border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium text-white hover:text-[#C8A45A] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 py-4">
              <button className="w-full bg-[#C8A45A] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#b6934a] transition-all flex justify-center items-center gap-2">
                <Calendar size={18} />
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
