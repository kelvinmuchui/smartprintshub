import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Printer, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Phone, 
  Clock, 
  MapPin,
  ChevronRight,
  ShieldCheck,
  Instagram,
  FileText,
  Mail
} from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSeoDashboard?: () => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export default function Navbar({
  currentTab,
  setTab,
  darkMode,
  toggleDarkMode,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  onOpenSeoDashboard,
  onOpenQuoteModal
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "pricing", label: "Pricing & Rates" },
    { id: "quote-request", label: "Request a Quote" },
    { id: "services", label: "Our Services" },
    { id: "calculator", label: "Instant Calculator" },
    { id: "portfolio", label: "Our Portfolio" },
    { id: "delivery", label: "Delivery Areas" },
    { id: "contact", label: "Contact Us" }
  ];



  return (
    <>
      {/* Upper Info Mini bar - High utility header matching top professional print portals */}
      <div className="w-full bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800/80 font-mono flex flex-wrap justify-between items-center gap-2 relative z-50">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Shop A11, Westlands Market, Nairobi</span>
          </span>
          <a 
            href="mailto:smartprintershub1@gmail.com" 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-mono font-black text-xs shadow-md shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-yellow-200 group"
            title="Official Email: smartprintershub1@gmail.com"
          >
            <div className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
              <Mail className="w-2.5 h-2.5" />
            </div>
            <span className="tracking-tight">smartprintershub1@gmail.com</span>
            <span className="flex h-2 w-2 relative ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </a>
          <span className="hidden xl:flex items-center gap-1.5 hover:text-white transition-colors text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Mon-Sun: 6:30 AM – 9:30 PM (Daily)</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-pink-300 hover:text-white bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 hover:to-purple-600/50 border border-pink-500/40 px-2.5 py-0.5 rounded transition-all group shadow-sm"
            title="Follow SmartPrints Hub on Instagram (@smartprinters_hub_westlands)"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold hidden sm:inline">Instagram</span>
          </a>
          <a href="tel:+254743603068" className="flex items-center gap-1.5 text-white bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 px-2.5 py-0.5 rounded transition-all font-bold">
            <Phone className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            <span>+254 743 603 068</span>
          </a>
          <span className="text-[10px] uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full font-sans font-bold">
            Same Day Print
          </span>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-40 w-full glassmorphism border-b shadow-sm transition-all duration-300 bg-white/95 dark:bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo Identity */}
          <div 
            onClick={() => { 
              setTab("home"); 
              const el = document.getElementById("home");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }} 
            className="flex items-center cursor-pointer group"
            id="brand-logo"
          >
            <img 
              src="/logo.svg" 
              alt="Smart Printers Hub" 
              className="h-11 sm:h-13 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-200" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-all relative font-bold ${
                  currentTab === item.id
                    ? "text-[#003B9C] dark:text-blue-400 bg-blue-50 dark:bg-slate-800"
                    : "text-black hover:text-[#003B9C] dark:text-slate-200 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/40"
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#003B9C] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Tools (Search, Theme, Cart, Call) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search toggler */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Search services"
                id="btn-search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50"
                  >
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search printing, stickers, KRA..."
                        className="bg-transparent border-none text-sm outline-none w-full text-slate-900 dark:text-white"
                        autoFocus
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>
                    {searchQuery && (
                      <p className="text-[10px] text-slate-400 mt-2 font-mono">
                        Filtering directory for "{searchQuery}"
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode switch */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="btn-theme-switch"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>



            {/* Get Quote Quick button */}
            <button
              onClick={() => {
                if (onOpenQuoteModal) {
                  onOpenQuoteModal();
                } else {
                  setTab("quote-request");
                  const el = document.getElementById("quote-request");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-lg font-sans text-sm font-semibold shadow-md transition-all group cursor-pointer"
              id="btn-nav-cta"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Request Quote</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Drawer button menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Menu Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-inner"
            >
              <div className="px-4 py-3 space-y-1 bg-slate-50 dark:bg-slate-900/50">
                {/* Mobile Search block */}
                <div className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 mb-3">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search print, stick, tax returns..."
                    className="bg-transparent border-none text-sm outline-none w-full text-slate-900 dark:text-white"
                  />
                </div>

                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`nav-mobile-item flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-bold rounded-lg transition-all ${
                      currentTab === item.id
                        ? "text-[#003B9C] bg-blue-50 dark:text-blue-400 dark:bg-slate-800"
                        : "text-black dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${currentTab === item.id ? "rotate-90 text-[#003B9C]" : ""}`} />
                  </button>
                ))}

                {/* Mobile Instant Quote Widget */}
                <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenQuoteModal) {
                        onOpenQuoteModal();
                      } else {
                        setTab("quote-request");
                        const el = document.getElementById("quote-request");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Request Quote</span>
                  </button>
                  <a
                    href="https://wa.me/254743603068"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-[#003B9C] hover:bg-blue-800 text-white rounded-lg text-xs font-semibold text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <a
                  href="mailto:smartprintershub1@gmail.com"
                  className="w-full mt-2.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 text-xs font-mono font-black flex items-center justify-center gap-2 border border-yellow-200 shadow-md hover:scale-[1.01] active:scale-95 transition-all"
                  title="Official Email: smartprintershub1@gmail.com"
                >
                  <div className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center shrink-0">
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span>smartprintershub1@gmail.com</span>
                  <span className="flex h-2 w-2 relative ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 text-pink-600 dark:text-pink-300 text-xs font-semibold flex items-center justify-center gap-2 border border-pink-200 dark:border-pink-800/80 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                  <span>Follow on Instagram (@smartprinters_hub_westlands)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
