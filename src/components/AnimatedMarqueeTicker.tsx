import React from "react";
import { 
  Zap, 
  Printer, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Sparkles, 
  Shirt, 
  Layers, 
  Award, 
  CheckCircle2, 
  MapPin 
} from "lucide-react";

export const AnimatedMarqueeTicker: React.FC = () => {
  const track1 = [
    { icon: <Clock className="w-3.5 h-3.5 text-blue-400" />, text: "Same-Day Express Dispatch in Westlands" },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: "300 DPI Pre-Press Proofing Guarantee" },
    { icon: <Printer className="w-3.5 h-3.5 text-cyan-400" />, text: "Executive Business Cards on 300gsm Silk Artboard" },
    { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, text: "Heavy Teardrop Roll-up Banners & Teardrop Flags" },
    { icon: <Truck className="w-3.5 h-3.5 text-indigo-400" />, text: "47-County Nationwide Doorstep Courier" },
    { icon: <Sparkles className="w-3.5 h-3.5 text-pink-400" />, text: "Soft-Touch Velvet Lamination & Spot UV" },
    { icon: <MapPin className="w-3.5 h-3.5 text-blue-400" />, text: "Westlands Market Shop A11 Walk-Ins Welcome" }
  ];

  const track2 = [
    { icon: <Shirt className="w-3.5 h-3.5 text-emerald-400" />, text: "Screen-Printed T-Shirts & Embroidered Polos" },
    { icon: <Layers className="w-3.5 h-3.5 text-blue-400" />, text: "Waterproof Die-Cut Vinyl Stickers & Labels" },
    { icon: <Award className="w-3.5 h-3.5 text-amber-400" />, text: "Laser-Engraved Matte Black Thermal Flasks" },
    { icon: <Printer className="w-3.5 h-3.5 text-cyan-400" />, text: "A0, A1 & A2 Architectural Blueprint Plotting" },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: "High-Visibility Branded Reflector Safety Jackets" },
    { icon: <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />, text: "NCR Carbonless Duplicate Receipt & Invoice Books" },
    { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, text: "Instant WhatsApp Quotation Desk: +254 743 603 068" }
  ];

  return (
    <div className="w-full overflow-hidden py-3 bg-slate-950 text-slate-200 border-y border-slate-900 select-none space-y-2">
      {/* Top Track (Moving Left) */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap text-xs font-mono">
          {[...track1, ...track1].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
              {item.icon}
              <span className="font-semibold tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track (Moving Right / Reverse) */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee-reverse flex items-center gap-6 whitespace-nowrap text-xs font-mono">
          {[...track2, ...track2].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-850 text-slate-300">
              {item.icon}
              <span className="font-medium tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedMarqueeTicker;
