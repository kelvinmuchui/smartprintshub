import { PrintService, PortfolioItem, DeliveryZone, QuoteConfigItem } from "./types";
import printedLanyards from "./assets/images/printed_lanyards_1782060369007.jpg";
import orangeNotebooks from "./assets/images/orange_notebooks_1782060385152.jpg";
import largeFormatBurgerBanner from "./assets/images/large_format_burger_banner_1782060399147.jpg";
import whiteGiftBags from "./assets/images/white_gift_bags_1782060419074.jpg";
import weddingProgramme from "./assets/images/wedding_programme_1782060432014.jpg";
import printedUmbrellas from "./assets/images/printed_umbrellas_1782060450625.jpg";
import stickerRollPrinting from "./assets/images/sticker_roll_printing_1782060466027.jpg";
import vibitRollupBanner from "./assets/images/vibit_rollup_banner_1788509247765.jpg";
import vibitFlyersStack from "./assets/images/vibit_flyers_stack_1788509270498.jpg";
import googleGeminiNotebook from "./assets/images/google_gemini_notebook_1788354702974.jpg";
import googleGeminiRollups from "./assets/images/google_gemini_rollups_1788354724010.jpg";
import afdbBackdropBanner from "./assets/images/afdb_backdrop_banner_1788354765390.jpg";
import afdbRollupBanners from "./assets/images/afdb_rollup_banners_1788354779144.jpg";
import framedLakeCanvas from "./assets/images/framed_lake_canvas_1788354739742.jpg";
import pesaPapUmbrellas from "./assets/images/pesa_pap_umbrellas_1782116346864.jpg";
import luxuryBusinessCards from "./assets/images/luxury_business_cards_1788273973821.jpg";
import brandedCorporateFlasks from "./assets/images/branded_corporate_flasks_1788274006304.jpg";
import luxuryPackagingBox from "./assets/images/luxury_packaging_box_1788274020431.jpg";
import rollupExpoBanner from "./assets/images/rollup_expo_banner_1788273988689.jpg";
import triFoldBrochures from "./assets/images/tri_fold_brochures_1788274041456.jpg";
import rissulStickers from "./assets/images/rissul_stickers.jpg";
import planitHardHat from "./assets/images/planit_projects_hard_hat.jpg";

export {
  printedLanyards,
  orangeNotebooks,
  largeFormatBurgerBanner,
  whiteGiftBags,
  weddingProgramme,
  printedUmbrellas,
  stickerRollPrinting,
  vibitRollupBanner,
  vibitFlyersStack,
  googleGeminiNotebook,
  googleGeminiRollups,
  afdbBackdropBanner,
  afdbRollupBanners,
  framedLakeCanvas,
  pesaPapUmbrellas,
  luxuryBusinessCards,
  brandedCorporateFlasks,
  luxuryPackagingBox,
  rollupExpoBanner,
  triFoldBrochures,
  rissulStickers,
  planitHardHat
};

