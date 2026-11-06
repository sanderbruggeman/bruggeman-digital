const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const OUT_DIR = path.resolve(__dirname, "../assets/linkedin-banner");

// Read SVG brand mark
const brandMarkFooterSvg = fs.readFileSync("assets/brand-mark-footer.svg", "utf8");
const brandMarkB64 = Buffer.from(brandMarkFooterSvg).toString("base64");

function exportCleanBanner(filename, svg) {
  fs.writeFileSync(path.join(OUT_DIR, `${filename}.svg`), svg);

  const r1 = new Resvg(svg, {
    fitTo: { mode: "width", value: 1128 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${filename}-1128x191.png`), r1.render().asPng());

  const r2 = new Resvg(svg, {
    fitTo: { mode: "width", value: 2256 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${filename}-2256x382-retina.png`), r2.render().asPng());

  console.log(`Exported clean: ${filename}`);
}

// -------------------------------------------------------------
// VARIANT A: "BRUGGEMAN DIGITAL — CLEAN NAVY" (Minimal, Authentic, Premium)
// -------------------------------------------------------------
const bannerA = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <!-- Website Navy Gradient -->
    <linearGradient id="bgNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="55%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#0B1C36"/>
    </linearGradient>

    <!-- Warm ambient glow on right edge -->
    <radialGradient id="ambientOrange" cx="96%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bgNavy)"/>
  <rect width="1128" height="191" fill="url(#ambientOrange)"/>

  <!-- Left safe margin: 240px to comfortably clear LinkedIn avatar -->
  <g transform="translate(240, 0)">
    
    <!-- Row 1: Brand Mark + Wordmark on identical baseline -->
    <g transform="translate(0, 42)">
      <!-- Official Brand Mark (white bubble with orange prompt) -->
      <image href="data:image/svg+xml;base64,${brandMarkB64}" x="0" y="0" width="36" height="36"/>
      <!-- Wordmark -->
      <text x="48" y="28" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="30" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Headline matching website hero -->
    <text x="0" y="112" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">
      Slimme automatisering, websites en dashboards, <tspan fill="#FF6A2B">gewoon in eigen beheer.</tspan>
    </text>

    <!-- Row 3: Subtitle -->
    <text x="0" y="146" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB
    </text>

  </g>

  <!-- URL right side -->
  <g transform="translate(1075, 146)" text-anchor="end">
    <text font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FF8D54" letter-spacing="0.3">
      bruggemandigital.nl ↗
    </text>
  </g>
</svg>`;

// -------------------------------------------------------------
// VARIANT B: "COMPACT PILLARS" (Clean 4-Services line)
// -------------------------------------------------------------
const bannerB = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bgNavyB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="60%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#0E2242"/>
    </linearGradient>

    <radialGradient id="ambientOrangeB" cx="96%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bgNavyB)"/>
  <rect width="1128" height="191" fill="url(#ambientOrangeB)"/>

  <g transform="translate(240, 0)">
    
    <!-- Row 1: Brand Mark + Wordmark -->
    <g transform="translate(0, 46)">
      <image href="data:image/svg+xml;base64,${brandMarkB64}" x="0" y="0" width="34" height="34"/>
      <text x="46" y="27" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Headline -->
    <text x="0" y="114" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="17" font-weight="600" fill="#FFFFFF">
      AI-toepassingen <tspan fill="#FF6A2B">•</tspan> Procesautomatisering <tspan fill="#FF6A2B">•</tspan> Websites <tspan fill="#FF6A2B">•</tspan> Dashboards
    </text>

    <!-- Row 3: Trust statement -->
    <text x="0" y="146" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="12.5" font-weight="500" fill="#9FB7D4">
      In eigen beheer  <tspan fill="#FF6A2B">•</tspan>  Duidelijke afspraken vooraf  <tspan fill="#FF6A2B">•</tspan>  Geen vaste abonnementen
    </text>

  </g>

  <!-- URL right side -->
  <g transform="translate(1075, 146)" text-anchor="end">
    <text font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FF8D54">
      bruggemandigital.nl ↗
    </text>
  </g>
</svg>`;

// -------------------------------------------------------------
// VARIANT C: "ULTRA COMPACT CENTERED" (Clean, spacious)
// -------------------------------------------------------------
const bannerC = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bgNavyC" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#09172B"/>
      <stop offset="100%" stop-color="#13294B"/>
    </linearGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bgNavyC)"/>

  <g transform="translate(250, 0)">
    <!-- Wordmark -->
    <g transform="translate(0, 58)">
      <image href="data:image/svg+xml;base64,${brandMarkB64}" x="0" y="0" width="38" height="38"/>
      <text x="50" y="29" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="300" fill="#E2E8F0">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Single clean line -->
    <text x="0" y="128" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="15.5" font-weight="500" fill="#CBD5E1">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>
  </g>
</svg>`;

exportCleanBanner("linkedin-banner-simple-tagline", bannerA);
exportCleanBanner("linkedin-banner-simple-services", bannerB);
exportCleanBanner("linkedin-banner-simple-compact", bannerC);
console.log("All perfect clean banners exported successfully!");
