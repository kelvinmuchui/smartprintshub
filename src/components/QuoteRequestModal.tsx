import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Truck, 
  Layers, 
  FileText, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { SERVICES_LIST } from "../data";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetServiceId?: string;
  onOrderTrackRequested?: (trackingCode: string) => void;
}

interface ServiceOption {
  id: string;
  title: string;
  category: string;
  defaultStock?: string;
  stockOptions: string[];
  finishOptions: string[];
}

export const AVAILABLE_SERVICES: ServiceOption[] = [
  {
    id: "biz-cards",
    title: "Executive Business Cards",
    category: "Commercial Printing",
    defaultStock: "350gsm Silk Artboard",
    stockOptions: ["300gsm Silk Artboard", "350gsm Heavy Artboard", "400gsm Executive Card", "Conqueror Textured White", "Kraft Eco-Board"],
    finishOptions: ["Velvet Soft-Touch Matte", "Thermal Matte Lamination", "High-Gloss UV Lamination", "Spot UV + Velvet", "Metallic Gold / Silver Foil", "3mm Rounded Corners"]
  },
  {
    id: "rollup-banners",
    title: "Roll-Up Banners & Exhibition Stands",
    category: "Signage & Displays",
    defaultStock: "Satin Non-Curl Blockout Vinyl",
    stockOptions: ["Standard 85x200cm Satin Blockout", "Wide 100x200cm Satin Blockout", "Double-Sided 85x200cm Visual", "Heavyweight Fabric Polyester"],
    finishOptions: ["Heavy Aluminum Teardrop Base + Bag", "Luxury Broadbase Chrome Stand + Hard Case", "Eco Retractable Stand"]
  },
  {
    id: "flyers-brochures",
    title: "Marketing Flyers & Tri-Fold Brochures",
    category: "Commercial Printing",
    defaultStock: "150gsm Gloss Art Paper",
    stockOptions: ["150gsm Gloss Art Paper", "200gsm Silk Art Paper", "250gsm Heavy Art Card", "100gsm Bond / Letterhead"],
    finishOptions: ["Double-Sided Full Color (CMYK)", "Single-Sided Full Color", "Tri-Fold 2-Crease Machine Fold", "Bi-Fold Center Crease", "Matte Lamination"]
  },
  {
    id: "stickers-labels",
    title: "Waterproof Stickers & Product Labels",
    category: "Packaging & Labels",
    defaultStock: "Gloss White Waterproof Vinyl",
    stockOptions: ["Gloss White Vinyl (Waterproof)", "Matte Velvet White Vinyl", "Clear Transparent Vinyl", "Continuous Roll BOPP Film", "Holographic / Gold Foil Vinyl"],
    finishOptions: ["Custom Contour Die-Cut", "Kiss-Cut Sheets (A4 / A3 Array)", "Continuous 76mm Core Roll", "UV Outdoor Anti-Scratch Laminate"]
  },
  {
    id: "tshirts-apparel",
    title: "Custom Branded T-Shirts & Polos",
    category: "Branded Apparel",
    defaultStock: "180gsm 100% Combed Ringspun Cotton",
    stockOptions: ["180gsm Ringspun Cotton T-Shirt", "220gsm Heavyweight Luxury Cotton Tee", "240gsm Pique Polo Shirt", "High-Visibility Reflector Vest (OSHA)"],
    finishOptions: ["1-Color Front Chest Screen Print", "Full-Color Front & Back DTF Print", "High-Definition 3D Chest Embroidery", "Reflective Silver Heat-Transfer"]
  },
  {
    id: "corporate-gifts",
    title: "Corporate Merchandise & Gift Packs",
    category: "Corporate Gifts",
    defaultStock: "Double-Wall Stainless Steel 500ml",
    stockOptions: ["500ml Vacuum Thermal Flask", "A5 Hardcover PU Leatherette Notebook", "20mm Satin Lanyard + Swivel Hook", "Golf / Storm Promotional Umbrella"],
    finishOptions: ["Precision Laser Engraving", "Blind Debossing on Cover", "Metallic Gold / Silver Foil Stamp", "Full-Color UV Direct Print"]
  },
  {
    id: "large-format-pvc",
    title: "Large Format Outdoor PVC Banners",
    category: "Signage & Displays",
    defaultStock: "440gsm Heavyweight Reinforced PVC",
    stockOptions: ["440gsm PVC Frontlit Banner", "510gsm Blockout Heavy Duty PVC", "Perforated Mesh Banner (Wind-Permeable)", "One-Way Vision Window Film"],
    finishOptions: ["Welded Hem Borders + Brass Eyelets Every 50cm", "Pole Pockets (Top & Bottom)", "Raw Trim (Poster Cut)"]
  },
  {
    id: "presentation-folders",
    title: "Corporate Presentation Folders & Menus",
    category: "Commercial Printing",
    defaultStock: "350gsm Heavy Board",
    stockOptions: ["350gsm Artboard with Die-Cut Pocket", "Hardcover Stiff Board (Booklet / Menu)", "Conqueror Executive Stock"],
    finishOptions: ["Matte Lamination + Card Slit Pocket", "Gloss Lamination + Double Pockets", "Wire-O Metal Spiral Binding", "Thermal Book Binding"]
  },
  {
    id: "cyber-docs",
    title: "Document Printing, Binding & Cyber Desk",
    category: "Cyber Desk",
    defaultStock: "80gsm Double-A Laser Bond Paper",
    stockOptions: ["80gsm Laser Bond Paper", "100gsm Premium Executive Bond", "Gloss Photographic Card"],
    finishOptions: ["Color Digital Printing", "High-Speed B&W Laser Reproduction", "Wire-O Metal Ring Binding", "Thermal Tape Hardcover Binding", "Gloss Hot Lamination"]
  },
  {
    id: "custom-project",
    title: "Custom Print Project / Multiple Services",
    category: "Custom Fabrication",
    defaultStock: "Custom Specifications",
    stockOptions: ["Custom Material specified in notes", "Vehicle Branding Wrap", "3D Acrylic LED Shop Signage", "Multi-Product Event Bundle"],
    finishOptions: ["Complete Custom Fabrication", "Site Measurement & Installation", "Turnkey Corporate Branding"]
  }
];

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  presetServiceId,
  onOrderTrackRequested
}) => {
  // Primary selection
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    presetServiceId || AVAILABLE_SERVICES[0].id
  );

  const activeService = AVAILABLE_SERVICES.find(s => s.id === selectedServiceId) || AVAILABLE_SERVICES[0];

  // Form Fields
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

  // State management
  const [preferredChannel, setPreferredChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    trackingId: string;
    summary: string;
    emailUrl: string;
    whatsappUrl: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync preset if passed
  useEffect(() => {
    if (presetServiceId) {
      const match = AVAILABLE_SERVICES.find(s => s.id === presetServiceId || s.id.includes(presetServiceId));
      if (match) {
        setSelectedServiceId(match.id);
        setSelectedStock(match.stockOptions[0] || "");
        setSelectedFinish(match.finishOptions[0] || "");
      }
    }
  }, [presetServiceId]);

  // Update stock and finish defaults when service changes
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

  // Compile structured quote text
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

  // Submit quote to server, then dispatch to chosen channel (WhatsApp or Email)
  const handleSubmit = async (targetChannel: "whatsapp" | "email") => {
    setFormError(null);

    // Validation
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

      // Dispatch to requested channel
      if (targetChannel === "whatsapp") {
        window.open(whatsappUrl, "_blank");
      } else {
        // Open user's email client
        window.location.href = emailUrl;
      }

    } catch (err) {
      console.error("Quote submission error:", err);
      // Fallback: generate local ID and still allow user to dispatch
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

  const resetForm = () => {
    setSubmittedData(null);
    setHasCopied(false);
    setFormError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                Westlands Market Shop A11 Desk
              </span>
              <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 dark:text-white leading-tight">
                Request a Custom Printing Quotation
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Close quote request modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
          
          {/* SUCCESS CONFIRMATION STATE */}
          {submittedData ? (
            <div className="space-y-6 py-4">
              <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-black text-slate-900 dark:text-white">
                  Quotation Request Compiled & Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                  Your reference ID is <strong className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{submittedData.trackingId}</strong>. 
                  Our print production team at Shop A11 has logged your specifications.
                </p>
              </div>

              {/* Dual Action Send Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={submittedData.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-[#003B9C] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send / Open in WhatsApp</span>
                </a>

                <a
                  href={submittedData.emailUrl}
                  className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-transform hover:scale-[1.01] shadow-md"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Send to smartprintershub1@gmail.com</span>
                </a>
              </div>

              {/* Quote Text Preview & Copy Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                    Quotation Summary Breakdown
                  </span>
                  <button
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

                <pre className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                  {submittedData.summary}
                </pre>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Create Another Quote Request
                </button>

                <div className="flex items-center gap-2">
                  {onOrderTrackRequested && (
                    <button
                      type="button"
                      onClick={() => {
                        onOrderTrackRequested(submittedData.trackingId);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Track this Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM STATE */
            <div className="space-y-6">

              {/* STEP 1: SELECT PRIMARY SERVICE */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Select Service You Need</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {AVAILABLE_SERVICES.length} Print Capabilities Available
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
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[78px] ${
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

              {/* OPTIONAL MULTI-SERVICE ADDONS */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Need multiple items in this batch? (Optional Bundle Selection)
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

              {/* STEP 2: PROJECT SPECS (Quantity, Material, Finishing) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Project Specifications for {activeService.title}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Quantity */}
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

                  {/* Stock / Material Substrate */}
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

                  {/* Finishing / Lamination */}
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
                  {/* Turnaround Urgency */}
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

                  {/* Delivery / Pickup */}
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

                  {/* Artwork File Status */}
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

                {/* Additional Instructions */}
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

              {/* STEP 3: CUSTOMER CONTACT DETAILS */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Your Contact Information (Where should we send your quote?)</span>
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
                      Company / Brand Name
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Westlands Tech Ltd"
                        className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation error banner */}
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              {/* STEP 4: SENDING DISPATCH OPTIONS */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    4. Choose Where to Send this Quote:
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Free Pre-Press Bleed Audit Included</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Send via WhatsApp */}
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
                        Fastest response (under 15 mins). Direct line to Shop A11 technicians: +254 743 603 068
                      </span>
                    </div>
                  </button>

                  {/* Option B: Send via Email */}
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
                        Dispatches formal quotation to smartprintershub1@gmail.com with your specs
                      </span>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default QuoteRequestModal;
