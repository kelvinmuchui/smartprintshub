import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// 1. Square Favicon SVG optimized for Google Search (1:1 aspect ratio, centered printer mark with circular crop safe-zone)
// Google crops favicons into circles on mobile and rounded squares on desktop SERPs.
const squareFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <defs>
    <!-- Rich background gradient for high contrast on both Google Light & Dark Mode -->
    <linearGradient id="fav-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1A3A" />
      <stop offset="50%" stop-color="#0E2452" />
      <stop offset="100%" stop-color="#060E1E" />
    </linearGradient>
    <filter id="mark-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1D4ED8" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Base container with safe-radius matching Google's circle/squircle display -->
  <rect width="192" height="192" rx="44" fill="url(#fav-bg)" />
  <rect x="2" y="2" width="188" height="188" rx="42" fill="none" stroke="#2563EB" stroke-width="3" stroke-opacity="0.6" />

  <!-- Centered Icon Mark scaled to fit inside 160x160 circular safe zone -->
  <g transform="translate(19, 14) scale(1.0)" filter="url(#mark-glow)">
    <!-- 3 Cascading Printed Sheets (CMYK/Vibrant Representation) -->
    <!-- Sheet 1 (Royal Blue) -->
    <path d="M 60 102 L 108 102 L 98 120 L 50 120 Z" fill="#3B82F6" />
    <!-- Sheet 2 (Vibrant Green) -->
    <path d="M 68 112 L 113 112 L 103 130 L 58 130 Z" fill="#22C55E" />
    <!-- Sheet 3 (Golden Amber) -->
    <path d="M 76 122 L 116 122 L 106 140 L 66 140 Z" fill="#F59E0B" />

    <!-- Printer Body (Crisp White/Silver with dark contrast) -->
    <!-- Left Leg -->
    <rect x="40" y="83" width="14" height="24" rx="4" fill="#FFFFFF" />
    <!-- Right Leg -->
    <rect x="112" y="83" width="14" height="24" rx="4" fill="#FFFFFF" />
    <!-- Main Center Body -->
    <rect x="48" y="67" width="70" height="26" rx="6" fill="#FFFFFF" />
    <!-- Center Print Slot Accent -->
    <rect x="58" y="78" width="50" height="4" rx="2" fill="#0B1A3A" />
    <!-- Top Paper Tray Feed -->
    <rect x="64" y="55" width="38" height="12" rx="3" fill="#E2E8F0" />

    <!-- Dynamic Orbit Swooshes (Signature SmartPrints Hub Motif) -->
    <!-- Blue Orbit Swoosh -->
    <path d="M 28 100 C 20 84, 26 67, 44 58 C 62 49, 90 49, 116 56" 
          fill="none" stroke="#60A5FA" stroke-width="7.5" stroke-linecap="round" />
          
    <!-- Green Orbit Swoosh -->
    <path d="M 28 100 C 38 108, 62 110, 96 90 C 126 72, 132 57, 130 44" 
          fill="none" stroke="#4ADE80" stroke-width="7.5" stroke-linecap="round" />
    
    <!-- Orbital Green Satellite Dot -->
    <circle cx="123" cy="40" r="7.5" fill="#4ADE80" />
  </g>
