const { Resvg } = require("/tmp/node_modules/@resvg/resvg-js");
const fs = require("fs");
const path = require("path");

const FONT_DIR = "/tmp/fonts";
const OUT_DIR = path.resolve(__dirname, "../assets/linkedin-banner");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const brandMarkBubble = "M 929.765 648.467 L 981.55 648.271 L 1070.97 648.156 C 1109.79 648.15 1144.2 647.518 1182.48 656.305 C 1240.99 669.734 1294.85 697.687 1337.74 740.144 C 1401.28 803.038 1438.07 887.294 1436.28 977.284 C 1435.65 1008.64 1436.63 1035.95 1432.5 1067.34 C 1422.93 1136.28 1390.7 1200.07 1340.89 1248.67 C 1289.8 1299.51 1223.04 1331.61 1151.43 1339.77 C 1123.22 1342.86 1088 1341.99 1059.05 1342.01 L 931.5 1341.87 C 917.877 1341.86 904.255 1341.93 890.633 1342.08 C 875.225 1350.95 858.986 1361.8 843.835 1371.48 L 757.472 1426.61 C 743.053 1435.83 728.793 1445.25 714.22 1454.31 C 698.185 1464.35 683.002 1468.47 664.107 1463.71 C 636.509 1456.77 616.271 1426.55 619.849 1398.46 C 621.777 1383.32 631.612 1362.7 637.539 1348.25 L 667.134 1276.04 C 673.311 1260.9 681.422 1242.34 685.784 1226.81 C 638.897 1162.62 617.766 1110.47 613.741 1030.02 C 608.428 923.831 624.807 830.701 701.239 750.282 C 760.619 686.988 842.996 650.287 929.765 648.467 z";
const brandMarkChevron = "M 1055.56 840.142 C 1082.31 838.198 1092.97 870.796 1075.13 885.284 C 1060.1 897.491 1038.25 909.704 1021.35 920.303 L 944.874 968.739 C 928.653 978.942 911.803 988.827 895.924 999.472 C 951.055 1030.11 1004.11 1068.94 1058.53 1101.07 C 1066.33 1105.67 1077.42 1112.32 1081.07 1120.79 C 1084.1 1127.75 1084.13 1135.66 1081.15 1142.64 C 1074.06 1158.89 1058.44 1160.73 1043.86 1153.69 C 1021.15 1138.97 997.775 1124.97 974.859 1110.52 L 900.732 1063.07 C 879.104 1049.47 855.092 1035.62 834.872 1020.94 C 816.524 1007.61 823.867 983.237 841.24 972.547 C 856.792 962.978 872.091 952.93 887.387 943.347 L 966.347 893.607 C 985.168 881.893 1039.21 845.329 1055.56 840.142 z";
const brandMarkDot = "M 1150.07 940.294 C 1182.61 938.619 1210.36 963.588 1212.13 996.118 C 1213.89 1028.65 1189 1056.47 1156.47 1058.32 C 1123.82 1060.19 1095.87 1035.18 1094.1 1002.52 C 1092.32 969.863 1117.41 941.976 1150.07 940.294 z";