export const SERVICES_LIST: PrintService[] = [
  // 1. COMMERCIAL & DIGITAL PRINTING
  {
    id: "biz-cards",
    title: "Executive Business Cards",
    category: "printing",
    description: "Make an unmistakable physical impression. Premium 350gsm–400gsm artboard, velvety soft-touch matte lamination, spot UV, or metallic foil stamping.",
    iconName: "ContactRound",
    startingPrice: "KES 1,000 / 100pcs (KES 10/card)",
    popularFinishing: "Soft-Touch Matte + Spot UV",
    specs: ["Stock: 350gsm / 400gsm Silk Artboard", "Single or double-sided full CMYK", "Corner radiuses: Standard square or 3mm rounded"],
    highlight: "Popular with Westlands Executives"
  },
  {
    id: "color-print",
    title: "Vivid Color Digital Offset",
    category: "printing",
    description: "Ultra high-resolution calibrated color printing for marketing collateral, multi-page proposals, flyers, and event programs on gloss, satin, and matte stocks.",
    iconName: "Palette",
    startingPrice: "KES 50 / page",
    popularFinishing: "Gloss / Matte Lamination",
    specs: ["Paper Weights: 80gsm to 350gsm", "Rich custom color calibration & heavy ink density", "A3, A4, A5 & custom die-cut dimensions"],
    highlight: "Same-Day Express Available"
  },
  {
    id: "corporate-docs",
    title: "Company Profiles, Catalogues & Menus",
    category: "printing",
    description: "Bespoke corporate booklet binders, annual financial reports, luxury restaurant menus, and executive watermarked stationery with edge-to-edge bleed.",
    iconName: "BookOpen",
    startingPrice: "KES 2,500 onwards",
    popularFinishing: "Wire-O Spiral & Perfect Glue Binding",
    specs: ["Full color bleed with high-opacity cover coats", "Premium Conqueror, textured & recycled stocks", "Spot UV and blind debossing highlights"]
  },
  {
    id: "receipt-invoice",
    title: "Branded NCR Receipt & Invoice Books",
    category: "printing",
    description: "Self-carbonated duplicate and triplicate books with sequential numbering, wrap-around writing shields, and perforated tear-off sheets.",
    iconName: "FileSpreadsheet",
    startingPrice: "KES 1,500 / Book",
    popularFinishing: "NCR Carbonless duplicate/triplicate",
    specs: ["Hard cover binding with heavy protective pad shields", "Tailor-made grid systems & tax invoice compliance", "Custom corporate logos & serial numbers"]
  },
  {
    id: "bw-print",
    title: "High-Volume Laser Printing & Photocopying",
    category: "printing",
    description: "High-speed crisp black & white reproduction. Razor-sharp typography contrast and instant bulk volume efficiency for legal briefs, tenders, and manuals.",
    iconName: "Printer",
    startingPrice: "KES 5 / page",
    popularFinishing: "Stapled / Wire-O / Thermal tape binding",
    specs: ["Perfect for manuals, thesis submissions & contracts", "High-throughput industrial production speeds", "Automated double-sided collation"]
  },

  // 2. SIGNAGE & EXHIBITION DISPLAYS
  {
    id: "rollup-banners",
    title: "Luxury Teardrop Roll Up Banners",
    category: "signage",
    description: "Sturdy aluminum teardrop base fitted with satin non-curl block-out vinyl. Vibrant high-pigment print that resists studio and outdoor glare.",
    iconName: "Flag",
    startingPrice: "KES 4,500 / stand (Bundle 3+: KES 4,000)",
    popularFinishing: "Heavy Teardrop Stand + Padded Carry Bag",
    specs: ["Standard dimension: 85cm x 200cm & 100cm x 200cm", "Waterproof curl-resistant satin blockout visual", "Fade-resistant dye-sublimation ink"],
    highlight: "Event & Conference Best Seller"
  },
  {
    id: "teardrop-flags",
    title: "Outdoor Teardrop & Telescopic Flags",
    category: "signage",
    description: "Dynamic outdoor promotional flags with heavy cross-bases, water bags, and wind-permeable sublimation polyester fabric for maximum brand visibility.",
    iconName: "Compass",
    startingPrice: "KES 7,500 / unit",
    popularFinishing: "3.5m / 4.5m Aluminum Pole + Water Bag",
    specs: ["Double or single-sided mirror print", "Reinforced pole sleeve & double-stitched hems", "Engineered for 50+ km/h wind resistance"]
  },
  {
    id: "acrylic-3d-signs",
    title: "3D Acrylic Signage & Backlit Lightboxes",
    category: "signage",
    description: "Architectural interior and exterior signage, custom laser-cut acrylic logo wall letters, floating standoff plaques, and LED-illuminated store signs.",
    iconName: "Sparkles",
    startingPrice: "Custom Quote",
    popularFinishing: "Brushed Aluminum Standoffs + LED Halo",
    specs: ["Precision laser-cut 5mm–10mm cast acrylic", "Indoor boardroom & outdoor weather-resistant finishes", "Complete installation support available across Westlands"]
  },
  {
    id: "large-format",
    title: "Large Format A0, A1 & A2 Plotting",
    category: "signage",
    description: "High-precision architectural CAD blueprints, engineering plots, structural schematics, and vibrant photo-realistic storefront posters.",
    iconName: "Maximize",
    startingPrice: "KES 350 / sheet",
    popularFinishing: "UV Matte Lamination & Foam-board Mounting",
    specs: ["High-speed 1200 DPI plotting precision", "Bond papers, tracing vellum, and matte vinyl", "Accurate 1:1 architectural scaling fidelity"]
  },

  // 3. BRANDED APPAREL & WORKWEAR
  {
    id: "branded-tshirts",
    title: "Custom Branded T-Shirts & Polos",
    category: "apparel",
    description: "Premium 100% combed cotton round-neck tees and heavyweight pique polo shirts. Decorated with crisp screen-printing, direct-to-film (DTF), or precision embroidery.",
    iconName: "Shirt",
    startingPrice: "KES 650 / shirt",
    popularFinishing: "High-Density Screen Print or 3D Embroidery",
    specs: ["180gsm–220gsm ringspun cotton", "Fade-proof, wash-tested fabric inks", "Full range: XS through 4XL in 20+ corporate colors"],
    highlight: "Popular for Corporate Uniforms & Events"
  },
  {
    id: "reflector-jackets",
    title: "High-Visibility Branded Reflector Vests",
    category: "apparel",
    description: "Heavy-duty reflective safety jackets and vests with custom company logo screen-printing or heat transfer across the chest and back.",
    iconName: "ShieldCheck",
    startingPrice: "KES 450 / pc",
    popularFinishing: "Double Reflective Bands + Front Zipper & Pocket",
    specs: ["Standard Kenyan OSHA safety compliant", "High-visibility fluorescent neon green & orange", "Durable polyester mesh with reinforced borders"]
  },
  {
    id: "embroidered-caps",
    title: "Embroidered Corporate Caps & Hoodies",
    category: "apparel",
    description: "Structured 6-panel baseball caps, snapbacks, bucket hats, and fleece pullover hoodies with rich textured 3D puffed embroidery.",
    iconName: "Users2",
    startingPrice: "KES 550 / cap",
    popularFinishing: "3D Puff Embroidery + Adjustable Metal Buckle",
    specs: ["Heavy brushed cotton twill caps", "High-thread-count multi-color embroidery", "Long-lasting colorfastness"]
  },

  // 4. PACKAGING, STICKERS & LABELS
  {
    id: "stickers-labels",
    title: "Waterproof Vinyl Stickers & Product Labels",
    category: "packaging",
    description: "Waterproof, oil-proof, and scratch-resistant die-cut stickers on gloss, matte, transparent, or metallic gold foil vinyl. Kiss-cut sheets or individual singles.",
    iconName: "Layers",
    startingPrice: "KES 15 / sticker",
    popularFinishing: "Precision Digital Contour Die-Cutting",
    specs: ["Available on rolls, A3 arrays, or single die-cut units", "Eco-solvent UV-cured outdoor-grade inks", "Adheres securely to glass, plastic, corrugated board & metal"],
    highlight: "Top Pick for Food & Cosmetic Brands"
  },
  {
    id: "kraft-gift-bags",
    title: "Custom Branded Paper Gift Bags & Packaging",
    category: "packaging",
    description: "Eco-friendly premium white board and natural kraft paper gift bags with twisted paper or luxury satin ribbon handles, featuring edge-to-edge brand printing.",
    iconName: "Briefcase",
    startingPrice: "KES 80 / bag",
    popularFinishing: "Reinforced Base + Matte Velvet Lamination",
    specs: ["180gsm to 300gsm reinforced kraft and art paper", "Custom sizing for retail bottles, apparel & gift sets", "Available in small batches or mass retail quantities"]
  },

  // 5. PROMOTIONAL MERCHANDISE & CORPORATE GIFTS
  {
    id: "merch-printing",
    title: "Executive Promotional Merchandise",
    category: "branding",
    description: "Custom laser-engraved insulated thermal flasks, ceramic coffee mugs, metallic stylus pens, branded umbrellas, and USB flash drives for VIP corporate gifts.",
    iconName: "Award",
    startingPrice: "KES 550 onwards",
    popularFinishing: "Laser Etch Engraving or Full-Color UV Print",
    specs: ["Food-grade stainless steel & premium ceramic", "Luxury matte black, metallic, and brand pantone finishes", "Gift box packaging options available"]
  },
  {
    id: "corporate-lanyards",
    title: "Sublimated Lanyards & PVC ID Badges",
    category: "branding",
    description: "Silky satin double-sided sublimation lanyards with metallic swivel hooks, safety breakaway clips, and waterproof rigid PVC employee/conference ID cards.",
    iconName: "FileText",
    startingPrice: "KES 120 / lanyard set",
    popularFinishing: "Satin Heat-Transfer + Metal Lobster Claw",
    specs: ["Widths: 15mm, 20mm, or 25mm", "Photo-quality vibrant full CMYK print", "Matching RFID & CR80 smart cards available"]
  },
  {
    id: "vehicle-branding",
    title: "Vehicle Fleet & Storefront Window Wraps",
    category: "branding",
    description: "Turn company fleets and Westlands storefront windows into 24/7 advertising engines with cast vehicle vinyl and perforated one-way vision graphics.",
    iconName: "TrendingUp",
    startingPrice: "Custom Quote",
    popularFinishing: "Cast Wrap Vinyl + Anti-Scratch UV Overlaminate",
    specs: ["One-Way Vision perforated film for store windows", "Clean peel adhesive that protects vehicle factory paint", "Professional on-site installation across Nairobi"]
  },

  // 6. CYBER, GOV REGISTRATION & VISA PACKS
  {
    id: "kra-pin-itax",
    title: "KRA PIN, iTax Returns & SHA Portal Desk",
    category: "cyber",
    description: "Instant KRA PIN registration, electronic Tax returns filing, SHA health registrations, eCitizen, NTSA vehicle registration, and CR12 company search.",
    iconName: "Fingerprint",
    startingPrice: "KES 300 / service",
    popularFinishing: "Immediate Official Certificate Print & Digital PDF",
    specs: ["Speedy registration & verified downloads", "Compliant local tax representation guidance", "Instant validation and confirmation receipt via WhatsApp"],
    highlight: "Fast-Track Digital Desk"
  },
  {
    id: "passport-photo",
    title: "Biometric Passport & Visa Photo Suite",
    category: "cyber",
    description: "Official biometric-compliant passport and visa photographs (US Visa, Schengen, UK, Canadian, Kenyan E-Passport). Correct lighting, strict sizing, and digital files.",
    iconName: "Camera",
    startingPrice: "KES 200 (Set of 4)",
    popularFinishing: "Satin Die-Cut Biometric Prints + Soft Copy to Email",
    specs: ["Guaranteed embassy biometric compliance", "White, off-white, and light grey backdrops", "Direct upload-ready high-res JPEG provided"]
  },
  {
    id: "appointment-booking",
    title: "Embassy Visa Booking & Travel Documentation",
    category: "cyber",
    description: "Online visa schedule typing support, TLScontact/VFS Global appointment booking, and flight/itinerary document compilation packs.",
    iconName: "Globe",
    startingPrice: "KES 500",
    popularFinishing: "Organized Travel Dossier in Clear Folder",
    specs: ["VFS Global, TLS, and US Embassy portal support", "High-volume dossier print & matching", "Strict confidentiality and personal data protection"]
  }
];

