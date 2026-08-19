import React from "react";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0E3F73] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#C8A45A] tracking-wider uppercase">
              MedAesthetics <span className="font-light">Bristol</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Providing medical-led facial aesthetics and skin rejuvenation in
              the heart of Bristol. Our focus is safety, education, and natural
              results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-white mb-6 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-[#C8A45A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8A45A] transition-colors">
                  Treatments Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8A45A] transition-colors">
                  The Consultation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8A45A] transition-colors">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8A45A] transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-white mb-6 uppercase tracking-widest">
              Clinic Info
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C8A45A] shrink-0" />
                <span>
                  18 Berkeley Square
                  <br />
                  Bristol, BS8 1HB
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C8A45A] shrink-0" />
                <span>0117 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#C8A45A] shrink-0" />
                <span>hello@medaestheticsbristol.co.uk</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-white mb-6 uppercase tracking-widest">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex justify-between">
                <span>Mon - Tue</span> <span>Closed</span>
              </li>
              <li className="flex justify-between">
                <span>Wednesday</span> <span>10:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday</span> <span>10:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Friday</span> <span>09:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span> <span>By appointment</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Legal */}
        <div className="border-t border-white/10 pt-12">
          <div className="bg-[#0a335d] p-6 rounded-xl mb-8 border border-white/5">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-3 font-semibold">
              Clinical Disclaimer
            </p>
            <p className="text-xs text-white/60 leading-relaxed italic">
              All aesthetic treatments are medical procedures and carry
              potential risks. Results may vary from person to person. A full
              consultation is mandatory prior to any treatment to assess
              suitability and discuss potential side effects. MedAesthetics
              Bristol is a medical-led clinic. We do not offer treatments to
              anyone under the age of 18.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40 uppercase tracking-[0.2em]">
            <p>© {currentYear} MedAesthetics Bristol. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#C8A45A] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
