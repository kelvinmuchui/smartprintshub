import React, { useState } from "react";
import { Phone, MessageSquare, X, Sparkles } from "lucide-react";

export const FloatingWhatsAppCTA: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-end gap-2">
      {/* Speech bubble tooltip */}
      {showTooltip && (
        <div className="relative mb-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-xl max-w-[210px] text-left hidden sm:block">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
              Live at Shop A11
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-tight">
            Chat directly with our master printer for instant custom quotes & proofs!
          </p>
        </div>
      )}

      {/* Pulsing button anchor */}
      <div className="relative">
        {/* Expanding halo ripple */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ring-expand pointer-events-none" />

        <a
          href="https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I'd%20like%20to%20get%20an%20instant%20quote%20for%20printing."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 animate-whatsapp-pulse cursor-pointer group"
          title="Direct WhatsApp Chat with SmartPrints Hub"
        >
          <Phone className="w-6 h-6 fill-current text-white group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsAppCTA;
