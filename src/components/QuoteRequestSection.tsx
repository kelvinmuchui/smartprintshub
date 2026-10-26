import React, { useState } from "react";
import { 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Truck, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  Building,
  User,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { AVAILABLE_SERVICES } from "./QuoteRequestModal";

interface QuoteRequestSectionProps {
  onOrderTrackRequested?: (trackingCode: string) => void;
  presetServiceId?: string;
}

export const QuoteRequestSection: React.FC<QuoteRequestSectionProps> = ({
  onOrderTrackRequested,
  presetServiceId
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    presetServiceId || AVAILABLE_SERVICES[0].id
  );

  const activeService = AVAILABLE_SERVICES.find(s => s.id === selectedServiceId) || AVAILABLE_SERVICES[0];

  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("100");
  const [selectedStock, setSelectedStock] = useState<string>(activeService.stockOptions[0] || "");
  const [selectedFinish, setSelectedFinish] = useState<string>(activeService.finishOptions[0] || "");
  const [turnaround, setTurnaround] = useState<string>("Standard (24–48 Hours)");
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Shop A11 Pickup (Westlands - Free)");
  const [artworkStatus, setArtworkStatus] = useState<string>("I have print-ready artwork (PDF/AI/PNG)");
  const [projectNotes, setProjectNotes] = useState<string>("");
  const [secondaryServices, setSecondaryServices] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    trackingId: string;
    summary: string;
    emailUrl: string;
    whatsappUrl: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
    const service = AVAILABLE_SERVICES.find(s => s.id === id);
    if (service) {
      setSelectedStock(service.stockOptions[0] || "");
      setSelectedFinish(service.finishOptions[0] || "");
    }
  };

  const toggleSecondaryService = (title: string) => {
    setSecondaryServices(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const generateQuoteText = (trackingCode: string) => {
    const lines = [
      `*SmartPrints Hub - Official Quotation Request* 🖨️`,
      `------------------------------------------`,
      `• *Tracking ID:* ${trackingCode}`,
      `• *Date:* ${new Date().toLocaleDateString("en-GB")}`,
      `------------------------------------------`,
      `*CLIENT INFORMATION*`,
      `• Name: ${customerName}`,
      `• Phone/WhatsApp: ${customerPhone}`,
      `• Email: ${customerEmail}`,
      companyName ? `• Company/Brand: ${companyName}` : null,
      `------------------------------------------`,
      `*PROJECT REQUIREMENTS*`,
      `• Primary Service: ${activeService.title}`,
      secondaryServices.length > 0 ? `• Additional Services: ${secondaryServices.join(", ")}` : null,
      `• Quantity: ${quantity} units`,
      `• Material / Stock: ${selectedStock}`,
      `• Finishing / Coating: ${selectedFinish}`,
      `• Turnaround Urgency: ${turnaround}`,
      `• Delivery / Collection: ${deliveryMethod}`,
      `• Artwork Status: ${artworkStatus}`,
      projectNotes ? `• Special Instructions: ${projectNotes}` : null,
      `------------------------------------------`,
      `*PRODUCTION HUB:*`,
      `SmartPrints Hub, Westlands Market, Shop A11, Nairobi`,
      `Email: smartprintershub1@gmail.com | Tel: +254 743 603 068`,
      `------------------------------------------`,
      `Please confirm pricing estimate, paper samples & production schedule.`
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = async (targetChannel: "whatsapp" | "email") => {
    setFormError(null);

    if (!customerName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!customerPhone.trim()) {
      setFormError("Please enter your phone or WhatsApp number.");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setFormError("Please provide a valid email address so we can send your formal quotation.");
      return;
    }
    if (!quantity.trim()) {
      setFormError("Please specify the required quantity.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          productType: activeService.title,
          quantity: quantity,
          paperType: selectedStock,
          finishing: selectedFinish,
          specs: [
            `Turnaround: ${turnaround}`,
            `Delivery: ${deliveryMethod}`,
            `Artwork: ${artworkStatus}`,
            secondaryServices.length > 0 ? `Secondary: ${secondaryServices.join(", ")}` : null,
            projectNotes ? `Notes: ${projectNotes}` : null
          ].filter(Boolean).join(" | "),
          channel: targetChannel
        })
      });

      const data = await response.json();
      const trackingCode = data.success && data.trackingId ? data.trackingId : `SPH-NBI-${Math.floor(100 + Math.random() * 900)}`;

      const quoteText = generateQuoteText(trackingCode);
      const whatsappUrl = `https://wa.me/254743603068?text=${encodeURIComponent(quoteText)}`;
      const emailSubject = `[Quote Request ${trackingCode}] ${activeService.title} - ${customerName}${companyName ? ` (${companyName})` : ""}`;
      const emailUrl = `mailto:smartprintershub1@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(quoteText)}`;

      setSubmittedData({
        trackingId: trackingCode,
        summary: quoteText,
        emailUrl,
        whatsappUrl
      });

      if (targetChannel === "whatsapp") {
        window.open(whatsappUrl, "_blank");
      } else {
        window.location.href = emailUrl;
      }
    } catch (err) {
      console.error("Quote submission error:", err);
      const fallbackCode = `SPH-NBI-${Math.floor(100 + Math.random() * 900)}`;
      const quoteText = generateQuoteText(fallbackCode);
      const whatsappUrl = `https://wa.me/254743603068?text=${encodeURIComponent(quoteText)}`;
      const emailSubject = `[Quote Request ${fallbackCode}] ${activeService.title} - ${customerName}`;
      const emailUrl = `mailto:smartprintershub1@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(quoteText)}`;

      setSubmittedData({
        trackingId: fallbackCode,
        summary: quoteText,
        emailUrl,
        whatsappUrl
      });

      if (targetChannel === "whatsapp") {
        window.open(whatsappUrl, "_blank");
      } else {
        window.location.href = emailUrl;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyText = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.summary);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  return (
    <div id="quote-request-desk" className="w-full text-left space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Official Client Quotations Desk
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Send a Quote to WhatsApp or Email
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Shop A11 Desk</span>
          </span>
          <span>•</span>
          <span>Westlands, Nairobi</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {submittedData ? (
          <div className="space-y-6 py-4">
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-black text-slate-900 dark:text-white">
                Quote Request Compiled & Dispatched!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                Tracking Reference: <strong className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{submittedData.trackingId}</strong>.
                Our print manager at Westlands Shop A11 is reviewing your specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={submittedData.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-[#003B9C] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Send via WhatsApp (+254 743 603 068)</span>
              </a>

              <a
                href={submittedData.emailUrl}
                className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-transform hover:scale-[1.01] shadow-md"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Send to smartprintershub1@gmail.com</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  Quotation Text Preview
                </span>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Quote Text</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-52">
                {submittedData.summary}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Create Another Quote Request
              </button>

              {onOrderTrackRequested && (
                <button
                  type="button"
                  onClick={() => onOrderTrackRequested(submittedData.trackingId)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Track this Quote in Order Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Step 1: Services Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Select Service Required</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {AVAILABLE_SERVICES.length} Capabilities
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {AVAILABLE_SERVICES.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/30 font-bold shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <span className="text-[11px] leading-tight block mb-1">
                        {service.title}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">
                        {service.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Secondary Services */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Include Additional Services in this Batch? (Optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_SERVICES.filter(s => s.id !== selectedServiceId).map((s) => {
                  const isChecked = secondaryServices.includes(s.title);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSecondaryService(s.title)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-blue-600 text-white border-blue-600 font-bold"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "} {s.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Specifications */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Specifications for {activeService.title}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Quantity Required *
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 100, 250, 500, 1000"
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-1 mt-1.5 overflow-x-auto">
                    {["50", "100", "250", "500", "1,000"].map(qty => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantity(qty.replace(",", ""))}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer"
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Paper Stock / Material
                  </label>
                  <select
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {activeService.stockOptions.map((st, i) => (
                      <option key={i} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Finishing & Coating
                  </label>
                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {activeService.finishOptions.map((fn, i) => (
                      <option key={i} value={fn}>{fn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Turnaround Urgency
                  </label>
                  <select
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Same-Day Rush (Need Today in Westlands/NBI)">⚡ Same-Day Rush (Need today in Westlands/Nairobi)</option>
                    <option value="Standard (24–48 Hours)">🕒 Standard (24–48 Hours)</option>
                    <option value="Economy Bulk (3–5 Days)">📦 Economy Bulk (3–5 Days)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Fulfillment & Delivery
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Shop A11 Pickup (Westlands - Free)">🏬 Pick up at Westlands Shop A11 (FREE)</option>
                    <option value="Westlands Express Rider (KES 200)">🏍️ Westlands Express Rider (KES 200)</option>
                    <option value="Nairobi CBD / Suburbs Courier (KES 400)">🏍️ Greater Nairobi Courier (KES 400)</option>
                    <option value="47 Counties Courier via G4S/Fargo (KES 850)">🚚 47 Counties Courier via Fargo/G4S (KES 850)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Artwork Status
                  </label>
                  <select
                    value={artworkStatus}
                    onChange={(e) => setArtworkStatus(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="I have print-ready artwork (PDF/AI/PNG)">📂 I have print-ready artwork (PDF/AI/PNG)</option>
                    <option value="I need minor edits / layout resizing">✏️ I need minor edits / resizing</option>
                    <option value="I need SmartPrints to design from scratch (+KES 1,000)">🎨 Design from scratch (+KES 1,000)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">
                  Special Instructions / Exact Dimensions / Colors
                </label>
                <input
                  type="text"
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="e.g. Dimensions 85x55mm, single-sided, pantone navy blue, delivery to Woodvale Grove"
                  className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Your Contact Details</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Kelvin Muchui"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">
                    WhatsApp / Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0743 603 068"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="name@company.co.ke"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">
                    Company / Brand
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Westlands Agency Ltd"
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 4: Dispatch Channel Buttons */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  4. Submit Quote Request to SmartPrints:
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Select your preferred channel:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit("whatsapp")}
                  className="p-4 rounded-2xl bg-[#003B9C] hover:bg-blue-700 text-white transition-all text-left flex items-start gap-3.5 group cursor-pointer shadow-md disabled:opacity-50"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-display font-bold">
                        Send to SmartPrints WhatsApp
                      </span>
                      <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[11px] text-blue-100 block mt-0.5 font-sans">
                      Chat directly with Shop A11 technicians: +254 743 603 068
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit("email")}
                  className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white border border-slate-700 transition-all text-left flex items-start gap-3.5 group cursor-pointer shadow-md disabled:opacity-50"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-display font-bold">
                        Send to SmartPrints Email
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[11px] text-slate-300 block mt-0.5 font-sans">
                      Email quote directly to smartprintershub1@gmail.com
                    </span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteRequestSection;
