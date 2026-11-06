const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const BANNER_DIR = path.resolve(__dirname, "../assets/linkedin-banner");
const LOGO_DIR = path.resolve(__dirname, "../assets/logo-exports");

// Read Brand Marks
const brandMarkFooterSvg = fs.readFileSync("assets/brand-mark-footer.svg", "utf8");
const brandMarkFooterB64 = Buffer.from(brandMarkFooterSvg).toString("base64");

const brandMarkHeaderSvg = fs.readFileSync("assets/brand-mark-header.svg", "utf8");
const brandMarkHeaderB64 = Buffer.from(brandMarkHeaderSvg).toString("base64");

function exportBanner(filename, svg) {
  fs.writeFileSync(path.join(BANNER_DIR, `${filename}.svg`), svg);

  const r1 = new Resvg(svg, {
    fitTo: { mode: "width", value: 1128 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(BANNER_DIR, `${filename}-1128x191.png`), r1.render().asPng());

  const r2 = new Resvg(svg, {
    fitTo: { mode: "width", value: 2256 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(BANNER_DIR, `${filename}-2256x382-retina.png`), r2.render().asPng());

  console.log(`Exported banner: ${filename}`);
}

// =========================================================================
// 1. RIGHT-ALIGNED BANNER - COMPACT (Clean right half, text-anchor="end")
// =========================================================================
const bannerRightEnd = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="navGradR" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="40%" stop-color="#0E213D"/>
      <stop offset="100%" stop-color="#13294B"/>
    </linearGradient>

    <!-- Warm orange subtle glow around the right brand block -->
    <radialGradient id="rightGlow" cx="90%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#navGradR)"/>
  <rect width="1128" height="191" fill="url(#rightGlow)"/>

  <!-- Entire content anchored nicely to the right (x=1060) -->
  <g transform="translate(1060, 0)">
    
    <!-- Row 1: Logo Icon + "Bruggeman Digital." aligned right -->
    <!-- Text width is ~290px + 40px icon = ~340px total -->
    <g transform="translate(-340, 44)">
      <image href="data:image/svg+xml;base64,${brandMarkFooterB64}" x="0" y="0" width="36" height="36"/>
      <text x="48" y="27" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="29" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Tagline -->
    <text x="0" y="114" text-anchor="end" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="16.5" font-weight="600" fill="#FFFFFF">
      Slimme automatisering, websites en dashboards, <tspan fill="#FF6A2B">in eigen beheer.</tspan>
    </text>

    <!-- Row 3: Subtitle & URL -->
    <text x="0" y="146" text-anchor="end" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>

  </g>
</svg>`;

// =========================================================================
// 2. RIGHT-HALF BLOCK (Left-aligned within the right half, X=560 to 1060)
// =========================================================================
const bannerRightBlock = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="navGradB" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="35%" stop-color="#0D1F3B"/>
      <stop offset="100%" stop-color="#13294B"/>
    </linearGradient>

    <radialGradient id="rightGlowB" cx="85%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#navGradB)"/>
  <rect width="1128" height="191" fill="url(#rightGlowB)"/>

  <!-- Left-aligned in right half: Starts comfortably at X=540 -->
  <g transform="translate(540, 0)">
    
    <!-- Row 1: Brand Mark + Name -->
    <g transform="translate(0, 44)">
      <image href="data:image/svg+xml;base64,${brandMarkFooterB64}" x="0" y="0" width="36" height="36"/>
      <text x="48" y="27" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="29" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Tagline -->
    <text x="0" y="114" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="16.5" font-weight="600" fill="#FFFFFF">
      Slimme automatisering, websites en dashboards, <tspan fill="#FF6A2B">in eigen beheer.</tspan>
    </text>

    <!-- Row 3: Subtitle & URL -->
    <text x="0" y="146" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>

  </g>
</svg>`;

// =========================================================================
// 3. RIGHT-HALF ULTRA-COMPACT (Just Logo + 1 Clean Line)
// =========================================================================
const bannerRightCompact = `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="navGradC" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="45%" stop-color="#102444"/>
      <stop offset="100%" stop-color="#13294B"/>
    </linearGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#navGradC)"/>

  <g transform="translate(560, 0)">
    <!-- Row 1: Brand Mark + Name -->
    <g transform="translate(0, 60)">
      <image href="data:image/svg+xml;base64,${brandMarkFooterB64}" x="0" y="0" width="38" height="38"/>
      <text x="50" y="29" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="300" fill="#E2E8F0">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Subtitle -->
    <text x="0" y="130" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="15" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>
  </g>
</svg>`;

exportBanner("linkedin-banner-right-aligned", bannerRightEnd);
exportBanner("linkedin-banner-right-block", bannerRightBlock);
exportBanner("linkedin-banner-right-compact", bannerRightCompact);

// =========================================================================
// FULL LOGO EXPORTS (SVG + High-Res PNG)
// 1. Dark theme (white text + orange dot on transparent & on navy)
// 2. Light theme (navy text + orange dot on transparent & on white)
// =========================================================================

function createFullLogoSvg(isDarkBg = true, withBackground = false) {
  const iconB64 = isDarkBg ? brandMarkFooterB64 : brandMarkHeaderB64;
  const textColor = isDarkBg ? "#FFFFFF" : "#13294B";
  const digitalWeight = "400";
  const bgFill = withBackground ? (isDarkBg ? "#13294B" : "#FFFFFF") : "none";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="150" viewBox="0 0 600 150">
  ${withBackground ? `<rect width="600" height="150" rx="16" fill="${bgFill}"/>` : ""}
  <g transform="translate(40, 43)">
    <!-- Icon (64x64) -->
    <image href="data:image/svg+xml;base64,${iconB64}" x="0" y="0" width="64" height="64"/>
    <!-- Wordmark -->
    <text x="82" y="47" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="44" font-weight="800" fill="${textColor}" letter-spacing="-0.5">
      Bruggeman <tspan font-weight="${digitalWeight}">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
    </text>
  </g>
</svg>`;
}

function exportLogo(name, svg, width = 600) {
  fs.writeFileSync(path.join(LOGO_DIR, `${name}.svg`), svg);

  // 1x PNG (600x150)
  const r1 = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(LOGO_DIR, `${name}.png`), r1.render().asPng());

  // 2x Retina PNG (1200x300)
  const r2 = new Resvg(svg, {
    fitTo: { mode: "width", value: width * 2 },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: true, defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(LOGO_DIR, `${name}-2x.png`), r2.render().asPng());

  console.log(`Exported logo: ${name}`);
}

// Export Full Logo Suite
exportLogo("bruggeman-digital-logo-white-transparent", createFullLogoSvg(true, false));
exportLogo("bruggeman-digital-logo-navy-transparent", createFullLogoSvg(false, false));
exportLogo("bruggeman-digital-logo-on-navy", createFullLogoSvg(true, true));
exportLogo("bruggeman-digital-logo-on-white", createFullLogoSvg(false, true));

console.log("All right-aligned banners and full logo exports created!");
