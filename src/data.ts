import { PrintService, PortfolioItem } from "./types";

export const SERVICES_LIST: PrintService[] = [
  // 1. PRINTING SERVICES
  {
    id: "color-print",
    title: "Vivid Color Printing",
    category: "printing",
    description: "Ultra high-resolution colour lasers and digital offsets on premium gloss, satin, and matte stock.",
    iconName: "Palette",
    startingPrice: "KES 50 / page",
    popularFinishing: "Gloss / Matte Lamination",
    specs: ["Paper Weights: 80gsm to 350gsm", "Rich custom color calibration", "A3, A4 & custom cut dimensions"]
  },
  {
    id: "bw-print",
    title: "High-Volume Laser Printing & Photocopying",
    category: "printing",
    description: "High-speed black & white reproduction. Crispy text contrast and instant bulk volume efficiency.",
    iconName: "Printer",
    startingPrice: "KES 5 / page",
    popularFinishing: "Stapled / Clipped packs",
    specs: ["Perfect for manuals, thesis copy & booklets", "Up to 120 pages per minute throughput", "Double-sided options"]
  },
  {
    id: "passport-photo",
    title: "Biometric Passport Photo Suite",
    category: "printing",
    description: "Official biometric-compliant passport photographs. Soft professional lighting, instant digital copy & prints.",
    iconName: "Camera",
    startingPrice: "KES 200 (Set of 4)",
    popularFinishing: "Satin Die-cut Portrait",
    specs: ["Schengen visa compliant setting", "Kenyan passport biometric-grade background", "Instant digital copy to email"]
  },
  {
    id: "biz-cards",
    title: "Executive Business Cards",
    category: "printing",
    description: "Leave a brilliant physical impression. Soft-touch matte lamination, rounded edges, or elegant corner curves.",
    iconName: "ContactRound",
    startingPrice: "KES 1,200 / 100pcs",
    popularFinishing: "Soft-touch Matte & Spot UV",
    specs: ["Premium 350gsm card stock", "Single or double sided", "Embossing & foil accents available"]
  },
  {
    id: "corporate-docs",
    title: "Company Profiles, Letterheads & Menus",
    category: "printing",
    description: "Bespoke corporate booklet binders, printed menus for premium hotels, and executive watermarked stationery.",
    iconName: "BookOpen",
    startingPrice: "KES 2,500 onwards",
    popularFinishing: "Wire-O Spiral & Perfect Binding",
    specs: ["Full color edge-to-edge bleed", "Premium conquering laid papers", "Spot varnish highlights"]
  },
  {
    id: "receipt-invoice",
    title: "Branded Receipt & Invoice Books",
    category: "printing",
    description: "Self-carbonated duplicates and triplicates with sequential numbering, tailored for local Westlands businesses.",
    iconName: "FileSpreadsheet",
    startingPrice: "KES 1,500 / Book",
    popularFinishing: "NCR Carbonless duplicate/triplicate",
    specs: ["Hard cover binding with pad shields", "Tailor-made grid systems", "Custom corporate logo prints"]
  },

  // 2. BRANDING & LARGE FORMAT
  {
    id: "rollup-banners",
    title: "Luxury Roll Up Banners",
    category: "branding",
    description: "Luxury promotional banners. Satin block-out vinyl fitted on absolute heavy aluminum teardrop stands.",
    iconName: "Flag",
    startingPrice: "KES 6,500 / banner",
    popularFinishing: "Heavy Aluminum teardrop stand & Bag",
    specs: ["Standard dimension: 85cm x 200cm", "Waterproof curl-resistant satin visual", "Vibrant dye-sublimation ink"]
  },
  {
    id: "large-format",
    title: "Large Format A0, A1 & A2 Plotting",
    category: "branding",
    description: "High-precision structural CAD blueprints, engineering plots, and large visual retail storefront posters.",
    iconName: "Maximize",
    startingPrice: "KES 350 / sheet",
    popularFinishing: "Lamination & Core board mounting",
    specs: ["High-speed plotting precision", "Draft papers to outdoor banners", "Exact scaling fidelity"]
  },
  {
    id: "stickers-labels",
    title: "Vinyl Stickers & Product Labels",
    category: "branding",
    description: "Waterproof, UV-resistant die-cut label sheets or custom shapes on glossy or matte vinyl stock.",
    iconName: "Layers",
    startingPrice: "KES 15 / sticker",
    popularFinishing: "Precision digital contour die-cutting",
    specs: ["A4/A3 layout arrays or individual cuts", "Eco-solvent outdoor proof ink", "Gloss, transparent & gold foil materials"]
  },
  {
    id: "merch-printing",
    title: "Corporate Merchandise (Mugs, T-shirts, Canvas)",
    category: "branding",
    description: "Durable sublimation printing for customized corporate coffee mugs, branded t-shirts, and fine art canvas prints.",
    iconName: "Shirt",
    startingPrice: "KES 800 onwards",
    popularFinishing: "Heat-press & fine-canvas framing",
    specs: ["Dual-wall poly mugs & high-grade cotton", "Vibrant wash-safe textile transfers", "Pine-wood visual wrapping for fine canvas"]
  },
  {
    id: "vehicle-branding",
    title: "Vehicle & Window UV Branding",
    category: "branding",
    description: "Turn your standard fleet or Westlands storefront windows into absolute gold mines with high-gloss perforated wraps.",
    iconName: "Sparkles",
    startingPrice: "Quote Required",
    popularFinishing: "Gloss Laminate + Professional Installation",
    specs: ["Perforated One-Way Vision materials", "Anti-scratch cast wraps & vehicle vinyls", "Acoustically & chemically stable materials"]
  },

  // 3. CYBER & DIGITAL
  {
    id: "cv-formatting",
    title: "Professional CV Writing & Laser Editing",
    category: "cyber",
    description: "Tailored executive formatting, ATS-optimized structure & cover-letter editing to unlock opportunities.",
    iconName: "StickyNote",
    startingPrice: "KES 500",
    specs: ["ATS standard keywords injection", "Elegant modern minimalist design template", "Provided in fully editable DOC & PDF"]
  },
  {
    id: "appointment-booking",
    title: "Embassy Visa & Appointment Bookings",
    category: "cyber",
    description: "Official online schedule management, visa applications typing support, and e-citizens credentials booking.",
    iconName: "Globe",
    startingPrice: "KES 500",
    specs: ["Embassy passport submission portal help", "Document package formatting & print matching", "Confidentiality and absolute data privacy compliance"]
  },

  // 4. KRA PIN & TAX SERVICES (CYBER SERVICES SPECIALTIES EXTRACTED SECURELY)
  {
    id: "kra-pin-itax",
    title: "KRA PIN, iTax Returns & SHA Registration",
    category: "cyber",
    description: "Instant KRA PIN registration, electronic Tax returns filing, SHA healthcare portals, eCitizen, NTSA, HELB, NSSF & NHIF support.",
    iconName: "Fingerprint",
    startingPrice: "KES 300 / service",
    specs: ["Speedy registration & direct certificate downloads", "Compliant local tax representation guidelines", "Instant validation confirmation via WhatsApp"]
  }
];

