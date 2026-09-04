import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, ChevronLeft, ChevronRight, X, Layers, Building2, Sparkles } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "printing" | "branding" | "corporate" | "events">("all");
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    item?: PortfolioItem;
    imageIndex: number;
  }>({
    isOpen: false,
    imageIndex: 0
  });

  const categories = ["all", "events", "corporate", "branding", "printing"] as const;

  const filteredItems = items.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImageIndexes((prev) => {
        const next = { ...prev };

        items.forEach((item) => {
          const imageCount = item.images?.length ?? 0;
          if (imageCount > 1) {
            next[item.id] = ((prev[item.id] ?? 0) + 1) % imageCount;
          }
        });

        return next;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, [items]);

  const handleNextImage = (itemId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[itemId] || 0;
      return { ...prev, [itemId]: (current + 1) % maxImages };
    });
  };

  const handlePrevImage = (itemId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[itemId] || 0;
      return { ...prev, [itemId]: (current - 1 + maxImages) % maxImages };
    });
  };

  const openLightbox = (item: PortfolioItem, imageIndex = 0) => {
    setLightboxState({
      isOpen: true,
      item,
      imageIndex
    });
  };

  const closeLightbox = () => {
    setLightboxState({
      isOpen: false,
      imageIndex: 0
    });
  };

  const nextLightboxImage = () => {
    if (!lightboxState.item) return;
    const imagesList = lightboxState.item.images && lightboxState.item.images.length > 0 
      ? lightboxState.item.images 
      : [lightboxState.item.image];
    setLightboxState((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % imagesList.length
    }));
  };

  const prevLightboxImage = () => {
    if (!lightboxState.item) return;
    const imagesList = lightboxState.item.images && lightboxState.item.images.length > 0 
      ? lightboxState.item.images 
      : [lightboxState.item.image];
    setLightboxState((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + imagesList.length) % imagesList.length
    }));
  };

  return (
    <section id="portfolio" className="scroll-mt-24 bg-slate-50/50 dark:bg-slate-900/20 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Verified Client Productions &amp; High-End Prints</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Completed Projects Showcase
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            Explore authentic, uncompressed physical assets produced for leading international organizations, tech giants, financial institutions, and corporate enterprises across Westlands &amp; Nairobi.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((p) => {
            const allImages = p.images && p.images.length > 0 ? p.images : [p.image];
            const hasMultipleImages = allImages.length > 1;
            const currentIndex = activeImageIndexes[p.id] || 0;
            const currentDisplayImage = allImages[currentIndex] || p.image;

            return (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with preserved aspect ratio */}
                <div 
                  className="h-64 sm:h-72 relative bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(p, currentIndex)}
                >
                  <img
                    src={currentDisplayImage}
                    alt={`${p.title} - ${p.category} print production in Westlands Nairobi | SmartPrints Hub`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-slate-900/85 text-white text-[10px] font-bold font-mono uppercase px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                      {p.category}
                    </span>
                    {p.badge && (
                      <span className="bg-blue-600/90 text-white text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded-full backdrop-blur-md">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Expand / Lightbox Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(p, currentIndex);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity z-10 shadow"
                    title="View Full Size Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Multi-Image Controls */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(p.id, allImages.length, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all z-10 shadow"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(p.id, allImages.length, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all z-10 shadow"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Pagination Indicator / Thumbnails */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md z-10 border border-white/10">
                        <Layers className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] font-mono text-white font-semibold">
                          {currentIndex + 1} / {allImages.length} Assets
                        </span>
                        <div className="flex gap-1 ml-1">
                          {allImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndexes((prev) => ({ ...prev, [p.id]: idx }));
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentIndex === idx ? "bg-blue-400 scale-110" : "bg-white/40 hover:bg-white/70"
                              }`}
                              aria-label={`Show image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {p.client && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{p.client}</span>
                      </div>
                    )}
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Multi-Photo Switcher Bar if multiple images */}
                  {hasMultipleImages && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Gallery Views:
                      </span>
                      <div className="flex gap-1.5">
                        {allImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndexes((prev) => ({ ...prev, [p.id]: idx }))}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                              currentIndex === idx
                                ? "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                          >
                            View {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxState.isOpen && lightboxState.item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div 
              className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-white/10 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">
                  {lightboxState.item.title}
                </h4>
                {lightboxState.item.client && (
                  <p className="text-xs text-blue-400 font-mono">
                    Client: {lightboxState.item.client}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {lightboxState.item.images && lightboxState.item.images.length > 1 && (
                  <span className="text-xs font-mono text-slate-400">
                    Image {lightboxState.imageIndex + 1} of {lightboxState.item.images.length}
                  </span>
                )}
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close image viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage Image */}
            <div 
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImages = lightboxState.item.images && lightboxState.item.images.length > 0 
                  ? lightboxState.item.images 
                  : [lightboxState.item.image];
                const activeImg = currentImages[lightboxState.imageIndex] || lightboxState.item.image;

                return (
                  <img
                    src={activeImg}
                    alt={lightboxState.item.title}
                    className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                );
              })()}

              {/* Prev & Next in Lightbox */}
              {lightboxState.item.images && lightboxState.item.images.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-all border border-white/10 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-all border border-white/10 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div 
              className="w-full max-w-3xl text-center text-xs sm:text-sm text-slate-300 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <p>{lightboxState.item.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
