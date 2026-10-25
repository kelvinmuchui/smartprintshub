import React from "react";
import { Clock, ShieldCheck, Truck, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { TRUST_PILLARS } from "../data";

interface TrustPillarsProps {
  onQuoteClick: () => void;
}

export const TrustPillars: React.FC<TrustPillarsProps> = ({ onQuoteClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Phone":
        return <MessageSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Why Westlands & Nairobi Choose Us
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            The SmartPrints Quality Guarantee
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Commercial offset fidelity, automated pre-press proofing, and fast-track courier delivery across all 47 counties.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TRUST_PILLARS.map((pillar) => (
          <div
            key={pillar.id}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(pillar.iconName)}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {pillar.tagline}
                </span>
              </div>

              <h4 className="text-base font-display font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {pillar.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 font-mono">
              <span>Verified Standard</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal">Active Today</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustPillars;
