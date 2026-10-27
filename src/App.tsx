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
  Quote,
  Maximize,
  BookOpen,
  ChevronDown,
  Globe,
  Fingerprint
} from "lucide-react";

import Navbar from "./components/Navbar";
import AiDesigner from "./components/AiDesigner";
import OrderTracker from "./components/OrderTracker";
import AboutUs from "./components/AboutUs";
import CartDrawer from "./components/CartDrawer";
import SeoStatusDashboard from "./components/SeoStatusDashboard";
import { PortfolioGallery } from "./components/PortfolioGallery";
import { TrustPillars } from "./components/TrustPillars";
import { ServicesSection } from "./components/ServicesSection";
import { PricingRateMatrix } from "./components/PricingRateMatrix";
import { QuickQuoteCalculator } from "./components/QuickQuoteCalculator";
import { QuoteRequestModal } from "./components/QuoteRequestModal";
import { QuoteRequestSection } from "./components/QuoteRequestSection";
import { DeliveryCoverageMatrix } from "./components/DeliveryCoverageMatrix";
import { ArtworkPrepressGuide } from "./components/ArtworkPrepressGuide";
import { ReviewsSection } from "./components/ReviewsSection";
import { HeroShowcaseSlider } from "./components/HeroShowcaseSlider";
import { ThreeStepProcess } from "./components/ThreeStepProcess";
import { FloatingWhatsAppCTA } from "./components/FloatingWhatsAppCTA";

import { SERVICES_LIST, PORTFOLIO_LIST, SHOP_PRODUCTS, SMARTPRINTS_FAQS } from "./data";
import { CartItem, TrackingStatus } from "./types";

