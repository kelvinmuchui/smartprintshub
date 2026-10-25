import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  Send, 
  ShoppingCart, 
  Sparkles, 
  Check, 
  Clock, 
  Layers, 
  ShieldCheck,
  ChevronDown,
  Info
} from "lucide-react";
import { QUOTE_CONFIG_ITEMS } from "../data";
import { QuoteConfigItem, CartItem } from "../types";

interface QuickQuoteCalculatorProps {
  onAddToCart?: (item: CartItem) => void;
  presetProductId?: string;
}

export const QuickQuoteCalculator: React.FC<QuickQuoteCalculatorProps> = ({ 
  onAddToCart,
  presetProductId
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    presetProductId || QUOTE_CONFIG_ITEMS[0].id
  );

  const currentProduct: QuoteConfigItem = useMemo(() => {
    return QUOTE_CONFIG_ITEMS.find((p) => p.id === selectedProductId) || QUOTE_CONFIG_ITEMS[0];
  }, [selectedProductId]);

  const [quantity, setQuantity] = useState<number>(currentProduct.minimumQty);
  const [selectedStockIdx, setSelectedStockIdx] = useState<number>(0);
  const [selectedFinishIdx, setSelectedFinishIdx] = useState<number>(0);
  const [selectedSpeed, setSelectedSpeed] = useState<string>("standard");
  const [notes, setNotes] = useState<string>("");

  // Sync quantity and options when product switches
  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    const prod = QUOTE_CONFIG_ITEMS.find((p) => p.id === id) || QUOTE_CONFIG_ITEMS[0];
    setQuantity(prod.minimumQty);
    setSelectedStockIdx(0);
    setSelectedFinishIdx(0);
    setSelectedSpeed("standard");
  };

  // Pricing math
  const calculation = useMemo(() => {
    const stockMultiplier = currentProduct.stockOptions[selectedStockIdx]?.priceMultiplier ?? 1;
    const finishExtra = currentProduct.finishOptions[selectedFinishIdx]?.extraPerUnit ?? 0;
    const speedMultiplier = currentProduct.leadTimes.find(t => t.speed === selectedSpeed)?.multiplier ?? 1;

    // Volume discount curve: higher tiers get up to 20% discount on base rate
    let volumeDiscount = 0;
    const tiers = currentProduct.quantityTiers;
    const tierIndex = tiers.indexOf(quantity);
    if (tierIndex > 0) {
      volumeDiscount = Math.min(0.20, tierIndex * 0.05); // 5% per tier up to 20%
    }

    const unitBase = (currentProduct.basePrice * stockMultiplier + finishExtra) * (1 - volumeDiscount);
    const unitPrice = Math.round(unitBase * speedMultiplier);
    const totalPrice = Math.round(unitPrice * quantity);

    const regularTotalPrice = Math.round((currentProduct.basePrice * stockMultiplier + finishExtra) * speedMultiplier * quantity);
    const savings = regularTotalPrice > totalPrice ? regularTotalPrice - totalPrice : 0;

    return {
      unitPrice,
      totalPrice,
      volumeDiscount: Math.round(volumeDiscount * 100),
      savings
    };
  }, [currentProduct, quantity, selectedStockIdx, selectedFinishIdx, selectedSpeed]);

  // Construct WhatsApp order text
  const whatsappUrl = useMemo(() => {
    const stockName = currentProduct.stockOptions[selectedStockIdx]?.name || "Standard";
    const finishName = currentProduct.finishOptions[selectedFinishIdx]?.name || "Standard";
    const speedObj = currentProduct.leadTimes.find(t => t.speed === selectedSpeed);

    const text = [
      `*SmartPrints Hub Instant Order Inquiry* 🖨️`,
      `---------------------------------`,
      `• *Item:* ${currentProduct.name}`,
      `• *Quantity:* ${quantity} ${currentProduct.unit}`,
      `• *Material / Stock:* ${stockName}`,
      `• *Finishing:* ${finishName}`,
      `• *Turnaround:* ${speedObj?.label || selectedSpeed}`,
      `• *Estimated Total:* KES ${calculation.totalPrice.toLocaleString()}`,
      notes ? `• *Customer Note:* ${notes}` : null,
      `---------------------------------`,
      `Please confirm artwork submission instructions and production slot at Westlands Shop A11.`
    ].filter(Boolean).join("\n");

    return `https://wa.me/254743603068?text=${encodeURIComponent(text)}`;
  }, [currentProduct, quantity, selectedStockIdx, selectedFinishIdx, selectedSpeed, calculation, notes]);

  const handleAddToCartClick = () => {
    if (!onAddToCart) return;
    const stockName = currentProduct.stockOptions[selectedStockIdx]?.name || "Standard";
    const finishName = currentProduct.finishOptions[selectedFinishIdx]?.name || "Standard";

    const cartItem: CartItem = {
      id: `${currentProduct.id}-${Date.now()}`,
      title: `${currentProduct.name} (${quantity} ${currentProduct.unit})`,
      price: calculation.totalPrice,
      quantity: 1,
      customOptions: {
        paperType: stockName,
        finishing: finishName,
        size: `${quantity} ${currentProduct.unit}`
      }
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      {/* Decorative top ambient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-mono font-bold tracking-widest uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>Smart Estimator & Production Desk</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Instant Quote & Material Calculator
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          Select product parameters for transparent Westlands workshop pricing with live bulk discount curves.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configurator Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* 1. Product Type Selector */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              1. Select Print Item / Service
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUOTE_CONFIG_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleProductChange(item.id)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs font-medium flex flex-col justify-between ${
                    selectedProductId === item.id
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-sm font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <span className="truncate block mb-1">{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    from KES {item.basePrice}/{item.unit.replace(/s$/, "")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Quantity Selection & Tiers */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Order Quantity ({currentProduct.unit})
              </label>
              {calculation.volumeDiscount > 0 && (
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {calculation.volumeDiscount}% Bulk Discount Applied
                </span>
              )}
            </div>
            
            {/* Tier Buttons */}
            <div className="flex flex-wrap gap-2">
              {currentProduct.quantityTiers.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setQuantity(tier)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    quantity === tier
                      ? "bg-[#003B9C] text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tier.toLocaleString()} {currentProduct.unit}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Paper / Material Substrate */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              3. Paper Stock & Substrate
            </label>
            <div className="space-y-2">
              {currentProduct.stockOptions.map((stock, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedStockIdx(idx)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    selectedStockIdx === idx
                      ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      selectedStockIdx === idx ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {selectedStockIdx === idx && <Check className="w-2.5 h-2.5 text-white" />}
                    </span>
                    <span>{stock.name}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {stock.priceMultiplier === 1 ? "Standard Stock" : `+${Math.round((stock.priceMultiplier - 1) * 100)}% Grade`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Finishing Options */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              4. Surface Finishing & Coating
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentProduct.finishOptions.map((finish, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedFinishIdx(idx)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    selectedFinishIdx === idx
                      ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate">{finish.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                    {finish.extraPerUnit === 0 ? "Included" : `+KES ${finish.extraPerUnit}/${currentProduct.unit.replace(/s$/, "")}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Production Lead Time */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              5. Production Speed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentProduct.leadTimes.map((lead) => (
                <button
                  key={lead.speed}
                  type="button"
                  onClick={() => setSelectedSpeed(lead.speed)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedSpeed === lead.speed
                      ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 font-bold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-bold">{lead.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {lead.multiplier === 1 ? "Standard Rate" : lead.multiplier > 1 ? `+${Math.round((lead.multiplier - 1) * 100)}% Rush` : "-10% Economy"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Artwork / Special Requirements (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., We have a print-ready PDF with bleed; need delivery to Westlands Mpaka Rd"
              className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Right Column: Live Price Summary & Actions (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                  Production Estimate
                </span>
                <h4 className="text-lg font-display font-bold text-white">
                  {currentProduct.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Quantity</span>
                <span className="text-sm font-bold text-white font-mono">{quantity} {currentProduct.unit}</span>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-2.5 text-xs font-sans text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Material Substrate:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">
                  {currentProduct.stockOptions[selectedStockIdx]?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Finish Coating:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">
                  {currentProduct.finishOptions[selectedFinishIdx]?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Fulfillment Speed:</span>
                <span className="font-semibold text-white">
                  {currentProduct.leadTimes.find(t => t.speed === selectedSpeed)?.label}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 font-mono">
                <span className="text-slate-400">Unit Cost Rate:</span>
                <span className="text-blue-400 font-bold">KES {calculation.unitPrice.toLocaleString()} / {currentProduct.unit.replace(/s$/, "")}</span>
              </div>
            </div>

            {/* Savings banner if applicable */}
            {calculation.savings > 0 && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <span>Bulk Tier Savings</span>
                <span className="font-bold">-KES {calculation.savings.toLocaleString()}</span>
              </div>
            )}

            {/* Total Display */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-0.5">
                Estimated Net Total
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-white">
                  KES {calculation.totalPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  + M-Pesa / Till Direct
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#003B9C] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider font-sans shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 text-blue-200" />
                <span>Confirm & Order via WhatsApp</span>
              </a>

              {onAddToCart && (
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-blue-400" />
                  <span>Add Custom Spec to Cart</span>
                </button>
              )}
            </div>

            {/* Quality Note */}
            <div className="flex items-start gap-2 text-[11px] text-slate-400 font-sans border-t border-slate-800/60 pt-3">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Free digital PDF proof preview sent to your WhatsApp before printing begins. Zero surprises.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteCalculator;
