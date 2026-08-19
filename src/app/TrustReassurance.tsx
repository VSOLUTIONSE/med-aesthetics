import React from 'react';
import { ShieldCheck, Award, HeartPulse, UserCheck } from 'lucide-react';

export const TrustReassurance: React.FC = () => {
  const pillars = [{
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Medical-Led Care",
    description: "Our clinic is led by fully qualified and insured medical professionals with a commitment to patient safety and ethical practice."
  }, {
    icon: <Award className="w-8 h-8" />,
    title: "Natural Results",
    description: "We believe in the 'untouched' look. Our goal is to enhance your natural beauty, never to overfill or dramatically change your features."
  }, {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Personalized Approach",
    description: "No two faces are the same. Every treatment plan is bespoke, starting with a comprehensive 45-minute consultation."
  }, {
    icon: <UserCheck className="w-8 h-8" />,
    title: "CQC Standards",
    description: "We operate with the highest clinical standards of hygiene and patient care, using only premium, CE-marked products."
  }];

  return (
    <div className="bg-[#EAF1F7] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8A45A] text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">Your safety is our priority</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-semibold text-[#0E3F73] mb-6">
            Why patients trust MedAesthetics Bristol
          </h2>
          <div className="w-24 h-0.5 bg-[#C8A45A] mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white hover:border-[#C8A45A]/20">
              <div className="text-[#C8A45A] mb-6 inline-block p-3 bg-[#F7F2E8] rounded-xl">
                {pillar.icon}
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#0E3F73] mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#1E2833]/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#0E3F73] p-1 rounded-2xl">
          <div className="bg-[#0E3F73] border border-[#C8A45A]/30 p-8 md:p-12 text-center rounded-xl">
            <p className="text-white text-lg md:text-xl font-['Cormorant_Garamond'] italic mb-6 leading-relaxed">
              "My mission is to provide safe, medical-led treatments that help my patients feel more confident in their own skin, while maintaining the highest standards of clinical excellence."
            </p>
            <div className="flex flex-col items-center">
              <span className="text-[#C8A45A] font-semibold tracking-wider uppercase text-sm">Dr Aisha Rahman</span>
              <span className="text-white/60 text-xs mt-1 italic">Clinic Founder & Lead Aesthetic Doctor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