export default function App() {
  const [tab, setTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSeoDashboardOpen, setIsSeoDashboardOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePresetId, setQuotePresetId] = useState<string>("biz-cards");

  const handleOpenQuoteModal = (serviceId?: string) => {
    if (serviceId) setQuotePresetId(serviceId);
    setIsQuoteModalOpen(true);
  };

  // Shop item customization states
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, string>>({});
  const [selectedProductPaper, setSelectedProductPaper] = useState<Record<string, string>>({});
  const [selectedProductFinish, setSelectedProductFinish] = useState<Record<string, string>>({});

  // Active query status tracking helper
  const [recentTrackCode, setRecentTrackCode] = useState<TrackingStatus | null>(null);

  // Quote configurator selection
  const [selectedQuoteProductId, setSelectedQuoteProductId] = useState<string>("biz-cards");

  const handleSelectForQuote = (serviceId: string) => {
    const mapping: Record<string, string> = {
      "biz-cards": "biz-cards",
      "color-print": "flyers",
      "rollup-banners": "rollup-banners",
      "teardrop-flags": "rollup-banners",
      "branded-tshirts": "tshirts",
      "polos": "polos",
      "reflector-jackets": "reflectors",
      "stickers-labels": "stickers",
      "corporate-docs": "notebooks",
      "merch-printing": "notebooks"
    };
    setSelectedQuoteProductId(mapping[serviceId] || "biz-cards");
    setTab("calculator");
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Apply dark mode theme class to HTML node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Private admin access only (via URL parameter ?admin=seo, hash #seo-admin, or shortcut Ctrl+Shift+S)
  useEffect(() => {
    const checkAdminQuery = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "seo" || window.location.hash === "#seo-admin") {
        setIsSeoDashboardOpen(true);
      }
    };
    checkAdminQuery();
    window.addEventListener("hashchange", checkAdminQuery);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setIsSeoDashboardOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", checkAdminQuery);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Container Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-24 md:space-y-36">
        
        {/* SECTION 1: HOME PAGE HERO SHOWCASE & BENTO GRID */}
        <section id="home" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* 1. ANIMATED HERO ARTWORK SHOWCASE SLIDER */}
            <HeroShowcaseSlider 
              onQuoteClick={() => {
                setTab("calculator");
                const el = document.getElementById("calculator");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onExploreServices={() => {
                setTab("services");
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onOpenQuoteModal={handleOpenQuoteModal}
            />

            {/* 2. THREE SUMMARY BENTO TRUST & LOCATION CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
              
              {/* 3. CORE STATISTICS GRID CARD */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <span className="text-3xl font-display font-black text-black dark:text-blue-400">10,000+</span>
                  <span className="text-[10px] uppercase font-black text-black dark:text-slate-300 tracking-wider">High Fidelity Prints</span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex flex-col text-left">
                  <span className="text-3xl font-display font-black text-blue-600 dark:text-blue-400">99.8%</span>
                  <span className="text-[10px] uppercase font-black text-black dark:text-slate-300 tracking-wider">Client Smiles</span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-900">KW</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-900">DO</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[9px] font-black text-white">+3k</div>
                </div>
              </div>

              {/* 4. SAME-DAY DISPATCH BANNER BOX */}
              <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm flex flex-col justify-between text-left">
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
              <div className="lg:col-span-4 bg-gradient-to-br from-[#003B9C] to-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-sm relative overflow-hidden text-left border border-blue-900/50">
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
                  className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-mono text-[10px] uppercase tracking-wider cursor-pointer"
                >
                  View Directions & Maps
                </button>
              </div>

            </div>

            {/* 3. THREE STEP PROCESS (From Idea to Doorstep in 3 Steps) */}
            <div className="pt-4">
              <ThreeStepProcess 
                onStartClick={() => {
                  setTab("calculator");
                  const el = document.getElementById("calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onUploadClick={() => {
                  setTab("artwork-guide");
                  const el = document.getElementById("artwork-guide");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>

              {/* SECTION: TRUST PILLARS */}
              <div className="pt-4">
                <TrustPillars 
                  onQuoteClick={() => {
                    setTab("calculator");
                    const el = document.getElementById("calculator");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }} 
                />
              </div>

              {/* SECTION: ABOUT SMARTPRINTS HUB */}
              <div className="pt-6">
                {/* About Page section matching the mockup exactly */}
                <AboutUs />
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
                        <span className="text-[9px] uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">{s.category} Service</span>
                        <h4 className="font-display font-bold text-base text-slate-850/90 dark:text-white leading-tight mb-2">
                          {s.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                          {s.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setTab("contact");
                          const el = document.getElementById("contact");
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="w-full py-2 bg-[#0A1B3D] hover:bg-slate-800 text-white font-mono rounded-lg text-[10px] uppercase font-bold tracking-widest"
                      >
                        Request Custom Pricing
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

          {/* SECTION 2: OFFICIAL RATE CARD & PRICING MATRIX (DS CREATIONS STYLE BUNDLES & RATES) */}
          <section id="pricing" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <PricingRateMatrix 
                onSelectForCalculator={handleSelectForQuote} 
                onRequestQuote={handleOpenQuoteModal}
              />
            </motion.div>
          </section>

          {/* SECTION 3: PRODUCTION SERVICES CATALOG */}
          <section id="services" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ServicesSection onSelectForQuote={(id) => handleOpenQuoteModal(id)} />
            </motion.div>
          </section>

          {/* SECTION 4: SEND A QUOTE REQUEST (WHATSAPP OR EMAIL WITH MULTI-SERVICE SELECTION) */}
          <section id="quote-request" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <QuoteRequestSection 
                presetServiceId={quotePresetId}
                onOrderTrackRequested={(code) => {
                  const el = document.getElementById("order-tracker");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </motion.div>
          </section>

          {/* SECTION 5: INSTANT QUOTE CALCULATOR */}
          <section id="calculator" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <QuickQuoteCalculator 
                onAddToCart={handleAddToCart}
                presetProductId={selectedQuoteProductId}
              />
            </motion.div>
          </section>

          {/* SECTION 6: LIVE ORDER & QUOTE STATUS TRACKER */}
          <section id="order-tracker" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <OrderTracker />
            </motion.div>
          </section>

          {/* SECTION 4: PORTFOLIO GALLERY */}
          <section id="portfolio" className="scroll-mt-24">
            <PortfolioGallery items={PORTFOLIO_LIST} />
          </section>

          {/* SECTION 5: KENYA DELIVERY COVERAGE MATRIX */}
          <section id="delivery" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <DeliveryCoverageMatrix />
            </motion.div>
          </section>

          {/* SECTION 6: ARTWORK PRE-PRESS GUIDE */}
          <section id="artwork-guide" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ArtworkPrepressGuide />
            </motion.div>
          </section>

          {/* SECTION 7: REVIEWS & CLIENT STORIES */}
          <section id="reviews" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ReviewsSection />
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
                    <span className="text-[10px] tracking-widest uppercase font-mono text-blue-400 font-black block">SmartPrints contact center</span>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">Speak with print manager</h3>
                    <p className="text-slate-300 text-xs">If you prefer offline communication, text on WhatsApp or drop in at Shop A11 for customized paper feedback.</p>

                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      <div className="flex gap-2.5 items-center">
                        <Phone className="w-5 h-5 text-blue-400" />
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
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <div>
                          <span className="text-[9px] block text-slate-400 font-mono">PHYSICAL VISIT</span>
                          <span className="text-sm font-bold block text-white">Westlands Market, Shop A11, Nairobi</span>
                        </div>
                      </div>

                      <a 
                        href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex gap-2.5 items-center group hover:bg-slate-800/60 p-1.5 -mx-1.5 rounded-xl transition-all"
                        title="Follow SmartPrints Hub on Instagram"
                      >
                        <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[9px] block text-pink-400 font-mono font-bold">INSTAGRAM DM & PORTFOLIO</span>
                          <span className="text-sm font-bold block text-white group-hover:text-pink-300 transition-colors">@smartprinters_hub_westlands</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Direct Quotation & Service Dispatch Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                        Instant Quote Dispatch
                      </span>
                      <h4 className="text-base font-display font-bold uppercase text-slate-900 dark:text-white">
                        Send a Custom Printing Quote
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
                        Select any of our commercial services, customize your paper stock and finishes, and send your request straight to WhatsApp or Email.
                      </p>
                    </div>

                    <div className="pt-2 space-y-2.5">
                      <button 
                        type="button"
                        onClick={() => handleOpenQuoteModal()}
                        className="w-full py-3 px-4 bg-[#003B9C] hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform hover:scale-[1.01]"
                      >
                        <FileText className="w-4 h-4 text-blue-200" />
                        <span>Open Full Quote Generator</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href="https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I%20would%20like%20to%20request%20a%20printing%20quotation."
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-3 bg-slate-900 dark:bg-slate-800 hover:bg-black text-white rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp Desk</span>
                        </a>

                        <a
                          href="mailto:smartprintershub1@gmail.com?subject=Print%20Quote%20Request%20-%20SmartPrints%20Hub&body=Hello%20SmartPrints%20Hub%20Team,%0A%0AI%20would%20like%20to%20request%20a%20quotation%20for%20the%20following%20printing%20services:%0A%0A-%20Service:%0A-%20Quantity:%0A-%20Paper/Finishing:%0A-%20Turnaround:%0A%0APlease%20get%20back%20to%20me.%0A%0AThank%20you!"
                          className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                          <span>Email Direct</span>
                        </a>
                      </div>
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
              <img 
                src="/logo.svg" 
                alt="Smart Printers Hub" 
                className="h-10 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Luxury digital offset printing, heavy outdoor vinyl banner fabrication, KRA electronic filings & cyber assistance inside Westlands Market.
            </p>
            <div className="pt-2">
              <a 
                href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 text-pink-300 hover:text-white hover:border-pink-400 transition-all text-xs font-semibold group shadow-sm"
                title="Follow SmartPrints Hub on Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Instagram: @smartprinters_hub_westlands</span>
              </a>
            </div>
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
              <li><button onClick={() => { setTab("calculator"); document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Instant Quote Calculator</button></li>
              <li><button onClick={() => { setTab("delivery"); document.getElementById("delivery")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Delivery Across 47 Counties</button></li>
              <li><button onClick={() => { setTab("artwork-guide"); document.getElementById("artwork-guide")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Artwork Pre-Press Guide</button></li>
              <li><a href="/printing-in-westlands/" className="hover:text-white">Printing in Westlands Guide</a></li>
              <li><button onClick={() => { setTab("services"); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Our Printing Services</button></li>
              <li><button onClick={() => { setTab("contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="hover:text-white">Westlands Shop A11 Directions</button></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white text-slate-400 font-mono text-[11px] block">XML Sitemap</a></li>
              <li><a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white text-slate-400 font-mono text-[11px] block">Robots.txt Directives</a></li>
              <li><a href="/llms.txt" target="_blank" rel="noreferrer" className="hover:text-white text-indigo-400 font-mono text-[11px] block">LLMs.txt (AI Search Protocol)</a></li>
              <li><a href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0" target="_blank" rel="noopener noreferrer" className="hover:text-white text-pink-400 font-mono text-[11px] flex items-center gap-1.5 pt-1 group"><Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" /> Follow on Instagram (@smartprinters_hub_westlands)</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider block mb-3 font-mono">Opening hours</span>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Mon – Fri: 6:30 AM – 9:30 PM<br />
              Saturday: 7:00 AM – 9:30 PM<br />
              Sunday: 7:30 AM – 8:30 PM<br />
              Fulfillment: Shop A11, Westlands Market
            </p>
            <div className="mt-3 pt-2.5 border-t border-slate-900">
              <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase tracking-wider font-bold">Email Orders:</span>
              <a 
                href="mailto:smartprintershub1@gmail.com" 
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-mono font-black hover:text-amber-200 transition-colors"
                title="Email SmartPrints Hub"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>smartprintershub1@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-wrap justify-between items-center text-[10px] uppercase font-bold tracking-wider font-mono gap-4">
          <div>© 2026 SmartPrints Hub Ltd — Westlands, Kenya. All dimensions calibrated.</div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5 lowercase"
              title="SmartPrints Hub on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@smartprinters_hub_westlands</span>
            </a>
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
            setTab("calculator"); 
            document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex-1 py-3 bg-[#0A1B3D] text-white border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg cursor-pointer"
        >
          Instant Quote
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

      {/* ADMIN SEO STATUS & ALT-TEXT MONITOR DASHBOARD */}
      <SeoStatusDashboard 
        isOpen={isSeoDashboardOpen} 
        onClose={() => setIsSeoDashboardOpen(false)} 
      />

      {/* FULL QUOTE REQUEST GENERATOR MODAL (DIRECT WHATSAPP & EMAIL DISPATCH) */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        presetServiceId={quotePresetId}
        onOrderTrackRequested={(trackingCode) => {
          const el = document.getElementById("order-tracker");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      {/* FLOATING WHATSAPP CTA WITH HEARTBEAT & EXPANDING RIPPLE (inspired by printshop.co.ke) */}
      <FloatingWhatsAppCTA />

    </div>
  );
}
