import { PrintService, PortfolioItem } from "./types";
import printedLanyards from "./assets/images/printed_lanyards_1782060369007.jpg";
import orangeNotebooks from "./assets/images/orange_notebooks_1782060385152.jpg";
import largeFormatBurgerBanner from "./assets/images/large_format_burger_banner_1782060399147.jpg";
import whiteGiftBags from "./assets/images/white_gift_bags_1782060419074.jpg";
import weddingProgramme from "./assets/images/wedding_programme_1782060432014.jpg";
import printedUmbrellas from "./assets/images/printed_umbrellas_1782060450625.jpg";
import stickerRollPrinting from "./assets/images/sticker_roll_printing_1782060466027.jpg";

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
    title: "FestivalMerch Custom Event Lanyards",
    category: "events",
    image: printedLanyards,
    description: "Premium black satin double-sided lanyards printed with 'FestivalMerch' and 'Daniel Engen Productions' branding, finished with high-durability metallic lobster claws."
  },
  {
    id: "proj-2",
    title: "Davidson Services Executive Notebooks",
    category: "corporate",
    image: orangeNotebooks,
    description: "Vibrant orange hardcover promotional notebooks with a crisp blue-and-white 'Davidson Services' company logo and orange elastic security bands."
  },
  {
    id: "proj-3",
    title: "Belanga Hamburgueseria Wide Vinyl Banner",
    category: "branding",
    image: largeFormatBurgerBanner,
    description: "Continuous roll outdoor vinyl printing featuring vibrant, rich-tonality, high-density food photography on heavy-duty waterproof signage."
  },
  {
    id: "proj-4",
    title: "NAC Creatives Custom Carrier Bags",
    category: "corporate",
    image: whiteGiftBags,
    description: "Eco-friendly premium white board gift bags featuring custom dark-typography branding and matching orange rope handles."
  },
  {
    id: "proj-5",
    title: "Commemorative Bifold Wedding Program Booklets",
    category: "printing",
    image: weddingProgramme,
    description: "Elegant bifold mass ceremony programs styled in deep emerald forest green tones and decorative geometric gold foliage accents."
  },
  {
    id: "proj-6",
    title: "Family Pesa Pap! Promotional Umbrellas",
    category: "branding",
    image: printedUmbrellas,
    description: "Branded promotional outdoor marketing umbrellas commissioned for nationwide financial field services agent networks."
  },
  {
    id: "proj-7",
    title: "High-Gloss Continuous Sticker Rolls",
    category: "printing",
    image: stickerRollPrinting,
    description: "Precision DTF UV and laminate label adhesive plotting presenting vivid colorful high-gloss die-cut character decals."
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
