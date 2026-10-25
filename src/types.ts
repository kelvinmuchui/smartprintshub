/**
 * SmartPrints Hub TypeScript Shared Types
 * Defines interfaces for products, services, quote forms, and AI assistant outputs.
 */

export interface PrintService {
  id: string;
  title: string;
  category: "printing" | "branding" | "signage" | "apparel" | "packaging" | "cyber" | "kra-ecitizen";
  description: string;
  iconName: string; // Dynamic icon rendering via lucide-react names
  startingPrice: string;
  popularFinishing?: string;
  specs?: string[];
  highlight?: string;
}

export interface DeliveryZone {
  id: string;
  zoneName: string;
  areas: string[];
  speed: string;
  feeEstimate: string;
  courierPartner: string;
  badge: string;
}

export interface QuoteConfigItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  minimumQty: number;
  quantityTiers: number[];
  stockOptions: { name: string; priceMultiplier: number }[];
  finishOptions: { name: string; extraPerUnit: number }[];
  leadTimes: { speed: string; multiplier: number; label: string }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "printing" | "branding" | "stationery" | "corporate" | "events";
  image: string;
  images?: string[]; // Multiple photos for the same company / project
  client?: string;
  badge?: string;
  description: string;
  beforeImage?: string; // For the interactive Before/After sliders!
  afterImage?: string;
}

export interface QuoteRequestForm {
  name: string;
  phone: string;
  email: string;
  productType: string;
  quantity: number;
  paperType: string;
  finishing: string;
  specs: string;
  artworkName?: string;
}

export interface CartItem {
  id: string; // Product ID
  title: string;
  price: number;
  quantity: number;
  customOptions?: {
    size?: string;
    paperType?: string;
    finishing?: string;
  };
}

export interface AIDesignSuggestion {
  titleSuggestion: string;
  colorPalette: {
    name: string;
    hex: string;
    textClass: string;
  }[];
  typographyCombination: {
    heading: string;
    body: string;
  };
  layoutStructure: {
    step: string;
    detail: string;
  }[];
  suggestions: string[];
}

export interface TrackingStatus {
  trackingId: string;
  clientName: string;
  productType: string;
  quantity: number;
  specs: string;
  artworkName?: string;
  status: "Received" | "Design" | "Printing" | "Ready for Pickup" | "Picked Up";
  statusHistory: {
    stage: string;
    time: string;
    completed: boolean;
    notes: string;
  }[];
}
