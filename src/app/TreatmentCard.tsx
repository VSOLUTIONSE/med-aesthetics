import React from "react";
import { Clock, ArrowRight } from "lucide-react";
interface TreatmentCardProps {
  title: string;
  description: string;
  priceFrom: string;
  duration: string;
  imageUrl?: string;
}
export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  title,
  description,
  priceFrom,
  duration,
  imageUrl = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
}) => {
  return (
    <div className="group bg-white border border-[#EAF1F7] hover:border-[#C8A45A] transition-all duration-500 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg rounded-2xl">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E3F73]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#0E3F73] leading-tight group-hover:text-[#C8A45A] transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-sm text-[#1E2833]/70 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Details Row */}
        <div className="flex items-center justify-between py-4 border-t border-[#EAF1F7] mb-4">
          <div className="flex items-center gap-1.5 text-xs text-[#0E3F73]/60 font-medium">
            <Clock size={14} className="text-[#C8A45A]" />
            <span>{duration}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] uppercase tracking-wider text-[#0E3F73]/50 mb-0.5">
              Investment
            </span>
            <span className="text-[#0E3F73] font-semibold">
              from {priceFrom}
            </span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 border border-[#0E3F73] text-[#0E3F73] text-sm font-semibold hover:bg-[#0E3F73] hover:text-white transition-all duration-300 rounded-full">
          Learn More
          <ArrowRight
            size={16}
            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
};
