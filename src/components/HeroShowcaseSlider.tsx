import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Calculator, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  ArrowRight
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
  brandedCorporateFlasks,
  whiteGiftBags
} from "../data";

interface HeroShowcaseSliderProps {
  onQuoteClick: () => void;
  onExploreServices: () => void;
}

export const HeroShowcaseSlider: React.FC<HeroShowcaseSliderProps> = ({
  onQuoteClick,
  onExploreServices
}) => {
  const slides = [
    {
      id: "slide-gemini",
      tag: "Corporate Tech Event Branding",
      client: "Google Cloud Kenya",
      title: "Gemini Enterprise Masterclass Event Suite",
      description: "Custom-printed hardcover executive notebooks with elastic security bands paired with twin high-tension retractable roll-up banner stands.",
      image: googleGeminiRollups,
      secondaryImage: googleGeminiNotebook,
      specs: ["Twin 85x200cm Teardrop Banners", "Custom A5 Debossed Notebooks", "Same-Day Hotel Delivery"],
      badge: "Conference Showcase",
      turnaround: "Delivered in 24 Hours",
      whatsappTopic: "Google Cloud Gemini Event Suite"
    },
    {
      id: "slide-vibit",
      tag: "Academic & Institutional Rollout",
      client: "VIBIT Agricultural Training College",
      title: "Accredited College Roll-Up Banner & Marketing Flyers",
      description: "Full promotional collateral combining high-resolution non-curl satin roll-up banner stands with heavy-ink gloss coffee career marketing flyers.",
      image: vibitRollupBanner,
      secondaryImage: vibitFlyersStack,
      specs: ["Satin Anti-Glare Visual", "A5 250gsm Gloss Flyers", "Heavy Aluminum Teardrop Base"],
      badge: "High-Volume Print",
      turnaround: "Same-Day Dispatch",
      whatsappTopic: "VIBIT College Banners and Flyers"
    },
    {
      id: "slide-luxury-cards",
      tag: "Executive Stationery & Unboxing",
      client: "Westlands Executive Suite",
      title: "Velvet Soft-Touch Business Cards & Custom Packaging",
      description: "400gsm cotton artboard finished with deep velvety soft-touch matte lamination, raised spot UV, and matching rigid magnetic presentation gift boxes.",
      image: luxuryBusinessCards,
      secondaryImage: luxuryPackagingBox,
      specs: ["400gsm Premium Cotton Board", "Raised Spot UV Coating", "Rigid Presentation Packaging"],
      badge: "Executive Favorite",
      turnaround: "Express Production",
      whatsappTopic: "Luxury Business Cards and Packaging"
    },
    {
      id: "slide-afdb",
      tag: "Multilateral Conference Collateral",
      client: "African Development Bank Group",
      title: "Climate Action Window Inception Workshop Display",
      description: "High-visibility stage conference branding at Pullman Hotel Nairobi Upper Hill, featuring an expansive seamless fabric backdrop display and twin pull-up stands.",
      image: afdbBackdropBanner,
      secondaryImage: afdbRollupBanners,
      specs: ["Seamless Stage Backdrop Banner", "Twin Pull-Up Display Stands", "Ultra-High Contrast CMYK"],
      badge: "VIP Summit Branding",
      turnaround: "Delivered On-Site",
      whatsappTopic: "Conference Stage Backdrop and Banners"
    },
    {
      id: "slide-merch",
      tag: "Corporate Merchandise & Wall Decor",
      client: "Corporate Gifting & Boardrooms",
      title: "Laser-Etched Thermal Flasks & Fine Art Framed Canvas",
      description: "Permanent fiber-laser engraved matte black stainless steel thermal drinkware alongside ultra-vivid landscape canvas prints with slim gallery framing.",
      image: brandedCorporateFlasks,
      secondaryImage: framedLakeCanvas,
      specs: ["Dual-Wall Vacuum Thermal Steel", "Laser Etch Precision", "Pine-Framed Woven Canvas"],
      badge: "Premium Merchandise",
      turnaround: "Nairobi & 47 Counties",
      whatsappTopic: "Laser-Etched Flasks and Canvas Decor"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
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
      className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden text-left"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-[#003B9C] to-emerald-500 z-30" />

      {/* Main Slide Presentation */}
      <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
        
        {/* Left Column: Text Information & Interactive CTAs (6 cols) */}
        <div className="lg:col-span-6 space-y-6 relative z-10">
          
          {/* Animated Tag Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{currentSlide.tag}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 dark:text-slate-400">{currentSlide.client}</span>
          </div>

          {/* Slide Heading with smooth key change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <h1 className="text-2xl sm:text-4xl lg:text-4xl font-display font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                {currentSlide.title}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
                {currentSlide.description}
              </p>

              {/* Specs List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                {currentSlide.specs.map((spec, i) => (
                  <div 
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTAs Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onQuoteClick}
              className="px-6 py-3.5 rounded-xl bg-[#003B9C] hover:bg-blue-800 text-white font-sans text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Instant Quote Estimator</span>
            </button>

            <a
              href={`https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I'm%20interested%20in%20the%20${encodeURIComponent(currentSlide.whatsappTopic)}%20I%20saw%20on%20your%20website.`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider border border-slate-800 flex items-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Order via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onExploreServices}
              className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Composite Card with Floating Badges (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Main Visual Frame with AnimatePresence */}
          <div className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Overlapping Secondary Artwork Inset Card (Bottom-Right) */}
            {currentSlide.secondaryImage && (
              <motion.div 
                key={`inset-${currentSlide.id}`}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute -bottom-2 right-3 w-2/5 aspect-square rounded-xl overflow-hidden shadow-2xl border-2 border-white dark:border-slate-900 bg-slate-900 transform translate-y-2 hover:scale-105 transition-transform"
              >
                <img
                  src={currentSlide.secondaryImage}
                  alt={`${currentSlide.title} detail`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}

            {/* Floating Top Badge with subtle float motion */}
            <div className="absolute top-4 left-4 z-20 animate-float-subtle">
              <div className="px-3 py-1.5 rounded-xl glassmorphism text-slate-900 dark:text-white text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 border border-white/60 dark:border-slate-700/60">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>{currentSlide.badge}</span>
              </div>
            </div>

            {/* Floating Turnaround Badge (Bottom-Left) */}
            <div className="absolute bottom-4 left-4 z-20">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentSlide.turnaround}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar: Progress, Tabs & Arrow Navigation */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 p-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Slide Thumbnails & Jump Selector */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                currentIndex === idx
                  ? "bg-[#003B9C] text-white font-bold shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{s.client.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Previous / Next Arrows & Timer Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroShowcaseSlider;
