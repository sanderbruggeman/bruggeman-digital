const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const OUT_DIR = path.resolve(__dirname, "../assets/linkedin-banner");

const brandMarkPathBubble = "M 929.765 648.467 L 981.55 648.271 L 1070.97 648.156 C 1109.79 648.15 1144.2 647.518 1182.48 656.305 C 1240.99 669.734 1294.85 697.687 1337.74 740.144 C 1401.28 803.038 1438.07 887.294 1436.28 977.284 C 1435.65 1008.64 1436.63 1035.95 1432.5 1067.34 C 1422.93 1136.28 1390.7 1200.07 1340.89 1248.67 C 1289.8 1299.51 1223.04 1331.61 1151.43 1339.77 C 1123.22 1342.86 1088 1341.99 1059.05 1342.01 L 931.5 1341.87 C 917.877 1341.86 904.255 1341.93 890.633 1342.08 C 875.225 1350.95 858.986 1361.8 843.835 1371.48 L 757.472 1426.61 C 743.053 1435.83 728.793 1445.25 714.22 1454.31 C 698.185 1464.35 683.002 1468.47 664.107 1463.71 C 636.509 1456.77 616.271 1426.55 619.849 1398.46 C 621.777 1383.32 631.612 1362.7 637.539 1348.25 L 667.134 1276.04 C 673.311 1260.9 681.422 1242.34 685.784 1226.81 C 638.897 1162.62 617.766 1110.47 613.741 1030.02 C 608.428 923.831 624.807 830.701 701.239 750.282 C 760.619 686.988 842.996 650.287 929.765 648.467 z";
const brandMarkPathChevron = "M 1055.56 840.142 C 1082.31 838.198 1092.97 870.796 1075.13 885.284 C 1060.1 897.491 1038.25 909.704 1021.35 920.303 L 944.874 968.739 C 928.653 978.942 911.803 988.827 895.924 999.472 C 951.055 1030.11 1004.11 1068.94 1058.53 1101.07 C 1066.33 1105.67 1077.42 1112.32 1081.07 1120.79 C 1084.1 1127.75 1084.13 1135.66 1081.15 1142.64 C 1074.06 1158.89 1058.44 1160.73 1043.86 1153.69 C 1021.15 1138.97 997.775 1124.97 974.859 1110.52 L 900.732 1063.07 C 879.104 1049.47 855.092 1035.62 834.872 1020.94 C 816.524 1007.61 823.867 983.237 841.24 972.547 C 856.792 962.978 872.091 952.93 887.387 943.347 L 966.347 893.607 C 985.168 881.893 1039.21 845.329 1055.56 840.142 z";
const brandMarkPathDot = "M 1150.07 940.294 C 1182.61 938.619 1210.36 963.588 1212.13 996.118 C 1213.89 1028.65 1189 1056.47 1156.47 1058.32 C 1123.82 1060.19 1095.87 1035.18 1094.1 1002.52 C 1092.32 969.863 1117.41 941.976 1150.07 940.294 z";

function render(name, svg) {
  fs.writeFileSync(path.join(OUT_DIR, `${name}.svg`), svg);

  const resvg1x = new Resvg(svg, {
    fitTo: { mode: "width", value: 1128 },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${name}-1128x191.png`), resvg1x.render().asPng());

  const resvg2x = new Resvg(svg, {
    fitTo: { mode: "width", value: 2256 },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${name}-2256x382-retina.png`), resvg2x.render().asPng());

  console.log(`Rendered: ${name}`);
}