</svg>`;

// 2. High-Res Square Logo for Google Knowledge Graph & Schema.org Organization (512x512)
const squareLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1B3D" />
      <stop offset="50%" stop-color="#0F244F" />
      <stop offset="100%" stop-color="#050C1B" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#2563EB" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="64" fill="url(#bg-grad)" />
  <rect x="8" y="8" width="496" height="496" rx="56" fill="none" stroke="#2563EB" stroke-width="3" stroke-opacity="0.4" />

  <!-- Printer Icon centered -->
  <g transform="translate(146, 70) scale(1.6)" filter="url(#glow)">
    <path d="M 62 105 L 110 105 L 100 123 L 52 123 Z" fill="#3B82F6" />
    <path d="M 70 115 L 115 115 L 105 133 L 60 133 Z" fill="#22C55E" />
    <path d="M 78 125 L 118 125 L 108 143 L 68 143 Z" fill="#F59E0B" />

    <rect x="42" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="114" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="50" y="70" width="70" height="26" rx="6" fill="#FFFFFF" />
    <rect x="66" y="58" width="38" height="12" rx="3" fill="#E2E8F0" />

    <path d="M 32 102 C 24 88, 30 72, 46 64 C 62 56, 88 56, 112 62" 
          fill="none" stroke="#60A5FA" stroke-width="7" stroke-linecap="round" />
          
    <path d="M 32 102 C 40 108, 62 110, 94 92 C 122 76, 128 62, 126 50" 
          fill="none" stroke="#4ADE80" stroke-width="7" stroke-linecap="round" />
    
    <circle cx="118" cy="46" r="7" fill="#4ADE80" />
  </g>

  <!-- Typography -->
  <text x="256" y="360" 
        font-family="system-ui, -apple-system, 'Inter', sans-serif" 
        font-weight="900" 
        font-style="oblique" 
        font-size="44" 
        letter-spacing="2" 
        fill="#FFFFFF" 
        text-anchor="middle">SMARTPRINTS</text>

  <!-- HUB Badge -->
  <g transform="translate(186, 385)">
    <rect x="0" y="0" width="140" height="36" rx="18" fill="#2563EB" />
    <text x="70" y="26" 
          font-family="system-ui, -apple-system, 'Inter', sans-serif" 
          font-weight="900" 
          font-size="22" 
          letter-spacing="4" 
          fill="#FFFFFF" 
          text-anchor="middle">HUB</text>
  </g>

  <!-- Subtitle -->
  <text x="256" y="460" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-weight="700" 
        font-size="18" 
        letter-spacing="3" 
        fill="#94A3B8" 
        text-anchor="middle">WESTLANDS • NAIROBI</text>
</svg>`;

// 3. OpenGraph / Twitter Social Card (1200x630 PNG)
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="og-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1B3D" />
      <stop offset="50%" stop-color="#0F244F" />
      <stop offset="100%" stop-color="#040D1F" />
    </linearGradient>
    <filter id="og-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#2563EB" flood-opacity="0.4" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#og-grad)" />
  <circle cx="1100" cy="100" r="350" fill="#2563EB" opacity="0.08" />
  <circle cx="100" cy="550" r="280" fill="#22C55E" opacity="0.06" />

  <g transform="translate(100, 140)">
    <g transform="translate(0, 0) scale(1.7)" filter="url(#og-glow)">
      <path d="M 62 105 L 110 105 L 100 123 L 52 123 Z" fill="#3B82F6" />
      <path d="M 70 115 L 115 115 L 105 133 L 60 133 Z" fill="#22C55E" />
      <path d="M 78 125 L 118 125 L 108 143 L 68 143 Z" fill="#F59E0B" />

      <rect x="42" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="114" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="50" y="70" width="70" height="26" rx="6" fill="#FFFFFF" />
      <rect x="66" y="58" width="38" height="12" rx="3" fill="#E2E8F0" />

      <path d="M 32 102 C 24 88, 30 72, 46 64 C 62 56, 88 56, 112 62" 
            fill="none" stroke="#60A5FA" stroke-width="7" stroke-linecap="round" />
      <path d="M 32 102 C 40 108, 62 110, 94 92 C 122 76, 128 62, 126 50" 
            fill="none" stroke="#4ADE80" stroke-width="7" stroke-linecap="round" />
      <circle cx="118" cy="46" r="7" fill="#4ADE80" />
    </g>

    <text x="260" y="70" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-weight="900" 
          font-size="62" 
          letter-spacing="2" 
          fill="#FFFFFF">SMARTPRINTS</text>

    <g transform="translate(260, 95)">
      <rect x="0" y="0" width="160" height="42" rx="21" fill="#2563EB" />
      <text x="80" y="30" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-weight="900" 
            font-size="26" 
            letter-spacing="3" 
            fill="#FFFFFF" 
            text-anchor="middle">HUB</text>
    </g>
    
    <text x="440" y="128" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-weight="700" 
          font-size="26" 
          letter-spacing="1" 
          fill="#38BDF8">WESTLANDS, NAIROBI</text>

    <text x="0" y="240" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-weight="600" 
          font-size="30" 
          fill="#E2E8F0">Professional Printing, Branding &amp; Cyber Services in Westlands</text>

    <text x="0" y="285" 
          font-family="system-ui, -apple-system, sans-serif" 
          font-weight="400" 
          font-size="22" 
          fill="#94A3B8">Business Cards • Roll-up Banners • Flyers • Large Format • Same-Day Pickup</text>

    <g transform="translate(0, 330)">
      <rect x="0" y="0" width="370" height="48" rx="24" fill="#1E293B" stroke="#334155" stroke-width="2" />
      <text x="185" y="31" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-weight="700" 
            font-size="18" 
            fill="#F8FAFC" 
            text-anchor="middle">📍 Westlands Market, Shop A11</text>
      
      <rect x="390" y="0" width="260" height="48" rx="24" fill="#047857" stroke="#10B981" stroke-width="2" />
      <text x="520" y="31" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-weight="700" 
            font-size="18" 
            fill="#FFFFFF" 
            text-anchor="middle">📞 +254 743 603068</text>
    </g>
  </g>
