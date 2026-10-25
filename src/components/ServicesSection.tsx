import React, { useState } from "react";
import { 
  Palette, 
  Printer, 
  Camera, 
  ContactRound, 
  BookOpen, 
  FileSpreadsheet, 
  Flag, 
  Compass, 
  Sparkles, 
  Maximize, 
  Shirt, 
  ShieldCheck, 
  Users2, 
  Layers, 
  Briefcase, 
  Award, 
  FileText, 
  TrendingUp, 
  Fingerprint, 
  Globe, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { SERVICES_LIST } from "../data";
import { PrintService } from "../types";

interface ServicesSectionProps {
  onSelectForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "printing", label: "Commercial Printing" },
    { id: "signage", label: "Signage & Displays" },
    { id: "apparel", label: "Branded Apparel" },
    { id: "packaging", label: "Packaging & Labels" },
    { id: "branding", label: "Promotional Gifts" },
    { id: "cyber", label: "Cyber & Visa Desk" }
  ];

  const filteredServices = SERVICES_LIST.filter(s => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "ContactRound": return <ContactRound className="w-5 h-5" />;
      case "Palette": return <Palette className="w-5 h-5" />;
      case "BookOpen": return <BookOpen className="w-5 h-5" />;
      case "FileSpreadsheet": return <FileSpreadsheet className="w-5 h-5" />;
      case "Printer": return <Printer className="w-5 h-5" />;
      case "Flag": return <Flag className="w-5 h-5" />;
      case "Compass": return <Compass className="w-5 h-5" />;
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      case "Maximize": return <Maximize className="w-5 h-5" />;
      case "Shirt": return <Shirt className="w-5 h-5" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5" />;
      case "Users2": return <Users2 className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Briefcase": return <Briefcase className="w-5 h-5" />;
      case "Award": return <Award className="w-5 h-5" />;
      case "FileText": return <FileText className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "Fingerprint": return <Fingerprint className="w-5 h-5" />;
      case "Camera": return <Camera className="w-5 h-5" />;
      case "Globe": return <Globe className="w-5 h-5" />;
      default: return <Printer className="w-5 h-5" />;
    }
  };

  return (
    <div id="services-catalog" className="w-full text-left space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Production Catalog & Capabilities
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Commercial Printing, Signage & Apparel
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          High-resolution output, custom finishing, and industrial precision under one roof at Westlands Market.
        </p>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>
                {service.highlight ? (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {service.highlight}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {service.category}
                  </span>
                )}
              </div>

              <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {service.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-4">
                {service.description}
              </p>

              {/* Specs & Popular Finishing */}
              {service.specs && service.specs.length > 0 && (
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-4">
                  {service.specs.slice(0, 3).map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="text-blue-500 dark:text-blue-400 font-bold shrink-0">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              )}

              {service.popularFinishing && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-4">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Finishing: </span>
                  <span>{service.popularFinishing}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Starting Rate
                </span>
                <span className="text-sm font-display font-black text-slate-900 dark:text-white">
                  {service.startingPrice}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectForQuote(service.id)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider transition-colors text-center cursor-pointer"
                >
                  Configure Quote
                </button>
                <a
                  href={`https://wa.me/254743603068?text=Hello%20Smart%20Printers%20Hub,%20I'd%20like%20to%20inquire%20about%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#003B9C] hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
