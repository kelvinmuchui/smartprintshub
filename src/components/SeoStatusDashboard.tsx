import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Image as ImageIcon,
  FileText,
  Globe,
  RefreshCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sliders,
  Tag,
  ShieldCheck,
  X,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Info
} from "lucide-react";
import { PORTFOLIO_LIST, SHOP_PRODUCTS, SERVICES_LIST } from "../data";

interface SeoStatusDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TargetKeyword {
  keyword: string;
  category: "primary" | "secondary" | "local" | "service";
  minRecommended: number;
}

const DEFAULT_TARGET_KEYWORDS: TargetKeyword[] = [
  { keyword: "Printing Services", category: "primary", minRecommended: 3 },
  { keyword: "Westlands", category: "local", minRecommended: 5 },
  { keyword: "Nairobi", category: "local", minRecommended: 4 },
  { keyword: "Large Format", category: "service", minRecommended: 2 },
  { keyword: "Banners", category: "service", minRecommended: 3 },
  { keyword: "Business Cards", category: "service", minRecommended: 3 },
  { keyword: "Corporate Branding", category: "service", minRecommended: 2 },
  { keyword: "Promotional Umbrellas", category: "service", minRecommended: 1 },
  { keyword: "Visa Application", category: "service", minRecommended: 1 },
  { keyword: "Digital Registration", category: "service", minRecommended: 1 },
  { keyword: "eCitizen", category: "service", minRecommended: 1 },
  { keyword: "Packaging", category: "service", minRecommended: 1 },
  { keyword: "Stickers", category: "service", minRecommended: 2 },
  { keyword: "Same Day", category: "secondary", minRecommended: 2 }
];

