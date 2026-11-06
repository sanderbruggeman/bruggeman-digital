const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const OUT_DIR = path.resolve(__dirname, "../assets/linkedin-banner");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Brand SVG path definitions
const brandMarkPathBubble = "M 929.765 648.467 L 981.55 648.271 L 1070.97 648.156 C 1109.79 648.15 1144.2 647.518 1182.48 656.305 C 1240.99 669.734 1294.85 697.687 1337.74 740.144 C 1401.28 803.038 1438.07 887.294 1436.28 977.284 C 1435.65 1008.64 1436.63 1035.95 1432.5 1067.34 C 1422.93 1136.28 1390.7 1200.07 1340.89 1248.67 C 1289.8 1299.51 1223.04 1331.61 1151.43 1339.77 C 1123.22 1342.86 1088 1341.99 1059.05 1342.01 L 931.5 1341.87 C 917.877 1341.86 904.255 1341.93 890.633 1342.08 C 875.225 1350.95 858.986 1361.8 843.835 1371.48 L 757.472 1426.61 C 743.053 1435.83 728.793 1445.25 714.22 1454.31 C 698.185 1464.35 683.002 1468.47 664.107 1463.71 C 636.509 1456.77 616.271 1426.55 619.849 1398.46 C 621.777 1383.32 631.612 1362.7 637.539 1348.25 L 667.134 1276.04 C 673.311 1260.9 681.422 1242.34 685.784 1226.81 C 638.897 1162.62 617.766 1110.47 613.741 1030.02 C 608.428 923.831 624.807 830.701 701.239 750.282 C 760.619 686.988 842.996 650.287 929.765 648.467 z";
const brandMarkPathChevron = "M 1055.56 840.142 C 1082.31 838.198 1092.97 870.796 1075.13 885.284 C 1060.1 897.491 1038.25 909.704 1021.35 920.303 L 944.874 968.739 C 928.653 978.942 911.803 988.827 895.924 999.472 C 951.055 1030.11 1004.11 1068.94 1058.53 1101.07 C 1066.33 1105.67 1077.42 1112.32 1081.07 1120.79 C 1084.1 1127.75 1084.13 1135.66 1081.15 1142.64 C 1074.06 1158.89 1058.44 1160.73 1043.86 1153.69 C 1021.15 1138.97 997.775 1124.97 974.859 1110.52 L 900.732 1063.07 C 879.104 1049.47 855.092 1035.62 834.872 1020.94 C 816.524 1007.61 823.867 983.237 841.24 972.547 C 856.792 962.978 872.091 952.93 887.387 943.347 L 966.347 893.607 C 985.168 881.893 1039.21 845.329 1055.56 840.142 z";
const brandMarkPathDot = "M 1150.07 940.294 C 1182.61 938.619 1210.36 963.588 1212.13 996.118 C 1213.89 1028.65 1189 1056.47 1156.47 1058.32 C 1123.82 1060.19 1095.87 1035.18 1094.1 1002.52 C 1092.32 969.863 1117.41 941.976 1150.07 940.294 z";

// Read SVG logos
const n8nSvg = fs.readFileSync("assets/logos/n8n.svg", "utf8");
const claudeSvg = fs.readFileSync("assets/logos/claude.svg", "utf8");
const geminiSvg = fs.readFileSync("assets/logos/gemini.svg", "utf8");
const wpSvg = fs.readFileSync("assets/logos/wordpress.svg", "utf8");
const lookerSvg = fs.readFileSync("assets/logos/looker.svg", "utf8");

