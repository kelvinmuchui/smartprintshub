import { useState } from "react";
import { Calculator, Sparkles, HelpCircle, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { CartItem } from "../types";

interface PriceCalculatorProps {
  onAddToCart: (item: CartItem) => void;
  setTab: (tab: string) => void;
}

export default function PriceCalculator({ onAddToCart, setTab }: PriceCalculatorProps) {
  const [product, setProduct] = useState("business-card");
  const [paperType, setPaperType] = useState("350gsm-matte");
  const [quantity, setQuantity] = useState(100);
  const [finishing, setFinishing] = useState("matte-lamination");
  const [isAdded, setIsAdded] = useState(false);

  // Advanced Nairobi-tailored print formulas
  const calculatePrice = () => {
    let basePricePerUnit = 10; // KES
    if (product === "business-card") basePricePerUnit = 8;
    else if (product === "rollup-banner") basePricePerUnit = 6000;
    else if (product === "flyers-a5") basePricePerUnit = 12;
    else if (product === "stickers") basePricePerUnit = 15;
    else if (product === "canvas") basePricePerUnit = 4500;
    else if (product === "receipt-book") basePricePerUnit = 1400;

    let paperMultiplier = 1.0;
    if (paperType === "350gsm-matte" || paperType === "gloss-300") paperMultiplier = 1.25;
    if (paperType === "conqueror-luxury") paperMultiplier = 1.6;
    if (paperType === "waterproof-vinyl") paperMultiplier = 1.4;

    let finishingCost = 0;
    if (finishing === "spot-uv") finishingCost = 3.5;
    else if (finishing === "gold-foil") finishingCost = 5.0;
    else if (finishing === "matte-lamination" || finishing === "gloss-lamination") finishingCost = 1.5;

    let unitCost = (basePricePerUnit * paperMultiplier) + finishingCost;
    
    // Rollup banner or high-tier canvas are single units, others are batched
    let totalPrice = 0;
    if (product === "rollup-banner" || product === "canvas") {
      totalPrice = basePricePerUnit * (quantity > 10 ? 10 : quantity); 
    } else {
      totalPrice = unitCost * quantity;
    }

    // Apply bulk volume discount (e.g. 10% off for high counts in Kenya tech hubs)
    if (quantity >= 500) totalPrice *= 0.88;
    else if (quantity >= 250) totalPrice *= 0.92;

    return Math.round(totalPrice);
  };

  const getProductTitle = () => {
    if (product === "business-card") return "Executive Business Cards";
    if (product === "rollup-banner") return "Luxury Roll Up Banner";
    if (product === "flyers-a5") return "A5 Gloss Flyers";
    if (product === "stickers") return "Die-Cut Waterproof Stickers";
    if (product === "canvas") return "Fine Art Custom Canvas";
    if (product === "receipt-book") return "Branded NCR Receipt Books";
    return "Custom Print Job";
  };

  const currentPrice = calculatePrice();

  const handleAddEstimateToCart = () => {
    setIsAdded(true);
    onAddToCart({
      id: `calc-${product}-${Date.now()}`,
      title: `${getProductTitle()} (Estimator Package)`,
      price: currentPrice / quantity, // calculate unit
      quantity: 1, // 1 batch
      customOptions: {
        size: product === "rollup-banner" ? "85x200cm" : "Standard",
        paperType: paperType.replace("-", " ").toUpperCase(),
        finishing: finishing.replace("-", " ").toUpperCase()
      }
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div id="price-calculator" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all h-full flex flex-col justify-between relative overflow-hidden">
      
      {/* Background visual glosses */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-600/10 to-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Westlands Print Estimator</span>
          </div>
          <span className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full animate-pulse">
            Live Rates
          </span>
        </div>

        <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white leading-tight mb-1">
          Instant Print Calculator
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
          Toggle parameters instantly to obtain standard Westlands industry baseline prices.
        </p>

        <div className="space-y-4">
          {/* Product Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Product Type
            </label>
            <select
              value={product}
              onChange={(e) => {
                const val = e.target.value;
                setProduct(val);
                // auto set reasonable quantities and variables
                if (val === "rollup-banner" || val === "canvas") {
                  setQuantity(1);
                  setPaperType("matte-satin");
                  setFinishing("none");
                } else {
                  setQuantity(100);
                  setPaperType("350gsm-matte");
                  setFinishing("matte-lamination");
                }
              }}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-705 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="business-card">Executive Business Cards (Pack of 100)</option>
              <option value="flyers-a5">A5 Marketing Flyers (Pack of 250)</option>
              <option value="stickers">Die-Cut Waterproof Stickers (Vinyl)</option>
              <option value="rollup-banner">Luxury Roll-Up Banner (Aluminum base)</option>
              <option value="canvas">Custom Pine-Framed Canvas Photo</option>
              <option value="receipt-book">NCR Duplicate Bill/Receipt Book</option>
            </select>
          </div>

          {/* Grid of parameters */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Paper / Material
              </label>
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-705 rounded-lg text-xs"
              >
                {product === "rollup-banner" && <option value="matte-satin">Premium Satin Gloss Vinyl</option>}
                {product === "canvas" && <option value="polyester-canvas">Matte Woven Canvas Stock</option>}
                {product !== "rollup-banner" && product !== "canvas" && (
                  <>
                    <option value="350gsm-matte">350gsm Heavy Art Card</option>
                    <option value="gloss-300">300gsm Brilliant High-Gloss</option>
                    <option value="conqueror-luxury">Conqueror Textured Ivory</option>
                    <option value="waterproof-vinyl">Premium Adhesives Vinyl</option>
                    <option value="standard-bond">80gsm Offset Bond Duplicates</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Finishing Accent
              </label>
              <select
                value={finishing}
                onChange={(e) => setFinishing(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-705 rounded-lg text-xs"
              >
                {product === "rollup-banner" || product === "canvas" ? (
                  <option value="none">Satin Non-curl protective coat</option>
                ) : (
                  <>
                    <option value="matte-lamination">Matte Protective Film</option>
                    <option value="gloss-lamination">Gloss High-Reflective Film</option>
                    <option value="spot-uv">Exquisite High Raised Spot UV</option>
                    <option value="gold-foil">Luxury Metallic Gold Foil</option>
                    <option value="none">Eco Raw Uncoated Trim</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Quantity Slider / Selector */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider">Quantity Required</span>
              <span className="text-blue-600 font-mono">
                {quantity} {product === "rollup-banner" || product === "canvas" ? "unit(s)" : "pcs"}
              </span>
            </div>
            
            {product === "rollup-banner" || product === "canvas" ? (
              <input
                type="range"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            ) : (
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            )}

            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>Min: {product === "rollup-banner" || product === "canvas" ? "1" : "50"}</span>
              {quantity >= 500 && <span className="text-blue-500 font-bold font-sans">12% Bulk Discount Applied!</span>}
              <span>Max: {product === "rollup-banner" || product === "canvas" ? "20" : "5000"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result box & CTAs */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-850/80 p-4 rounded-2xl flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Estimated Quotation</span>
            <span className="text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              KES {currentPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] block text-blue-500 font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded">
              Ready in 24 hrs
            </span>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              ~ KES {(currentPrice / quantity).toFixed(1)}/unit
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/254743603068?text=Hello%20SmartPrints%20Hub,%20I'd%20love%20to%20order%20the%20${product}%20with%20quantity%20${quantity}.%20Total%20estimate%20is%20KES%20${currentPrice}.`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-slate-950 hover:bg-black text-white border border-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>WhatsApp Order</span>
          </a>

          <button
            onClick={() => {
              setTab("upload");
              const el = document.getElementById("upload");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-900 hover:opacity-95 text-white rounded-xl font-sans text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Print</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