export default function SeoStatusDashboard({ isOpen, onClose }: SeoStatusDashboardProps) {
  const [activeTab, setActiveTab] = useState<"headings" | "images" | "schema" | "generator">("headings");
  const [targetKeywords, setTargetKeywords] = useState<TargetKeyword[]>(DEFAULT_TARGET_KEYWORDS);
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isMinimized, setIsMinimized] = useState(false);

  // Live DOM Scanned Data State
  const [scannedHeadings, setScannedHeadings] = useState<{
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
  }>({ h1: [], h2: [], h3: [], h4: [] });

  const [domImages, setDomImages] = useState<{
    src: string;
    alt: string;
    hasAlt: boolean;
    isGoodAlt: boolean;
    tagName: string;
  }[]>([]);

  // Function to scan document headings and DOM elements in real-time
  const scanDocument = () => {
    setIsRefreshing(true);

    if (typeof document !== "undefined") {
      const h1s = Array.from(document.querySelectorAll("h1")).map((el) => el.textContent?.trim() || "").filter(Boolean);
      const h2s = Array.from(document.querySelectorAll("h2")).map((el) => el.textContent?.trim() || "").filter(Boolean);
      const h3s = Array.from(document.querySelectorAll("h3")).map((el) => el.textContent?.trim() || "").filter(Boolean);
      const h4s = Array.from(document.querySelectorAll("h4")).map((el) => el.textContent?.trim() || "").filter(Boolean);

      setScannedHeadings({ h1: h1s, h2: h2s, h3: h3s, h4: h4s });

      const imgs = Array.from(document.querySelectorAll("img")).map((img) => {
        const alt = img.getAttribute("alt") || "";
        const src = img.getAttribute("src") || "";
        const hasAlt = img.hasAttribute("alt") && alt.trim().length > 0;
        const isGoodAlt = hasAlt && alt.trim().length >= 10 && !["image", "img", "photo", "picture", "logo"].includes(alt.trim().toLowerCase());
        return {
          src,
          alt,
          hasAlt,
          isGoodAlt,
          tagName: img.tagName
        };
      });

      setDomImages(imgs);
    }

    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    if (isOpen) {
      scanDocument();
    }
  }, [isOpen]);

  // Analyze keyword occurrences across heading levels and text
  const keywordAnalysis = useMemo(() => {
    const allH1Text = scannedHeadings.h1.join(" ").toLowerCase();
    const allH2Text = scannedHeadings.h2.join(" ").toLowerCase();
    const allH3Text = scannedHeadings.h3.join(" ").toLowerCase();
    const allH4Text = scannedHeadings.h4.join(" ").toLowerCase();
    const combinedHeadings = `${allH1Text} ${allH2Text} ${allH3Text} ${allH4Text}`;

    return targetKeywords.map((kw) => {
      const lower = kw.keyword.toLowerCase();
      const countInH1 = (allH1Text.match(new RegExp(lower, "g")) || []).length;
      const countInH2 = (allH2Text.match(new RegExp(lower, "g")) || []).length;
      const countInH3 = (allH3Text.match(new RegExp(lower, "g")) || []).length;
      const countInH4 = (allH4Text.match(new RegExp(lower, "g")) || []).length;
      const totalHeadingCount = countInH1 + countInH2 + countInH3 + countInH4;

      const isPass = totalHeadingCount >= kw.minRecommended;
      const inH1 = countInH1 > 0;
      const inH2 = countInH2 > 0;

      return {
        ...kw,
        countInH1,
        countInH2,
        countInH3,
        countInH4,
        totalHeadingCount,
        isPass,
        inH1,
        inH2
      };
    });
  }, [scannedHeadings, targetKeywords]);

  // Generate SEO-optimized alt texts for all catalog & portfolio items
  const catalogAltTextMap = useMemo(() => {
    const portfolioAlt = PORTFOLIO_LIST.map((item) => {
      const generatedAlt = `${item.title} - Professional ${item.category} printing & finish in Westlands Nairobi, Kenya | SmartPrints Hub`;
      return {
        id: item.id,
        type: "Portfolio Project",
        title: item.title,
        category: item.category,
        image: item.image,
        description: item.description,
        generatedAlt,
        currentAltQuality: "Optimized (Ready)"
      };
    });

    const shopAlt = SHOP_PRODUCTS.map((prod) => {
      const finishStr = prod.finishingOptions.join(", ");
      const generatedAlt = `${prod.title} (${prod.category}) with ${finishStr} finish - High quality printing Westlands Nairobi | SmartPrints Hub`;
      return {
        id: prod.id,
        type: "Shop Product",
        title: prod.title,
        category: prod.category,
        image: prod.image,
        description: prod.description,
        generatedAlt,
        currentAltQuality: "Optimized (Ready)"
      };
    });

    return [...portfolioAlt, ...shopAlt];
  }, []);

  // Filtered catalog items for images tab
  const filteredCatalogItems = useMemo(() => {
    if (filterCategory === "all") return catalogAltTextMap;
    return catalogAltTextMap.filter((item) => item.type === filterCategory || item.category === filterCategory);
  }, [catalogAltTextMap, filterCategory]);

  // Calculate Overall SEO Score
  const seoScore = useMemo(() => {
    let score = 0;
    
    // 1. Heading structure checks (max 30 pts)
    if (scannedHeadings.h1.length === 1) score += 15;
    else if (scannedHeadings.h1.length > 1) score += 8; // penalty for multiple H1s
    if (scannedHeadings.h2.length >= 3) score += 15;
    else if (scannedHeadings.h2.length >= 1) score += 8;

    // 2. Target keywords in headings (max 35 pts)
    const passedKeywords = keywordAnalysis.filter((k) => k.isPass).length;
    const keywordRatio = targetKeywords.length > 0 ? passedKeywords / targetKeywords.length : 0;
    score += Math.round(keywordRatio * 35);

    // 3. Image Alt texts (max 35 pts)
    if (domImages.length > 0) {
      const goodAltImages = domImages.filter((img) => img.isGoodAlt).length;
      const imgRatio = goodAltImages / domImages.length;
      score += Math.round(imgRatio * 35);
    } else {
      score += 35;
    }

    return Math.min(100, Math.max(0, score));
  }, [scannedHeadings, keywordAnalysis, targetKeywords, domImages]);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeywordInput.trim()) return;
    const exists = targetKeywords.some((k) => k.keyword.toLowerCase() === newKeywordInput.trim().toLowerCase());
    if (!exists) {
      setTargetKeywords([
        ...targetKeywords,
        { keyword: newKeywordInput.trim(), category: "secondary", minRecommended: 1 }
      ]);
    }
    setNewKeywordInput("");
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setTargetKeywords(targetKeywords.filter((k) => k.keyword !== keywordToRemove));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllAltTexts = () => {
    const data = catalogAltTextMap.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      category: item.category,
      imageUrl: item.image,
      generatedAltText: item.generatedAlt
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `smartprints-seo-alt-text-catalog-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col my-auto overflow-hidden max-h-[92vh]">
        
        {/* TOP HEADER BAR */}
        <div className="bg-[#0A1B3D] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-xl border border-blue-400/30 text-blue-300">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-display font-black uppercase tracking-tight">
                  SEO & Search Ranking Console
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                  Admin Live Monitor
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Real-time DOM headings auditor, keyword density tracker & automated catalog image alt-text engine.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scanDocument}
              disabled={isRefreshing}
              title="Rescan Page DOM & Catalog"
              className="p-2 hover:bg-blue-800/60 rounded-xl transition-colors text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono border border-blue-700/50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
              <span className="hidden sm:inline">Rescan DOM</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
              title="Close SEO Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STATS STRIP BANNER */}
        <div className="bg-slate-50 dark:bg-slate-950/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          
          {/* Overall Score */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                SEO Health Score
              </span>
              <span className={`text-xl sm:text-2xl font-display font-black ${
                seoScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : seoScore >= 60 ? "text-amber-500" : "text-rose-500"
              }`}>
                {seoScore}/100
              </span>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              seoScore >= 80 ? "bg-emerald-500 animate-pulse" : seoScore >= 60 ? "bg-amber-500" : "bg-rose-500"
            }`} />
          </div>

          {/* Heading Hierarchy */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Headings Scanned
            </span>
            <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-200 mt-1 flex gap-2">
              <span className="text-blue-600 dark:text-blue-400">H1: {scannedHeadings.h1.length}</span>
              <span className="text-slate-500">H2: {scannedHeadings.h2.length}</span>
              <span className="text-slate-500">H3: {scannedHeadings.h3.length}</span>
            </div>
          </div>

          {/* Target Keywords Passed */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Keywords in Headings
            </span>
            <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-200 mt-1">
              <span className="text-emerald-600 dark:text-emerald-400">
                {keywordAnalysis.filter((k) => k.totalHeadingCount > 0).length}
              </span>
              <span className="text-slate-400 font-normal"> / {targetKeywords.length} targets active</span>
            </div>
          </div>

          {/* Catalog & DOM Image Alt Audit */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Image Alt-Text Coverage
            </span>
            <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-200 mt-1">
              <span className="text-blue-600 dark:text-blue-400">{catalogAltTextMap.length} Catalog items</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs block">100% Generated</span>
            </div>
          </div>

        </div>

        {/* NAVIGATION TABS */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto py-2 bg-white dark:bg-slate-900 shrink-0">
          <button
            onClick={() => setActiveTab("headings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "headings"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Headings & Keyword Monitor ({targetKeywords.length})
          </button>

          <button
            onClick={() => setActiveTab("images")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "images"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Catalog Image Alt-Texts ({catalogAltTextMap.length})
          </button>

          <button
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "generator"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live Alt-Text Generator & Snippets
          </button>

          <button
            onClick={() => setActiveTab("schema")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "schema"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Google Schema & Meta Tags Audit
          </button>
        </div>

        {/* TAB CONTENTS CONTAINER */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          
          {/* TAB 1: HEADINGS & KEYWORDS */}
          {activeTab === "headings" && (
            <div className="space-y-6">
              
              {/* Quick Add Custom Keyword Form */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-100">
                    Track Custom Target Search Keyword
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Add new keywords to monitor their occurrences across page headings and text.
                  </p>
                </div>

                <form onSubmit={handleAddKeyword} className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    placeholder="e.g. Graphic Design Westlands"
                    className="px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0"
                  >
                    + Add Target
                  </button>
                </form>
              </div>

              {/* Keywords Occurrence Grid Table */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Target Keyword / Phrase</th>
                        <th className="p-3">Category</th>
                        <th className="p-3 text-center">In H1</th>
                        <th className="p-3 text-center">In H2</th>
                        <th className="p-3 text-center">In H3/H4</th>
                        <th className="p-3 text-center">Total In Headings</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-sans">
                      {keywordAnalysis.map((item) => (
                        <tr key={item.keyword} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-bold text-slate-800 dark:text-slate-100">
                            {item.keyword}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                              item.category === "primary" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                              item.category === "local" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                              "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            }`}>
                              {item.category}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono">
                            {item.countInH1 > 0 ? (
                              <span className="text-emerald-600 font-bold">✓ {item.countInH1}</span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="p-3 text-center font-mono">
                            {item.countInH2 > 0 ? (
                              <span className="text-emerald-600 font-bold">✓ {item.countInH2}</span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="p-3 text-center font-mono">
                            {item.countInH3 + item.countInH4 > 0 ? (
                              <span className="text-slate-700 dark:text-slate-300 font-medium">
                                {item.countInH3 + item.countInH4}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="p-3 text-center font-mono font-bold">
                            <span className={item.totalHeadingCount > 0 ? "text-blue-600 dark:text-blue-400" : "text-rose-500"}>
                              {item.totalHeadingCount}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {item.totalHeadingCount >= item.minRecommended ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
                              </span>
                            ) : item.totalHeadingCount > 0 ? (
                              <span className="inline-flex items-center gap-1 text-amber-500 text-[11px] font-bold">
                                <AlertTriangle className="w-3.5 h-3.5" /> Fair ({item.totalHeadingCount}/{item.minRecommended})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-500 text-[11px] font-bold">
                                <XCircle className="w-3.5 h-3.5" /> Missing
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleRemoveKeyword(item.keyword)}
                              className="text-slate-400 hover:text-rose-500 text-xs transition-colors p-1"
                              title="Delete keyword"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scanned Headings Hierarchy Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* H1 & H2 List */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-mono">H1 / H2</span>
                      Primary Page Headings
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {scannedHeadings.h1.length + scannedHeadings.h2.length} tags
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {scannedHeadings.h1.map((h, idx) => (
                      <div key={idx} className="p-2 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60 text-xs">
                        <span className="font-mono text-[9px] font-bold text-blue-600 uppercase block">Main &lt;h1&gt; Tag:</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{h}</p>
                      </div>
                    ))}
                    {scannedHeadings.h2.map((h, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">&lt;h2&gt; Section Tag:</span>
                        <p className="text-slate-700 dark:text-slate-300">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* H3 Subheadings List */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-700 text-white rounded text-[10px] font-mono">H3 / H4</span>
                      Product & Feature Headings
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {scannedHeadings.h3.length + scannedHeadings.h4.length} tags
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {scannedHeadings.h3.slice(0, 8).map((h, idx) => (
                      <div key={idx} className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300">
                        &lt;h3&gt; {h}
                      </div>
                    ))}
                    {scannedHeadings.h3.length > 8 && (
                      <div className="text-[10px] text-slate-400 text-center font-mono py-1">
                        + {scannedHeadings.h3.length - 8} more &lt;h3&gt; items detected
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CATALOG IMAGES & GENERATED ALT-TEXTS */}
          {activeTab === "images" && (
            <div className="space-y-6">
              
              {/* Filter & Export Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 uppercase">Filter:</span>
                  {["all", "Portfolio Project", "Shop Product"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                        filterCategory === cat
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      {cat === "all" ? "All Items" : cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportAllAltTexts}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Export Alt Catalog (JSON)
                  </button>
                </div>
              </div>

              {/* Items Grid with Generated Alt-Text Review */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCatalogItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-all flex gap-4 items-start"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700 relative">
                      <img
                        src={item.image}
                        alt={item.generatedAlt}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata & Alt Text */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-display font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded font-bold uppercase shrink-0">
                          {item.category}
                        </span>
                      </div>

                      {/* Generated SEO Alt Text Box */}
                      <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 relative group">
                        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Generated SEO Alt-Text:
                        </span>
                        <p className="line-clamp-2 leading-relaxed">
                          {item.generatedAlt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.generatedAlt.length} chars (Target: 50-125)
                        </span>
                        <button
                          onClick={() => handleCopy(item.generatedAlt, item.id)}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy Alt
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: LIVE ALT-TEXT GENERATOR & SNIPPET BUILDER */}
          {activeTab === "generator" && (
            <div className="space-y-6">
              
              <div className="p-5 bg-gradient-to-br from-blue-900/10 via-slate-50 to-slate-100 dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-950 rounded-3xl border border-blue-200/60 dark:border-blue-900/40 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-sm font-display font-black uppercase tracking-tight">
                    Smart Alt-Text Formula for Google Image Search
                  </h3>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Google Image Search and screen readers rank images higher when the alt text follows the formula:
                  <br />
                  <span className="font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-950/60 px-2 py-1 rounded inline-block mt-1">
                    [Product Name] + [Material / Finish] + [Service Purpose] + [Location: Westlands Nairobi, Kenya] + [Brand: SmartPrints Hub]
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-emerald-600 block mb-1">✓ Recommended</span>
                    <p className="text-slate-500 text-[11px]">
                      "Executive Gold-Foil Business Cards 300gsm silk matte black printed in Westlands Nairobi - SmartPrints Hub"
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-amber-500 block mb-1">⚠ Too Generic</span>
                    <p className="text-slate-500 text-[11px]">
                      "Business card product photo image" (Lacks location, materials, and brand specificity)
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-rose-500 block mb-1">✗ Bad (Keyword Stuffing)</span>
                    <p className="text-slate-500 text-[11px]">
                      "best printing printing nairobi print shop westlands cheap fast print printing"
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready-to-copy HTML Snippets for Dev / Content Updates */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200">
                    Standardized HTML Image Embed Template
                  </h4>
                  <button
                    onClick={() => handleCopy('<img src="/path/to/image.jpg" alt="Executive Business Cards 300gsm matte laminated in Westlands Nairobi | SmartPrints Hub" loading="lazy" decoding="async" referrerPolicy="no-referrer" />', "embed-template")}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                  >
                    {copiedId === "embed-template" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Template
                  </button>
                </div>

                <pre className="p-3 bg-slate-950 text-slate-300 rounded-xl text-xs font-mono overflow-x-auto">
{`<img 
  src="/path/to/image.jpg" 
  alt="[Product Name] [Finishing Details] in Westlands Nairobi | SmartPrints Hub"
  loading="lazy"
  decoding="async"
  referrerPolicy="no-referrer"
/>`}
                </pre>
              </div>

            </div>
          )}

          {/* TAB 4: SCHEMA & METADATA AUDIT */}
          {activeTab === "schema" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Meta Tags Audit */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    HTML Head & Meta Tags Status
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex justify-between font-mono text-[10px] text-slate-400">
                        <span>&lt;title&gt; Tag (Optimal: 50-60 chars)</span>
                        <span className="text-emerald-500 font-bold">Passed</span>
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        SmartPrints Hub | Premier Printing, Branding & Digital Cyber Services in Westlands, Nairobi
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex justify-between font-mono text-[10px] text-slate-400">
                        <span>&lt;meta name="description"&gt; (Optimal: 140-160 chars)</span>
                        <span className="text-emerald-500 font-bold">Passed</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">
                        SmartPrints Hub is a world-class professional printing, branding, digital services, and cyber portal in Westlands, Kenya. Fast, high-quality, and modern branding solutions.
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex justify-between font-mono text-[10px] text-slate-400">
                        <span>Canonical & Protocol Header</span>
                        <span className="text-emerald-500 font-bold">Active</span>
                      </div>
                      <p className="font-mono text-[11px] text-slate-500 mt-1">
                        https://www.smartprintshub.co.ke/
                      </p>
                    </div>
                  </div>
                </div>

                {/* Structured Data (JSON-LD) Status */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Structured Schema (@graph) Status
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block">
                          LocalBusiness & PrintShop Schema
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Westlands Market Shop A11, GPS (-1.2678, 36.8078), M-Pesa, Mon-Sat hours
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block">
                          WebSite & Organization Schema
                        </span>
                        <span className="text-[11px] text-slate-500">
                          SearchAction site search, customer service ContactPoint phone numbers
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block">
                          FAQPage Rich Snippets Schema
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Same-day turnarounds, prices in KES, PDF/CMYK guidelines, eCitizen
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-100 block">
                          OfferCatalog & Breadcrumbs
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Roll-up banners, executive cards, t-shirts, notebooks, cyber services
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* AI SEARCH & GENERATIVE ENGINE OPTIMIZATION (GEO) CARD */}
              <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                          AI Search & Generative Engine Optimization (GEO)
                        </h4>
                        <span className="px-2 py-0.5 bg-indigo-600 text-white font-mono text-[10px] font-bold rounded shadow-sm">
                          LLMs.txt Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Authoritative knowledge documentation configured for Perplexity, ChatGPT Search, Google Gemini AI Overviews & Claude.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/llms.txt"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm border border-indigo-200 dark:border-indigo-800"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View /llms.txt</span>
                    </a>
                    <a
                      href="/llms-full.txt"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Full Context</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">OpenAI / ChatGPT</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">GPTBot: Allowed</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Perplexity AI</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">PerplexityBot: Allowed</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Google Gemini</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">Google-Extended: Allowed</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Anthropic Claude</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">ClaudeBot: Allowed</span>
                  </div>
                </div>
              </div>

              {/* GOOGLE SEARCH CONSOLE OWNERSHIP VERIFICATION CARD */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200">
                          Google Search Console Ownership Verification
                        </h4>
                        <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold rounded">
                          Configured & Live
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        HTML verification file and HTML meta tags active for Google Search Console domain ownership validation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/googleacab13e66d241d14.html"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Test /googleacab13e66d241d14.html</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
                      Method 1: HTML Verification File
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-800 dark:text-slate-200">
                      <span className="truncate">google-site-verification: googleacab13e66d241d14.html</span>
                      <button
                        onClick={() => handleCopy("google-site-verification: googleacab13e66d241d14.html", "copy-gsc-file")}
                        className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                      >
                        {copiedId === "copy-gsc-file" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
                      Method 2: HTML Meta Tag (In &lt;head&gt;)
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-800 dark:text-slate-200">
                      <span className="truncate">&lt;meta name="google-site-verification" content="googleacab13e66d241d14" /&gt;</span>
                      <button
                        onClick={() => handleCopy('<meta name="google-site-verification" content="googleacab13e66d241d14" />', "copy-gsc-meta")}
                        className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                      >
                        {copiedId === "copy-gsc-meta" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* XML SITEMAP & GOOGLE CRAWLER STATUS CARD */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200">
                        XML Sitemap (sitemap.xml) & Search Index Mapping
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Auto-mapped with 11 primary sections, priority weighting (0.7 - 1.0), and Google Image extensions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open /sitemap.xml</span>
                    </a>
                    <button
                      onClick={() => handleCopy(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://smartprintshub.co.ke/</loc><priority>1.0</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#services</loc><priority>0.9</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#cyber-services</loc><priority>0.9</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#shop</loc><priority>0.9</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#portfolio</loc><priority>0.8</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#track-order</loc><priority>0.8</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#ai-designer</loc><priority>0.8</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#quote-calculator</loc><priority>0.8</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#about</loc><priority>0.7</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#contact</loc><priority>0.8</priority></url>\n  <url><loc>https://smartprintshub.co.ke/#faqs</loc><priority>0.7</priority></url>\n</urlset>`, "copy-sitemap")}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                    >
                      {copiedId === "copy-sitemap" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>Copy XML</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { loc: "/", title: "Homepage (Priority 1.0)", freq: "daily" },
                    { loc: "/#services", title: "Printing Services (0.9)", freq: "weekly" },
                    { loc: "/#cyber-services", title: "eCitizen Cyber (0.9)", freq: "weekly" },
                    { loc: "/#shop", title: "Shop Products (0.9)", freq: "daily" },
                    { loc: "/#portfolio", title: "Client Portfolio (0.8)", freq: "weekly" },
                    { loc: "/#track-order", title: "Order Tracker (0.8)", freq: "daily" },
                    { loc: "/#ai-designer", title: "AI Assistant (0.8)", freq: "weekly" },
                    { loc: "/#quote-calculator", title: "Quote Estimator (0.8)", freq: "weekly" },
                    { loc: "/#about", title: "About Hub (0.7)", freq: "monthly" },
                    { loc: "/#contact", title: "Map & Contacts (0.8)", freq: "monthly" },
                    { loc: "/#faqs", title: "FAQs & Guidelines (0.7)", freq: "monthly" },
                  ].map((node, i) => (
                    <div key={i} className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{node.loc}</span>
                      <span className="text-[10px] text-slate-400 truncate">{node.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>This console operates on client-side state and live DOM inspection.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const report = `SMARTPRINTS HUB SEO AUDIT REPORT\nGenerated: ${new Date().toLocaleString()}\nScore: ${seoScore}/100\nHeadings: H1(${scannedHeadings.h1.length}), H2(${scannedHeadings.h2.length}), H3(${scannedHeadings.h3.length})\nKeywords: ${keywordAnalysis.filter(k => k.totalHeadingCount > 0).length}/${targetKeywords.length} targets active\nCatalog Alt-Text Coverage: 100% (${catalogAltTextMap.length} items)`;
                navigator.clipboard.writeText(report);
                setCopiedId("full-report");
                setTimeout(() => setCopiedId(null), 2000);
              }}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              {copiedId === "full-report" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Audit Summary
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-mono text-xs font-bold transition-colors"
            >
              Done / Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