// PORTFOLIO ITEMS
export const PORTFOLIO_LIST: PortfolioItem[] = [
  {
    id: "proj-vibit-college",
    title: "VIBIT Agricultural Training College Roll-up Banner & Promotional Flyers",
    category: "branding",
    client: "VIBIT Agricultural Training College",
    badge: "2 Asset Types",
    image: vibitRollupBanner,
    images: [
      vibitRollupBanner,
      vibitFlyersStack
    ],
    description: "Complete branding and event collateral for VIBIT Agricultural Training College (TVET Accredited, Westlands Nairobi), pairing a high-resolution retractable roll-up banner stand with vibrant printed 'Build a Career in Coffee Industry' marketing flyers."
  },
  {
    id: "proj-google-gemini",
    title: "Google Cloud Gemini Enterprise Masterclass Suite",
    category: "events",
    client: "Google Cloud",
    badge: "2 Asset Types",
    image: googleGeminiNotebook,
    images: [
      googleGeminiNotebook,
      googleGeminiRollups
    ],
    description: "Full event branding suite for Google Cloud's Gemini Enterprise Masterclass in Nairobi, combining custom-printed hardcover executive notebooks with elastic bands and twin retractable roll-up banner stands."
  },
  {
    id: "proj-afdb-workshop",
    title: "AfDB Climate Action Window Inception Workshop",
    category: "events",
    client: "African Development Bank Group",
    badge: "2 Asset Types",
    image: afdbBackdropBanner,
    images: [
      afdbBackdropBanner,
      afdbRollupBanners
    ],
    description: "High-visibility conference branding for the CAW Technical Assistance Inception Workshop at Pullman Hotel Nairobi Upper Hill, featuring a large fabric backdrop display banner and twin pull-up roll-up stands."
  },
  {
    id: "proj-framed-lake-canvas",
    title: "Alpine Lake & Chalet Fine Art Framed Wall Decor",
    category: "printing",
    client: "Corporate Boardroom & Interior Decor",
    badge: "Fine Art Print",
    image: framedLakeCanvas,
    images: [
      framedLakeCanvas
    ],
    description: "Ultra-vibrant high-resolution landscape photographic print mounted on heavy substrate with custom black slim aluminum gallery framing for executive office wall decor."
  },
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
    image: pesaPapUmbrellas,
    description: "Branded promotional outdoor marketing umbrellas commissioned for nationwide financial field services agent networks."
  },
  {
    id: "proj-7",
    title: "High-Gloss Continuous Sticker Rolls",
    category: "printing",
    image: stickerRollPrinting,
    description: "Precision DTF UV and laminate label adhesive plotting presenting vivid colorful high-gloss die-cut character decals."
  },
  {
    id: "proj-8",
    title: "Executive Soft-Touch Business Cards Collection",
    category: "corporate",
    image: luxuryBusinessCards,
    client: "Westlands Executive Suite",
    badge: "Spot UV Finish",
    description: "400gsm heavyweight cotton and silk artboard finished with deep velvety soft-touch matte lamination and gold-embossed logo accents."
  },
  {
    id: "proj-9",
    title: "Laser-Engraved Matte Black Insulated Thermal Flasks",
    category: "corporate",
    image: brandedCorporateFlasks,
    client: "Corporate VIP Gifting",
    badge: "Laser Etch",
    description: "Dual-wall vacuum insulated stainless steel flasks with ultra-crisp permanent fiber-laser logo etching."
  },
  {
    id: "proj-10",
    title: "Custom Rigid Retail Presentation Packaging Boxes",
    category: "branding",
    image: luxuryPackagingBox,
    client: "Boutique Brand Unboxing",
    badge: "Custom Packaging",
    description: "Heavy structural board gift boxes with magnetic closure flaps, velvet interior cushions, and metallic foil stamping."
  },
  {
    id: "proj-11",
    title: "High-Impact Commercial Expo Roll-Up Display",
    category: "events",
    image: rollupExpoBanner,
    client: "Nairobi Trade Expo",
    badge: "Display Stand",
    description: "85cm x 200cm anti-glare satin block-out banner graphics mounted on heavy-duty aluminum teardrop base."
  },
  {
    id: "proj-12",
    title: "Multi-Panel Trifold Marketing Brochures & Menus",
    category: "printing",
    image: triFoldBrochures,
    client: "Corporate Profiles",
    badge: "Trifold Print",
    description: "250gsm satin art card with precision machine creasing, rich color reproduction, and scratch-resistant matte seal."
  },
  {
    id: "proj-13",
    title: "Rissul Brand Waterproof Die-Cut Vinyl Stickers",
    category: "printing",
    image: rissulStickers,
    client: "Rissul Products",
    badge: "Vinyl Decals",
    description: "Waterproof, oil-resistant vinyl stickers with digital contour die-cutting for bottle labeling and retail packaging."
  },
  {
    id: "proj-14",
    title: "PlanIt Projects Site Safety Gear & Hard Hat Branding",
    category: "corporate",
    image: planitHardHat,
    client: "PlanIt Projects Ltd",
    badge: "Industrial Gear",
    description: "UV-cured weather-resistant hard hat decals and high-visibility safety workwear branding for engineering field teams."
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
    image: luxuryBusinessCards,
    unit: "pack (100pcs)",
    finishingOptions: ["Matte Laminating", "Gloss Laminating", "Soft-Touch Matte", "Spot-UV Coating"]
  },
  {
    id: "shop-roll-banner",
    title: "Premium Teardrop Roll-Up Banner",
    category: "Banners",
    price: 6500,
    description: "Luxury satin non-curl roll up banner mounted on a heavy-tier aluminum base. Carry bag included.",
    image: rollupExpoBanner,
    unit: "unit",
    finishingOptions: ["Standard Teardrop Stand", "Broad-base Stand"]
  },
  {
    id: "shop-flyers",
    title: "Premium A5 Promotional Flyers",
    category: "Flyers",
    price: 3500,
    description: "Pack of 250 thick glossy A5 flyers perfect for retail product hand-outs and Westlands expos.",
    image: triFoldBrochures,
    unit: "pack (250pcs)",
    finishingOptions: ["150gsm Gloss Paper", "250gsm Semi-Matte Paper"]
  },
  {
    id: "shop-labels",
    title: "Waterproof Die-Cut Vinyl Stickers",
    category: "Stickers",
    price: 1500,
    description: "Pack of 100 custom die-cut circular or square stickers printed on premium scratch-proof vinyl.",
    image: rissulStickers,
    unit: "pack (100pcs)",
    finishingOptions: ["Gloss Clear Vinyl", "Matte White Vinyl", "Gloss Gold Foil Vinyl"]
  },
  {
    id: "shop-canvas",
    title: "Luxury Fine Art Custom Canvas",
    category: "Canvas / Gifts",
    price: 4900,
    description: "Ultra-vivid printing on woven polyester canvas wrapping around sturdy pine wooden sub-frames.",
    image: framedLakeCanvas,
    unit: "canvas (16x24 inches)",
    finishingOptions: ["Premium Pine Wrap", "Golden Float Frame"]
  },
  {
    id: "shop-receipt-book",
    title: "NCR Receipt Duplicates Book",
    category: "Receipt Books",
    price: 1500,
    description: "Sequential numbering duplicates receipt tracker pad. Tailor logo graphics placement for your shop.",
    image: orangeNotebooks,
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

// TRUST PILLARS
export const TRUST_PILLARS = [
  {
    id: "same-day",
    title: "Same-Day Express Dispatch",
    tagline: "Speed Without Compromise",
    description: "Orders confirmed before 11:30 AM are printed, finished, and dispatched the same day across Westlands and Nairobi.",
    iconName: "Clock"
  },
  {
    id: "quality-guarantee",
    title: "Pre-Press Proofing Guarantee",
    tagline: "Zero Misprints, Zero Surprises",
    description: "Every file undergoes automated bleed, 300 DPI, and CMYK color-gamut validation before going on our production presses.",
    iconName: "ShieldCheck"
  },
  {
    id: "county-delivery",
    title: "47-County Kenya Delivery",
    tagline: "Doorstep & Regional Depots",
    description: "Daily courier dispatches via Wells Fargo, G4S, and Speedaf reaching every county from Mombasa to Turkana.",
    iconName: "Truck"
  },
  {
    id: "direct-whatsapp",
    title: "Direct WhatsApp Production Desk",
    tagline: "Personalized Support",
    description: "Chat directly with a master print technician at Westlands Shop A11 for instant quotes, paper swatch photos, and live order tracking.",
    iconName: "Phone"
  }
];

// KENYA DELIVERY ZONES
export const DELIVERY_ZONES_LIST: DeliveryZone[] = [
  {
    id: "zone-1",
    zoneName: "Zone 1: Westlands & Parklands",
    areas: ["Westlands CBD", "Parklands", "Woodvale Grove", "Mpaka Rd", "Sarit Centre", "Westgate", "Spring Valley"],
    speed: "1 – 2 Hours (Express Rider)",
    feeEstimate: "KES 200 (Free over KES 10,000)",
    courierPartner: "SmartPrints Dedicated Messenger",
    badge: "Fastest Turnaround"
  },
  {
    id: "zone-2",
    zoneName: "Zone 2: Greater Nairobi",
    areas: ["Nairobi CBD", "Kilimani", "Upper Hill", "Lavington", "Kileleshwa", "Karen", "Runda", "Gigiri", "Industrial Area", "Embakasi"],
    speed: "Same-Day (2 – 4 Hours)",
    feeEstimate: "KES 350 – KES 500",
    courierPartner: "Direct Motorcycle / Van Dispatch",
    badge: "Same-Day Guarantee"
  },
  {
    id: "zone-3",
    zoneName: "Zone 3: Nairobi Metropolitan",
    areas: ["Kiambu Town", "Ruiru", "Thika", "Kikuyu", "Machakos", "Athi River", "Kitengela", "Ngong", "Limuru"],
    speed: "Next-Day Morning (Within 24h)",
    feeEstimate: "KES 450 – KES 650",
    courierPartner: "Speedaf / Fargo Express",
    badge: "Next-Day Morning"
  },
  {
    id: "zone-4",
    zoneName: "Zone 4: Upcountry & All 47 Counties",
    areas: ["Mombasa", "Kisumu", "Nakuru", "Eldoret", "Nyeri", "Meru", "Kakamega", "Naivasha", "Kisii", "Malindi", "Garissa", "Kitale"],
    speed: "24 – 48 Hours Overnight",
    feeEstimate: "KES 600 – KES 1,200",
    courierPartner: "Wells Fargo / G4S Kenya / Easy Coach Parcel",
    badge: "Nationwide Tracked"
  }
];

// INTERACTIVE QUOTE CONFIGURATION
export const QUOTE_CONFIG_ITEMS: QuoteConfigItem[] = [
  {
    id: "biz-cards",
    name: "Executive Business Cards",
    category: "Commercial Printing",
    basePrice: 12, // KES per card
    unit: "cards",
    minimumQty: 100,
    quantityTiers: [100, 250, 500, 1000, 2000],
    stockOptions: [
      { name: "350gsm Silk Artboard", priceMultiplier: 1.0 },
      { name: "400gsm Heavy Cardstock", priceMultiplier: 1.2 },
      { name: "Conqueror Textured White", priceMultiplier: 1.45 },
      { name: "Kraft Eco-Board 350gsm", priceMultiplier: 1.15 }
    ],
    finishOptions: [
      { name: "Velvet Soft-Touch Matte", extraPerUnit: 2.5 },
      { name: "High-Gloss UV Lamination", extraPerUnit: 2.0 },
      { name: "Soft-Touch Matte + Spot UV", extraPerUnit: 4.5 },
      { name: "Metallic Gold / Silver Foil", extraPerUnit: 6.0 }
    ],
    leadTimes: [
      { speed: "express", multiplier: 1.2, label: "Same-Day Express (< 4 hrs)" },
      { speed: "standard", multiplier: 1.0, label: "Standard (24 hrs)" },
      { speed: "economy", multiplier: 0.9, label: "Economy (48–72 hrs)" }
    ]
  },
  {
    id: "rollup-banners",
    name: "Teardrop Roll-Up Banner Stand",
    category: "Signage & Displays",
    basePrice: 6500, // KES per stand
    unit: "stands",
    minimumQty: 1,
    quantityTiers: [1, 2, 4, 8, 15],
    stockOptions: [
      { name: "Standard 85cm x 200cm Satin Blockout", priceMultiplier: 1.0 },
      { name: "Wide 100cm x 200cm Satin Blockout", priceMultiplier: 1.25 },
      { name: "Double-Sided 85cm x 200cm Display", priceMultiplier: 1.75 }
    ],
    finishOptions: [
      { name: "Heavy Aluminum Teardrop Base + Carry Bag", extraPerUnit: 0 },
      { name: "Luxury Chrome Wide Base + Hard Case", extraPerUnit: 1500 }
    ],
    leadTimes: [
      { speed: "express", multiplier: 1.15, label: "Same-Day (< 6 hrs)" },
      { speed: "standard", multiplier: 1.0, label: "Standard (24 hrs)" }
    ]
  },
  {
    id: "flyers",
    name: "A5 Marketing Flyers",
    category: "Commercial Printing",
    basePrice: 14,
    unit: "flyers",
    minimumQty: 250,
    quantityTiers: [250, 500, 1000, 2500, 5000],
    stockOptions: [
      { name: "150gsm Gloss Art Paper", priceMultiplier: 1.0 },
      { name: "200gsm Silk Art Paper", priceMultiplier: 1.18 },
      { name: "250gsm Heavy Art Card", priceMultiplier: 1.35 }
    ],
    finishOptions: [
      { name: "Double-Sided Full Color (CMYK)", extraPerUnit: 0 },
      { name: "Single-Sided Full Color (CMYK)", extraPerUnit: -2.0 },
      { name: "Double-Sided + Matte Lamination", extraPerUnit: 3.5 }
    ],
    leadTimes: [
      { speed: "express", multiplier: 1.2, label: "Same-Day Express" },
      { speed: "standard", multiplier: 1.0, label: "Standard (24 hrs)" }
    ]
  },
  {
    id: "tshirts",
    name: "Branded Round-Neck Cotton T-Shirts",
    category: "Branded Apparel",
    basePrice: 650,
    unit: "shirts",
    minimumQty: 10,
    quantityTiers: [10, 25, 50, 100, 250, 500],
    stockOptions: [
      { name: "180gsm 100% Combed Ringspun Cotton", priceMultiplier: 1.0 },
      { name: "220gsm Heavyweight Luxury Cotton", priceMultiplier: 1.3 }
    ],
    finishOptions: [
      { name: "1-Color Front Chest Screen Print", extraPerUnit: 0 },
      { name: "Full-Color Front & Back DTF Print", extraPerUnit: 150 },
      { name: "High-Definition 3D Chest Embroidery", extraPerUnit: 220 }
    ],
    leadTimes: [
      { speed: "standard", multiplier: 1.0, label: "Standard (2–3 Days)" },
      { speed: "express", multiplier: 1.25, label: "Rush Priority (24 hrs)" }
    ]
  },
  {
    id: "polos",
    name: "Executive Branded Pique Polo Shirts",
    category: "Branded Apparel",
    basePrice: 1100,
    unit: "shirts",
    minimumQty: 10,
    quantityTiers: [10, 25, 50, 100, 200],
    stockOptions: [
      { name: "220gsm Premium Pique Cotton", priceMultiplier: 1.0 },
      { name: "240gsm Luxury Bio-Washed Pique", priceMultiplier: 1.25 }
    ],
    finishOptions: [
      { name: "Left-Chest Multi-Color Embroidery", extraPerUnit: 0 },
      { name: "Chest Embroidery + Sleeve / Back Logo", extraPerUnit: 200 }
    ],
    leadTimes: [
      { speed: "standard", multiplier: 1.0, label: "Standard (3–4 Days)" },
      { speed: "express", multiplier: 1.25, label: "Rush Priority (48 hrs)" }
    ]
  },
  {
    id: "stickers",
    name: "Waterproof Die-Cut Vinyl Stickers",
    category: "Packaging & Labels",
    basePrice: 15,
    unit: "stickers",
    minimumQty: 100,
    quantityTiers: [100, 250, 500, 1000, 2500],
    stockOptions: [
      { name: "Gloss White Vinyl (Waterproof)", priceMultiplier: 1.0 },
      { name: "Matte Velvet Vinyl (Waterproof)", priceMultiplier: 1.1 },
      { name: "Clear Transparent Vinyl", priceMultiplier: 1.2 },
      { name: "Metallic Gold / Holographic Vinyl", priceMultiplier: 1.4 }
    ],
    finishOptions: [
      { name: "Custom Contour Single Die-Cut", extraPerUnit: 0 },
      { name: "Kiss-Cut Sheets (A4 / A3 Array)", extraPerUnit: -2.0 },
      { name: "UV Outdoor Anti-Scratch Laminate", extraPerUnit: 3.0 }
    ],
    leadTimes: [
      { speed: "express", multiplier: 1.2, label: "Same-Day Express" },
      { speed: "standard", multiplier: 1.0, label: "Standard (24 hrs)" }
    ]
  },
  {
    id: "reflectors",
    name: "High-Visibility Branded Reflector Vests",
    category: "Branded Apparel",
    basePrice: 450,
    unit: "vests",
    minimumQty: 10,
    quantityTiers: [10, 25, 50, 100, 250, 500],
    stockOptions: [
      { name: "Neon Lime Green Mesh (OSHA Compliant)", priceMultiplier: 1.0 },
      { name: "Fluorescent Orange Mesh (OSHA Compliant)", priceMultiplier: 1.0 }
    ],
    finishOptions: [
      { name: "Chest Logo + Back Company Name Print", extraPerUnit: 0 },
      { name: "Reflective Silver Heat-Transfer Logo", extraPerUnit: 80 }
    ],
    leadTimes: [
      { speed: "express", multiplier: 1.2, label: "Same-Day (Confirmed AM)" },
      { speed: "standard", multiplier: 1.0, label: "Standard (24 hrs)" }
    ]
  },
  {
    id: "notebooks",
    name: "Executive Hardcover Branded Notebooks",
    category: "Promotional Merchandise",
    basePrice: 850,
    unit: "books",
    minimumQty: 25,
    quantityTiers: [25, 50, 100, 250, 500],
    stockOptions: [
      { name: "A5 Hardcover PU Leatherette + Elastic Band", priceMultiplier: 1.0 },
      { name: "A5 Linen Fabric Hardcover + Pen Loop", priceMultiplier: 1.25 }
    ],
    finishOptions: [
      { name: "Blind Debossed Company Logo", extraPerUnit: 0 },
      { name: "Metallic Gold / Silver Foil Stamped Logo", extraPerUnit: 80 },
      { name: "Full-Color Raised UV Print", extraPerUnit: 120 }
    ],
    leadTimes: [
      { speed: "standard", multiplier: 1.0, label: "Standard (3–4 Days)" },
      { speed: "express", multiplier: 1.2, label: "Express Priority (48 hrs)" }
    ]
  }
];

// ARTWORK & PRE-PRESS GUIDELINES
export const ARTWORK_GUIDELINES = {
  requirements: [
    {
      title: "3mm Bleed & Safety Margin",
      desc: "Extend background artwork 3mm beyond the final cut line. Keep all essential text, logos, and QR codes at least 4mm inside the trim edge to prevent clipping during industrial guillotine cutting.",
      icon: "Crop"
    },
    {
      title: "CMYK Color Gamut",
      desc: "Prepare designs in CMYK (Cyan, Magenta, Yellow, Black) color mode, preferably Fogra39 or US Web Coated (SWOP). Screen RGB colors will undergo automated conversion which may subtly shift ultra-neon hues.",
      icon: "Palette"
    },
    {
      title: "300 DPI High Resolution",
      desc: "Ensure all bitmap images, photography, and raster textures are minimum 300 DPI at 100% final physical print size. Web images at 72 DPI will appear pixelated on high-precision laser presses.",
      icon: "Sparkles"
    },
    {
      title: "Convert Fonts to Outlines / Curves",
      desc: "Convert all typography to vector outlines (Ctrl+Shift+O in Illustrator or Cmd+Shift+O). This guarantees exact font rendering without missing-typeface substitution errors.",
      icon: "FileCheck"
    }
  ],
  acceptedFormats: [
    { ext: "PDF", name: "Print-Ready PDF/X-1a or PDF/X-4 (Recommended)", bestFor: "All Commercial & Multi-Page Printing" },
    { ext: "AI", name: "Adobe Illustrator (.ai)", bestFor: "Vector Logos, Cut Contours & Signage" },
    { ext: "PSD", name: "Adobe Photoshop (.psd)", bestFor: "Layered 300 DPI Raster Compositions" },
    { ext: "SVG", name: "Scalable Vector Graphics (.svg)", bestFor: "Crisp Plotting & Contour Die-Cuts" },
    { ext: "TIFF", name: "Tagged Image File (.tiff, LZW lossless)", bestFor: "Fine Art Canvas & Billboard Graphics" },
    { ext: "PNG/JPG", name: "High-Res PNG / JPEG (300 DPI minimum)", bestFor: "General Photo & Sticker Submissions" }
  ]
};
