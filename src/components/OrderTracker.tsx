import React, { useState, useEffect } from "react";
import { Search, Loader2, CheckCircle2, AlertCircle, MapPin, Phone, MessageSquare, Clock, Calendar, Check } from "lucide-react";
import { TrackingStatus } from "../types";

export default function OrderTracker() {
  const [code, setCode] = useState("SPH-NBI-001");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const queryCode = customCode || code;
    if (!queryCode.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const resp = await fetch(`/api/orders/${queryCode.trim().toUpperCase()}`);
      const data = await resp.json();
      if (resp.ok && data.success) {
        setOrder(data.order);
      } else {
        throw new Error(data.message || "Invalid tracking ID");
      }
    } catch (err: any) {
      setError(err?.message || "Order code not found in state database. Ensure it is correct.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleTrack(undefined, "SPH-NBI-001");
  }, []);

  // Status index solver
  const getStatusStepIndex = (status: string) => {
    if (status === "Received") return 0;
    if (status === "Design") return 1;
    if (status === "Printing") return 2;
    if (status === "Ready for Pickup") return 3;
    if (status === "Picked Up") return 4;
    return 0;
  };

  const currentIndex = order ? getStatusStepIndex(order.status) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 lg:p-10 shadow-xl relative overflow-hidden">
      
      {/* Dynamic top badge background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/5 to-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: input actions Code info */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-sans uppercase mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Job Workflow Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Track Your Print Status
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
              Stay in close loop with your graphics layout and print queue. Enter your unique tracking ID from Westlands sales receipt.
            </p>
          </div>

          <form onSubmit={(e) => handleTrack(e)} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Tracking ID or Order Code
              </label>
              <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-705">
                <Search className="w-5 h-5 text-slate-400 shrink-0 self-center ml-1" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. SPH-NBI-001"
                  className="bg-transparent border-none text-sm outline-none w-full text-slate-900 dark:text-white uppercase font-mono tracking-widest"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-sans text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>Query Tracker Code</span>
            </button>
          </form>

          {/* Preset templates options quick-tab */}
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase mb-2">Preset Trial Jobs in Westlands:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {["SPH-NBI-001", "SPH-NBI-002", "SPH-NBI-003"].map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setCode(id);
                    handleTrack(undefined, id);
                  }}
                  className={`text-[10px] py-1.5 border rounded-lg font-mono transition-all ${
                    code === id
                      ? "bg-blue-600 border-blue-600 text-white font-bold"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: beautiful vertical track flowchart steps line */}
        <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-850 p-6 sm:p-8 rounded-2xl border border-slate-150/70 dark:border-slate-800">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Query Failure</h4>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          {order && (
            <div className="space-y-6">
              
              {/* Client Job meta summary */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {order.trackingId}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.status === "Ready for Pickup"
                        ? "bg-green-500 text-white animate-bounce"
                        : order.status === "Printing"
                        ? "bg-blue-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block font-mono mt-1">
                    Job Spec: {order.quantity} x {order.productType}
                  </span>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">Assigned To:</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {order.clientName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                    Phone: {order.clientPhone}
                  </span>
                </div>
              </div>

              {/* Step Flow timeline visual */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700/80" />

                <div className="space-y-6 relative">
                  {order.statusHistory.map((historyItem, idx) => {
                    const isCompleted = idx <= currentIndex;
                    const isActive = idx === currentIndex;

                    return (
                      <div key={idx} className="flex gap-4 relative">
                        {/* Dynamic status colored bullet */}
                        <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                          isActive
                            ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/30 font-bold"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-[10px] font-mono">{idx + 1}</span>}
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-150/70 dark:border-slate-800 w-full shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                            <h4 className={`text-xs font-bold ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}>
                              {historyItem.stage}
                            </h4>
                            <span className="text-[9px] text-slate-400 font-mono">
                              {historyItem.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {historyItem.notes}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pick-Up physical location guidance if job is ready */}
              {order.status === "Ready for Pickup" && (
                <div className="mt-4 p-4 rounded-2xl bg-green-500/10 border border-green-200/50 dark:border-green-800/20">
                  <h4 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4.5 h-4.5 animate-bounce" />
                    <span>Collect Artwork at Westlands Shop A11</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Your luxury print material is fully packaged in our signature moisture-proof cases. Bring cash code or partial pay confirmation. Open till 7:30 PM!
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a
                      href="https://maps.google.com/?q=Westlands+Market+Westlands"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Get Directions
                    </a>
                    <a
                      href="tel:+254743603068"
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                      Call Shop Partner
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
