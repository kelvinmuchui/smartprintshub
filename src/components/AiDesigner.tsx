import React, { useState } from "react";
import { Sparkles, ArrowRight, Lightbulb, RefreshCw, Palette, Type, Layers, Check } from "lucide-react";
import { AIDesignSuggestion } from "../types";

export default function AiDesigner() {
  const [productType, setProductType] = useState("Corporate Flyer");
  const [industry, setIndustry] = useState("Restaurant / Catering");
  const [keywords, setKeywords] = useState("Fresh, Organic, Premium, High Contrast");
  const [alignmentStyle, setAlignmentStyle] = useState("Modern & Bold");
  const [specialRequests, setSpecialRequests] = useState("Please suggest a layout for Westlands business launch.");
  
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AIDesignSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("/api/ai-designer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType,
          industry,
          keywords,
          alignmentStyle,
          specialRequests
        })
      });

      const data = await resp.json();
      if (data.success) {
        setSuggestion(data);
      } else {
        throw new Error(data.message || "Failed to process artificial layout parameters");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred with Westlands Gemini servers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 lg:p-10 relative overflow-hidden">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-700/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header descriptor */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-700/10 text-slate-800 dark:text-slate-200 text-xs font-bold font-sans uppercase mb-3 border border-slate-200 dark:border-slate-800">
          <Sparkles className="w-4 h-4 text-[#003B9C]" />
          <span>Gemini AI Design Assistant Studio</span>
        </div>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Co-Create Visual Layouts with AI
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
          Instantly formulate exact typography pairings, luxury color palettes, and structured pre-press grids tailored for high-speed laser cutting before uploading final graphics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Parametric Inputs form */}
        <form onSubmit={handleGenerateDesign} className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-150/70 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Design Blueprints Spec</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Product Format</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-lg text-slate-800 dark:text-white"
            >
              <option value="Corporate Flyer">Premium Corporate Flyer (A5/A4)</option>
              <option value="Executive Business Cards">Spot-UV Matte Business Cards</option>
              <option value="Roll-up Direct Banner">Satin Teardrop Roll-up Banner</option>
              <option value="Food Menu booklet">Multi-page Booklet Food Menu</option>
              <option value="Waterproof adhesive labels">Waterproof Round Vinyl Sticker Logos</option>
              <option value="Packaging Sleeve">Retail Foldable Packaging Box Sleeve</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Business Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Westlands Gourmet Café, IT Consulting"
              className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-lg text-slate-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Mood Keywords / Styling Tag</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Luxurious, Gold trims, High-entropy green, Tech"
              className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-lg text-slate-800 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Visual Tone</label>
              <select
                value={alignmentStyle}
                onChange={(e) => setAlignmentStyle(e.target.value)}
                className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-lg text-slate-800 dark:text-white"
              >
                <option value="Minimalist Swiss">Minimalist Swiss / Sans</option>
                <option value="Elite Gold Accented">Elite Gold Accented</option>
                <option value="Techno Grid (Brutalist)">Techno Brutalist (Framer-like)</option>
                <option value="High Contrast Eco">High Contrast Lively Green</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Westlands Standard</label>
              <span className="block text-xs text-center p-2.5 bg-blue-50 dark:bg-blue-950/20 text-blue-600 font-bold border border-blue-100 rounded-lg">
                Shop A11 Pre-Checked
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Special Layout Copy / Requests</label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Place logo in the center bottom with custom WhatsApp links..."
              className="w-full text-xs p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-lg text-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-[#28A745] hover:opacity-90 text-white font-sans font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                <span>AI Designing Live...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5" />
                <span>Formulate Design Blueprint</span>
              </>
            )}
          </button>
        </form>

        {/* Outputs / Suggestions Block */}
        <div className="lg:col-span-7 h-full flex flex-col justify-start">
          {suggestion ? (
            <div className="space-y-6">
              
              {/* Output Header */}
              <div className="p-5 bg-gradient-to-tr from-[#003B9C] to-slate-950 text-white rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
                <span className="text-[9px] uppercase tracking-widest bg-yellow-400 text-slate-950 font-black px-2 py-0.5 rounded font-mono">
                  SmartPrints AI suggestion
                </span>
                <h4 className="text-xl font-display font-black tracking-tight mt-2">
                  {suggestion.titleSuggestion}
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  Engineered specifically for pre-press cutting margins and high-gloss laser offset presses.
                </p>
              </div>

              {/* Bento Grid layout suggestion contents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Palette */}
                <div className="bg-[#F8F9FA] dark:bg-slate-850 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase mb-2 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-blue-500" /> Color Spec Palette
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestion.colorPalette.map((col, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-lg shadow-inner flex items-center justify-center text-[9px] font-bold"
                          style={{ backgroundColor: col.hex }}
                        >
                          <span className={col.textClass}>AA</span>
                        </div>
                        <span className="text-[10px] text-slate-700 dark:text-slate-300 mt-1 block truncate w-full text-center font-bold">
                          {col.name}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono block">{col.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Typography combinations */}
                <div className="bg-[#F8F9FA] dark:bg-slate-850 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase mb-2 flex items-center gap-1">
                    <Type className="w-3.5 h-3.5 text-blue-500" /> Typography Pairings
                  </span>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-mono">HEADER ACCENT</span>
                      <span className="text-sm font-display font-bold text-slate-850 dark:text-white">
                        {suggestion.typographyCombination.heading}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-mono">BODY READABILITY</span>
                      <span className="text-xs font-sans text-slate-600 dark:text-slate-350">
                        {suggestion.typographyCombination.body}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Layout steps timeline block */}
              <div className="bg-[#F8F9FA] dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block uppercase mb-3 text-left">
                  Visual Layout Grid Structure
                </span>
                <div className="space-y-3">
                  {suggestion.layoutStructure.map((grid, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="w-5 h-5 bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-850 dark:text-white block">
                          {grid.step}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {grid.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety suggestions list */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/30 rounded-xl">
                <span className="text-[10px] text-blue-700 dark:text-blue-400 font-bold tracking-wider uppercase block mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> High-End Printing Margin Guidelines
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {suggestion.suggestions.map((sug, idx) => (
                    <li key={idx} className="flex gap-2">
                       <span className="text-blue-500 font-bold">✓</span>
                       <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl h-full min-h-[300px] text-center bg-slate-50/50 dark:bg-slate-900/40">
              <div className="w-16 h-16 rounded-2xl gradient-bg text-white flex items-center justify-center shadow-lg shadow-blue-500/10 mb-5 relative">
                <Sparkles className="w-8 h-8 animate-pulse" />
                <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white absolute -top-1 -right-1 animate-ping" />
              </div>
              <h4 className="text-lg font-display font-black text-slate-850 dark:text-white mb-2">
                Awaiting Specifications Input
              </h4>
              <p className="text-slate-400 text-xs max-w-sm mb-6 leading-relaxed">
                Provide custom layout details or utilize our pre-selected restaurant format, then tap the button to formulate precise visual alignments.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 text-[10px] text-slate-400 rounded-full font-mono">
                  3mm bleed safety preset
                </span>
                <span className="px-3 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 text-[10px] text-slate-400 rounded-full font-mono">
                  RGB-to-CMYK conversion check
                </span>
                <span className="px-3 py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 text-[10px] text-slate-400 rounded-full font-mono">
                  350gsm matte paper auto-calibration
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