</svg>`;

// Function to construct a multi-resolution ICO file from PNG buffers
function createIco(pngBuffers: { width: number; height: number; buffer: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4);

  const directoryLength = 16 * pngBuffers.length;
  let offset = 6 + directoryLength;

  const directoryEntries: Buffer[] = [];
  const imageBuffers: Buffer[] = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);

    directoryEntries.push(entry);
    imageBuffers.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...imageBuffers]);
}

async function run() {
  console.log("Generating brand icons and logos for Google Search & SEO...");

  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.svg"), squareFaviconSvg);
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo-square.svg"), squareLogoSvg);

  const favSvgBuffer = Buffer.from(squareFaviconSvg);
  const logoSquareSvgBuffer = Buffer.from(squareLogoSvg);
  const ogSvgBuffer = Buffer.from(ogImageSvg);

  // Google Search exact multi-resolution requirements (Multiples of 48px square)
  const p48 = await sharp(favSvgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-48x48.png"), p48);

  const p96 = await sharp(favSvgBuffer).resize(96, 96).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-96x96.png"), p96);

  const p144 = await sharp(favSvgBuffer).resize(144, 144).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-144x144.png"), p144);

  const p192 = await sharp(favSvgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-192x192.png"), p192);

  const p512 = await sharp(favSvgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-512x512.png"), p512);

  const appleTouch = await sharp(favSvgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "apple-touch-icon.png"), appleTouch);

  // Generate ICO with 48x48 first (Google's preferred size), then 32x32 and 16x16
  const p16 = await sharp(favSvgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(favSvgBuffer).resize(32, 32).png().toBuffer();
  const icoBuffer = createIco([
    { width: 48, height: 48, buffer: p48 },
    { width: 32, height: 32, buffer: p32 },
    { width: 16, height: 16, buffer: p16 }
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);

  // Square Logo PNG for Google Organization Schema (512x512)
  const logoSquarePng = await sharp(logoSquareSvgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo-square.png"), logoSquarePng);

  // High-Res Logo PNG for Google Search knowledge panel
  const originalLogoSvg = fs.readFileSync(path.join(PUBLIC_DIR, "logo.svg"));
  const logoPng = await sharp(originalLogoSvg).resize(1080, 360).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo.png"), logoPng);

  // OG image PNG (1200x630)
  const ogPng = await sharp(ogSvgBuffer).resize(1200, 630).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "og-image.png"), ogPng);

  console.log("All brand assets generated successfully in /public!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
