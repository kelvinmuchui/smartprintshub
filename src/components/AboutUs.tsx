import React from "react";
import { Printer, Zap } from "lucide-react";
import stationeryImg from "../assets/images/about_stationery_1782113676282.jpg";
import brandFocusImg from "../assets/images/about_brand_focus_1782113696665.jpg";

export default function AboutUs() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Overlapping Layered Image Composites */}
        <div className="md:col-span-5 relative flex items-center justify-center p-4">
          {/* Dot matrix grid decoration in the background of the image */}
          <div className="absolute -top-2 -right-2 w-24 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent bg-[size:10px_10px] pointer-events-none" />

          {/* Main Background Image Card */}
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 dark:border-slate-800 relative z-0">
            <img
              src={stationeryImg}
              alt="Professional stationery branding and print preparation workspace flatlay"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overlapping Foreground Image Card (Bottom Right Offset) */}
          <div className="absolute -bottom-2 right-2 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900 z-10 transform translate-y-4 hover:scale-105 transition-transform duration-350">
            <img
              src={brandFocusImg}
              alt="A detailed magnifying glass focusing on premium BRAND print lettering"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Abstract left accent line matching Image 2 style */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 bg-blue-500 dark:bg-blue-400 rounded-r-md pointer-events-none" />
        </div>

        {/* Right Column: About Us Copywriting & Features */}
        <div className="md:col-span-7 space-y-5 text-left">
          {/* Small outline badge */}
          <div className="inline-block px-3 py-1 border border-blue-500/80 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-sans text-[10px] font-black uppercase tracking-widest rounded bg-blue-50/20 dark:bg-blue-950/20">
            About Us
          </div>

          {/* Bold Header */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-slate-850 dark:text-white leading-tight">
            Your Trusted Print <br />
            Partner In Westlands
          </h3>

          {/* Mission/Profile Statement Copy */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
            At SmartPrints Hub  we specialize in high-quality printing services tailored to meet your business and personal needs. We proudly offer full-cycle production, managing your project from concept and design to the final vibrant, heavy-ink print.
          </p>

          <hr className="border-slate-100 dark:border-slate-800/80" />

          {/* Bottom Grid Highlights (Diverse Formats & Fast Turnaround) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Diverse Formats Option */}
            <div className="flex gap-3 items-start">
              <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-display font-bold text-slate-800 dark:text-white uppercase tracking-tight">
                  Diverse Formats
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Large format (A0–A3) banner printing down to everyday essentials (A4–A6).
                </p>
              </div>
            </div>

            {/* Fast Turnaround Service */}
            <div className="flex gap-3 items-start">
              <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-display font-bold text-slate-800 dark:text-white uppercase tracking-tight">
                  Fast Turnaround
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Fulfilling accurate, crisp-registration, and high-density, professional results on demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
