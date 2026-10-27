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
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  LayoutGrid
} from "lucide-react";
import { SERVICES_LIST } from "../data";
import { PrintService } from "../types";

interface ServicesSectionProps {
  onSelectForQuote: (serviceId: string) => void;
}

interface BizCardSubtype {
  id: string;
  name: string;
  badge: string;
  desc: string;
  specs: string[];
  finishing: string;
}

const BIZ_CARD_SUBTYPES: BizCardSubtype[] = [
  {
    id: "standard",
    name: "Standard 300gsm Silk",
    badge: "Essential",
    desc: "Crisp 1200 DPI double-sided print on 300gsm smooth silk artboard. Clean square cut or 3mm rounded corners.",
    specs: ["Stock: 300gsm Silk Artboard", "Double-Sided Full CMYK", "Same-Day (2-4 hrs)"],
    finishing: "Smooth Uncoated or Light Silk Varnish"
  },
  {
    id: "laminated",
    name: "Matte / Gloss Laminated",
    badge: "Most Popular",
    desc: "300gsm heavy artboard sealed with waterproof anti-scuff thermal matte or high-contrast gloss film.",
    specs: ["Stock: 300gsm Heavy Artboard", "Waterproof Thermal Film", "Same-Day (3-4 hrs)"],
    finishing: "Thermal Matte or High-Gloss Lamination"
  },
  {
    id: "velvet",
    name: "Velvet Soft-Touch Luxury",
    badge: "Premium Feel",
    desc: "300gsm silk cardstock with tactile suede peach-skin feel, zero glare and zero fingerprints.",
    specs: ["Stock: 300gsm Heavy Cardstock", "Suede Peach-Skin Texture", "24 Hours Dispatch"],
    finishing: "Ultra-Matte Velvet Soft-Touch Skin"
  },
  {
    id: "spot-uv",
    name: "Spot UV & Metallic Foil",
    badge: "VIP Elite",
    desc: "Raised 3D glossy clear varnish highlights on logo or reflective genuine gold/silver stamping.",
    specs: ["Stock: 300gsm Heavyweight Artboard", "Raised 3D Varnish / Gold Foil", "24–48 Hours Dispatch"],
    finishing: "Raised 3D Spot UV or Gold/Silver Foil"
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [bizCardTypeIndex, setBizCardTypeIndex] = useState<number>(0);
  const [showAllBizCardTypes, setShowAllBizCardTypes] = useState<boolean>(false);

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
          <h3 className="text-2xl sm:text-3xl font-display font-black text-black dark:text-white uppercase tracking-tight">
            Commercial Printing, Signage & Apparel
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-black dark:text-slate-200 font-sans max-w-sm font-medium">
          High-resolution output, custom finishing, and industrial precision under one roof at Westlands Market.
        </p>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-white dark:bg-slate-900 text-black dark:text-white shadow-sm font-bold"
                : "text-slate-800 dark:text-slate-300 hover:text-black dark:hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const isBizCards = service.id === "biz-cards";
          const currentBizType = BIZ_CARD_SUBTYPES[bizCardTypeIndex];

          return (
            <div
              key={service.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between group ${
                isBizCards ? "border-blue-300 dark:border-blue-700/80 shadow-md ring-1 ring-blue-500/10" : "border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {isBizCards ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                        {showAllBizCardTypes ? "All 4 Types" : `Type ${bizCardTypeIndex + 1}/4`}
                      </span>
                    </div>
                  ) : service.highlight ? (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {service.highlight}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-800 font-bold">
                      {service.category}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-display font-black text-black dark:text-white mb-2 leading-tight flex items-center justify-between">
                  <span>{service.title}</span>
                  {isBizCards && (
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                      300gsm Standard
                    </span>
                  )}
                </h4>

                {/* SPECIAL CASE: BUSINESS CARDS SINGLE TYPE SLIDER & VIEW ALL */}
                {isBizCards ? (
                  <div className="space-y-3 mb-4">
                    {/* Slider Navigation Bar */}
                    <div className="flex items-center justify-between p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                        {BIZ_CARD_SUBTYPES.map((bt, idx) => (
                          <button
                            key={bt.id}
                            type="button"
                            onClick={() => {
                              setBizCardTypeIndex(idx);
                              setShowAllBizCardTypes(false);
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                              !showAllBizCardTypes && bizCardTypeIndex === idx
                                ? "bg-[#003B9C] text-white shadow-xs"
                                : "text-slate-800 dark:text-slate-400 hover:text-black font-semibold"
                            }`}
                          >
                            {bt.name.replace(" 300gsm Silk", "")}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 shrink-0 pl-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllBizCardTypes(false);
                            setBizCardTypeIndex((prev) => (prev > 0 ? prev - 1 : BIZ_CARD_SUBTYPES.length - 1));
                          }}
                          aria-label="Previous Card Type"
                          className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllBizCardTypes(false);
                            setBizCardTypeIndex((prev) => (prev < BIZ_CARD_SUBTYPES.length - 1 ? prev + 1 : 0));
                          }}
                          aria-label="Next Card Type"
                          className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {!showAllBizCardTypes ? (
                      /* SINGLE TYPE SPOTLIGHT VIEW */
                      <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-black dark:text-white">
                            {currentBizType.name}
                          </span>
                          <span className="text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                            {currentBizType.badge}
                          </span>
                        </div>
                        <p className="text-xs text-black dark:text-slate-200 leading-relaxed font-sans font-medium">
                          {currentBizType.desc}
                        </p>
                        <div className="space-y-1 pt-1.5 border-t border-blue-200/60 dark:border-blue-900/50">
                          {currentBizType.specs.map((sp, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-black dark:text-slate-200 font-sans font-semibold">
                              <span className="text-blue-600 font-bold shrink-0">✓</span>
                              <span>{sp}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-slate-900 dark:text-slate-300 pt-1 font-medium">
                          <span className="font-bold text-black dark:text-white">Finishing: </span>
                          <span>{currentBizType.finishing}</span>
                        </div>

                        {/* View all button */}
                        <button
                          type="button"
                          onClick={() => setShowAllBizCardTypes(true)}
                          className="w-full mt-2 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-blue-200 dark:border-blue-900 cursor-pointer"
                        >
                          <LayoutGrid className="w-3 h-3" />
                          <span>View All 4 Card Types</span>
                        </button>
                      </div>
                    ) : (
                      /* EXPANDED VIEW: ALL 4 TYPES */
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-slate-700 dark:text-slate-300">Comparing All 4 Finishes:</span>
                          <button
                            type="button"
                            onClick={() => setShowAllBizCardTypes(false)}
                            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <SlidersHorizontal className="w-3 h-3" />
                            <span>Slider View</span>
                          </button>
                        </div>
                        {BIZ_CARD_SUBTYPES.map((bt) => (
                          <div 
                            key={bt.id} 
                            onClick={() => {
                              setBizCardTypeIndex(BIZ_CARD_SUBTYPES.findIndex(b => b.id === bt.id));
                              setShowAllBizCardTypes(false);
                            }}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 hover:border-blue-400 cursor-pointer transition-all"
                          >
                            <div className="flex items-center justify-between text-xs font-bold mb-1 text-slate-900 dark:text-white">
                              <span>{bt.name}</span>
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                {bt.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-black dark:text-slate-300 leading-snug font-medium">{bt.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* STANDARD SERVICE CARD PRESENTATION */
                  <>
                    <p className="text-xs text-black dark:text-slate-200 leading-relaxed font-sans mb-4 font-medium">
                      {service.description}
                    </p>

                    {/* Specs & Popular Finishing */}
                    {service.specs && service.specs.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-4">
                        {service.specs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-black dark:text-slate-200 font-sans font-semibold">
                            <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">✓</span>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {service.popularFinishing && (
                      <div className="text-[11px] text-slate-900 dark:text-slate-300 font-sans mb-4 font-medium">
                        <span className="font-bold text-black dark:text-white">Finishing: </span>
                        <span>{service.popularFinishing}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Custom Quote</span>
                </span>
                <span className="text-slate-800 dark:text-slate-400 font-bold">Free Pre-Press Check</span>
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
        );
      })}
      </div>
    </div>
  );
};

export default ServicesSection;
