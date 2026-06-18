import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, ChevronRight, Loader2, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { QuoteRequestForm, TrackingStatus } from "../types";

interface ArtworkUploaderProps {
  onSuccess: (order: TrackingStatus) => void;
  setTab: (tab: string) => void;
}

export default function ArtworkUploader({ onSuccess, setTab }: ArtworkUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productType, setProductType] = useState("Executive Business Cards");
  const [quantity, setQuantity] = useState(250);
  const [paperType, setPaperType] = useState("350gsm-matte-art");
  const [finishing, setFinishing] = useState("matte-lamination");
  const [specs, setSpecs] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !productType) {
      setError("Please fill in all core fields (Name, Phone, and Product Type)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate file content metadata transfer
      const artworkName = file ? file.name : "No physical file (Manual specifications only)";
      
      const payload = {
        name,
        phone,
        email,
        productType,
        quantity,
        paperType,
        finishing,
        specs: specs || `Paper: ${paperType}, Finishing: ${finishing}. Custom instructions given.`,
        artworkName
      };

      const resp = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      if (resp.ok && data.success) {
        setSuccessCode(data.trackingId);
        onSuccess(data.order);
      } else {
        throw new Error(data.message || "Failed to submit quotation details to Westlands service");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during file recording. Retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 lg:p-10 relative overflow-hidden">
      
      {/* Visual neon circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/5 to-blue-500/5 rounded-full blur-3xl" />

      {successCode ? (
        <div className="text-center py-10 max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">
              Artwork Submitted!
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              We have successfully generated and logged your project quote code in our Westlands Shop A11 mainframe database.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/60 dark:border-slate-800 font-mono">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Your Personal Tracking ID:</span>
            <span className="text-2xl font-bold text-blue-600 block my-1">
              {successCode}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Store this code to live track your layout, printing and package readiness.
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSuccessCode(null);
                setFile(null);
                setName("");
                setPhone("");
                setSpecs("");
              }}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-850 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Submit Another File
            </button>
            <button
              onClick={() => {
                setTab("home");
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full py-3 bg-[#0A1B3D] hover:bg-slate-850 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans uppercase mb-3">
              <Upload className="w-3.5 h-3.5" />
              <span>Westlands Graphic & file Ingress</span>
            </div>
            <h2 className="text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Submit Artworks & Request Quotations
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-2xl">
              Drag-and-drop your print-ready files (PDF, EPS, AI, PSD, JPG, PNG or ZIP) up to 250MB. Our pre-press designer reviews alignment margins, then contacts you on WhatsApp with a mock visual layout review.
            </p>
          </div>

          {error && (
            <div className="p-4 mb-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Submission Error</h4>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* File Drag Drop and upload specs */}
            <div className="lg:col-span-6 space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
                 className={`border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] cursor-pointer transition-all ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/5"
                    : file
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-slate-250 dark:border-slate-800 hover:border-blue-500 hover:bg-slate-50/50 dark:hover:bg-slate-850"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleChange}
                  accept=".pdf,.psd,.ai,.eps,.jpg,.png,.zip"
                  className="hidden"
                />

                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-4 shadow-sm">
                  {file ? <FileText className="w-8 h-8 text-blue-500 animate-pulse" /> : <Upload className="w-8 h-8 text-blue-500" />}
                </div>

                {file ? (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-850 dark:text-white max-w-xs truncate mx-auto">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                    </p>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
                      File Attached Successfully
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-sm font-bold text-slate-850 dark:text-white">
                      Drag & Drop print file here or <span className="text-blue-600 underline">Browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Supports high-fidelity PDF, AI, PSD, EPS, or ZIP folder packaging (Maximum: 250MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Printing requirements selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Paper / Material Stock</label>
                  <select
                    value={paperType}
                    onChange={(e) => setPaperType(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-white"
                  >
                    <option value="350gsm-matte-art">350gsm Premium heavy Art Card</option>
                    <option value="gloss-300-heavy">300gsm Brilliant High gloss Card</option>
                    <option value="conqueror-textured">Conqueror high texture (Ivory / White)</option>
                    <option value="outdoor-banner-vinyl">Waterproof Matte Outdoor banner sheets</option>
                    <option value="transparent-adhesive">Transparent Glossy Adhesive Stickers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">Post-Press Finishing</label>
                  <select
                    value={finishing}
                    onChange={(e) => setFinishing(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-white"
                  >
                    <option value="matte-lamination">Full Matte Velvet lamination protect</option>
                    <option value="gloss-lamination">Brilliant high luster gloss film lamination</option>
                    <option value="raised-spot-uv">Luxury spot raised UV varnishing</option>
                    <option value="gold-foil-press">Heavy heated metallic gold foil stamp</option>
                    <option value="none-raw">Uncoated direct precision contour cut</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-300 border border-blue-100 rounded-xl text-xs flex gap-2">
                <Sparkles className="w-5.5 h-5.5 shrink-0" />
                <span>Our system automatically maps the color models from standard web RGB to professional offset CMYK on receipt of file.</span>
              </div>
            </div>

            {/* Client personal coordinates Form */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-150/70 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Client Contact & Scope Details
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Your Full Name (or Company)*</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kelvin Muchui (Aura Design Ltd)"
                    className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-white focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Active Phone/WhatsApp*</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +254743603068"
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-white focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Select Product Category*</label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-white"
                    >
                      <option value="Executive Business Cards">Executive Business Cards</option>
                      <option value="Premium Marketing Flyers">A5/A4 Marketing Flyers</option>
                      <option value="Durable Roll-Up Banners">Satin Roll-Up Banners</option>
                      <option value="Waterproof Sticker Labels">Die-Cut Vinyl Stickers</option>
                      <option value="Company Invoice Duplicate Pads">Branded Carbon NCR Book</option>
                      <option value="Promotional T-shirt Sublimations">Corporate Apparel / Mug</option>
                      <option value="KRA Return Verification">KRA Returns / Shared Pin Help</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Estimated Unit Volume*</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-white"
                      min={1}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Specific Dimensions / Layout Specs</label>
                  <textarea
                    rows={3}
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                    placeholder="e.g. Standard 90x55mm dimension card, matte duplex print, 2-sided gloss finish. Send visual mockups..."
                    className="w-full text-xs p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-95 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Recording Artwork & Info Metadata...</span>
                    </>
                  ) : (
                    <>
                      <span>Upload & Request Free Quote</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