// =========================================================================
// PREMIUM DESIGN A: "LINEAR / STRIPE EDITORIAL" (Spacious, bold, luxurious)
// =========================================================================
function designEditorial() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bgEdit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060E1A"/>
      <stop offset="40%" stop-color="#0C1B33"/>
      <stop offset="100%" stop-color="#081324"/>
    </linearGradient>

    <!-- Warm Glowing Horizon on Right -->
    <radialGradient id="glowRight" cx="100%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.22"/>
      <stop offset="45%" stop-color="#FF6A2B" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#081324" stop-opacity="0"/>
    </radialGradient>

    <!-- Subtle Slate Ambient -->
    <radialGradient id="glowCenter" cx="35%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#1B3864" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#060E1A" stop-opacity="0"/>
    </radialGradient>

    <pattern id="gridSubtle" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#223B60" stroke-width="0.6" stroke-opacity="0.25"/>
    </pattern>
  </defs>

  <rect width="1128" height="191" fill="url(#bgEdit)"/>
  <rect width="1128" height="191" fill="url(#gridSubtle)"/>
  <rect width="1128" height="191" fill="url(#glowCenter)"/>
  <rect width="1128" height="191" fill="url(#glowRight)"/>

  <!-- Elegant Horizon Accent Line on Top of Banner -->
  <line x1="0" y1="0" x2="1128" y2="0" stroke="#FF6A2B" stroke-width="2" stroke-opacity="0.8"/>

  <!-- Left Safe Area: Subtle Architectural Grid Accent (NO text to collide with avatar) -->
  <g transform="translate(60, 35) scale(0.13)" opacity="0.07">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Main Editorial Content: Starts at 260px with generous vertical centering -->
  <g transform="translate(260, 0)">
    <!-- Brand / Eyebrow -->
    <g transform="translate(0, 48)">
      <circle cx="5" cy="-4" r="4" fill="#FF6A2B"/>
      <text x="20" y="0" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" letter-spacing="1.5" fill="#FF8D54">
        BRUGGEMAN DIGITAL  •  DIGITAL PARTNER VOOR HET MKB
      </text>
    </g>

    <!-- Confident Headline -->
    <text x="0" y="98" font-family="Plus Jakarta Sans" font-size="32" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
      Slimme automatisering, websites en dashboards.
    </text>

    <!-- Subtitle with Orange Highlight -->
    <text x="0" y="138" font-family="Inter" font-size="16" font-weight="500" fill="#D3E0EE">
      Praktische AI &amp; proceskoppelingen — <tspan font-weight="700" fill="#FF6A2B">gewoon in eigen beheer</tspan>.
    </text>
  </g>

  <!-- Far Right Subtle Graphic: Flow Wire / Floating Sphere -->
  <g transform="translate(980, 95)" opacity="0.85">
    <!-- Glowing concentric rings -->
    <circle cx="0" cy="0" r="48" stroke="#FF6A2B" stroke-width="1.2" stroke-opacity="0.3" stroke-dasharray="4 4" fill="none"/>
    <circle cx="0" cy="0" r="28" stroke="#41699B" stroke-width="1.2" stroke-opacity="0.4" fill="none"/>
    <!-- Center Brand Icon in circle -->
    <g transform="translate(-16, -16) scale(0.05)">
      <g transform="translate(-56.023, -59.623)">
        <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
        <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
        <path fill="#FF6A2B" d="${brandMarkPathDot}" />
      </g>
    </g>
    <!-- Mini floating satellite nodes -->
    <circle cx="48" cy="0" r="3.5" fill="#FF6A2B"/>
    <circle cx="-34" cy="-34" r="2.5" fill="#10B981"/>
    <circle cx="34" cy="34" r="2.5" fill="#41699B"/>
  </g>
