import React, { useState } from "react";
import { 
  FileCheck, 
  Crop, 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Download,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";
import { ARTWORK_GUIDELINES } from "../data";

export const ArtworkPrepressGuide: React.FC = () => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    bleed: true,
    cmyk: true,
    dpi: true,
    fonts: false,
    margins: true
  });

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const isAllReady = completedCount === totalCount;

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    if ("dataTransfer" in e) {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        file = e.dataTransfer.files[0];
      }
    } else if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
    }

    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type || file.name.split(".").pop()?.toUpperCase() || "Document"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-lg text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Pre-Press & Production Standards
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Artwork Preparation & Print-Ready Guide
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          Follow our exact specifications to prevent misaligned cuts, color shifts, and pixelated prints on our laser and offset presses.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Bleed Diagram + Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Diagram: Bleed, Trim & Safe Zones */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center justify-between">
              <span>Visual Anatomy of a Print File</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-sans font-bold">Standard 3mm Bleed Rule</span>
            </h4>

            {/* Interactive Graphic Representation */}
            <div className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-red-500/70 bg-red-500/5 flex flex-col items-center justify-center min-h-[220px]">
              {/* Outer Bleed Label */}
              <span className="absolute top-2 left-3 text-[10px] font-mono font-bold uppercase text-red-600 dark:text-red-400">
                Bleed Area (+3mm all edges)
              </span>

              {/* Trim Line */}
              <div className="w-full max-w-md p-5 sm:p-6 rounded-lg border-2 border-slate-800 dark:border-white bg-white dark:bg-slate-900 relative shadow-sm">
                <span className="absolute -top-3 right-4 px-2 py-0.5 bg-slate-850 text-white dark:bg-white dark:text-slate-900 text-[9px] font-mono font-bold uppercase rounded">
                  Trim Line (Guillotine Cut)
                </span>

                {/* Safe Zone */}
                <div className="p-4 sm:p-6 rounded border border-dashed border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 text-center">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                    Safe Margin Zone (4mm inside trim)
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-medium">
                    Keep all logos, contact numbers, text & QR codes inside here!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-red-500 font-bold block">Bleed: +3mm</span>
                <span className="text-[10px] text-slate-400">Extends to edge</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-800 dark:text-slate-200 font-bold block">Trim: Cut Line</span>
                <span className="text-[10px] text-slate-400">Physical page size</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-blue-500 font-bold block">Safety: -4mm</span>
                <span className="text-[10px] text-slate-400">Never gets clipped</span>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars of Artwork */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTWORK_GUIDELINES.requirements.map((req, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-xs font-display font-bold text-slate-900 dark:text-white mb-1.5">
                    {req.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Accepted Formats */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Accepted File Formats
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ARTWORK_GUIDELINES.acceptedFormats.map((fmt) => (
                <div 
                  key={fmt.ext}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 text-xs"
                >
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 block">{fmt.ext}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{fmt.bestFor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preflight Checklist & File Test (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preflight Checklist Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-sm font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                Pre-Flight Artwork Checklist
              </h4>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isAllReady ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
              }`}>
                {completedCount} of {totalCount} Ready
              </span>
            </div>

            <div className="space-y-3">
              {[
                { id: "bleed", label: "3mm Bleed included beyond cut border" },
                { id: "margins", label: "4mm Safe Margin maintained inside cut line" },
                { id: "cmyk", label: "Color Space set to CMYK (not RGB)" },
                { id: "dpi", label: "Images & textures are at least 300 DPI" },
                { id: "fonts", label: "All fonts converted to outlines / vector curves" }
              ].map(item => (
                <label 
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    checklist[item.id] ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-slate-600"
                  }`}>
                    {checklist[item.id] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={checklist[item.id] ? "font-semibold text-slate-900 dark:text-white" : ""}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className={`text-xs font-sans ${isAllReady ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-500"}`}>
                {isAllReady 
                  ? "✓ Your artwork conforms to commercial press tolerances!" 
                  : "Tip: Convert all type to outlines before exporting your final PDF."}
              </p>
            </div>
          </div>

          {/* Quick Dropzone Checker */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850/50 text-center hover:border-blue-500 transition-colors"
          >
            <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Test / Inspect Artwork File
            </h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 max-w-xs mx-auto">
              Drag & drop your PDF, AI, PSD, or PNG here for a local inspection check
            </p>

            <input 
              type="file" 
              id="file-preflight-input"
              className="hidden" 
              onChange={handleFileDrop}
              accept=".pdf,.ai,.psd,.svg,.tiff,.png,.jpg,.jpeg"
            />
            <label
              htmlFor="file-preflight-input"
              className="inline-block px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-colors"
            >
              Select Artwork File
            </label>

            {uploadedFile && (
              <div className="mt-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{uploadedFile.name}</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Checked</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  <span>Size: {uploadedFile.size}</span> · <span>Type: {uploadedFile.type}</span>
                </div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 pt-1 font-medium">
                  Ready to print at Westlands Shop A11! Attach with your WhatsApp order.
                </div>
              </div>
            )}
          </div>

          {/* Complimentary Prepress Assistance */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Need Help Fixing Artwork?</span>
              <p className="text-[11px] text-blue-900/80 dark:text-blue-300 leading-relaxed">
                Don't worry if your file lacks bleed or needs vector cleanup. Our Westlands on-site graphic artists offer complimentary pre-press setup for all orders!
              </p>
              <a 
                href="https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I%20need%20assistance%20preparing%20my%20artwork%20for%20printing."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 hover:underline pt-1"
              >
                <span>Ask a Designer on WhatsApp</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArtworkPrepressGuide;
