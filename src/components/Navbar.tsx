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
  ChevronRight
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
}

export default function Navbar({
  currentTab,
  setTab,
  darkMode,
  toggleDarkMode,
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Our Services" },
    { id: "portfolio", label: "Our Portfolio" },
    { id: "contact", label: "Contact Us" }
  ];



  return (
    <>
      {/* Upper Info Mini bar - Westlands Focus */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80 font-mono flex flex-wrap justify-between items-center gap-2 relative z-50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Westlands Market, Shop A11, Kenya</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Mon-Fri: 6:30 AM – 9:30 PM | Sat: 7 AM – 9:30 PM | Sun: 7:30 AM – 8:30 PM</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+254743603068" className="flex items-center gap-1.5 text-white bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-2 py-0.5 rounded transition-all">
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span>+254 743 603 068</span>
          </a>
          <span className="text-[10px] uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full font-sans font-semibold">
            Same Day Printing
          </span>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-40 w-full glassmorphism border-b shadow-sm transition-all duration-300">
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
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative ${
                  currentTab === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-500/5"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"
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
              onClick={() => { setTab("upload"); window.scrollTo(0, 0); }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-lg font-sans text-sm font-semibold shadow-md transition-all group"
              id="btn-nav-cta"
            >
              <span>Instant Quote</span>
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
                    className={`nav-mobile-item flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg transition-all ${
                      currentTab === item.id
                        ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-slate-800"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${currentTab === item.id ? "rotate-90 text-blue-500" : ""}`} />
                  </button>
                ))}

                {/* Mobile Instant Quote Widget */}
                <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800 grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/254743603068"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold text-center border border-slate-850"
                  >
                    <Phone className="w-4.5 h-4.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setTab("upload");
                      setMobileMenuOpen(false);
                      const el = document.getElementById("upload");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Free Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