function renderOutputs(name, svgContent, isPersonal = false) {
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  fs.writeFileSync(svgPath, svgContent);

  const baseWidth = isPersonal ? 1584 : 1128;
  const baseHeight = isPersonal ? 396 : 191;
  const retinaWidth = baseWidth * 2;

  // 1x standard
  const resvg1x = new Resvg(svgContent, {
    fitTo: { mode: "width", value: baseWidth },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  const png1xPath = path.join(OUT_DIR, `${name}-${baseWidth}x${baseHeight}.png`);
  fs.writeFileSync(png1xPath, resvg1x.render().asPng());

  // 2x Retina
  const resvg2x = new Resvg(svgContent, {
    fitTo: { mode: "width", value: retinaWidth },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  const png2xPath = path.join(OUT_DIR, `${name}-${retinaWidth}x${baseHeight * 2}-retina.png`);
  fs.writeFileSync(png2xPath, resvg2x.render().asPng());

  console.log(`Rendered ${name}: [SVG] [${baseWidth}x${baseHeight}] [${retinaWidth}x${baseHeight * 2}]`);
}

// ==========================================
// VARIANT 1: FLAGSHIP CONNECTED HUB (1128x191)
// ==========================================
function createFlagshipBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="50%" stop-color="#112546"/>
      <stop offset="100%" stop-color="#0A182F"/>
    </linearGradient>

    <radialGradient id="orangeGlow1" cx="95%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#FF6A2B" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="blueGlow1" cx="25%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#2A4B7C" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#081426" stop-opacity="0"/>
    </radialGradient>

    <pattern id="dotGrid1" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="0.8" fill="#5E7EA8" fill-opacity="0.22"/>
    </pattern>

    <linearGradient id="cardBg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02"/>
    </linearGradient>
  </defs>

  <!-- Background Layers -->
  <rect width="1128" height="191" fill="url(#bg1)"/>
  <rect width="1128" height="191" fill="url(#dotGrid1)"/>
  <rect width="1128" height="191" fill="url(#blueGlow1)"/>
  <rect width="1128" height="191" fill="url(#orangeGlow1)"/>

  <!-- Ambient Circuit Lines -->
  <path d="M 0 135 C 70 135, 110 95, 175 95 S 230 130, 270 130" stroke="#FF6A2B" stroke-width="1.2" stroke-opacity="0.2" fill="none" stroke-dasharray="3 3"/>
  <path d="M 60 191 C 110 160, 160 150, 220 150" stroke="#486D9C" stroke-width="1.2" stroke-opacity="0.25" fill="none"/>
  <circle cx="175" cy="95" r="3" fill="#FF6A2B" fill-opacity="0.4"/>
  <circle cx="270" cy="130" r="2.5" fill="#486D9C" fill-opacity="0.5"/>

  <!-- Background Watermark Logo (Left Area behind avatar position) -->
  <g transform="translate(42, 28) scale(0.12)" opacity="0.10">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Main Content Group (Left offset = 236 to clear company avatar) -->
  <g transform="translate(236, 0)">
    <!-- Eyebrow: Live Indicator & Target Audience -->
    <g transform="translate(0, 36)">
      <circle cx="4" cy="0" r="7" stroke="#10B981" stroke-width="1.2" stroke-opacity="0.35" fill="none"/>
      <circle cx="4" cy="0" r="3.5" fill="#10B981"/>
      <text x="20" y="4" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" letter-spacing="1.2" fill="#A4BBD6">
        DIGITAL PARTNER VOOR ONDERNEMERS &amp; MKB
      </text>
    </g>

    <!-- Main Brand Title & Key Focus -->
    <g transform="translate(0, 78)">
      <text font-family="Plus Jakarta Sans" font-size="30" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
      <line x1="305" y1="-8" x2="305" y2="-28" stroke="#334B6E" stroke-width="1.5"/>
      <text x="320" y="-12" font-family="Plus Jakarta Sans" font-size="13" font-weight="700" fill="#FF8243" letter-spacing="0.5">
        AI • AUTOMATISERING • WEBSITES • DASHBOARDS
      </text>
    </g>

    <!-- Headline Statement -->
    <text x="0" y="112" font-family="Inter" font-size="13.5" font-weight="500" fill="#E1E8F2">
      Slimme digitale oplossingen voor je onderneming — <tspan font-weight="600" fill="#FFFFFF">gewoon in eigen beheer</tspan>.
    </text>

    <!-- 3 Core Trust Badges (Pills) -->
    <g transform="translate(0, 136)">
      <g transform="translate(0, 0)">
        <rect width="138" height="28" rx="14" fill="url(#cardBg1)" stroke="#304769" stroke-width="1"/>
        <text x="14" y="18" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#10B981">✓</text>
        <text x="28" y="18" font-family="Inter" font-size="11" font-weight="600" fill="#E2E8F0">In eigen beheer</text>
      </g>

      <g transform="translate(146, 0)">
        <rect width="186" height="28" rx="14" fill="url(#cardBg1)" stroke="#304769" stroke-width="1"/>
        <text x="14" y="18" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">✓</text>
        <text x="28" y="18" font-family="Inter" font-size="11" font-weight="600" fill="#E2E8F0">Vaste prijsafspraak vooraf</text>
      </g>

      <g transform="translate(340, 0)">
        <rect width="176" height="28" rx="14" fill="url(#cardBg1)" stroke="#304769" stroke-width="1"/>
        <text x="14" y="18" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#10B981">✓</text>
        <text x="28" y="18" font-family="Inter" font-size="11" font-weight="600" fill="#E2E8F0">Geen vaste contracten</text>
      </g>
    </g>
  </g>

  <!-- Right Visual Showcase: 4 Core Services & Flow Hub (X: 775 to 1090) -->
  <g transform="translate(775, 0)">
    <path d="M 75 52 L 150 52" stroke="#334B6E" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M 75 124 L 150 124" stroke="#334B6E" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M 75 52 L 75 124" stroke="#334B6E" stroke-width="1.2" stroke-dasharray="3 3"/>
    <path d="M 150 52 L 150 124" stroke="#334B6E" stroke-width="1.2" stroke-dasharray="3 3"/>
    <circle cx="112" cy="88" r="3" fill="#FF6A2B" fill-opacity="0.7"/>

    <!-- Card 1: AI-toepassingen -->
    <g transform="translate(0, 24)">
      <rect width="144" height="56" rx="10" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1"/>
      <path d="M 22 22 L 24 27 L 29 29 L 24 31 L 22 36 L 20 31 L 15 29 L 20 27 Z" fill="#FF6A2B"/>
      <circle cx="28" cy="22" r="1.5" fill="#FFFFFF"/>
      <text x="36" y="27" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FFFFFF">AI-Toepassingen</text>
      <text x="36" y="42" font-family="Inter" font-size="9.5" font-weight="500" fill="#8FAECF">Claude • GPT • Gemini</text>
    </g>

    <!-- Card 2: Automatisering -->
    <g transform="translate(156, 24)">
      <rect width="155" height="56" rx="10" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1"/>
      <circle cx="18" cy="28" r="3" fill="#10B981"/>
      <line x1="21" y1="28" x2="27" y2="28" stroke="#486D9C" stroke-width="1.2"/>
      <circle cx="30" cy="28" r="3" fill="#FF6A2B"/>
      <text x="39" y="27" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FFFFFF">Automatisering</text>
      <text x="39" y="42" font-family="Inter" font-size="9.5" font-weight="500" fill="#8FAECF">n8n • Cloud • API&#39;s</text>
    </g>

    <!-- Card 3: Websites & Webapps -->
    <g transform="translate(0, 96)">
      <rect width="144" height="56" rx="10" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1"/>
      <rect x="14" y="20" width="16" height="14" rx="2" fill="none" stroke="#6C8FB8" stroke-width="1.2"/>
      <line x1="14" y1="24" x2="30" y2="24" stroke="#6C8FB8" stroke-width="1"/>
      <circle cx="17" cy="22" r="0.8" fill="#FF6A2B"/>
      <text x="36" y="27" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FFFFFF">Web &amp; Webapps</text>
      <text x="36" y="42" font-family="Inter" font-size="9.5" font-weight="500" fill="#8FAECF">WordPress • Maatwerk</text>
    </g>

    <!-- Card 4: Dashboards -->
    <g transform="translate(156, 96)">
      <rect width="155" height="56" rx="10" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1"/>
      <rect x="15" y="26" width="3" height="8" rx="1" fill="#4B6E99"/>
      <rect x="20" y="22" width="3" height="12" rx="1" fill="#4B6E99"/>
      <rect x="25" y="18" width="3" height="16" rx="1" fill="#FF6A2B"/>
      <text x="39" y="27" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FFFFFF">Data Dashboards</text>
      <text x="39" y="42" font-family="Inter" font-size="9.5" font-weight="500" fill="#8FAECF">Looker Studio • Sheets</text>
    </g>

    <!-- Domain (Bottom Right) -->
    <g transform="translate(156, 162)">
      <text x="155" y="10" text-anchor="end" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF8243" letter-spacing="0.4">
        bruggemandigital.nl ↗
      </text>
    </g>
  </g>
</svg>`;
}

// ==========================================
// VARIANT 2: TECH STACK & TOOLS (1128x191)
// ==========================================
function createTechStackBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06101E"/>
      <stop offset="50%" stop-color="#0F213E"/>
      <stop offset="100%" stop-color="#081528"/>
    </linearGradient>

    <radialGradient id="orangeGlow2" cx="88%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="blueGlow2" cx="20%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1B3D6B" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#06101E" stop-opacity="0"/>
    </radialGradient>

    <pattern id="gridPattern2" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#253F66" stroke-width="0.7" stroke-opacity="0.35"/>
    </pattern>

    <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02"/>
    </linearGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bg2)"/>
  <rect width="1128" height="191" fill="url(#gridPattern2)"/>
  <rect width="1128" height="191" fill="url(#blueGlow2)"/>
  <rect width="1128" height="191" fill="url(#orangeGlow2)"/>

  <!-- Background Watermark Logo -->
  <g transform="translate(42, 28) scale(0.12)" opacity="0.10">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Content Group -->
  <g transform="translate(236, 0)">
    <!-- Eyebrow -->
    <g transform="translate(0, 36)">
      <circle cx="4" cy="0" r="3.5" fill="#FF6A2B"/>
      <text x="18" y="4" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" letter-spacing="1.2" fill="#FF8D54">
        AI AUTOMATION &amp; PRAKTISCHE WEBBOUW
      </text>
    </g>

    <!-- Main Headline -->
    <g transform="translate(0, 76)">
      <text font-family="Plus Jakarta Sans" font-size="28" font-weight="800" fill="#FFFFFF">
        Van handmatig werk naar slimme automatisering.
      </text>
    </g>

    <!-- Subtitle -->
    <text x="0" y="106" font-family="Inter" font-size="13.5" font-weight="500" fill="#D3DFEE">
      Praktische AI • n8n workflows • Bedrijfswebsites • Overzichtelijke dashboards
    </text>

    <!-- Tech Stack Strip (Pills) -->
    <g transform="translate(0, 134)">
      <!-- Tool 1: n8n -->
      <g transform="translate(0, 0)">
        <rect width="92" height="30" rx="8" fill="url(#cardGrad2)" stroke="#314B70" stroke-width="1"/>
        <circle cx="20" cy="15" r="4" fill="#EA4B71"/>
        <text x="32" y="19" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FFFFFF">n8n</text>
      </g>

      <!-- Tool 2: Claude AI -->
      <g transform="translate(100, 0)">
        <rect width="112" height="30" rx="8" fill="url(#cardGrad2)" stroke="#314B70" stroke-width="1"/>
        <circle cx="20" cy="15" r="4" fill="#D97706"/>
        <text x="32" y="19" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FFFFFF">Claude AI</text>
      </g>

      <!-- Tool 3: Gemini -->
      <g transform="translate(220, 0)">
        <rect width="102" height="30" rx="8" fill="url(#cardGrad2)" stroke="#314B70" stroke-width="1"/>
        <circle cx="20" cy="15" r="4" fill="#3B82F6"/>
        <text x="32" y="19" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FFFFFF">Gemini</text>
      </g>

      <!-- Tool 4: WordPress -->
      <g transform="translate(330, 0)">
        <rect width="124" height="30" rx="8" fill="url(#cardGrad2)" stroke="#314B70" stroke-width="1"/>
        <circle cx="20" cy="15" r="4" fill="#21759B"/>
        <text x="32" y="19" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FFFFFF">WordPress</text>
      </g>

      <!-- Tool 5: Looker Studio -->
      <g transform="translate(462, 0)">
        <rect width="134" height="30" rx="8" fill="url(#cardGrad2)" stroke="#314B70" stroke-width="1"/>
        <circle cx="20" cy="15" r="4" fill="#4285F4"/>
        <text x="32" y="19" font-family="Plus Jakarta Sans" font-size="12" font-weight="700" fill="#FFFFFF">Looker Studio</text>
      </g>
    </g>
  </g>

  <!-- Right Floating Action Card -->
  <g transform="translate(860, 24)">
    <rect width="232" height="142" rx="14" fill="#0E213D" fill-opacity="0.9" stroke="#2B466F" stroke-width="1.2"/>
    
    <!-- Top badge -->
    <rect x="20" y="18" width="112" height="22" rx="6" fill="#FF6A2B" fill-opacity="0.18" stroke="#FF6A2B" stroke-opacity="0.4"/>
    <text x="28" y="33" font-family="Plus Jakarta Sans" font-size="10" font-weight="700" fill="#FF8D54" letter-spacing="0.5">KENNISMAKING</text>

    <!-- Main CTA text -->
    <text x="20" y="65" font-family="Plus Jakarta Sans" font-size="14.5" font-weight="700" fill="#FFFFFF">
      Vrijblijvend sparren?
    </text>
    <text x="20" y="86" font-family="Inter" font-size="11.5" font-weight="500" fill="#9FB7D4">
      30 min gratis adviesgesprek
    </text>
    <text x="20" y="104" font-family="Inter" font-size="11.5" font-weight="500" fill="#9FB7D4">
      Direct sparren met Sander
    </text>

    <!-- Bottom URL Link -->
    <line x1="20" y1="116" x2="212" y2="116" stroke="#22395C" stroke-width="1"/>
    <text x="20" y="131" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">
      bruggemandigital.nl ↗
    </text>
  </g>
</svg>`;
}

// ==========================================
// VARIANT 3: EXECUTIVE MINIMALIST (1128x191)
// ==========================================
function createMinimalBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="60%" stop-color="#102547"/>
      <stop offset="100%" stop-color="#0A182F"/>
    </linearGradient>

    <radialGradient id="orangeGlow3" cx="95%" cy="10%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#bg3)"/>
  <rect width="1128" height="191" fill="url(#orangeGlow3)"/>

  <!-- Architectural Background Grid -->
  <line x1="236" y1="0" x2="236" y2="191" stroke="#1A3358" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="780" y1="0" x2="780" y2="191" stroke="#1A3358" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="0" y1="130" x2="1128" y2="130" stroke="#1A3358" stroke-width="1" stroke-opacity="0.5"/>

  <!-- Left Watermark -->
  <g transform="translate(48, 30) scale(0.12)" opacity="0.10">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Left Center Content -->
  <g transform="translate(260, 0)">
    <text x="0" y="44" font-family="Plus Jakarta Sans" font-size="11" font-weight="700" letter-spacing="1.5" fill="#FF8243">
      DIGITAL PARTNER VOOR ONDERNEMERS &amp; MKB
    </text>

    <text x="0" y="82" font-family="Plus Jakarta Sans" font-size="32" font-weight="800" fill="#FFFFFF">
      Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
    </text>

    <text x="0" y="112" font-family="Inter" font-size="13.5" font-weight="500" fill="#CBD8E8">
      Slimme automatisering, websites en dashboards — gewoon in eigen beheer.
    </text>
  </g>

  <!-- 4 Pillars Horizontal Strip (Bottom) -->
  <g transform="translate(260, 160)">
    <g transform="translate(0, 0)">
      <text font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">01</text>
      <text x="22" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="600" fill="#E2E8F0">AI-Toepassingen</text>
    </g>
    <circle cx="152" cy="-4" r="2" fill="#3D5A82"/>

    <g transform="translate(170, 0)">
      <text font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">02</text>
      <text x="22" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="600" fill="#E2E8F0">Automatisering</text>
    </g>
    <circle cx="310" cy="-4" r="2" fill="#3D5A82"/>

    <g transform="translate(328, 0)">
      <text font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">03</text>
      <text x="22" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="600" fill="#E2E8F0">Websites &amp; Webapps</text>
    </g>
    <circle cx="494" cy="-4" r="2" fill="#3D5A82"/>

    <g transform="translate(512, 0)">
      <text font-family="Plus Jakarta Sans" font-size="11.5" font-weight="700" fill="#FF6A2B">04</text>
      <text x="22" font-family="Plus Jakarta Sans" font-size="11.5" font-weight="600" fill="#E2E8F0">Dashboards</text>
    </g>
  </g>

  <!-- Right Side Domain Badge -->
  <g transform="translate(805, 50)">
    <rect width="280" height="60" rx="10" fill="#0C1D38" stroke="#253D63" stroke-width="1.2"/>
    <text x="24" y="27" font-family="Plus Jakarta Sans" font-size="11" font-weight="700" fill="#9FB7D4" letter-spacing="0.5">DIRECT CONTACT</text>
    <text x="24" y="47" font-family="Plus Jakarta Sans" font-size="15" font-weight="800" fill="#FFFFFF">
      bruggemandigital.nl <tspan fill="#FF6A2B">→</tspan>
    </text>
  </g>
</svg>`;
}

// ==========================================
// VARIANT 4: PERSONAL PROFILE BANNER (1584x396)
// ==========================================
function createPersonalBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396">
  <defs>
    <linearGradient id="bgPersonal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="50%" stop-color="#112546"/>
      <stop offset="100%" stop-color="#0A182F"/>
    </linearGradient>

    <radialGradient id="orangeGlowP" cx="95%" cy="15%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="blueGlowP" cx="25%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#2A4B7C" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#081426" stop-opacity="0"/>
    </radialGradient>

    <pattern id="dotGridP" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="0.9" fill="#5E7EA8" fill-opacity="0.22"/>
    </pattern>

    <linearGradient id="cardBgP" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1584" height="396" fill="url(#bgPersonal)"/>
  <rect width="1584" height="396" fill="url(#dotGridP)"/>
  <rect width="1584" height="396" fill="url(#blueGlowP)"/>
  <rect width="1584" height="396" fill="url(#orangeGlowP)"/>

  <!-- Circuit Lines -->
  <path d="M 0 260 C 140 260, 220 180, 360 180 S 480 240, 580 240" stroke="#FF6A2B" stroke-width="1.5" stroke-opacity="0.2" fill="none" stroke-dasharray="4 4"/>
  <circle cx="360" cy="180" r="4" fill="#FF6A2B" fill-opacity="0.4"/>

  <!-- Background Watermark Logo (Left area) -->
  <g transform="translate(60, 60) scale(0.24)" opacity="0.10">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkPathBubble}" />
      <path fill="#FF6A2B" d="${brandMarkPathChevron}" />
      <path fill="#FF6A2B" d="${brandMarkPathDot}" />
    </g>
  </g>

  <!-- Main Content (Safe zone on personal profile is left > 360) -->
  <g transform="translate(380, 0)">
    <!-- Eyebrow -->
    <g transform="translate(0, 75)">
      <circle cx="6" cy="0" r="9" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.35" fill="none"/>
      <circle cx="6" cy="0" r="4.5" fill="#10B981"/>
      <text x="28" y="5" font-family="Plus Jakarta Sans" font-size="15" font-weight="700" letter-spacing="1.5" fill="#A4BBD6">
        DIGITAL PARTNER VOOR ONDERNEMERS &amp; MKB
      </text>
    </g>

    <!-- Main Wordmark -->
    <g transform="translate(0, 140)">
      <text font-family="Plus Jakarta Sans" font-size="46" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
      <text x="460" y="-8" font-family="Plus Jakarta Sans" font-size="18" font-weight="700" fill="#FF8243" letter-spacing="0.5">
        AI • AUTOMATISERING • WEBSITES • DASHBOARDS
      </text>
    </g>

    <!-- Headline Statement -->
    <text x="0" y="195" font-family="Inter" font-size="21" font-weight="500" fill="#E1E8F2">
      Slimme digitale oplossingen voor je onderneming — <tspan font-weight="700" fill="#FFFFFF">gewoon in eigen beheer</tspan>.
    </text>

    <!-- 3 Core Trust Badges (Pills) -->
    <g transform="translate(0, 245)">
      <g transform="translate(0, 0)">
        <rect width="190" height="42" rx="21" fill="url(#cardBgP)" stroke="#304769" stroke-width="1.2"/>
        <text x="20" y="27" font-family="Plus Jakarta Sans" font-size="15" font-weight="700" fill="#10B981">✓</text>
        <text x="38" y="27" font-family="Inter" font-size="14.5" font-weight="600" fill="#E2E8F0">In eigen beheer</text>
      </g>

      <g transform="translate(206, 0)">
        <rect width="250" height="42" rx="21" fill="url(#cardBgP)" stroke="#304769" stroke-width="1.2"/>
        <text x="20" y="27" font-family="Plus Jakarta Sans" font-size="15" font-weight="700" fill="#FF6A2B">✓</text>
        <text x="38" y="27" font-family="Inter" font-size="14.5" font-weight="600" fill="#E2E8F0">Vaste prijsafspraak vooraf</text>
      </g>

      <g transform="translate(472, 0)">
        <rect width="240" height="42" rx="21" fill="url(#cardBgP)" stroke="#304769" stroke-width="1.2"/>
        <text x="20" y="27" font-family="Plus Jakarta Sans" font-size="15" font-weight="700" fill="#10B981">✓</text>
        <text x="38" y="27" font-family="Inter" font-size="14.5" font-weight="600" fill="#E2E8F0">Geen vaste contracten</text>
      </g>
    </g>

    <text x="0" y="340" font-family="Plus Jakarta Sans" font-size="15" font-weight="700" fill="#FF8243">
      bruggemandigital.nl ↗
    </text>
  </g>

  <!-- Right Visual Hub (4 Services Cards) -->
  <g transform="translate(1160, 50)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect width="170" height="85" rx="12" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1.2"/>
      <path d="M 24 28 L 27 35 L 34 38 L 27 41 L 24 48 L 21 41 L 14 38 L 21 35 Z" fill="#FF6A2B"/>
      <circle cx="33" cy="28" r="2" fill="#FFFFFF"/>
      <text x="44" y="36" font-family="Plus Jakarta Sans" font-size="14" font-weight="700" fill="#FFFFFF">AI-Toepassingen</text>
      <text x="44" y="58" font-family="Inter" font-size="11.5" font-weight="500" fill="#8FAECF">Claude • GPT • Gemini</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(190, 0)">
      <rect width="180" height="85" rx="12" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1.2"/>
      <circle cx="20" cy="38" r="4" fill="#10B981"/>
      <line x1="24" y1="38" x2="34" y2="38" stroke="#486D9C" stroke-width="1.5"/>
      <circle cx="38" cy="38" r="4" fill="#FF6A2B"/>
      <text x="48" y="36" font-family="Plus Jakarta Sans" font-size="14" font-weight="700" fill="#FFFFFF">Automatisering</text>
      <text x="48" y="58" font-family="Inter" font-size="11.5" font-weight="500" fill="#8FAECF">n8n • Cloud • API&#39;s</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(0, 105)">
      <rect width="170" height="85" rx="12" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1.2"/>
      <rect x="18" y="28" width="20" height="17" rx="3" fill="none" stroke="#6C8FB8" stroke-width="1.5"/>
      <line x1="18" y1="33" x2="38" y2="33" stroke="#6C8FB8" stroke-width="1.2"/>
      <circle cx="22" cy="31" r="1" fill="#FF6A2B"/>
      <text x="44" y="36" font-family="Plus Jakarta Sans" font-size="14" font-weight="700" fill="#FFFFFF">Web &amp; Webapps</text>
      <text x="44" y="58" font-family="Inter" font-size="11.5" font-weight="500" fill="#8FAECF">WordPress • Maatwerk</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(190, 105)">
      <rect width="180" height="85" rx="12" fill="#0C1D38" fill-opacity="0.88" stroke="#253D63" stroke-width="1.2"/>
      <rect x="18" y="44" width="4" height="12" rx="1" fill="#4B6E99"/>
      <rect x="25" y="38" width="4" height="18" rx="1" fill="#4B6E99"/>
      <rect x="32" y="30" width="4" height="26" rx="1" fill="#FF6A2B"/>
      <text x="48" y="36" font-family="Plus Jakarta Sans" font-size="14" font-weight="700" fill="#FFFFFF">Data Dashboards</text>
      <text x="48" y="58" font-family="Inter" font-size="11.5" font-weight="500" fill="#8FAECF">Looker Studio • Sheets</text>
    </g>
  </g>
</svg>`;
}

// Generate all banners
console.log("Generating banner assets...");
renderOutputs("linkedin-company-banner-flagship", createFlagshipBanner(), false);
renderOutputs("linkedin-company-banner-techstack", createTechStackBanner(), false);
renderOutputs("linkedin-company-banner-minimal", createMinimalBanner(), false);
renderOutputs("linkedin-personal-banner-flagship", createPersonalBanner(), true);
console.log("All banner assets successfully generated!");
