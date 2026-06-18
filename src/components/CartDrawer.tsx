import React, { useState } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard, CheckCircle, Smartphone } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout" | "ordered">("cart");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderTrackingId, setOrderTrackingId] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vatRate = 0.16;
  const vat = Math.round(subtotal * vatRate);
  const deliveryFee = deliveryType === "delivery" ? 450 : 0; // standard Westlands parcel fee
  const grandTotal = subtotal + vat + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryType === "delivery" && !deliveryAddress.trim()) {
      alert("Please enter a delivery address inside Westlands.");
      return;
    }

    // Generate random custom local order code
    const index = Math.floor(Math.random() * 899) + 100;
    const trackingCode = `SPH-NBI-${index}`;
    setOrderTrackingId(trackingCode);
    setStep("ordered");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay Background */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Slideout Panel Frame */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between z-10 border-l border-slate-100 dark:border-slate-800 transition-all">
        
        {/* Header Block */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">
              {step === "ordered" ? "Order Confirmed!" : "Your Print Bag"}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-150 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Body Panel */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {step === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400- flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="font-display font-bold text-slate-700 dark:text-slate-300">
                    Your shopping bag is empty
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Browse our premium digital printing products and configure quantities inside the Shop directory to add.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3.5 rounded-xl border border-slate-150 dark:border-slate-800 flex items-start gap-3 bg-slate-50 dark:bg-slate-900/30"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        
                        {item.customOptions && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {item.customOptions.paperType && (
                              <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                                {item.customOptions.paperType}
                              </span>
                            )}
                            {item.customOptions.finishing && (
                              <span className="text-[9px] bg-blue-50 dark:bg-blue-950/30 text-blue-500 px-1.5 py-0.5 rounded font-mono">
                                {item.customOptions.finishing}
                              </span>
                            )}
                          </div>
                        )}

                        <span className="text-xs font-bold text-blue-600 block mt-2 font-mono">
                          KES {item.price.toLocaleString()} unit cost
                        </span>
                      </div>

                      {/* Controls quantity & remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>

                        <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-slate-550 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1.5 text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-550 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={onClearCart}
                    className="text-[10px] text-slate-400 hover:text-rose-500 uppercase tracking-wider font-bold block ml-auto"
                  >
                    Clear All bag items
                  </button>
                </div>
              )}
            </>
          )}

          {step === "checkout" && (
            <form onSubmit={handleCheckout} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Billing & Fulfillment Specifications
              </h4>

              {/* Delivery method wrapper tab */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`py-2 px-3 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    deliveryType === "pickup"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-600"
                  }`}
                >
                  Collect Shop A11
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`py-2 px-3 border rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    deliveryType === "delivery"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-600"
                  }`}
                >
                  Westlands Delivery
                </button>
              </div>

              {deliveryType === "delivery" && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Fulfillment Delivery Address inside Westlands
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. Westlands Commercial Center Phase 2, Office 14B..."
                    className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-850 border rounded-lg text-slate-850 dark:text-white"
                  />
                </div>
              )}

              {/* M-PESA payment prompt integration */}
              <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/25">
                <h5 className="text-xs font-bold text-green-700 dark:text-green-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Interactive M-Pesa SIM Push STK</span>
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed mb-3">
                  Enter your Safaricom phone number below. We will launch an automated STK SIM tool prompt PIN entry request directly to your phone.
                </p>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Safaricom Phone Number</label>
                  <input
                    type="tel"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    placeholder="e.g. 0722123456"
                    className="w-full text-xs p-2 bg-white dark:bg-slate-900 border border-green-500/30 rounded-lg text-slate-900 dark:text-white outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-sans text-xs font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Authorize KES {grandTotal.toLocaleString()} Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                type="button"
                onClick={() => setStep("cart")}
                className="text-[10px] text-slate-400 font-bold block text-center w-full uppercase"
              >
                Return to Bag items
              </button>
            </form>
          )}

          {step === "ordered" && (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto shadow">
                <CheckCircle className="w-9 h-9 animate-bounce" />
              </div>

              <div>
                <h4 className="font-display font-black text-xl text-slate-950 dark:text-white">
                  Payment Authorized!
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                  The Safaricom M-Pesa network push has been verified. We have successfully registered your print job inside our Westlands catalog.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/50 dark:border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Your Order tracking ID:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 block my-1">
                  {orderTrackingId}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Use this code in our 'Track Job' menu tab to view step-by-step layout & production updates at Shop A11.
                </span>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setStep("cart");
                  onClose();
                }}
                className="w-full py-3 bg-[#0A1B3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Continue Browsing Services
              </button>
            </div>
          )}

        </div>

        {/* Footer Totals (Only on cart / checkout) */}
        {step !== "ordered" && cart.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Print Materials Subtotal</span>
                <span className="font-mono">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>VAT (16% Kenya Revenue Margins)</span>
                <span className="font-mono">KES {vat.toLocaleString()}</span>
              </div>
              {deliveryType === "delivery" && (
                <div className="flex justify-between text-slate-500">
                  <span>Safaricom G4S Delivery Fee</span>
                  <span className="font-mono">KES 450</span>
                </div>
              )}
              <div className="h-px bg-slate-200 dark:bg-slate-800/80 my-2" />
              <div className="flex justify-between text-slate-900 dark:text-white font-bold text-sm">
                <span>Grand Total</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 text-base">KES {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {step === "cart" && (
              <button
                onClick={() => setStep("checkout")}
                className="w-full py-4 bg-gradient-to-r from-blue-700 to-[#28A745] text-white hover:opacity-95 rounded-xl font-sans text-xs font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout Specification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
