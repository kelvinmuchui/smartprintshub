import React, { useState } from "react";
import { 
  Check, 
  Phone, 
  Calculator, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Info,
  BadgeCheck,
  ChevronRight,
  FileText
} from "lucide-react";
import { 
  luxuryBusinessCards, 
  rollupExpoBanner, 
  vibitRollupBanner, 
  vibitFlyersStack, 
  triFoldBrochures, 
  rissulStickers, 
  stickerRollPrinting, 
  brandedCorporateFlasks, 
  orangeNotebooks, 
  printedLanyards, 
  largeFormatBurgerBanner,
  planitHardHat,
  pesaPapUmbrellas
} from "../data";

interface PricingRateMatrixProps {
  onSelectForCalculator?: (serviceId: string) => void;
  onRequestQuote?: (serviceId?: string) => void;
}

interface PriceBundle {
  quantity: string;
  price: number;
  unitRate?: string;
  isPopular?: boolean;
}

interface PricingPackage {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  baseStartingPrice: string;
  perUnitRate: string;
  turnaround: string;
  stock: string;
  finishing: string;
  moq: string;
  features: string[];
  bundles: PriceBundle[];
  calculatorId: string;
}

interface PricingCategory {
  id: string;
  label: string;
  iconName: string;
  description: string;
  packages: PricingPackage[];
  tableHeaders: string[];
  tableRows: {
    name: string;
    stock: string;
    turnaround: string;
    tiers: { qty: string; price: string }[];
    unitRate: string;
    calculatorId: string;
  }[];
}

