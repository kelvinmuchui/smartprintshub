import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// 1. Square Favicon SVG (Icon-centric for 16px to 512px clarity)
const squareFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <filter id="fav-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18" />
    </filter>
    <linearGradient id="fav-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1B3D" />
      <stop offset="100%" stop-color="#040D1F" />
    </linearGradient>
  </defs>
  
  <!-- Rounded container with SmartPrints Hub Navy branding -->
  <rect x="4" y="4" width="152" height="152" rx="36" fill="url(#fav-bg)" stroke="#2253AC" stroke-width="3" />
  
  <!-- Centered Printer & Orbital Swoosh Mark -->
  <g transform="translate(4, -14)" filter="url(#fav-shadow)">
    <!-- Output paper sheets -->
    <!-- Blue sheet -->
    <path d="M 62 105 L 110 105 L 100 123 L 52 123 Z" fill="#3B82F6" />
    <!-- Green sheet -->
    <path d="M 70 115 L 115 115 L 105 133 L 60 133 Z" fill="#22C55E" />
    <!-- Gold sheet -->
    <path d="M 78 125 L 118 125 L 108 143 L 68 143 Z" fill="#F59E0B" />

    <!-- Printer body -->
    <rect x="42" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="114" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="50" y="70" width="70" height="26" rx="6" fill="#FFFFFF" />
    <rect x="66" y="58" width="38" height="12" rx="3" fill="#E2E8F0" />

    <!-- Blue orbit swoosh -->
    <path d="M 32 102 C 24 88, 30 72, 46 64 C 62 56, 88 56, 112 62" 
          fill="none" stroke="#60A5FA" stroke-width="7" stroke-linecap="round" />
          
    <!-- Green orbit swoosh -->
    <path d="M 32 102 C 40 108, 62 110, 94 92 C 122 76, 128 62, 126 50" 
          fill="none" stroke="#4ADE80" stroke-width="7" stroke-linecap="round" />
    
    <!-- Orbital Dot -->
    <circle cx="118" cy="46" r="7" fill="#4ADE80" />
  </g>

  <!-- Brand Subtext "SPH" for instant recognition at small sizes -->
  <text x="80" y="142" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-weight="900" 
        font-size="19" 
        letter-spacing="3" 
        fill="#FFFFFF" 
        text-anchor="middle">SMARTPRINTS</text>
</svg>`;

// 2. High-Res Square Logo for Google Knowledge Graph, Schema.org Organization, and Business Profile (512x512)
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
    <!-- Item 1 (Blue sheet) -->
    <path d="M 62 105 L 110 105 L 100 123 L 52 123 Z" fill="#3B82F6" />
    <!-- Item 2 (Green sheet) -->
    <path d="M 70 115 L 115 115 L 105 133 L 60 133 Z" fill="#22C55E" />
    <!-- Item 3 (Gold sheet) -->
    <path d="M 78 125 L 118 125 L 108 143 L 68 143 Z" fill="#F59E0B" />

    <!-- Printer machine body -->
    <rect x="42" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="114" y="86" width="14" height="24" rx="4" fill="#FFFFFF" opacity="0.9" />
    <rect x="50" y="70" width="70" height="26" rx="6" fill="#FFFFFF" />
    <rect x="66" y="58" width="38" height="12" rx="3" fill="#E2E8F0" />

    <!-- Blue orbit swoosh -->
    <path d="M 32 102 C 24 88, 30 72, 46 64 C 62 56, 88 56, 112 62" 
          fill="none" stroke="#60A5FA" stroke-width="7" stroke-linecap="round" />
          
    <!-- Green orbit swoosh -->
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

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#og-grad)" />

  <!-- Subtle grid and background elements -->
  <circle cx="1100" cy="100" r="350" fill="#2563EB" opacity="0.08" />
  <circle cx="100" cy="550" r="280" fill="#22C55E" opacity="0.06" />

  <!-- Main Left Card: Brand Mark + Typography -->
  <g transform="translate(100, 140)">
    <!-- Printer Logo Mark -->
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

    <!-- Headings -->
    <text x="260" y="75" 
          font-family="system-ui, -apple-system, 'Inter', sans-serif" 
          font-weight="900" 
          font-style="oblique" 
          font-size="62" 
          letter-spacing="2" 
          fill="#FFFFFF">SMARTPRINTS</text>

    <!-- HUB Pill -->
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

    <!-- Value proposition description -->
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

    <!-- Location & Contact badges -->
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
  // ICO header: 6 bytes
  // 2 bytes reserved (0)
  // 2 bytes type (1 for ico)
  // 2 bytes number of images
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  // Directory entries: 16 bytes per image
  const directoryLength = 16 * pngBuffers.length;
  let offset = 6 + directoryLength;

  const directoryEntries: Buffer[] = [];
  const imageBuffers: Buffer[] = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0); // width
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data in bytes
    entry.writeUInt32LE(offset, 12); // offset of image data

    directoryEntries.push(entry);
    imageBuffers.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...imageBuffers]);
}

async function run() {
  console.log("Generating brand icons and logos for Google Search & SEO...");

  // Write SVGs
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.svg"), squareFaviconSvg);
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo-square.svg"), squareLogoSvg);

  const favSvgBuffer = Buffer.from(squareFaviconSvg);
  const logoSquareSvgBuffer = Buffer.from(squareLogoSvg);
  const ogSvgBuffer = Buffer.from(ogImageSvg);

  // Generate PNG sizes for Google Search Favicon specifications (Google requires multiples of 48px square)
  const p48 = await sharp(favSvgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-48x48.png"), p48);

  const p96 = await sharp(favSvgBuffer).resize(96, 96).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-96x96.png"), p96);

  const p192 = await sharp(favSvgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-192x192.png"), p192);

  const p512 = await sharp(favSvgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-512x512.png"), p512);

  const appleTouch = await sharp(favSvgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "apple-touch-icon.png"), appleTouch);

  // Generate ICO with 16x16, 32x32, 48x48
  const p16 = await sharp(favSvgBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(favSvgBuffer).resize(32, 32).png().toBuffer();
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);

  // Generate Square Logo PNG for Google Organization Schema (512x512)
  const logoSquarePng = await sharp(logoSquareSvgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo-square.png"), logoSquarePng);

  // Generate High-Res Logo PNG for Google Search
  const originalLogoSvg = fs.readFileSync(path.join(PUBLIC_DIR, "logo.svg"));
  const logoPng = await sharp(originalLogoSvg).resize(1080, 360).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "logo.png"), logoPng);

  // Generate OG image PNG (1200x630)
  const ogPng = await sharp(ogSvgBuffer).resize(1200, 630).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "og-image.png"), ogPng);

  console.log("All brand assets generated successfully in /public!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
