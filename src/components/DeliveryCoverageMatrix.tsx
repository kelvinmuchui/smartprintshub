import React, { useState, useMemo } from "react";
import { Truck, MapPin, Search, Clock, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { DELIVERY_ZONES_LIST } from "../data";

// Comprehensive Kenyan counties and key sub-regions mapping
const KENYA_LOCATIONS_DATABASE = [
  { name: "Westlands", zoneId: "zone-1", county: "Nairobi", speed: "1 – 2 Hours Express" },
  { name: "Parklands", zoneId: "zone-1", county: "Nairobi", speed: "1 – 2 Hours Express" },
  { name: "Woodvale Grove", zoneId: "zone-1", county: "Nairobi", speed: "Within 1 Hour" },
  { name: "Mpaka Road", zoneId: "zone-1", county: "Nairobi", speed: "Within 1 Hour" },
  { name: "Sarit Centre / Westgate", zoneId: "zone-1", county: "Nairobi", speed: "Within 1 Hour" },
  { name: "Spring Valley", zoneId: "zone-1", county: "Nairobi", speed: "1 – 2 Hours Express" },
  { name: "Nairobi CBD", zoneId: "zone-2", county: "Nairobi", speed: "2 – 3 Hours Same-Day" },
  { name: "Kilimani / Hurlingham", zoneId: "zone-2", county: "Nairobi", speed: "2 – 3 Hours Same-Day" },
  { name: "Upper Hill", zoneId: "zone-2", county: "Nairobi", speed: "2 – 3 Hours Same-Day" },
  { name: "Lavington", zoneId: "zone-2", county: "Nairobi", speed: "2 – 4 Hours Same-Day" },
  { name: "Kileleshwa", zoneId: "zone-2", county: "Nairobi", speed: "2 – 3 Hours Same-Day" },
  { name: "Karen", zoneId: "zone-2", county: "Nairobi", speed: "3 – 4 Hours Same-Day" },
  { name: "Runda / Gigiri / UN", zoneId: "zone-2", county: "Nairobi", speed: "2 – 4 Hours Same-Day" },
  { name: "Embakasi / Airport JKIA", zoneId: "zone-2", county: "Nairobi", speed: "3 – 4 Hours Same-Day" },
  { name: "Industrial Area", zoneId: "zone-2", county: "Nairobi", speed: "2 – 4 Hours Same-Day" },
  { name: "Kasarani / Roysambu", zoneId: "zone-2", county: "Nairobi", speed: "3 – 4 Hours Same-Day" },
  { name: "Kiambu Town", zoneId: "zone-3", county: "Kiambu", speed: "Next-Day Morning (< 24h)" },
  { name: "Ruiru", zoneId: "zone-3", county: "Kiambu", speed: "Next-Day Morning (< 24h)" },
  { name: "Thika", zoneId: "zone-3", county: "Kiambu", speed: "Next-Day Morning (< 24h)" },
  { name: "Kikuyu", zoneId: "zone-3", county: "Kiambu", speed: "Next-Day Morning (< 24h)" },
  { name: "Machakos Town", zoneId: "zone-3", county: "Machakos", speed: "Next-Day Morning (< 24h)" },
  { name: "Athi River / Syokimau", zoneId: "zone-3", county: "Machakos", speed: "Next-Day Morning (< 24h)" },
  { name: "Kitengela", zoneId: "zone-3", county: "Kajiado", speed: "Next-Day Morning (< 24h)" },
  { name: "Ngong / Rongai", zoneId: "zone-3", county: "Kajiado", speed: "Next-Day Morning (< 24h)" },
  { name: "Mombasa", zoneId: "zone-4", county: "Mombasa", speed: "24 – 48 Hours Overnight" },
  { name: "Kisumu", zoneId: "zone-4", county: "Kisumu", speed: "24 – 48 Hours Overnight" },
  { name: "Nakuru", zoneId: "zone-4", county: "Nakuru", speed: "24 – 48 Hours Overnight" },
  { name: "Eldoret", zoneId: "zone-4", county: "Uasin Gishu", speed: "24 – 48 Hours Overnight" },
  { name: "Nyeri", zoneId: "zone-4", county: "Nyeri", speed: "24 – 48 Hours Overnight" },
  { name: "Meru", zoneId: "zone-4", county: "Meru", speed: "24 – 48 Hours Overnight" },
  { name: "Kakamega", zoneId: "zone-4", county: "Kakamega", speed: "24 – 48 Hours Overnight" },
  { name: "Naivasha", zoneId: "zone-4", county: "Nakuru", speed: "24 – 48 Hours Overnight" },
  { name: "Kisii", zoneId: "zone-4", county: "Kisii", speed: "24 – 48 Hours Overnight" },
  { name: "Malindi", zoneId: "zone-4", county: "Kilifi", speed: "24 – 48 Hours Overnight" },
  { name: "Kericho", zoneId: "zone-4", county: "Kericho", speed: "24 – 48 Hours Overnight" },
  { name: "Garissa", zoneId: "zone-4", county: "Garissa", speed: "48 Hours Tracked" },
  { name: "Kitale", zoneId: "zone-4", county: "Trans-Nzoia", speed: "24 – 48 Hours Overnight" },
  { name: "Embu", zoneId: "zone-4", county: "Embu", speed: "24 – 48 Hours Overnight" }
];

export const DeliveryCoverageMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return KENYA_LOCATIONS_DATABASE.filter(
      loc => loc.name.toLowerCase().includes(q) || loc.county.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-lg text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Nationwide Logistics Network
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Fast Delivery Across Nairobi & 47 Counties
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          Same-day direct motorbike messenger across Westlands, and guaranteed overnight courier delivery across Kenya.
        </div>
      </div>

      {/* Interactive Location Lookup Bar */}
      <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Check Delivery Speed for Your Area or County
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your area or county (e.g., Westlands, Kilimani, Mombasa, Eldoret, Kisumu, Thika)..."
            className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 outline-none shadow-inner"
          />
        </div>

        {/* Live Search Match Dropdown / Chips */}
        {searchResults.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {searchResults.slice(0, 6).map((res, idx) => (
              <div 
                key={idx}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-500/30 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{res.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{res.county} County</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 block">{res.speed}</span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-bold">Courier Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4 Core Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {DELIVERY_ZONES_LIST.map((zone) => (
          <div
            key={zone.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {zone.badge}
                </span>
                <Clock className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>

              <h4 className="text-base font-display font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {zone.zoneName}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans mb-4">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Speed: {zone.speed}
                </div>
                <div className="text-[11px]">
                  Estimated Fee: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{zone.feeEstimate}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Partner: {zone.courierPartner}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1.5">
                  Sample Areas Served
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  {zone.areas.map((area, i) => (
                    <span key={i}>
                      {area}{i < zone.areas.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Tracked Courier</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Guaranteed</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pickup Address reassurance */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold block text-white">Prefer to collect in person?</span>
            <span className="text-[11px] text-slate-400">Walk-ins welcome anytime at Westlands Market, Shop A11 (Directly opposite parking bays).</span>
          </div>
        </div>
        <a
          href="https://google.com/maps/place/Westlands+Market+Nairobi"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-mono uppercase tracking-wider shrink-0 transition-colors"
        >
          Open Google Maps Directions
        </a>
      </div>
    </div>
  );
};

export default DeliveryCoverageMatrix;