// PORTFOLIO ITEMS
export const PORTFOLIO_LIST: PortfolioItem[] = [
  {
    id: "proj-1",
    title: "Westlands Aura Coffee Identity",
    category: "corporate",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    description: "Complete visual branding including matte menu cards, gold-foil letterheads, and waterproof product mug stickers.",
    beforeImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // plain table
    afterImage: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80" // polished branding
  },
  {
    id: "proj-2",
    title: "Matte Spot-UV Business Cards",
    category: "printing",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    description: "Highly polished business cards with matte velvet base laminate paired with gorgeous glossy raised spot UV lettering.",
  },
  {
    id: "proj-3",
    title: "Teardrop Alum Roll Up Banners",
    category: "branding",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Vivid visual layout graphics printed on block-out satin polyester sheets for a prominent technology expo in Westlands.",
  },
  {
    id: "proj-4",
    title: "Die-Cut Cosmetic Labels",
    category: "branding",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    description: "Beautiful cosmetic product branding wrapper sheets printed on premium transparent gloss vinyl with precise die-cut circles."
  },
  {
    id: "proj-5",
    title: "Kenya Tech Summit Badges & Posters",
    category: "events",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    description: "High-volume personalized neck-badges, dynamic poster prints, and satin certificates for summit attendees.",
  }
];