function exportBanner(filename, svg) {
  fs.writeFileSync(path.join(OUT_DIR, `${filename}.svg`), svg);

  // 1x (1128x191)
  const r1 = new Resvg(svg, {
    fitTo: { mode: "width", value: 1128 },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${filename}-1128x191.png`), r1.render().asPng());

  // 2x Retina (2256x382)
  const r2 = new Resvg(svg, {
    fitTo: { mode: "width", value: 2256 },
    font: { fontDirs: [FONT_DIR], defaultFontFamily: "Plus Jakarta Sans" }
  });
  fs.writeFileSync(path.join(OUT_DIR, `${filename}-2256x382-retina.png`), r2.render().asPng());

  console.log(`Exported: ${filename}`);
}

// ====================================================================
// 1. SIMPLE NAVY CLEAN (Website Theme - Minimalist & Confident)
// ====================================================================
function simpleNavyClean() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <!-- Website exact Navy gradient -->
    <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B33"/>
      <stop offset="60%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#0D203D"/>
    </linearGradient>

    <!-- Subtle soft brand orange warm ambient glow on the right -->
    <radialGradient id="softGlow" cx="95%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1128" height="191" fill="url(#navGrad)"/>
  <rect width="1128" height="191" fill="url(#softGlow)"/>

  <!-- Left: Safe Area for company profile avatar (first 240px clean) -->

  <!-- Brand Block: Starting cleanly at 245px -->
  <g transform="translate(245, 0)">
    <!-- Wordmark & Logo Mark -->
    <g transform="translate(0, 72)">
      <!-- Brand Mark Icon -->
      <g transform="translate(0, -28) scale(0.048)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkBubble}" />
          <path fill="#FF6A2B" d="${brandMarkChevron}" />
          <path fill="#FF6A2B" d="${brandMarkDot}" />
        </g>
      </g>

      <!-- Wordmark text -->
      <text x="44" y="-2" font-family="Plus Jakarta Sans" font-size="30" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <!-- Clean Single Tagline directly from website hero -->
    <text x="0" y="112" font-family="Plus Jakarta Sans" font-size="16" font-weight="600" fill="#E2E8F0">
      Slimme automatisering, websites en dashboards, <tspan fill="#FF6A2B">gewoon in eigen beheer</tspan>.
    </text>

    <!-- Clean Website URL -->
    <text x="0" y="146" font-family="Inter" font-size="12.5" font-weight="500" fill="#9FB7D4">
      Digital Partner voor Ondernemers &amp; MKB  •  <tspan fill="#FF8D54" font-weight="600">bruggemandigital.nl</tspan>
    </text>
  </g>

  <!-- Right side: Clean, subtle 4-pillars line -->
  <g transform="translate(1085, 95)" text-anchor="end">
    <!-- Subtle architectural brand mark watermark in background -->
    <g transform="translate(-30, -50) scale(0.12)" opacity="0.06">
      <g transform="translate(-56.023, -59.623)">
        <path fill="#FFFFFF" d="${brandMarkBubble}" />
        <path fill="#FF6A2B" d="${brandMarkChevron}" />
        <path fill="#FF6A2B" d="${brandMarkDot}" />
      </g>
    </g>
  </g>
</svg>`;
}

// ====================================================================
// 2. SIMPLE WITH THE 4 PILLARS (Clean, spaced, no boxes)
// ====================================================================
function simplePillars() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09172B"/>
      <stop offset="50%" stop-color="#13294B"/>
      <stop offset="100%" stop-color="#0A182F"/>
    </linearGradient>

    <radialGradient id="pGlow" cx="90%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#pGrad)"/>
  <rect width="1128" height="191" fill="url(#pGlow)"/>

  <!-- Left: Content starting at 245px -->
  <g transform="translate(245, 0)">
    <!-- Wordmark -->
    <g transform="translate(0, 68)">
      <g transform="translate(0, -26) scale(0.045)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkBubble}" />
          <path fill="#FF6A2B" d="${brandMarkChevron}" />
          <path fill="#FF6A2B" d="${brandMarkDot}" />
        </g>
      </g>
      <text x="42" y="-1" font-family="Plus Jakarta Sans" font-size="28" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="400">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <text x="0" y="104" font-family="Inter" font-size="14.5" font-weight="500" fill="#CBD5E1">
      Digital Partner voor Ondernemers &amp; MKB
    </text>

    <!-- The 4 Core Services: Clean text line with orange separator bullets -->
    <g transform="translate(0, 142)">
      <text font-family="Plus Jakarta Sans" font-size="12" font-weight="600" fill="#E2E8F0">
        AI-toepassingen <tspan fill="#FF6A2B"> • </tspan> Procesautomatisering <tspan fill="#FF6A2B"> • </tspan> Websites &amp; Apps <tspan fill="#FF6A2B"> • </tspan> Dashboards
      </text>
    </g>
  </g>

  <!-- Right: Clean URL -->
  <g transform="translate(1075, 102)" text-anchor="end">
    <text font-family="Plus Jakarta Sans" font-size="13" font-weight="700" fill="#FF8D54" letter-spacing="0.4">
      bruggemandigital.nl
    </text>
  </g>
</svg>`;
}

// ====================================================================
// 3. ULTRA MINIMAL COMPACT (Wordmark + Tagline - Pure Breathing Room)
// ====================================================================
function ultraMinimal() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="uGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A182F"/>
      <stop offset="100%" stop-color="#13294B"/>
    </linearGradient>
  </defs>

  <rect width="1128" height="191" fill="url(#uGrad)"/>

  <!-- Brand Signature -->
  <g transform="translate(250, 0)">
    <g transform="translate(0, 84)">
      <g transform="translate(0, -32) scale(0.054)">
        <g transform="translate(-56.023, -59.623)">
          <path fill="#FFFFFF" d="${brandMarkBubble}" />
          <path fill="#FF6A2B" d="${brandMarkChevron}" />
          <path fill="#FF6A2B" d="${brandMarkDot}" />
        </g>
      </g>
      <text x="50" y="0" font-family="Plus Jakarta Sans" font-size="34" font-weight="800" fill="#FFFFFF">
        Bruggeman <tspan font-weight="300" fill="#E2E8F0">Digital</tspan><tspan fill="#FF6A2B">.</tspan>
      </text>
    </g>

    <text x="0" y="128" font-family="Plus Jakarta Sans" font-size="15" font-weight="500" fill="#9FB7D4">
      Slimme automatisering, websites en dashboards  <tspan fill="#FF6A2B">•</tspan>  <tspan fill="#FFFFFF" font-weight="600">in eigen beheer</tspan>
    </text>
  </g>

  <!-- URL right side -->
  <g transform="translate(1070, 102)" text-anchor="end">
    <text font-family="Inter" font-size="13" font-weight="600" fill="#FF8D54">
      bruggemandigital.nl
    </text>
  </g>
</svg>`;
}

exportBanner("linkedin-banner-simple-clean", simpleNavyClean());
exportBanner("linkedin-banner-simple-pillars", simplePillars());
exportBanner("linkedin-banner-ultra-minimal", ultraMinimal());
console.log("All simple banners exported!");
