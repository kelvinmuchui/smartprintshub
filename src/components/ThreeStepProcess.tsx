import React from "react";
import { 
  SlidersHorizontal, 
  UploadCloud, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck 
} from "lucide-react";

interface ThreeStepProcessProps {
  onStartClick: () => void;
  onUploadClick: () => void;
}

export const ThreeStepProcess: React.FC<ThreeStepProcessProps> = ({
  onStartClick,
  onUploadClick
}) => {
  const steps = [
    {
      num: "01",
      title: "Choose & Customise",
      tagline: "Instant Configuration",
      desc: "Select your desired print item, paper weight (80gsm–400gsm), and surface finishes like soft-touch matte, spot UV, or hot foil stamping.",
      icon: <SlidersHorizontal className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      actionText: "Open Instant Calculator",
      onAction: onStartClick,
      badges: ["Instant Pricing", "Bulk Tier Savings"]
    },
    {
      num: "02",
      title: "Upload Artwork or Get Support",
      tagline: "Pre-Press File Audit",
      desc: "Drag and drop your print-ready PDF, AI, or PSD. Our Westlands pre-press team performs a complimentary 3mm bleed, 300 DPI, and CMYK color check.",
      icon: <UploadCloud className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      actionText: "View Pre-Press Guide",
      onAction: onUploadClick,
      badges: ["Free Pre-Flight Check", "CMYK Validation"]
    },
    {
      num: "03",
      title: "We Print & Deliver Nationwide",
      tagline: "Doorstep Fulfillment",
      desc: "High-density digital presses bring your designs to life. Dispatched within 1–2 hours across Westlands or overnight to any of Kenya's 47 counties.",
      icon: <Truck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      actionText: "WhatsApp Order Desk",
      onAction: () => window.open("https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I%20want%20to%20place%20an%20order.", "_blank"),
      badges: ["Same-Day in Westlands", "47-County Courier"]
    }
  ];

  return (
    <div className="w-full text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Frictionless Ordering Workflow
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            From Your Idea to Your Doorstep in 3 Steps
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          Simple, transparent, and accelerated production designed for busy professionals, agencies, and event coordinators.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="group relative p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Ambient subtle hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

            <div>
              {/* Step indicator top row */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <span className="text-3xl font-display font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500/30 transition-colors font-mono">
                  {step.num}
                </span>
              </div>

              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                {step.tagline}
              </span>

              <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {step.badges.map((b, i) => (
                  <span 
                    key={i}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={step.onAction}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#003B9C] hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#003B9C] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
            >
              <span>{step.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeStepProcess;