// SHOPPING PRODUCTS
export interface ShopProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  unit: string;
  finishingOptions: string[];
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "shop-biz-card",
    title: "Executive Business Cards",
    category: "Business Cards",
    price: 1200,
    description: "Pack of 100 super-premium 350gsm business cards with choice of professional laminations.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    unit: "pack (100pcs)",
    finishingOptions: ["Matte Laminating", "Gloss Laminating", "Soft-Touch Matte", "Spot-UV Coating"]
  },
  {
    id: "shop-roll-banner",
    title: "Premium teardrop Roll-Up Banner",
    category: "Banners",
    price: 6500,
    description: "Luxury satin non-curl roll up banner mounted on a heavy-tier aluminum base. Carry bag included.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    unit: "unit",
    finishingOptions: ["Standard Teardrop Stand", "Broad-base Stand"]
  },
  {
    id: "shop-flyers",
    title: "Premium A5 Promotional Flyers",
    category: "Flyers",
    price: 3500,
    description: "Pack of 250 thick glossy A5 flyers perfect for retail product hand-outs and Westlands expos.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    unit: "pack (250pcs)",
    finishingOptions: ["150gsm Gloss Paper", "250gsm Semi-Matte Paper"]
  },
  {
    id: "shop-labels",
    title: "Waterproof Die-Cut Vinyl Stickers",
    category: "Stickers",
    price: 1500,
    description: "Pack of 100 custom die-cut circular or square stickers printed on premium scratch-proof vinyl.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    unit: "pack (100pcs)",
    finishingOptions: ["Gloss Clear Vinyl", "Matte White Vinyl", "Gloss Gold Foil Vinyl"]
  },
  {
    id: "shop-canvas",
    title: "Luxury Fine Art Custom Canvas",
    category: "Canvas / Gifts",
    price: 4900,
    description: "Ultra-vivid printing on woven polyester canvas wrapping around sturdy pine wooden sub-frames.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    unit: "canvas (16x24 inches)",
    finishingOptions: ["Premium Pine Wrap", "Golden Float Frame"]
  },
  {
    id: "shop-receipt-book",
    title: "NCR Receipt duplicates Book",
    category: "Receipt Books",
    price: 1500,
    description: "Sequential numbering duplicates receipt tracker pad. Tailor logo graphics placement for your shop.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    unit: "book (50 sets)",
    finishingOptions: ["Dup (White/Pink)", "Trip (White/Blue/Yellow)"]
  }
];

// FAQS LIST
export const SMARTPRINTS_FAQS = [
  {
    q: "How fast can you deliver standard business cards or flyers?",
    a: "We offer Same-Day express printing for standard orders submitted before 11:30 AM! Standard corporate cards normally take 24 hours. For larger custom branding like vehicle wraps, timeline is subject to scope."
  },
  {
    q: "Where is SmartPrints Hub located in Westlands?",
    a: "We are proudly located in Westlands Market, Shop A11, Westlands, Kenya. Our physical shop is fully equipped with design workstations and digital presses, allowing walk-ins anytime!"
  },
  {
    q: "Can I submit customized layouts, or do you design from scratch?",
    a: "Both! You can drag and drop your final PDF, AI, PSD, or PNG files on our portal. If you need inspiration, try our AI Design Assistant powered by Gemini or sit with our on-site expert designers at Shop A11."
  },
  {
    q: "Do you offer country-wide delivery outside Westlands?",
    a: "Yes! We print and dispatch secure country-wide parcel deliveries through trusted county courier operators (Wells Fargo, G4S, and regional shut-offs) directly to your doorstep."
  },
  {
    q: "How do I make standard payments?",
    a: "We support direct M-Pesa payments (Paybill / Till), bank transfers, card payments during checkout, and cash-deposit invoices for corporate invoice accounts."
  }
];
