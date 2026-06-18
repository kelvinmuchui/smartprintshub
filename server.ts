import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lazy initializer for Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// In-memory persistent database for quotes & simulated order tracking
interface OrderJob {
  trackingId: string;
  clientName: string;
  clientPhone: string;
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
  createdAt: string;
}

const mockOrders: Record<string, OrderJob> = {
  "SPH-NBI-001": {
    trackingId: "SPH-NBI-001",
    clientName: "Grace Wanjiku (Westlands Coffee)",
    clientPhone: "0722123456",
    productType: "Roll-up Banner & Flyers",
    quantity: 2,
    specs: "Full colour high resolution printing, satin finishing, premium aluminum base",
    status: "Printing",
    statusHistory: [
      { stage: "Order Received", time: "2026-06-16 09:00 AM", completed: true, notes: "Order confirmed, deposit received via M-Pesa" },
      { stage: "Graphic Design", time: "2026-06-16 03:30 PM", completed: true, notes: "Artwork reviewed, pre-flight checks passed" },
      { stage: "Production Printing", time: "2026-06-17 11:15 AM", completed: true, notes: "Printing on premium roll-up vinyl in progress" },
      { stage: "Ready for Pickup", time: "Pending", completed: false, notes: "Awaiting final finishing and quality checklist" }
    ],
    createdAt: "2026-06-16T09:00:00.000Z"
  },
  "SPH-NBI-002": {
    trackingId: "SPH-NBI-002",
    clientName: "David Ochieng (Aura Tech Kenya)",
    clientPhone: "0733987654",
    productType: "Executive Business Cards",
    quantity: 500,
    specs: "350gsm art card, matte lamination with spot UV varnish, double-sided, rounded corners",
    status: "Ready for Pickup",
    statusHistory: [
      { stage: "Order Received", time: "2026-06-17 08:30 AM", completed: true, notes: "Order confirmed, vector files submitted" },
      { stage: "Graphic Design", time: "2026-06-17 10:00 AM", completed: true, notes: "Pre-press design alignment complete" },
      { stage: "Production Printing", time: "2026-06-17 04:00 PM", completed: true, notes: "Offset printing and heavy-matte lamination complete" },
      { stage: "Ready for Pickup", time: "2026-06-18 08:30 AM", completed: true, notes: "Packaged creatively in custom branded box. Ready for pickup at Shop A11!" }
    ],
    createdAt: "2026-06-17T08:30:00.000Z"
  },
  "SPH-NBI-003": {
    trackingId: "SPH-NBI-003",
    clientName: "Mercy Mwangi (Westlands Fashion Hub)",
    clientPhone: "0711554433",
    productType: "Custom Sticker Labels",
    quantity: 1000,
    specs: "Die-cut labels, waterproof glossy vinyl, delivered in rolls",
    status: "Design",
    statusHistory: [
      { stage: "Order Received", time: "2026-06-17 02:45 PM", completed: true, notes: "Client requested branding layout changes" },
      { stage: "Graphic Design", time: "2026-06-18 09:15 AM", completed: false, notes: "Our designer is correcting layout alignment to fit templates" },
      { stage: "Production Printing", time: "Pending", completed: false, notes: "Will begin once digital design is approved by client" },
      { stage: "Ready for Pickup", time: "Pending", completed: false, notes: "Awaiting fabrication cutting" }
    ],
    createdAt: "2026-06-17T14:45:00.000Z"
  }
};

// API Endpoints

// 1. Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SmartPrints Hub Server is online & ready" });
});

// 2. Track Order Endpoint
app.get("/api/orders/:code", (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  if (mockOrders[code]) {
    res.json({ success: true, order: mockOrders[code] });
  } else {
    res.status(404).json({ success: false, message: "Order tracking ID not found. Ensure it matches SPH-NBI-001 or submit a quote online." });
  }
});

// 3. Submit Quote Request & File Artwork Upload Meta
app.post("/api/quotations", (req, res) => {
  const { name, phone, email, productType, quantity, paperType, finishing, specs, artworkName, artworkBase64 } = req.body;

  if (!name || !phone || !productType || !quantity) {
    return res.status(400).json({ success: false, message: "Required fields missing (Name, Phone, Product, Quantity)" });
  }

  // Generate unique Nairobi print code
  const codeIndex = Object.keys(mockOrders).length + 1;
  const uniqueCode = `SPH-NBI-${String(codeIndex).padStart(3, "0")}`;

  const defaultHistory = [
    { stage: "Order Received", time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, notes: "Your quotation / print files were successfully recorded. Our sales team is reviewing to contact you." },
    { stage: "Graphic Design", time: "Pending", completed: false, notes: "Awaiting final print layout alignment approval" },
    { stage: "Production Printing", time: "Pending", completed: false, notes: "Authorized upon partial payment or corporate guarantee" },
    { stage: "Ready for Pickup", time: "Pending", completed: false, notes: "Collection point: Westlands Market Shop A11" }
  ];

  const newOrder: OrderJob = {
    trackingId: uniqueCode,
    clientName: name,
    clientPhone: phone,
    productType: productType,
    quantity: Number(quantity),
    specs: specs || `${paperType || "Standard"} card, ${finishing || "No special finishing"}.`,
    artworkName: artworkName || "No file uploaded (or visual preview generated)",
    status: "Received",
    statusHistory: defaultHistory,
    createdAt: new Date().toISOString()
  };

  // Persist quote request in server memory
  mockOrders[uniqueCode] = newOrder;

  res.status(201).json({
    success: true,
    message: "Quotation request uploaded successfully!",
    trackingId: uniqueCode,
    order: newOrder
  });
});