export const PricingRateMatrix: React.FC<PricingRateMatrixProps> = ({ 
  onSelectForCalculator,
  onRequestQuote
}) => {
  const [activeTab, setActiveTab] = useState<string>("biz-cards");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const categories: PricingCategory[] = [
    {
      id: "biz-cards",
      label: "Business Cards",
      iconName: "ContactRound",
      description: "Executive business card printing with transparent tier pricing, custom laminations, and premium heavyweight artboard.",
      packages: [
        {
          id: "bc-standard",
          title: "Standard 300gsm Silk",
          subtitle: "Essential Starter Cards",
          image: luxuryBusinessCards,
          baseStartingPrice: "KSh 1,000",
          perUnitRate: "KSh 10 / card",
          turnaround: "Same-Day (2–4 hrs)",
          stock: "300gsm Premium Silk Artboard",
          finishing: "Smooth Uncoated or Light Silk Varnish",
          moq: "100 Cards",
          features: [
            "Crisp 1200 DPI double-sided full CMYK printing",
            "Precision automated guillotine cutting",
            "Free 3mm bleed & pre-press proof review",
            "Boxed in durable transparent card holders"
          ],
          bundles: [
            { quantity: "100 cards", price: 1000, unitRate: "KSh 10.00/card" },
            { quantity: "250 cards", price: 2200, unitRate: "KSh 8.80/card", isPopular: true },
            { quantity: "500 cards", price: 3800, unitRate: "KSh 7.60/card" },
            { quantity: "1,000 cards", price: 6500, unitRate: "KSh 6.50/card" }
          ],
          calculatorId: "biz-cards"
        },
        {
          id: "bc-laminated",
          title: "Matte / Gloss Laminated",
          subtitle: "Executive Most Popular",
          badge: "Most Popular",
          badgeColor: "bg-blue-600 text-white",
          image: luxuryBusinessCards,
          baseStartingPrice: "KSh 1,500",
          perUnitRate: "KSh 15 / card",
          turnaround: "Same-Day (3–4 hrs)",
          stock: "350gsm Heavy Artboard",
          finishing: "Thermal Matte or High-Gloss Lamination",
          moq: "100 Cards",
          features: [
            "Waterproof & tear-resistant protective barrier",
            "Anti-scuff matte or vibrant high-contrast gloss",
            "Sharp double-sided full-color registration",
            "Free digital mockup & 300 DPI proof approval"
          ],
          bundles: [
            { quantity: "100 cards", price: 1500, unitRate: "KSh 15.00/card" },
            { quantity: "250 cards", price: 3200, unitRate: "KSh 12.80/card" },
            { quantity: "500 cards", price: 5200, unitRate: "KSh 10.40/card", isPopular: true },
            { quantity: "1,000 cards", price: 8500, unitRate: "KSh 8.50/card" }
          ],
          calculatorId: "biz-cards"
        },
        {
          id: "bc-velvet",
          title: "Velvet Soft-Touch Luxury",
          subtitle: "Tactile Suede Finish",
          badge: "Premium Feel",
          badgeColor: "bg-purple-600 text-white",
          image: luxuryBusinessCards,
          baseStartingPrice: "KSh 2,200",
          perUnitRate: "KSh 22 / card",
          turnaround: "24 Hours Dispatch",
          stock: "350gsm–400gsm Heavy Silk Cardstock",
          finishing: "Ultra-Matte Velvet Soft-Touch Skin",
          moq: "100 Cards",
          features: [
            "Luxurious suede peach-skin tactile texture",
            "Zero finger-print smudges and reflection-free",
            "Heavy 400gsm board weight for maximum firmness",
            "Optional 3mm rounded corner edging"
          ],
          bundles: [
            { quantity: "100 cards", price: 2200, unitRate: "KSh 22.00/card" },
            { quantity: "250 cards", price: 4500, unitRate: "KSh 18.00/card" },
            { quantity: "500 cards", price: 7500, unitRate: "KSh 15.00/card", isPopular: true },
            { quantity: "1,000 cards", price: 12000, unitRate: "KSh 12.00/card" }
          ],
          calculatorId: "biz-cards"
        },
        {
          id: "bc-foil-spotuv",
          title: "Spot UV & Metallic Foil",
          subtitle: "VIP Corporate Elite",
          badge: "Executive VIP",
          badgeColor: "bg-amber-600 text-white",
          image: luxuryBusinessCards,
          baseStartingPrice: "KSh 3,200",
          perUnitRate: "KSh 32 / card",
          turnaround: "24–48 Hours",
          stock: "400gsm Heavyweight Artboard",
          finishing: "Raised 3D Spot UV or Gold/Silver Stamping",
          moq: "100 Cards",
          features: [
            "Glossy raised clear varnish highlights on logo",
            "Reflective genuine metallic gold or silver leaf",
            "Paired over velvet matte contrast foundation",
            "Highest physical impact in corporate networking"
          ],
          bundles: [
            { quantity: "100 cards", price: 3200, unitRate: "KSh 32.00/card" },
            { quantity: "250 cards", price: 6000, unitRate: "KSh 24.00/card" },
            { quantity: "500 cards", price: 10500, unitRate: "KSh 21.00/card", isPopular: true },
            { quantity: "1,000 cards", price: 17500, unitRate: "KSh 17.50/card" }
          ],
          calculatorId: "biz-cards"
        }
      ],
      tableHeaders: ["Package / Finish", "Paper Stock", "Turnaround", "100 Cards", "250 Cards", "500 Cards", "1,000 Cards", "Per-Unit From"],
      tableRows: [
        {
          name: "Standard Silk (300gsm)",
          stock: "300gsm Silk Artboard",
          turnaround: "Same-Day (2-4 hrs)",
          tiers: [
            { qty: "100", price: "KSh 1,000" },
            { qty: "250", price: "KSh 2,200" },
            { qty: "500", price: "KSh 3,800" },
            { qty: "1000", price: "KSh 6,500" }
          ],
          unitRate: "KSh 6.50",
          calculatorId: "biz-cards"
        },
        {
          name: "Matte / Gloss Laminated (350gsm)",
          stock: "350gsm Heavy Artboard",
          turnaround: "Same-Day (3-4 hrs)",
          tiers: [
            { qty: "100", price: "KSh 1,500" },
            { qty: "250", price: "KSh 3,200" },
            { qty: "500", price: "KSh 5,200" },
            { qty: "1000", price: "KSh 8,500" }
          ],
          unitRate: "KSh 8.50",
          calculatorId: "biz-cards"
        },
        {
          name: "Velvet Soft-Touch Luxury",
          stock: "350gsm–400gsm Board",
          turnaround: "24 Hours",
          tiers: [
            { qty: "100", price: "KSh 2,200" },
            { qty: "250", price: "KSh 4,500" },
            { qty: "500", price: "KSh 7,500" },
            { qty: "1000", price: "KSh 12,000" }
          ],
          unitRate: "KSh 12.00",
          calculatorId: "biz-cards"
        },
        {
          name: "Spot UV / Gold Foil (350gsm)",
          stock: "400gsm Heavy Card",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "100", price: "KSh 3,200" },
            { qty: "250", price: "KSh 6,000" },
            { qty: "500", price: "KSh 10,500" },
            { qty: "1000", price: "KSh 17,500" }
          ],
          unitRate: "KSh 17.50",
          calculatorId: "biz-cards"
        }
      ]
    },
    {
      id: "banners-signage",
      label: "Banners & Large Format",
      iconName: "Flag",
      description: "Trade fair roll-up displays, outdoor weather-proof PVC banners, and teardrop flags with industrial durability.",
      packages: [
        {
          id: "banner-rollup-std",
          title: "Standard Roll-Up Banner (85x200cm)",
          subtitle: "Exhibition Best Seller",
          badge: "Most Popular",
          badgeColor: "bg-blue-600 text-white",
          image: rollupExpoBanner,
          baseStartingPrice: "KSh 4,500",
          perUnitRate: "KSh 4,500 / stand",
          turnaround: "Same-Day (< 4 hrs)",
          stock: "Non-Curl Satin Blockout Vinyl",
          finishing: "Aluminum Retractable Teardrop Base",
          moq: "1 Stand",
          features: [
            "Ultra-vivid 1440 DPI dye-sublimation print",
            "Anti-curl edges that stay completely straight",
            "Lightweight aluminum chassis with dual feet",
            "Includes heavy-duty padded black carry bag"
          ],
          bundles: [
            { quantity: "1 stand", price: 4500, unitRate: "KSh 4,500/unit" },
            { quantity: "2 stands", price: 8500, unitRate: "KSh 4,250/unit", isPopular: true },
            { quantity: "3 stands", price: 12000, unitRate: "KSh 4,000/unit" },
            { quantity: "5 stands", price: 19000, unitRate: "KSh 3,800/unit" }
          ],
          calculatorId: "rollup-banners"
        },
        {
          id: "banner-rollup-luxury",
          title: "Luxury Broad-Base Chrome Roll-Up",
          subtitle: "Executive Boardroom & Expo",
          badge: "Luxury Base",
          badgeColor: "bg-indigo-600 text-white",
          image: vibitRollupBanner,
          baseStartingPrice: "KSh 6,500",
          perUnitRate: "KSh 6,500 / stand",
          turnaround: "Same-Day (< 6 hrs)",
          stock: "Heavy-Weight Polyester Fabric Banner",
          finishing: "Broad Teardrop Chrome Footless Stand",
          moq: "1 Stand",
          features: [
            "Solid heavy teardrop base (zero tilt or wobble)",
            "Chrome metallic side caps for executive prestige",
            "Zero glare under bright event stage spotlights",
            "Hardened canvas travel case with zip & strap"
          ],
          bundles: [
            { quantity: "1 stand", price: 6500, unitRate: "KSh 6,500/unit" },
            { quantity: "2 stands", price: 12000, unitRate: "KSh 6,000/unit" },
            { quantity: "4 stands", price: 23000, unitRate: "KSh 5,750/unit", isPopular: true },
            { quantity: "8 stands", price: 44000, unitRate: "KSh 5,500/unit" }
          ],
          calculatorId: "rollup-banners"
        },
        {
          id: "banner-pvc-outdoor",
          title: "Heavyweight Outdoor PVC Banner",
          subtitle: "Per Square Metre Pricing",
          image: largeFormatBurgerBanner,
          baseStartingPrice: "KSh 800",
          perUnitRate: "From KSh 800 / m²",
          turnaround: "Same-Day Dispatch",
          stock: "440gsm–510gsm Reinforced PVC Frontlit",
          finishing: "Welded Hemming + Brass Eyelets Every 50cm",
          moq: "1 Square Metre",
          features: [
            "100% waterproof and UV fade-resistant inks",
            "Heavy welded outer borders to withstand gale winds",
            "Rust-proof brass eyelets for rope or cable-tie fixing",
            "Ideal for road signage, billboards & building wraps"
          ],
          bundles: [
            { quantity: "1–3 m²", price: 1200, unitRate: "KSh 1,200/m²" },
            { quantity: "4–10 m²", price: 1000, unitRate: "KSh 1,000/m²", isPopular: true },
            { quantity: "11–25 m²", price: 850, unitRate: "KSh 850/m²" },
            { quantity: "25+ m²", price: 750, unitRate: "KSh 750/m²" }
          ],
          calculatorId: "rollup-banners"
        },
        {
          id: "banner-teardrop-flag",
          title: "Outdoor Teardrop & Telescopic Flags",
          subtitle: "Wind-Resistant Promo Flags",
          badge: "Event Outdoor",
          badgeColor: "bg-emerald-600 text-white",
          image: pesaPapUmbrellas,
          baseStartingPrice: "KSh 7,500",
          perUnitRate: "KSh 7,500 / complete unit",
          turnaround: "24–48 Hours",
          stock: "115gsm Knitted Wind-Permeable Polyester",
          finishing: "3.5m Aluminum Pole + Cross Base + Water Bag",
          moq: "1 Flag Unit",
          features: [
            "Double-sided mirrored visibility in full color",
            "Fiberglass flexible pole tip for dynamic curvature",
            "Heavy ground spike or indoor cross base + water ring",
            "Engineered for high wind outdoor forecourts"
          ],
          bundles: [
            { quantity: "1 flag (3.5m)", price: 7500, unitRate: "KSh 7,500/unit" },
            { quantity: "2 flags", price: 14000, unitRate: "KSh 7,000/unit", isPopular: true },
            { quantity: "4 flags", price: 26000, unitRate: "KSh 6,500/unit" },
            { quantity: "6+ flags", price: 36000, unitRate: "KSh 6,000/unit" }
          ],
          calculatorId: "rollup-banners"
        }
      ],
      tableHeaders: ["Display Type", "Specifications", "Turnaround", "1 Unit", "2 Units", "4 Units", "Bulk (8+)", "Starting Rate"],
      tableRows: [
        {
          name: "Standard Roll-Up (85x200cm)",
          stock: "Non-curl Satin Blockout + Aluminum Stand",
          turnaround: "Same-Day (< 4 hrs)",
          tiers: [
            { qty: "1", price: "KSh 4,500" },
            { qty: "2", price: "KSh 8,500" },
            { qty: "4", price: "KSh 16,000" },
            { qty: "8", price: "KSh 30,400" }
          ],
          unitRate: "KSh 3,800",
          calculatorId: "rollup-banners"
        },
        {
          name: "Luxury Broadbase (85x200cm)",
          stock: "Footless Chrome Teardrop Stand",
          turnaround: "Same-Day (< 6 hrs)",
          tiers: [
            { qty: "1", price: "KSh 6,500" },
            { qty: "2", price: "KSh 12,000" },
            { qty: "4", price: "KSh 23,000" },
            { qty: "8", price: "KSh 44,000" }
          ],
          unitRate: "KSh 5,500",
          calculatorId: "rollup-banners"
        },
        {
          name: "Outdoor PVC Banner (per m²)",
          stock: "440gsm Waterproof Hemmed + Eyelets",
          turnaround: "Same-Day (2-4 hrs)",
          tiers: [
            { qty: "1 m²", price: "KSh 1,200" },
            { qty: "5 m²", price: "KSh 5,000" },
            { qty: "10 m²", price: "KSh 9,000" },
            { qty: "25 m²", price: "KSh 20,000" }
          ],
          unitRate: "KSh 800/m²",
          calculatorId: "rollup-banners"
        },
        {
          name: "Teardrop Flag 3.5m Set",
          stock: "Polyester Flag + Pole + Water Bag",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "1", price: "KSh 7,500" },
            { qty: "2", price: "KSh 14,000" },
            { qty: "4", price: "KSh 26,000" },
            { qty: "8", price: "KSh 48,000" }
          ],
          unitRate: "KSh 6,000",
          calculatorId: "rollup-banners"
        }
      ]
    },
    {
      id: "flyers-brochures",
      label: "Flyers & Brochures",
      iconName: "FileSpreadsheet",
      description: "High-volume offset and digital promotional flyers, tri-fold brochures, and corporate presentation folders.",
      packages: [
        {
          id: "flyer-a5-gloss",
          title: "A5 Double-Sided Flyers (150gsm)",
          subtitle: "Marketing Campaign Standard",
          badge: "High Volume Value",
          badgeColor: "bg-blue-600 text-white",
          image: vibitFlyersStack,
          baseStartingPrice: "KSh 4,500",
          perUnitRate: "KSh 9.00 / flyer",
          turnaround: "Same-Day (< 6 hrs)",
          stock: "150gsm High-Gloss Art Paper",
          finishing: "Double-Sided Full CMYK Process",
          moq: "250 Flyers",
          features: [
            "Vibrant photographic color fidelity",
            "Smooth gloss reflective paper coating",
            "Sharp typography and clear QR code reproduction",
            "Collated in protective 250-pack wraps"
          ],
          bundles: [
            { quantity: "250 flyers", price: 3500, unitRate: "KSh 14.00/pc" },
            { quantity: "500 flyers", price: 4500, unitRate: "KSh 9.00/pc" },
            { quantity: "1,000 flyers", price: 7500, unitRate: "KSh 7.50/pc", isPopular: true },
            { quantity: "2,500 flyers", price: 15000, unitRate: "KSh 6.00/pc" }
          ],
          calculatorId: "flyers"
        },
        {
          id: "brochure-trifold",
          title: "A4 Tri-Fold Corporate Brochures",
          subtitle: "6-Panel Company Presentation",
          badge: "Corporate Profile",
          badgeColor: "bg-emerald-600 text-white",
          image: triFoldBrochures,
          baseStartingPrice: "KSh 5,500",
          perUnitRate: "KSh 22.00 / brochure",
          turnaround: "24 Hours Dispatch",
          stock: "200gsm Silk Art Paper",
          finishing: "Precision 2-Crease Machine Folding",
          moq: "250 Brochures",
          features: [
            "A4 flat folded to 1/3 A4 (DL format)",
            "Anti-crack machine creasing along fold lines",
            "Smooth silk matte sheen for corporate reading",
            "Optional matte lamination for lasting durability"
          ],
          bundles: [
            { quantity: "250 brochures", price: 5500, unitRate: "KSh 22.00/pc" },
            { quantity: "500 brochures", price: 8500, unitRate: "KSh 17.00/pc", isPopular: true },
            { quantity: "1,000 brochures", price: 14000, unitRate: "KSh 14.00/pc" },
            { quantity: "2,500 brochures", price: 28000, unitRate: "KSh 11.20/pc" }
          ],
          calculatorId: "flyers"
        },
        {
          id: "folder-presentation",
          title: "Corporate Presentation Folders",
          subtitle: "Die-Cut Pocket + Card Slot",
          image: orangeNotebooks,
          baseStartingPrice: "KSh 7,500",
          perUnitRate: "KSh 75.00 / folder",
          turnaround: "24–48 Hours",
          stock: "350gsm Heavy Artboard",
          finishing: "Single/Double Pocket with Business Card Slit",
          moq: "100 Folders",
          features: [
            "Houses A4 proposals, brochures, and contracts cleanly",
            "Die-cut internal pocket with business card insert slits",
            "Full-color outside with velvety matte lamination",
            "Essential for executive pitches, bids & tenders"
          ],
          bundles: [
            { quantity: "100 folders", price: 7500, unitRate: "KSh 75.00/pc" },
            { quantity: "250 folders", price: 16000, unitRate: "KSh 64.00/pc", isPopular: true },
            { quantity: "500 folders", price: 28000, unitRate: "KSh 56.00/pc" },
            { quantity: "1,000 folders", price: 48000, unitRate: "KSh 48.00/pc" }
          ],
          calculatorId: "flyers"
        }
      ],
      tableHeaders: ["Product Type", "Format & Stock", "Turnaround", "250 Pcs", "500 Pcs", "1,000 Pcs", "2,500 Pcs", "Unit Rate"],
      tableRows: [
        {
          name: "A5 Flyers (150gsm Gloss)",
          stock: "150gsm Gloss Double-Sided CMYK",
          turnaround: "Same-Day (< 6 hrs)",
          tiers: [
            { qty: "250", price: "KSh 3,500" },
            { qty: "500", price: "KSh 4,500" },
            { qty: "1000", price: "KSh 7,500" },
            { qty: "2500", price: "KSh 15,000" }
          ],
          unitRate: "KSh 6.00",
          calculatorId: "flyers"
        },
        {
          name: "A4 Tri-Fold Brochures (200gsm)",
          stock: "200gsm Silk Art Paper + Creased",
          turnaround: "24 Hours",
          tiers: [
            { qty: "250", price: "KSh 5,500" },
            { qty: "500", price: "KSh 8,500" },
            { qty: "1000", price: "KSh 14,000" },
            { qty: "2500", price: "KSh 28,000" }
          ],
          unitRate: "KSh 11.20",
          calculatorId: "flyers"
        },
        {
          name: "Presentation Folders (350gsm)",
          stock: "350gsm Board + Die-cut Pocket",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "100", price: "KSh 7,500" },
            { qty: "250", price: "KSh 16,000" },
            { qty: "500", price: "KSh 28,000" },
            { qty: "1000", price: "KSh 48,000" }
          ],
          unitRate: "KSh 48.00",
          calculatorId: "flyers"
        }
      ]
    },
    {
      id: "stickers-labels",
      label: "Stickers & Labels",
      iconName: "Sparkles",
      description: "Waterproof vinyl labels, die-cut custom contour stickers, roll product labels, and gold foil jar packaging.",
      packages: [
        {
          id: "sticker-diecut-vinyl",
          title: "Custom Die-Cut Vinyl Stickers",
          subtitle: "Waterproof & Scratch-Proof",
          badge: "Best Seller",
          badgeColor: "bg-blue-600 text-white",
          image: rissulStickers,
          baseStartingPrice: "KSh 1,500",
          perUnitRate: "KSh 15.00 / sticker",
          turnaround: "Same-Day (< 4 hrs)",
          stock: "Premium Waterproof White or Clear Vinyl",
          finishing: "Contour Die-Cut to Exact Silhouette",
          moq: "100 Stickers",
          features: [
            "100% waterproof and refrigerator-safe",
            "High-tack acrylic adhesive that stays stuck",
            "Individually cut stickers with easy-peel backing",
            "Ideal for laptops, bottles, packaging & promos"
          ],
          bundles: [
            { quantity: "100 stickers", price: 1500, unitRate: "KSh 15.00/pc" },
            { quantity: "250 stickers", price: 3200, unitRate: "KSh 12.80/pc" },
            { quantity: "500 stickers", price: 5500, unitRate: "KSh 11.00/pc", isPopular: true },
            { quantity: "1,000 stickers", price: 9000, unitRate: "KSh 9.00/pc" }
          ],
          calculatorId: "stickers"
        },
        {
          id: "sticker-product-roll",
          title: "Product Labels on Continuous Roll",
          subtitle: "Automated & Machine Dispenser",
          badge: "Packaging Tier",
          badgeColor: "bg-purple-600 text-white",
          image: stickerRollPrinting,
          baseStartingPrice: "KSh 4,500",
          perUnitRate: "KSh 4.50 / label",
          turnaround: "24–48 Hours",
          stock: "Gloss Polypropylene (BOPP) Film",
          finishing: "Supplied on Standard 76mm Core Rolls",
          moq: "500 Labels",
          features: [
            "Compatible with manual and auto label applicators",
            "Oil, water, and chemical smudge resistant",
            "Perfect for food jars, cosmetics, detergents & beverages",
            "Vibrant CMYK + White ink backing on clear substrates"
          ],
          bundles: [
            { quantity: "500 labels", price: 4500, unitRate: "KSh 9.00/pc" },
            { quantity: "1,000 labels", price: 7500, unitRate: "KSh 7.50/pc" },
            { quantity: "2,500 labels", price: 14500, unitRate: "KSh 5.80/pc", isPopular: true },
            { quantity: "5,000 labels", price: 24000, unitRate: "KSh 4.80/pc" }
          ],
          calculatorId: "stickers"
        }
      ],
      tableHeaders: ["Sticker Type", "Material Stock", "Turnaround", "100 Pcs", "250 Pcs", "500 Pcs", "1,000 Pcs", "Per Unit"],
      tableRows: [
        {
          name: "Die-Cut Vinyl Stickers",
          stock: "Waterproof White Vinyl + Die-cut",
          turnaround: "Same-Day (2-4 hrs)",
          tiers: [
            { qty: "100", price: "KSh 1,500" },
            { qty: "250", price: "KSh 3,200" },
            { qty: "500", price: "KSh 5,500" },
            { qty: "1000", price: "KSh 9,000" }
          ],
          unitRate: "KSh 9.00",
          calculatorId: "stickers"
        },
        {
          name: "Product Labels on Roll",
          stock: "BOPP Waterproof Film on Rolls",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "500", price: "KSh 4,500" },
            { qty: "1000", price: "KSh 7,500" },
            { qty: "2500", price: "KSh 14,500" },
            { qty: "5000", price: "KSh 24,000" }
          ],
          unitRate: "KSh 4.80",
          calculatorId: "stickers"
        }
      ]
    },
    {
      id: "corporate-gifts",
      label: "Branded Apparel & Gifts",
      iconName: "Shirt",
      description: "Custom branded T-shirts, pique polo shirts, vacuum thermal flasks, hardback notebooks, and event lanyards.",
      packages: [
        {
          id: "gift-tshirts",
          title: "Custom Branded Cotton T-Shirts",
          subtitle: "Screen Print & DTF",
          badge: "Corporate Choice",
          badgeColor: "bg-blue-600 text-white",
          image: planitHardHat,
          baseStartingPrice: "KSh 650",
          perUnitRate: "KSh 650 / shirt",
          turnaround: "24–48 Hours",
          stock: "180gsm–220gsm 100% Combed Ringspun Cotton",
          finishing: "High-Density Screen Print or Full-Color DTF",
          moq: "10 Shirts",
          features: [
            "Wash-tested inks that will not peel, crack or fade",
            "Unisex modern comfort cut from XS to 4XL",
            "Available in 20+ corporate team colors",
            "Double-stitched hems and reinforced collar ribbing"
          ],
          bundles: [
            { quantity: "10 shirts", price: 7500, unitRate: "KSh 750/pc" },
            { quantity: "25 shirts", price: 17500, unitRate: "KSh 700/pc" },
            { quantity: "50 shirts", price: 32500, unitRate: "KSh 650/pc", isPopular: true },
            { quantity: "100 shirts", price: 60000, unitRate: "KSh 600/pc" }
          ],
          calculatorId: "tshirts"
        },
        {
          id: "gift-flasks",
          title: "Branded Corporate Thermal Flasks",
          subtitle: "500ml Vacuum Double-Wall",
          badge: "Executive VIP Gift",
          badgeColor: "bg-amber-600 text-white",
          image: brandedCorporateFlasks,
          baseStartingPrice: "KSh 1,200",
          perUnitRate: "KSh 1,200 / unit",
          turnaround: "24–48 Hours",
          stock: "Food-Grade 304 Stainless Steel",
          finishing: "Laser Engraving or UV Color Print",
          moq: "10 Flasks",
          features: [
            "Keeps drinks hot 12 hrs / cold 24 hrs",
            "Permanent crisp laser engraving that never fades",
            "Leak-proof screw cap with matte tactile coat",
            "Packaged in clean white presentation gift box"
          ],
          bundles: [
            { quantity: "10 flasks", price: 13500, unitRate: "KSh 1,350/pc" },
            { quantity: "25 flasks", price: 31250, unitRate: "KSh 1,250/pc" },
            { quantity: "50 flasks", price: 60000, unitRate: "KSh 1,200/pc", isPopular: true },
            { quantity: "100 flasks", price: 110000, unitRate: "KSh 1,100/pc" }
          ],
          calculatorId: "notebooks"
        },
        {
          id: "gift-notebooks",
          title: "A5 Hardcover Branded Notebooks",
          subtitle: "Debossed / Foil Stamped Logo",
          badge: "Office Merch",
          badgeColor: "bg-indigo-600 text-white",
          image: orangeNotebooks,
          baseStartingPrice: "KSh 850",
          perUnitRate: "KSh 850 / notebook",
          turnaround: "2–3 Days",
          stock: "A5 Hardcover PU Leatherette + 100gsm Cream Paper",
          finishing: "Blind Deboss or Gold/Silver Foil Stamp",
          moq: "25 Notebooks",
          features: [
            "Fitted with elastic closure band and ribbon bookmark",
            "Pen loop and expandable document back pocket",
            "192 lined pages in eye-comfort cream paper",
            "Ideal for annual general meetings and staff retreats"
          ],
          bundles: [
            { quantity: "25 books", price: 22500, unitRate: "KSh 900/pc" },
            { quantity: "50 books", price: 42500, unitRate: "KSh 850/pc", isPopular: true },
            { quantity: "100 books", price: 80000, unitRate: "KSh 800/pc" },
            { quantity: "250 books", price: 187500, unitRate: "KSh 750/pc" }
          ],
          calculatorId: "notebooks"
        },
        {
          id: "gift-lanyards",
          title: "Satin Event Lanyards + Badge Hook",
          subtitle: "Double-Sided Sublimation",
          image: printedLanyards,
          baseStartingPrice: "KSh 120",
          perUnitRate: "KSh 120 / piece",
          turnaround: "24–48 Hours",
          stock: "20mm Smooth Satin Polyester Ribbon",
          finishing: "Heavy Metallic Lobster Claw + Safety Breakaway",
          moq: "50 Lanyards",
          features: [
            "Vibrant photo-quality sublimation on both sides",
            "Soft on the neck for multi-day conference wear",
            "Heavy-duty chrome alligator or swivel trigger clip",
            "Optional transparent PVC badge holders available"
          ],
          bundles: [
            { quantity: "50 lanyards", price: 7500, unitRate: "KSh 150/pc" },
            { quantity: "100 lanyards", price: 13000, unitRate: "KSh 130/pc" },
            { quantity: "250 lanyards", price: 30000, unitRate: "KSh 120/pc", isPopular: true },
            { quantity: "500 lanyards", price: 50000, unitRate: "KSh 100/pc" }
          ],
          calculatorId: "tshirts"
        }
      ],
      tableHeaders: ["Merchandise Item", "Specification", "Turnaround", "Min Order", "Tier 2", "Tier 3", "Tier 4 (Bulk)", "Starting At"],
      tableRows: [
        {
          name: "Branded Round-Neck T-Shirts",
          stock: "180gsm Ringspun Cotton + Screen/DTF",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "10", price: "KSh 7,500" },
            { qty: "25", price: "KSh 17,500" },
            { qty: "50", price: "KSh 32,500" },
            { qty: "100", price: "KSh 60,000" }
          ],
          unitRate: "KSh 600",
          calculatorId: "tshirts"
        },
        {
          name: "Thermal Flasks 500ml",
          stock: "Double-Wall Stainless Steel + Laser Engraved",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "10", price: "KSh 13,500" },
            { qty: "25", price: "KSh 31,250" },
            { qty: "50", price: "KSh 60,000" },
            { qty: "100", price: "KSh 110,000" }
          ],
          unitRate: "KSh 1,100",
          calculatorId: "notebooks"
        },
        {
          name: "A5 Hardcover Notebooks",
          stock: "PU Leatherette + Debossed Logo",
          turnaround: "2–3 Days",
          tiers: [
            { qty: "25", price: "KSh 22,500" },
            { qty: "50", price: "KSh 42,500" },
            { qty: "100", price: "KSh 80,000" },
            { qty: "250", price: "KSh 187,500" }
          ],
          unitRate: "KSh 750",
          calculatorId: "notebooks"
        },
        {
          name: "Custom Satin Lanyards",
          stock: "20mm Satin + Lobster Claw Hook",
          turnaround: "24–48 Hours",
          tiers: [
            { qty: "50", price: "KSh 7,500" },
            { qty: "100", price: "KSh 13,000" },
            { qty: "250", price: "KSh 30,000" },
            { qty: "500", price: "KSh 50,000" }
          ],
          unitRate: "KSh 100",
          calculatorId: "tshirts"
        }
      ]
    },
    {
      id: "vehicle-signage",
      label: "Vehicle & Office Branding",
      iconName: "Compass",
      description: "Saloon car partial wraps, commercial van fleet branding, one-way vision window graphics, and 3D acrylic signs.",
      packages: [
        {
          id: "veh-saloon-partial",
          title: "Saloon Car Partial Branding",
          subtitle: "Doors, Bonnet & Contact Decals",
          badge: "Popular Fleet",
          badgeColor: "bg-blue-600 text-white",
          image: largeFormatBurgerBanner,
          baseStartingPrice: "KSh 5,500",
          perUnitRate: "From KSh 5,500 / car",
          turnaround: "1 Working Day",
          stock: "Cast Cast Automotive Cast Vinyl with UV Overlaminate",
          finishing: "Contour Computerized Plotter Cutting",
          moq: "1 Vehicle",
          features: [
            "High-tack outdoor automotive vinyl that protects car paint",
            "Includes driver & passenger door company logos",
            "Rear windshield contact details and website address",
            "Clean residue-free removal when updating branding"
          ],
          bundles: [
            { quantity: "Door Logos Only", price: 5500, unitRate: "2 Doors" },
            { quantity: "Doors + Rear Window", price: 9500, unitRate: "Full Contact Set", isPopular: true },
            { quantity: "Half-Body Wrap", price: 18500, unitRate: "Sides & Bonnet" },
            { quantity: "Full Vehicle Wrap", price: 32000, unitRate: "Complete Saloon" }
          ],
          calculatorId: "rollup-banners"
        },
        {
          id: "veh-van-commercial",
          title: "Van & Delivery Truck Branding",
          subtitle: "Full & Half Commercial Wraps",
          badge: "Commercial Fleet",
          badgeColor: "bg-emerald-600 text-white",
          image: largeFormatBurgerBanner,
          baseStartingPrice: "KSh 25,000",
          perUnitRate: "From KSh 25,000 / van",
          turnaround: "2 Working Days",
          stock: "High-Conformability Cast Wrap Film",
          finishing: "Optically Clear UV & Scratch Overlaminate",
          moq: "1 Commercial Vehicle",
          features: [
            "Heat-assisted wrapping over rivets, recesses and curved panels",
            "Photographic high-resolution brand campaign graphics",
            "Guaranteed 3–5 year outdoor UV color fastness",
            "On-site installation at your Nairobi depot available"
          ],
          bundles: [
            { quantity: "Van Partial Branding", price: 25000, unitRate: "Sides & Back" },
            { quantity: "Van Full Wrap", price: 38000, unitRate: "Complete Vehicle", isPopular: true },
            { quantity: "Truck (7-Tonne / Canter)", price: 48000, unitRate: "Both Box Sides" },
            { quantity: "Lorry / Bus Full Wrap", price: 75000, unitRate: "Multi-Panel" }
          ],
          calculatorId: "rollup-banners"
        },
        {
          id: "sign-oneway-window",
          title: "One-Way Vision Window Graphics",
          subtitle: "Perforated Glass Vinyl",
          image: largeFormatBurgerBanner,
          baseStartingPrice: "KSh 2,500",
          perUnitRate: "KSh 2,500 / m²",
          turnaround: "Same-Day (< 6 hrs)",
          stock: "60/40 Perforated Window Film",
          finishing: "Outdoor Solvent Ink with Micro-Perforations",
          moq: "1 Square Metre",
          features: [
            "Crisp full-color brand advertisement visible from the outside",
            "Clear, unobstructed see-through visibility from the inside",
            "Blocks up to 40% of harsh solar heat and UV radiation",
            "Perfect for office storefronts, glass partitions & car windows"
          ],
          bundles: [
            { quantity: "1–3 m²", price: 3000, unitRate: "KSh 3,000/m²" },
            { quantity: "4–8 m²", price: 2700, unitRate: "KSh 2,700/m²", isPopular: true },
            { quantity: "9–15 m²", price: 2500, unitRate: "KSh 2,500/m²" },
            { quantity: "16+ m²", price: 2200, unitRate: "KSh 2,200/m²" }
          ],
          calculatorId: "rollup-banners"
        }
      ],
      tableHeaders: ["Service / Format", "Substrate / Spec", "Turnaround", "Scope Tier 1", "Scope Tier 2", "Scope Tier 3", "Scope Tier 4", "Starting At"],
      tableRows: [
        {
          name: "Saloon Car Branding",
          stock: "Automotive Cast Vinyl + UV Laminate",
          turnaround: "1 Working Day",
          tiers: [
            { qty: "Doors", price: "KSh 5,500" },
            { qty: "Doors+Back", price: "KSh 9,500" },
            { qty: "Half Wrap", price: "KSh 18,500" },
            { qty: "Full Wrap", price: "KSh 32,000" }
          ],
          unitRate: "KSh 5,500",
          calculatorId: "rollup-banners"
        },
        {
          name: "Van / Truck Fleet Wrap",
          stock: "Cast Film + Rivet Heat Seal",
          turnaround: "2 Working Days",
          tiers: [
            { qty: "Van Partial", price: "KSh 25,000" },
            { qty: "Van Full", price: "KSh 38,000" },
            { qty: "Truck Canter", price: "KSh 48,000" },
            { qty: "Lorry/Bus", price: "KSh 75,000" }
          ],
          unitRate: "KSh 25,000",
          calculatorId: "rollup-banners"
        },
        {
          name: "One-Way Window Graphics",
          stock: "Perforated 60/40 Glass Film",
          turnaround: "Same-Day (< 6 hrs)",
          tiers: [
            { qty: "1 m²", price: "KSh 3,000" },
            { qty: "5 m²", price: "KSh 13,500" },
            { qty: "10 m²", price: "KSh 25,000" },
            { qty: "20 m²", price: "KSh 44,000" }
          ],
          unitRate: "KSh 2,200/m²",
          calculatorId: "rollup-banners"
        }
      ]
    }
  ];

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  const handleOrderWhatsApp = (pkgTitle: string, bundle: PriceBundle) => {
    const text = [
      `*SmartPrints Hub Order Inquiry* 🖨️`,
      `---------------------------------`,
      `• *Category:* ${currentCategory.label}`,
      `• *Package:* ${pkgTitle}`,
      `• *Selection:* ${bundle.quantity}`,
      `• *Price:* KSh ${bundle.price.toLocaleString()}`,
      bundle.unitRate ? `• *Unit Breakdown:* ${bundle.unitRate}` : null,
      `---------------------------------`,
      `I would like to place this order at Westlands Market Shop A11. Please confirm artwork submission & turnaround time.`
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/254743603068?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full space-y-8 text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 block mb-1">
            Official Production Rate Card & Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Transparent Pricing & Volume Packages
          </h2>
        </div>
        
        {/* View Toggle (Cards vs Table) & Request Quote CTA */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
          {onRequestQuote && (
            <button
              type="button"
              onClick={() => onRequestQuote(activeTab)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#003B9C] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Request Custom Quote</span>
            </button>
          )}

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Package Cards</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Price Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              activeTab === cat.id
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Category Description Banner */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block">
              {currentCategory.label} Price Matrix
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
              {currentCategory.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pre-press proof included</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Same-Day Available</span>
          </span>
        </div>
      </div>

      {/* VIEW MODE 1: VISUAL PACKAGE CARDS */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCategory.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                pkg.badge ? "border-blue-300 dark:border-blue-700 ring-2 ring-blue-500/20" : "border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <div>
                {/* Artwork Image Banner with floating badge */}
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {pkg.badge && (
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${pkg.badgeColor || "bg-blue-600 text-white"}`}>
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono font-bold flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{pkg.turnaround}</span>
                    </span>
                    <span className="text-[10px] font-mono bg-blue-600/90 backdrop-blur-md px-2 py-0.5 rounded-md font-bold uppercase">
                      MOQ: {pkg.moq}
                    </span>
                  </div>
                </div>

                {/* Card Title & Starting Price */}
                <div className="p-5 pb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-0.5">
                    {pkg.subtitle}
                  </span>
                  <h3 className="text-base font-display font-bold text-slate-900 dark:text-white leading-snug mb-3">
                    {pkg.title}
                  </h3>

                  {/* Prominent Price Tag */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 mb-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                        Price From
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {pkg.perUnitRate}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-display font-black text-slate-950 dark:text-white">
                        {pkg.baseStartingPrice}
                      </span>
                      <span className="text-[11px] text-slate-500 font-sans">
                        / base bundle
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Price Tier Matrix */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                      Volume Rate Matrix (KES)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {pkg.bundles.map((bundle, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleOrderWhatsApp(pkg.title, bundle)}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            bundle.isPopular 
                              ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/60 ring-1 ring-blue-500/20" 
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-150 dark:border-slate-800 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">
                              {bundle.quantity}
                            </span>
                            {bundle.isPopular && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            )}
                          </div>
                          <div className="text-xs font-display font-black text-slate-900 dark:text-white">
                            KSh {bundle.price.toLocaleString()}
                          </div>
                          {bundle.unitRate && (
                            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                              {bundle.unitRate}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-sans">
                    <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span><strong className="text-slate-800 dark:text-slate-200">Stock:</strong> {pkg.stock}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="text-blue-500 font-bold">✓</span>
                      <span><strong className="text-slate-800 dark:text-slate-200">Finish:</strong> {pkg.finishing}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-3 space-y-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-850/40">
                <button
                  type="button"
                  onClick={() => handleOrderWhatsApp(pkg.title, pkg.bundles[0])}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#003B9C] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </button>
                
                {onSelectForCalculator && (
                  <button
                    type="button"
                    onClick={() => onSelectForCalculator(pkg.calculatorId)}
                    className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3 h-3 text-blue-500" />
                    <span>Customize in Calculator</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: COMPARATIVE RATE TABLE */}
      {viewMode === "table" && (
        <div className="w-full overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-mono uppercase tracking-wider">
                {currentCategory.tableHeaders.map((head, i) => (
                  <th key={i} className="py-3.5 px-4 font-bold border-b border-slate-800">
                    {head}
                  </th>
                ))}
                <th className="py-3.5 px-4 font-bold border-b border-slate-800 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-sans">
              {currentCategory.tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 dark:hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {row.stock}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
                      <Clock className="w-3 h-3" />
                      {row.turnaround}
                    </span>
                  </td>
                  {row.tiers.map((tier, tIdx) => (
                    <td key={tIdx} className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                      <div>{tier.price}</div>
                      <div className="text-[10px] font-normal text-slate-400">({tier.qty} pcs)</div>
                    </td>
                  ))}
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    {row.unitRate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        const pkgName = `${currentCategory.label} - ${row.name}`;
                        const dummyBundle: PriceBundle = {
                          quantity: `${row.tiers[0].qty} pcs`,
                          price: parseInt(row.tiers[0].price.replace(/[^0-9]/g, ""), 10) || 1000
                        };
                        handleOrderWhatsApp(pkgName, dummyBundle);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-[#003B9C] hover:bg-blue-700 text-white font-bold text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Order</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Transparent Pricing Guarantees & Terms Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
              Free Pre-Press Audit
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-0.5">
              Every job receives a complimentary 3mm bleed, 300 DPI, and CMYK color check.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
              Free Delivery &gt; 10k
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-0.5">
              Free courier delivery in Westlands & Nairobi CBD on orders above KES 10,000.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
              Same-Day Dispatch
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-0.5">
              Orders confirmed by 11:30 AM can be picked up or dispatched the same afternoon.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
              Design Setup Assistance
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-0.5">
              Print-ready files = KSh 0. In-house custom graphic artwork layout from KSh 1,000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingRateMatrix;
