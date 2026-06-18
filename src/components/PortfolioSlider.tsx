import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

interface PortfolioSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

export default function PortfolioSlider({
  beforeImage,
  afterImage,
  title,
  description
}: PortfolioSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 shadow-md transition-all">
      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles className="w-4 h-4 text-green-500" />
        <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Interactive Design Slider</span>
      </div>
      
      <h4 className="text-sm font-bold text-slate-850 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{description}</p>

      {/* Comparison visual slider frame container */}
      <div 
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200"
      >
        {/* Underlay / Before Graphic */}
        <div className="absolute inset-0">
          <img 
            src={beforeImage} 
            alt="Before Design layout" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white font-mono text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur">
            Before: Raw layout / Sketch
          </div>
        </div>

        {/* Overlay / After Graphic (clipped width based on position) */}
        <div 
          className="absolute inset-y-0 left-0 right-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={afterImage} 
            alt="After Premium Print" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 right-3 bg-green-600/90 text-white font-mono text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur whitespace-nowrap">
            After: High-Luster Print
          </div>
        </div>

        {/* Slider control handlebar divider separator */}
        <div 
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#003B9C] shadow-lg flex items-center justify-center border-2 border-green-500 hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 text-center font-mono mt-3">
        Drag or swipe visual bar left/right to compare
      </p>
    </div>
  );
}