</svg>`;
}

// =========================================================================
// PREMIUM DESIGN B: "AUTHENTIC HERO HUB" (Matches website og-image)
// =========================================================================
function designHeroHub() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bgHub" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="50%" stop-color="#0F2241"/>
      <stop offset="100%" stop-color="#0A182F"/>
    </linearGradient>

    <radialGradient id="hubOrangeGlow" cx="95%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>

    <!-- White Floating Hub Card Drop Shadow -->
    <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="1128" height="191" fill="url(#bgHub)"/>
  <rect width="1128" height="191" fill="url(#hubOrangeGlow)"/>

  <!-- Left: Content with proper proportions -->
  <g transform="translate(250, 0)">
    <!-- Wordmark & Eyebrow Pill -->
    <g transform="translate(0, 36)">
      <!-- Logo mark -->
      <g transform="translate(0, -18) scale(0.04)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
          <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
          <path fill="#FF6A2B" d="${brandMarkPathDot}" />
        </g>
      </g>
      <text x="34" y="0" font-family="Plus Jakarta Sans" font-size="22" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>

      <g transform="translate(250, -14)">
        <rect width="186" height="22" rx="11" fill="#182E50" stroke="#2E4A73" stroke-width="1"/>
        <circle cx="12" cy="11" r="3" fill="#FF6A2B"/>
        <text x="22" y="15" font-family="Plus Jakarta Sans" font-size="9.5" font-weight="700" letter-spacing="0.8" fill="#D2E2F5">
          VOOR ZELFSTANDIGEN &amp; MKB
        </text>
      </g>
    </g>

    <!-- Main Headline with Signature Orange Highlight -->
    <g transform="translate(0, 88)">
      <text font-family="Plus Jakarta Sans" font-size="27" font-weight="800" fill="#FFFFFF">
        Slimme automatisering, websites &amp; dashboards,
      </text>
      <text y="32" font-family="Plus Jakarta Sans" font-size="27" font-weight="800" fill="#FF6A2B">
        gewoon in eigen beheer.
      </text>
    </g>

    <!-- URL Tagline -->
    <text x="0" y="162" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FF8D54" letter-spacing="0.5">
      bruggemandigital.nl  <tspan fill="#6485AD" font-weight="500">•  Geen verplichte contracten  •  Duidelijke afspraken vooraf</tspan>
    </text>
  </g>

  <!-- Right: Sleek White Floating Hub Card (Exact mini version of og-image.png) -->
  <g transform="translate(860, 18)" filter="url(#cardShadow)">
    <rect width="230" height="155" rx="18" fill="#FFFFFF"/>
    
    <!-- Central Hub Bubble -->
    <g transform="translate(115, 77.5)">
      <!-- Connecting curved lines to 4 corners -->
      <path d="M 0 0 C -25 0, -45 -15, -60 -25" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>
      <path d="M 0 0 C 25 0, 45 -15, 60 -25" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>
      <path d="M 0 0 C -25 0, -45 15, -60 25" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>
      <path d="M 0 0 C 25 0, 45 15, 60 25" stroke="#CBD5E1" stroke-width="1.8" fill="none"/>

      <circle cx="-60" cy="-25" r="3" fill="#FF6A2B"/>
      <circle cx="60" cy="-25" r="3" fill="#FF6A2B"/>
      <circle cx="-60" cy="25" r="3" fill="#FF6A2B"/>
      <circle cx="60" cy="25" r="3" fill="#FF6A2B"/>

      <!-- Center Icon -->
      <g transform="translate(-16, -16) scale(0.052)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#13294B" d="${brandMarkPathBubble}" />
          <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
          <path fill="#FF6A2B" d="${brandMarkPathDot}" />
        </g>
      </g>
    </g>

    <!-- Top Left Pill: AI -->
    <g transform="translate(18, 16)">
      <rect width="86" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <path d="M 43 14 L 44.5 17.5 L 48 19 L 44.5 20.5 L 43 24 L 41.5 20.5 L 38 19 L 41.5 17.5 Z" fill="#FF6A2B"/>
      <text x="43" y="34" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="8.5" font-weight="700" fill="#334155">AI-toepassingen</text>
    </g>

    <!-- Top Right Pill: Automatisering -->
    <g transform="translate(126, 16)">
      <rect width="86" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <!-- 3 dots -->
      <circle cx="34" cy="18" r="3" fill="#13294B"/>
      <circle cx="43" cy="18" r="3" fill="#FF6A2B"/>
      <circle cx="52" cy="18" r="3" fill="#10B981"/>
      <text x="43" y="34" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="8.5" font-weight="700" fill="#334155">Automatisering</text>
    </g>

    <!-- Bottom Left Pill: Websites -->
    <g transform="translate(18, 97)">
      <rect width="86" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <!-- Mini Browser -->
      <rect x="36" y="12" width="14" height="10" rx="1.5" fill="none" stroke="#64748B" stroke-width="1.2"/>
      <line x1="36" y1="15" x2="50" y2="15" stroke="#FF6A2B" stroke-width="1"/>
      <text x="43" y="34" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="8.5" font-weight="700" fill="#334155">Websites &amp; Apps</text>
    </g>

    <!-- Bottom Right Pill: Dashboards -->
    <g transform="translate(126, 97)">
      <rect width="86" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <!-- Bars -->
      <rect x="35" y="18" width="3" height="6" rx="0.8" fill="#13294B"/>
      <rect x="40" y="15" width="3" height="9" rx="0.8" fill="#13294B"/>
      <rect x="45" y="12" width="3" height="12" rx="0.8" fill="#FF6A2B"/>
      <text x="43" y="34" text-anchor="middle" font-family="Plus Jakarta Sans" font-size="8.5" font-weight="700" fill="#334155">Dashboards</text>
    </g>
  </g>
</svg>`;
}

// =========================================================================
// PREMIUM DESIGN C: "MINIMALIST LUXURY" (Wordmark + Clean Grid)
// =========================================================================
function designMinimalLuxury() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bgMinLux" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B14"/>
      <stop offset="45%" stop-color="#0B182D"/>
      <stop offset="100%" stop-color="#071120"/>
    </linearGradient>

    <radialGradient id="luxOrange" cx="90%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bgMinLux)"/>
  <rect width="1128" height="191" fill="url(#luxOrange)"/>

  <!-- Thin structural grid lines -->
  <line x1="250" y1="0" x2="250" y2="191" stroke="#162A48" stroke-width="1"/>
  <line x1="0" y1="140" x2="1128" y2="140" stroke="#162A48" stroke-width="1"/>

  <!-- Left: Subtle Architectural Watermark -->
  <g transform="translate(60, 40) scale(0.12)" opacity="0.08">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Main Center Content -->
  <g transform="translate(290, 0)">
    <g transform="translate(0, 52)">
      <text font-family="Plus Jakarta Sans" font-size="34" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="300" fill="#E2E8F0">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <text x="0" y="98" font-family="Inter" font-size="16" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  AI, Automatisering, Websites &amp; Dashboards
    </text>

    <!-- Footer Bar Text -->
    <g transform="translate(0, 166)">
      <text font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FF8D54">
        bruggemandigital.nl
      </text>
      <text x="160" font-family="Inter" font-size="12" font-weight="500" fill="#6C86A8">
        Gewoon in eigen beheer  •  Geen verplichte contracten  •  Duidelijke afspraken
      </text>
    </g>
  </g>
</svg>`;
}

render("linkedin-banner-editorial-v2", designEditorial());
render("linkedin-banner-herohub-v2", designHeroHub());
render("linkedin-banner-minimal-v2", designMinimalLuxury());
console.log("All clean banners generated successfully!");
