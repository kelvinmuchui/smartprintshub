import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Printer, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  TrendingUp,
  Award,
  Users2,
  Briefcase,
  Share2,
  FileText,
  BadgeAlert,
  Search,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Compass,
  Mail,
  MessageSquare,
  ShieldCheck,
  Send,
  Star,
  Quote
} from "lucide-react";

import Navbar from "./components/Navbar";
import PriceCalculator from "./components/PriceCalculator";
import AiDesigner from "./components/AiDesigner";
import OrderTracker from "./components/OrderTracker";
import ArtworkUploader from "./components/ArtworkUploader";
import PortfolioSlider from "./components/PortfolioSlider";
import CartDrawer from "./components/CartDrawer";

import { SERVICES_LIST, PORTFOLIO_LIST, SHOP_PRODUCTS, SMARTPRINTS_FAQS } from "./data";
import { CartItem, TrackingStatus } from "./types";

export default function App() {
  const [tab, setTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<"all" | "printing" | "branding" | "cyber">("all");
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<"all" | "printing" | "branding" | "corporate">("all");

  // Shop item customization states
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, string>>({});
  const [selectedProductPaper, setSelectedProductPaper] = useState<Record<string, string>>({});
  const [selectedProductFinish, setSelectedProductFinish] = useState<Record<string, string>>({});

  // Active query status tracking helper
  const [recentTrackCode, setRecentTrackCode] = useState<TrackingStatus | null>(null);

  // Apply dark mode theme class to HTML node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) => i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i);
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleClearCart = () => setCart([]);

  // Filter lists based on search parameter
  const filteredServices = SERVICES_LIST.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.specs && s.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = activeServiceCategory === "all" || s.category === activeServiceCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPortfolio = PORTFOLIO_LIST.filter((p) => {
    if (activePortfolioCategory === "all") return true;
    return p.category.toLowerCase().includes(activePortfolioCategory.toLowerCase());
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-[#F8F9FA] text-slate-900"}`}>
      
      {/* Sticky Top Header Navigation */}
      <Navbar 
        currentTab={tab} 
        setTab={setTab} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-24 md:space-y-36">
        
        {/* SECTION 1: HOME PAGE BENTO GRID */}
        <section id="home" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
              
              {/* Primary Bento Layout - Large Screen Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
                
                {/* 1. HERO CARD (Col Span 7) */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  {/* Glowing background floating blurs */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-600/10 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans uppercase tracking-wider border border-blue-500/20">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span>Westlands' Premium Print & Custom Branding Experts</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                      Professional Printing Solutions That Bring Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-[#003B9C] to-blue-500 dark:from-blue-400 dark:to-blue-450">Ideas to Life</span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                      Fast, affordable and high-quality digital printing in Westlands. From corporate business cards & durable roll-up banners to eCitizen & iTax cyber operations.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 mt-8 relative z-10">
                    <button
                      onClick={() => {
                        setTab("services");
                        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#003B9C] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-sans text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-transform hover:scale-[1.02]"
                    >
                      <span>Explore Services</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setTab("upload");
                        document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-205 dark:border-slate-800 text-[#0A1B3D] dark:text-white font-sans text-xs font-black uppercase tracking-widest hover:border-blue-500 transition-colors"
                    >
                      Request Quotation
                    </button>
                    <a
                      href="https://wa.me/254743603068"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white font-sans text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
                    >
                      <Phone className="w-4 h-4 text-blue-450" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

                {/* 2. QUICK UPLOAD BENTO BOX (Col Span 5) */}
                <div className="lg:col-span-4 bg-gradient-to-br from-[#003B9C] to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
                  {/* Glowing decoration */}
                  <div className="absolute right-0 bottom-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4 shadow-inner">
                      <Printer className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-black block">
                      Express Pre-Press Ingress
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">
                      Artwork Upload
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Have a print-ready design (PDF, AI, PSD, ZIP)? Drag it on our portal for instant scaling and layout confirmation at Shop A11.
                    </p>
                  </div>

                  <button
                    onClick={() => { 
                      setTab("upload"); 
                      const el = document.getElementById("upload");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full mt-6 py-3.5 bg-[#FFD400] hover:bg-yellow-450 text-[#0A1B3D] rounded-xl font-sans font-black text-xs uppercase tracking-widest shadow transition-transform hover:scale-[1.02]"
                  >
                    Submit PDF / Artwork
                  </button>
                </div>

                {/* 3. CORE STATISTICS GRID CARD */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-md flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-black text-[#0A1B3D] dark:text-blue-400">10,000+</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">High Fidelity Prints</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-black text-blue-600 dark:text-blue-400">99.8%</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Client Smiles</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="flex -space-x-2.5">
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-800">KW</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-800">DO</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[9px] font-black text-white">+3k</div>
                  </div>
                </div>

                {/* 4. SAME-DAY DISPATCH BANNER BOX */}
                <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4.5 h-4.5 text-blue-400" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-bold">
                      Express Delivery Dispatch
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white uppercase tracking-tight">
                    Same-Day Printing Westlands
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Standard business cards, pamphlets & glossy brochures ordered before 11:30 AM are dispatched by G4S / Wells Fargo same evening!
                  </p>
                </div>

                {/* 5. LOCATIVE PHYSICAL ANCHOR */}
                <div className="lg:col-span-4 bg-gradient-to-br from-[#28A745] to-[#003B9C] rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-white/80 font-bold block mb-1">
                      Our Westlands Address
                    </span>
                    <h4 className="text-lg font-display font-black uppercase tracking-tight">
                      Westlands Shop A11
                    </h4>
                    <p className="text-white/80 text-xs mt-1">
                      Located conveniently inside the premium Westlands Market block. Directly opposite public parking bays.
                    </p>
                  </div>
                  <button 
                    onClick={() => { 
                      setTab("contact"); 
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-mono text-[10px] uppercase tracking-wider"
                  >
                    View Directions & Maps
                  </button>
                </div>

              </div>

              {/* SECTION: TWO COLUMN SPREAD FOR INTERACTIVE TOOLS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-6">
                
                {/* Visual before/after canvas identity comparison slider */}
                <PortfolioSlider 
                  title="Dynamic Hotel Menu Card Redesign"
                  description="Slide to witness the difference between unformatted layout draft instructions and our final luxury Spot-UV printed menus delivered to Aura Café Westlands:"
                  beforeImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  afterImage="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
                />

                {/* Pricing Quick Calculator Component embedded directly inside the bento flow */}
                <PriceCalculator onAddToCart={handleAddToCart} setTab={setTab} />

              </div>

              {/* FEATURED SERVICES BENTO BANNER */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[10px] text-blue-500 font-mono font-bold tracking-widest block uppercase mb-1">
                      SmartPrints Catalog Specialties
                    </span>
                    <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Popular Printing & Cyber Packages
                    </h3>
                  </div>
                  <button
                    onClick={() => { 
                      setTab("services"); 
                      const el = document.getElementById("services");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider hover:underline"
                  >
                    <span>View all 50+ services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SERVICES_LIST.slice(0, 3).map((s) => (
                    <div 
                      key={s.id} 
                      className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">Starting KES {s.startingPrice}</span>
                        <h4 className="font-display font-bold text-base text-slate-850/90 dark:text-white leading-tight mb-2">
                          {s.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                          {s.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setTab("upload");
                          window.scrollTo(0, 0);
                        }}
                        className="w-full py-2 bg-[#0A1B3D] hover:bg-slate-800 text-white font-mono rounded-lg text-[10px] uppercase font-bold tracking-widest"
                      >
                        Submit Artwork for Pricing
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* REVIEWS & GOOGLE TRUST ANCHOR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* Live Google Reviews rating integration */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-[#FFD400] fill-current" />
                    <Star className="w-5 h-5 text-[#FFD400] fill-current" />
                    <Star className="w-5 h-5 text-[#FFD400] fill-current" />
                    <Star className="w-5 h-5 text-[#FFD400] fill-current" />
                    <Star className="w-5 h-5 text-[#FFD400] fill-current" />
                    <span className="text-xs font-mono font-bold text-slate-500 ml-1">5.0 / 5.0 Rating (Google reviews)</span>
                  </div>

                  <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                    "SmartPrints Hub has single-handedly transformed our branding materials. Their roll-up banners look extremely professional, the colors are rich, and they delivered to our Westlands office before the deadline. Will be doing all our corporate printing here!"
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-800 font-black">
                      PO
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">Phyllis Onyango</span>
                      <span className="text-[10px] text-slate-400 block font-mono">Communications, Aura Labs Tech Kenya</span>
                    </div>
                  </div>
                </div>

                {/* Local corporate client logos & support assurance */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Corporate Account Partners</span>
                    <h4 className="text-base font-bold text-slate-850 dark:text-white mt-1 mb-3">
                      Trusted by Brands across Westlands
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      We offer dedicated digital invoices, corporate credit ledger accounts, and custom template archiving. Call Shop A11 to open a direct partner ledger.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <span className="text-xs font-mono text-center p-2 bg-slate-50 dark:bg-slate-850 border border-slate-150 rounded text-slate-500 font-bold block">
                      Aura Coffee
                    </span>
                    <span className="text-xs font-mono text-center p-2 bg-slate-50 dark:bg-slate-850 border border-slate-150 rounded text-slate-500 font-bold block">
                      Kilimani Tech
                    </span>
                    <span className="text-xs font-mono text-center p-2 bg-slate-50 dark:bg-slate-850 border border-slate-150 rounded text-slate-500 font-bold block">
                      Westlands Realty
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </section>

          {/* SECTION 2: SERVICES DIRECTORY */}
          <section id="services" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold uppercase tracking-widest block">
                  Service Directory ({filteredServices.length} matching packages)
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  High Precision Printing, Branding & Digital Cyber
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                  Filter through our extensive list of business-grade physical prints and authorized government KRA / eCitizen filing services.
                </p>

                {/* In-page live searching bar */}
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md mx-auto shadow-sm">
                  <div className="flex items-center gap-2 p-2 w-full">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type stickers, canvas, KRA returns..."
                      className="bg-transparent border-none text-xs sm:text-sm outline-none w-full text-slate-900 dark:text-white"
                    />
                  </div>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-xs px-3 text-slate-400 hover:text-slate-650"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Categories */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveServiceCategory("all")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeServiceCategory === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-850 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    All Services
                  </button>
                  <button
                    onClick={() => setActiveServiceCategory("printing")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeServiceCategory === "printing"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-850 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Fine Printing
                  </button>
                  <button
                    onClick={() => setActiveServiceCategory("branding")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeServiceCategory === "branding"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-850 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Large Format & Branding
                  </button>
                  <button
                    onClick={() => setActiveServiceCategory("cyber")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeServiceCategory === "cyber"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-850 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    KRA / iTax & Cyber Portals
                  </button>
                </div>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div 
                    key={service.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-black bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                          {service.startingPrice}
                        </span>
                        
                        <span className="text-slate-400 group-hover:text-blue-500 transition-colors text-xs font-bold uppercase font-mono">
                          {service.category}
                        </span>
                      </div>

                      <h4 className="text-lg font-display font-black text-slate-900 dark:text-white leading-tight mb-2">
                        {service.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {service.specs && (
                        <ul className="space-y-1 mt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3 mb-4">
                          {service.specs.map((item, id) => (
                            <li key={id} className="flex gap-1.5 items-start">
                              <span className="text-blue-500 font-bold shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setTab("upload");
                          window.scrollTo(0, 0);
                        }}
                        className="w-full py-2.5 bg-[#0a1b3d] dark:bg-slate-800 hover:bg-slate-855 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Submit Art Files
                      </button>
                      
                      <a
                        href={`https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I'd%20love%20a%20precise%20quote%20for%20the%20${service.title}%20service.`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors"
                        title="WhatsApp Quote request"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </section>

          {/* SECTION 3: PORTFOLIO GALLERY */}
          <section id="portfolio" className="scroll-mt-24 bg-slate-50/30 dark:bg-slate-900/10 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold uppercase tracking-widest block">
                  Showcase Portfolio Gallery
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  High-End Brand Identity Transformations
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                  Examine complete real-life physical asset creations printed and structured for Nairobi's leading digital and food enterprises.
                </p>

                {/* Filter Categories */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {["all", "printing", "branding", "corporate"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActivePortfolioCategory(cat as any)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        activePortfolioCategory === cat
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-slate-850 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Before/After Grid Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-10">
                <PortfolioSlider 
                  title="Aura Coffee Logo & Spot UV Cards"
                  description="Slide to witness premium dual-sided layout formatting for local Westlands café"
                  beforeImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  afterImage="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
                />
                
                <PortfolioSlider 
                  title="Nairobi Summit Roll-up Teardrop"
                  description="Slide to check waterproof satin color contrast adjustments"
                  beforeImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  afterImage="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Portfolios Normal Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded backdrop-blur">
                        {p.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </section>



          {/* SECTION 5: AI DESIGNER SCREEN */}
          <section id="ai-assistant" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <AiDesigner />
            </motion.div>
          </section>



          {/* SECTION 7: SUBMIT QUOTATION / FILE UPLOAD */}
          <section id="upload" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ArtworkUploader 
                onSuccess={(orderMeta) => {
                  setRecentTrackCode(orderMeta);
                }} 
                setTab={setTab}
              />
            </motion.div>
          </section>

          {/* SECTION 8: CONTACT US */}
          <section id="contact" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Maps and contact info coordinates */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Google maps visual frame card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold uppercase tracking-widest block mb-2">
                      Interactive Location Anchor (We are live here!)
                    </span>

                    <h3 className="text-xl font-display font-black text-slate-900 dark:text-white mb-4">
                      Physical Map: Westlands Market Shop A11
                    </h3>

                    {/* Google Map iframe embedded for accurate Westlands directions */}
                    <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                      <iframe 
                        title="SmartPrints Hub Westlands Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8541989018445!2d36.804130674844624!3d-1.259648998728469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1737f19cb5bf%3A0x7d65b1d9bf59df!2sWestlands%20Market!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                        className="w-full h-full border-0"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">Westlands, Nairobi, Kenya</span>
                      <a
                        href="https://google.com/maps/place/Westlands+Market+Nairobi"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#003B9C] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Launch Directions tool
                      </a>
                    </div>
                  </div>

                  {/* Physical FAQS Block */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-150 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-display font-black uppercase tracking-tight text-slate-9d0 dark:text-white mb-4">
                      Frequently Asked Questions
                    </h3>
                    
                    <div className="space-y-4">
                      {SMARTPRINTS_FAQS.map((faq, idx) => (
                        <div key={idx} className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-none">
                          <h4 className="text-sm font-bold text-slate-850 dark:text-white">{faq.q}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right side contact form and WhatsApp STK coordinates */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Immediate contact detail card */}
                  <div className="bg-[#0A1B3D] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                    <span className="text-[10px] tracking-widest uppercase font-mono text-[#FFD400] font-black block">SmartPrints contact center</span>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">Speak with print manager</h3>
                    <p className="text-slate-300 text-xs">If you prefer offline communication, text on WhatsApp or drop in at Shop A11 for customized paper feedback.</p>

                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <div className="flex gap-2.5 items-center">
                        <Phone className="w-5 h-5 text-green-400" />
                        <div>
                          <span className="text-[9px] block text-slate-400 font-mono">CALL / TEXT SHOP</span>
                          <span className="text-sm font-bold block text-white">+254743603068</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-center">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                          <span className="text-[9px] block text-slate-400 font-mono">EMAIL DIRECT</span>
                          <span className="text-sm font-bold block text-white">smartprintershub1@gmail.com</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-center">
                        <MapPin className="w-5 h-5 text-[#FFD400]" />
                        <div>
                          <span className="text-[9px] block text-slate-400 font-mono">PHYSICAL VISIT</span>
                          <span className="text-sm font-bold block text-white">Westlands Market, Shop A11, Nairobi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Standard local review query submission */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                    <h4 className="text-sm font-bold uppercase text-slate-850 dark:text-white mb-3">
                      Submit direct Query
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Your Name</label>
                        <input type="text" placeholder="Kelvin Muchui" className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border dark:border-slate-755 rounded-lg text-slate-850 dark:text-white focus:border-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">WhatsApp number</label>
                        <input type="tel" placeholder="+254743603068" className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border dark:border-slate-755 rounded-lg text-slate-850 dark:text-white focus:border-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Message</label>
                        <textarea rows={3} placeholder="Please print 100 business cards using conqueror stock with gold stamp. Contact on WhatsApp..." className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-800 border dark:border-slate-755 rounded-lg text-slate-850 dark:text-white focus:border-blue-500 outline-none" />
                      </div>

                      <button 
                        onClick={() => alert("Thank you. Query successfully recorded at Westlands Shop A11 portal!")}
                        className="w-full py-2.5 bg-[#003B9C] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                      >
                        Submit Query Note
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="mt-16 bg-slate-950 text-slate-400 border-t border-slate-900 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center text-white font-black text-sm relative overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="SmartPrints logo" 
                  className="absolute inset-0 w-full h-full object-cover z-10" 
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  referrerPolicy="no-referrer"
                />
                <span>S</span>
              </div>
              <span className="font-display font-bold text-sm text-white tracking-tight">SMARTPRINTS HUB</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Luxury digital offset printing, heavy outdoor vinyl banner fabrication, KRA electronic filings & cyber assistance inside Westlands Market.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block mb-3 font-mono">Specialities</span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Business Cards</button></li>
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Rollup Banners</button></li>
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Waterproof Stickers</button></li>
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Fine Canvas Photo Print</button></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block mb-3 font-mono">Useful links</span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Our Printing Services</button></li>
              <li><button onClick={() => { setTab("upload"); document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Submit quote file</button></li>
              <li><button onClick={() => { setTab("contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Location Map</button></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block mb-3 font-mono">Opening hours</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Monday – Friday: 6:30 AM to 9:30 PM<br />
              Saturday: 7:00 AM to 9:00 PM<br />
              Sunday :8:00AM to 8:00 PM<br />
              Fulfillment: Shop A11, Westlands Market
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-wrap justify-between items-center text-[10px] uppercase font-bold tracking-wider font-mono gap-4">
          <div>© 2026 SmartPrints Hub Ltd — Westlands, Kenya. All dimensions calibrated.</div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Online support Active</span>
            <span className="text-slate-500">M-Pesa till / Credit line ledger</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BOTTOM PANEL BAR FOR MOBILE */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden flex gap-2">
        <a 
          href="tel:+254743603068"
          className="flex-1 py-3 bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-lg"
        >
          Call Manager
        </a>
        <a 
          href="https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I%20need%20a%20print%20quote."
          target="_blank"
          style={{ backgroundColor: "#003B9C" }}
          rel="noreferrer"
          className="flex-1 py-3 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-lg"
        >
          WhatsApp Chat
        </a>
        <button 
          onClick={() => { 
            setTab("upload"); 
            document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex-1 py-3 bg-[#0A1B3D] text-white border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg"
        >
          Request Quote
        </button>
      </div>

      {/* SHOPPING CART INTEGRATION DRAWER POPUP */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQty}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
