const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const OUT_DIR = path.resolve(__dirname, "../assets/linkedin-banner");

const brandMarkBubble = "M 929.765 648.467 L 981.55 648.271 L 1070.97 648.156 C 1109.79 648.15 1144.2 647.518 1182.48 656.305 C 1240.99 669.734 1294.85 697.687 1337.74 740.144 C 1401.28 803.038 1438.07 887.294 1436.28 977.284 C 1435.65 1008.64 1436.63 1035.95 1432.5 1067.34 C 1422.93 1136.28 1390.7 1200.07 1340.89 1248.67 C 1289.8 1299.51 1223.04 1331.61 1151.43 1339.77 C 1123.22 1342.86 1088 1341.99 1059.05 1342.01 L 931.5 1341.87 C 917.877 1341.86 904.255 1341.93 890.633 1342.08 C 875.225 1350.95 858.986 1361.8 843.835 1371.48 L 757.472 1426.61 C 743.053 1435.83 728.793 1445.25 714.22 1454.31 C 698.185 1464.35 683.002 1468.47 664.107 1463.71 C 636.509 1456.77 616.271 1426.55 619.849 1398.46 C 621.777 1383.32 631.612 1362.7 637.539 1348.25 L 667.134 1276.04 C 673.311 1260.9 681.422 1242.34 685.784 1226.81 C 638.897 1162.62 617.766 1110.47 613.741 1030.02 C 608.428 923.831 624.807 830.701 701.239 750.282 C 760.619 686.988 842.996 650.287 929.765 648.467 z";
const brandMarkChevron = "M 1055.56 840.142 C 1082.31 838.198 1092.97 870.796 1075.13 885.284 C 1060.1 897.491 1038.25 909.704 1021.35 920.303 L 944.874 968.739 C 928.653 978.942 911.803 988.827 895.924 999.472 C 951.055 1030.11 1004.11 1068.94 1058.53 1101.07 C 1066.33 1105.67 1077.42 1112.32 1081.07 1120.79 C 1084.1 1127.75 1084.13 1135.66 1081.15 1142.64 C 1074.06 1158.89 1058.44 1160.73 1043.86 1153.69 C 1021.15 1138.97 997.775 1124.97 974.859 1110.52 L 900.732 1063.07 C 879.104 1049.47 855.092 1035.62 834.872 1020.94 C 816.524 1007.61 823.867 983.237 841.24 972.547 C 856.792 962.978 872.091 952.93 887.387 943.347 L 966.347 893.607 C 985.168 881.893 1039.21 845.329 1055.56 840.142 z";
const brandMarkDot = "M 1150.07 940.294 C 1182.61 938.619 1210.36 963.588 1212.13 996.118 C 1213.89 1028.65 1189 1056.47 1156.47 1058.32 C 1123.82 1060.19 1095.87 1035.18 1094.1 1002.52 C 1092.32 969.863 1117.41 941.976 1150.07 940.294 z";

function exportBanner(filename, svg) {
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

  console.log(`Exported: ${filename}`);
}

// -------------------------------------------------------------
// OPTION 1: "WEBSITE HERO PURIFIED" (Navy Theme, Clean & Balanced)
// -------------------------------------------------------------
function buildCleanHeroBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <!-- Deep Navy matching styles.css (navy: #13294B, navy-dark: #0B1B33) -->
    <linearGradient id="navBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B33"/>
      <stop offset="60%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#0E2242"/>
    </linearGradient>

    <!-- Warm orange ambient glow on right edge -->
    <radialGradient id="edgeGlow" cx="95%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#navBg)"/>
  <rect width="1128" height="191" fill="url(#edgeGlow)"/>

  <!-- Subtle brand watermark on far right -->
  <g transform="translate(1010, 45) scale(0.12)" opacity="0.05">
    <g transform="translate(-56.023, -59.623)">
      <path fill="#FFFFFF" d="${brandMarkBubble}" />
      <path fill="#FF6A2B" d="${brandMarkChevron}" />
      <path fill="#FF6A2B" d="${brandMarkDot}" />
    </g>
  </g>

  <!-- Left: Safe area for LinkedIn profile picture (clears first 250px) -->

  <!-- Main Content starting at X=260 -->
  <g transform="translate(260, 0)">
    
    <!-- Row 1: Header Brand Mark (Icon + Text side by side) -->
    <g transform="translate(0, 40)">
      <!-- Icon (32x32) -->
      <g transform="translate(0, 0) scale(0.038)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkBubble}" />
          <path fill="#FF6A2B" d="${brandMarkChevron}" />
          <path fill="#FF6A2B" d="${brandMarkDot}" />
        </g>
      </g>
      <!-- Brand Name -->
      <text x="46" y="26" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Row 2: Website Main Tagline (Simple, punchy, confident) -->
    <text x="0" y="112" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">
      Slimme automatisering, websites en dashboards, <tspan fill="#FF6A2B">gewoon in eigen beheer.</tspan>
    </text>

    <!-- Row 3: Subtitle / Website link (Quiet and balanced) -->
    <text x="0" y="148" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>

  </g>
</svg>`;
}

// -------------------------------------------------------------
// OPTION 2: "CENTERED MINIMAL" (Balanced, ultra-clean)
// -------------------------------------------------------------
function buildCenteredMinimalBanner() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="centBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#081426"/>
      <stop offset="50%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#081426"/>
    </linearGradient>

    <radialGradient id="topOrange" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#centBg)"/>
  <rect width="1128" height="191" fill="url(#topOrange)"/>

  <!-- Centered / Offset Group (Centered around X=620, leaving left for avatar) -->
  <g transform="translate(280, 0)">
    
    <!-- Eyebrow -->
    <text x="0" y="52" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="700" letter-spacing="1.2" fill="#FF8D54">
      DIGITAL PARTNER VOOR ONDERNEMERS &amp; MKB
    </text>

    <!-- Main Wordmark -->
    <g transform="translate(0, 68)">
      <g transform="translate(0, 0) scale(0.040)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkBubble}" />
          <path fill="#FF6A2B" d="${brandMarkChevron}" />
          <path fill="#FF6A2B" d="${brandMarkDot}" />
        </g>
      </g>
      <text x="48" y="27" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Services string -->
    <text x="0" y="142" font-family="Plus Jakarta Sans, sans-serif" font-size="13.5" font-weight="600" fill="#E2E8F0">
      AI-toepassingen <tspan fill="#FF6A2B">•</tspan> Procesautomatisering <tspan fill="#FF6A2B">•</tspan> Websites <tspan fill="#FF6A2B">•</tspan> Dashboards
    </text>
  </g>

  <!-- Clean URL on the right -->
  <g transform="translate(1080, 102)" text-anchor="end">
    <text font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#FF8D54" letter-spacing="0.3">
      bruggemandigital.nl ↗
    </text>
  </g>
</svg>`;
}

exportBanner("linkedin-banner-clean-navy", buildCleanHeroBanner());
exportBanner("linkedin-banner-clean-centered", buildCenteredMinimalBanner());

console.log("Clean banners built successfully!");
