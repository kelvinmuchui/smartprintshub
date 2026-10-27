import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Calculator, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Truck,
  Sparkles,
  Layers
} from "lucide-react";

import {
  googleGeminiRollups,
  googleGeminiNotebook,
  vibitRollupBanner,
  vibitFlyersStack,
  luxuryBusinessCards,
  luxuryPackagingBox,
  afdbBackdropBanner,
  afdbRollupBanners,
  framedLakeCanvas,
  brandedCorporateFlasks
} from "../data";

interface HeroShowcaseSliderProps {
  onQuoteClick: () => void;
  onExploreServices: () => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export const HeroShowcaseSlider: React.FC<HeroShowcaseSliderProps> = ({
  onQuoteClick,
  onExploreServices,
  onOpenQuoteModal
}) => {
  const slides = [
    {
      id: "slide-afdb",
      badge: "Conference Stage Branding",
      client: "African Development Bank Group",
      headline: "Delivering Professional Printing & Stage Branding in Westlands",
      subhead: "High-visibility stage backdrop displays & twin pull-up stands delivered to Pullman Hotel Nairobi Upper Hill. Ultra-high contrast CMYK printing built for multilateral summits.",
      bgImage: afdbBackdropBanner,
      detailImage: afdbRollupBanners,
      tag: "Summit Stage Display",
      whatsappTopic: "Conference Stage Backdrop and Banners",
      specs: ["Seamless Fabric Backdrop", "Twin Pull-Up Display Stands", "Same-Day Hotel Delivery"]
    },
    {
      id: "slide-gemini",
      badge: "Corporate Event Collateral",
      client: "Google Cloud Kenya",
      headline: "Your Premier Printing & Corporate Branding Partner in Nairobi",
      subhead: "Custom debossed hardcover executive notebooks paired with high-tension teardrop roll-up banners for Google Cloud Kenya's Gemini Enterprise Masterclass.",
      bgImage: googleGeminiRollups,
      detailImage: googleGeminiNotebook,
      tag: "Gemini Masterclass Suite",
      whatsappTopic: "Google Cloud Gemini Event Suite",
      specs: ["Twin 85x200cm Teardrop Banners", "Hardcover Debossed Notebooks", "24-Hour Production"]
    },
    {
      id: "slide-luxury-cards",
      badge: "Executive Stationery & Finishes",
      client: "Westlands Executive Suites",
      headline: "300gsm Velvet Business Cards & Luxury Presentation Packaging",
      subhead: "Heavyweight 300gsm silk artboard finished with deep velvet soft-touch matte lamination, raised spot UV, and matching rigid magnetic presentation gift boxes.",
      bgImage: luxuryBusinessCards,
      detailImage: luxuryPackagingBox,
      tag: "300gsm Velvet Cards",
      whatsappTopic: "Luxury 300gsm Business Cards & Packaging",
      specs: ["300gsm Silk Artboard", "Velvet Soft-Touch Lamination", "Raised Spot UV Finishes"]
    },
    {
      id: "slide-vibit",
      badge: "Institutional & Marketing Print",
      client: "VIBIT Agricultural Training College",
      headline: "High-Resolution Roll-Up Banners & Gloss Marketing Flyers",
      subhead: "Non-curl satin finish roll-up banners with heavy aluminum teardrop bases paired with rich 250gsm gloss career marketing flyers for student recruitment nationwide.",
      bgImage: vibitRollupBanner,
      detailImage: vibitFlyersStack,
      tag: "Institutional Rollout",
      whatsappTopic: "VIBIT College Banners and Flyers",
      specs: ["Anti-Glare Satin Visual", "A5 250gsm Gloss Flyers", "Heavy Teardrop Aluminum Base"]
    },
    {
      id: "slide-merch",
      badge: "Promotional Gifting & Merch",
      client: "Corporate Gifting & Boardrooms",
      headline: "Custom Laser-Engraved Thermal Drinkware & Fine Art Canvases",
      subhead: "Permanent fiber-laser engraved matte black stainless steel thermal flasks alongside ultra-vivid museum-grade landscape canvases with gallery pine framing.",
      bgImage: brandedCorporateFlasks,
      detailImage: framedLakeCanvas,
      tag: "Laser-Etched Merch",
      whatsappTopic: "Laser-Etched Flasks and Canvas Prints",
      specs: ["Dual-Wall Vacuum Thermal Steel", "Precision Laser Fiber Etch", "Solid Pine Wood Framing"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-left bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. FULL-WIDTH BACKGROUND ARTWORK SLIDER WITH CINEMATIC SCRIM */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.headline}
              className="w-full h-full object-cover object-center filter brightness-[0.75]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered cinematic gradient overlays (DS Creations style) */}
        {/* Deep dark scrim on the left for text readability, subtle fade towards right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/45 sm:to-slate-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
        
        {/* Subtle royal blue brand atmosphere tint */}
        <div className="absolute inset-0 bg-[#003B9C]/15 mix-blend-multiply z-10 pointer-events-none" />
      </div>

      {/* 2. TOP ACCENT STRIP */}
      <div className="relative z-20 h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400" />

      {/* 3. HERO CONTENT CONTAINER */}
      <div className="relative z-20 px-6 sm:px-10 lg:px-14 pt-10 pb-12 sm:pt-14 sm:pb-16 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
        
        {/* TOP SECTION: KICKER BADGE & BACKGROUND PROJECT INDICATOR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          
          {/* Location & Authority Tag (DS Creations style) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-mono font-bold tracking-wider border border-blue-500/40 backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-blue-300">WESTLANDS NAIROBI</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-200">SHOP A11 WESTLANDS MARKET</span>
          </div>

          {/* Active Background Project Indicator Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 text-slate-300 text-xs font-mono border border-slate-700/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Artwork on Background:</span>
            <span className="font-semibold text-white">{currentSlide.client}</span>
          </div>
        </div>

        {/* MIDDLE SECTION: MAIN HEADLINE, VALUE PROPOSITION & CTAS */}
        <div className="max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Category pill */}
              <div className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-500/30">
                {currentSlide.badge}
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
                {currentSlide.headline}
              </h1>

              {/* Subheadline / Value Proposition */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl font-normal drop-shadow">
                {currentSlide.subhead}
              </p>

              {/* Specs checklist row */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentSlide.specs.map((spec, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-mono text-slate-200 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs Cluster (DS Creations style conversion triggers) */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            
            {/* Primary CTA: Instant Quote */}
            <button
              type="button"
              onClick={onQuoteClick}
              className="px-6 py-3.5 rounded-xl bg-[#003B9C] hover:bg-blue-600 active:bg-blue-800 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-blue-900/50 flex items-center gap-2.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer border border-blue-400/30"
            >
              <Calculator className="w-4 h-4 text-blue-200" />
              <span>Get an Instant Quote</span>
            </button>

            {/* WhatsApp Direct Order CTA */}
            <a
              href={`https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I'm%20inquiring%20about%20printing%20services%20(re:%20${encodeURIComponent(currentSlide.whatsappTopic)})`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Direct Call Quick Link */}
            <a
              href="tel:+254743603068"
              className="px-4 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-sans text-xs font-bold uppercase tracking-wider border border-slate-700 backdrop-blur-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call: 0743 603 068</span>
            </a>

            {/* Catalog explorer */}
            <button
              type="button"
              onClick={onExploreServices}
              className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BOTTOM SECTION: SLIDE SELECTOR THUMBNAILS, CONTROLS & TRUST PILLARS */}
        <div className="pt-8 sm:pt-10 border-t border-slate-800/80 mt-8 space-y-6">
          
          {/* Slide selector tabs & navigation arrows */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Interactive slide tabs */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden md:inline">
                Portfolio:
              </span>
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    currentIndex === idx
                      ? "bg-[#003B9C] text-white font-bold shadow-md shadow-blue-900/40 border border-blue-400/50"
                      : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${currentIndex === idx ? "bg-emerald-400" : "bg-slate-500"}`} />
                  <span>{s.tag}</span>
                </button>
              ))}
            </div>

            {/* Arrows & Slide index counter */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <span className="text-xs font-mono text-slate-400">
                0{currentIndex + 1} / 0{slides.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous slide"
                  aria-label="Previous artwork"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Next slide"
                  aria-label="Next artwork"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Four Trust & Service Features Strip (DS Creations style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">Same-Day Turnaround</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Fast-track printing for urgent orders in Westlands & Nairobi</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">300gsm Heavy Stock</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Silk artboard, soft-touch velvet lamination & raised spot UV</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">All 47 Counties</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Reliable door-to-door courier dispatch via Wells Fargo & G4S</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-tight">Shop A11 Westlands</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Westlands Market walk-in physical proofing & instant pickup</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroShowcaseSlider;