// 4. AI Design Layout Assistant using Gemini SDK
app.post("/api/ai-designer", async (req, res) => {
  const { productType, industry, keywords, alignmentStyle, specialRequests } = req.body;

  if (!productType) {
    return res.status(400).json({ success: false, message: "Product type is required to run the AI Design Assistant" });
  }

  const aiInstance = getGenAI();
  if (!aiInstance) {
    // If API key is missing, mock a spectacular, design-rich output so the app is 100% usable!
    // Never crash or fail: we build a magnificent responsive mock assistant responses
    return res.json({
      success: true,
      isMock: true,
      titleSuggestion: `Premium ${productType} Design Spec - ${industry || "SmartPrint"} Layout`,
      colorPalette: [
        { name: "Luxury Dark Navy", hex: "#0A1B3D", textClass: "text-white" },
        { name: "SmartPrints Royal Blue", hex: "#003B9C", textClass: "text-white" },
        { name: "Accent Gold", hex: "#FFD400", textClass: "text-neutral-900" },
        { name: "Eco Green", hex: "#28A745", textClass: "text-white" }
      ],
      typographyCombination: {
        heading: "Space Grotesk (Bold, premium, tech-forward feel)",
        body: "Inter (Classic clean Swiss/Modern sans-serif readability)"
      },
      layoutStructure: [
        { step: "Hero Accent Area", detail: "Incorporate a subtle gold border (#FFD400) against dark Navy backdrop with high-contrast centered headings." },
        { step: "Brand Messaging Split", detail: "A balanced two-column graphic layout presenting promotional texts and visual contact links clearly." },
        { step: "Modern Grid Layout", detail: "Display features in staggered 3D cards with glassmorphism hover effects." }
      ],
      suggestions: [
        `Ensure a safety print bleed margin of at least 3mm on all outer edges for laser-cutting at Westlands Shop A11.`,
        `Since your style preference is ${alignmentStyle || "Elegant & Modern"}, use matte-lamination finishing with spot UV varnish to match current top Nairobi standards.`,
        `Incorporate the keywords "${keywords || "Quality, Speed"}" in large display typefaces at the top margin.`
      ]
    });
  }

  try {
    // Call Gemini 3.5 Flash server-side using modern gemini SDK config response schema
    const prompt = `You are a world-class graphic designer and print pre-press layout assistant for "SmartPrints Hub", a luxury printing company in Nairobi, Kenya.
    The client wants you to suggest a stunning design, color scheme, typography, and visual layout configuration for a physical print product.
    
    CLIENT SPECIFICATIONS:
    - Product Type: "${productType}"
    - Business Industry: "${industry || "Corporate"}"
    - Custom Design Keywords/Theme: "${keywords || "Modern, Elegant, Premium"}"
    - Style Preference: "${alignmentStyle || "Minimalist & Clean"}"
    - Additional Client Requests: "${specialRequests || "None"}"
    
    Provide a beautiful design specification suggestion returned strictly as a JSON object, outlining the layout structure, specific hex code color palettes that look spectacular with Nairobi's premium corporate standards, typography pairs available in Google Fonts, and core professional printing suggestions like bleed size, paper weight recommendations (e.g. 350gsm matte or glossy paper), and post-press finishing adjustments.`;

    const response = await aiInstance.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["titleSuggestion", "colorPalette", "typographyCombination", "layoutStructure", "suggestions"],
          properties: {
            titleSuggestion: { type: Type.STRING, description: "A creative design name for this project" },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "hex", "textClass"],
                properties: {
                  name: { type: Type.STRING, description: "Color descriptor, e.g., 'Westlands Slate'" },
                  hex: { type: Type.STRING, description: "Hexadecimal color string" },
                  textClass: { type: Type.STRING, description: "Suggest 'text-white' or 'text-neutral-900' for visual overlap state" }
                }
              }
            },
            typographyCombination: {
              type: Type.OBJECT,
              required: ["heading", "body"],
              properties: {
                heading: { type: Type.STRING, description: "Heading display font, e.g. Space Grotesk" },
                body: { type: Type.STRING, description: "Body readability font, e.g. Inter" }
              }
            },
            layoutStructure: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["step", "detail"],
                properties: {
                  step: { type: Type.STRING },
                  detail: { type: Type.STRING }
                }
              }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);
    res.json({ success: true, isMock: false, ...data });
  } catch (error: any) {
    console.error("Gemini assistant error:", error);
    res.status(500).json({ success: false, message: "Failed to generate design suggestions from Gemini: " + error.message });
  }
});

// Vite & Static file server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted for folder:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartPrints Hub server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
