// Canvas 精緻線條圖示（對應參考圖風格）
function drawChartIcon(ctx, label, cx, cy, size) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const s = size;

  switch (label) {

    case '酸度': {
      // 柑橘切面：近圓形外框 + 頂部小葉 + 6 放射線 + 中心點（對應參考圖）
      const r = s * 0.74;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      // 頂部小葉（緊貼圓頂）
      ctx.beginPath();
      ctx.moveTo(-s * 0.14, -r + s * 0.02);
      ctx.bezierCurveTo(-s * 0.20, -r - s * 0.28, s * 0.20, -r - s * 0.28, s * 0.14, -r + s * 0.02);
      ctx.stroke();
      // 葉脈
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, -r - s * 0.18);
      ctx.stroke();
      // 6 放射線
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI * i) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
        ctx.stroke();
      }
      // 中心點
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.09, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      break;
    }

    case '甜感': {
      // 四瓣花（45° 斜對角方向）+ 瓣尖小點 + 中心圓
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((Math.PI / 2) * i + Math.PI / 4); // 45° 斜向起始
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.48, s * 0.22, s * 0.44, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -s * 0.92, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case '苦度': {
      // 兩顆咖啡豆並排：間距縮小，直立橢圓各帶中線
      [-s * 0.32, s * 0.32].forEach(dx => {
        ctx.beginPath();
        ctx.ellipse(dx, 0, s * 0.26, s * 0.56, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(dx, -s * 0.50);
        ctx.bezierCurveTo(dx + s * 0.13, -s * 0.15, dx - s * 0.13, s * 0.15, dx, s * 0.50);
        ctx.stroke();
      });
      break;
    }

    case '厚實度': {
      // 咖啡豆 + 外環（外環縮小，更貼合參考圖比例）
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.82, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.rotate(-Math.PI / 10);
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.30, s * 0.54, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.48);
      ctx.bezierCurveTo(s * 0.16, -s * 0.14, -s * 0.16, s * 0.14, 0, s * 0.48);
      ctx.stroke();
      ctx.restore();
      break;
    }

    case '香氣': {
      // 六瓣細長尖星（對應參考圖的星形香氣圖示）
      for (let i = 0; i < 6; i++) {
        const a  = (Math.PI * 2 * i) / 6 - Math.PI / 2; // 從頂部開始
        const aL = a - Math.PI / 14;
        const aR = a + Math.PI / 14;
        ctx.beginPath();
        ctx.moveTo(s * 0.16 * Math.cos(aL), s * 0.16 * Math.sin(aL));
        ctx.quadraticCurveTo(
          s * 0.44 * Math.cos(a), s * 0.44 * Math.sin(a),
          s * 0.90 * Math.cos(a), s * 0.90 * Math.sin(a)
        );
        ctx.quadraticCurveTo(
          s * 0.44 * Math.cos(a), s * 0.44 * Math.sin(a),
          s * 0.16 * Math.cos(aR), s * 0.16 * Math.sin(aR)
        );
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case '風味': {
      // 三道 S 形上升蒸氣（對稱排列，左右互反）
      [
        { ox: -s * 0.26, d:  1 },
        { ox:  0,        d: -1 },
        { ox:  s * 0.26, d:  1 },
      ].forEach(({ ox, d }) => {
        ctx.beginPath();
        ctx.moveTo(ox, s * 0.50);
        ctx.bezierCurveTo(
          ox + d * s * 0.20,  s * 0.20,
          ox - d * s * 0.20, -s * 0.20,
          ox,                -s * 0.50
        );
        ctx.bezierCurveTo(
          ox + d * s * 0.16, -s * 0.68,
          ox - d * s * 0.10, -s * 0.84,
          ox,                -s * 0.94
        );
        ctx.stroke();
      });
      break;
    }

    case '餘韻': {
      // 三層漸寬橢圓堆疊 + 側連線（層疊蛋糕輪廓）
      [
        { rx: s * 0.28, ry: s * 0.10, oy: -s * 0.50 },
        { rx: s * 0.52, ry: s * 0.13, oy: -s * 0.08 },
        { rx: s * 0.78, ry: s * 0.17, oy:  s * 0.42 },
      ].forEach(({ rx, ry, oy }) => {
        ctx.beginPath();
        ctx.ellipse(0, oy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(-s * 0.28, -s * 0.50);
      ctx.lineTo(-s * 0.78,  s * 0.42);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo( s * 0.28, -s * 0.50);
      ctx.lineTo( s * 0.78,  s * 0.42);
      ctx.stroke();
      break;
    }
  }

  ctx.restore();
}

const RADAR_AXIS_CONFIG = [
  { key: 'acid', label: '酸度', icon: 'assets/radar-icons/acid-balanced.png' },
  { key: 'sweet', label: '甜感', icon: 'assets/radar-icons/sweet.png' },
  { key: 'bitter', label: '苦度', icon: 'assets/radar-icons/bitter.png' },
  { key: 'body', label: '厚實度', icon: 'assets/radar-icons/body.png' },
  { key: 'aftertaste', label: '餘韻', icon: 'assets/radar-icons/aftertaste.png' },
];

const RADAR_ICON_IMAGES = {};

function getRadarAxisAngle(index) {
  return (2 * Math.PI * index / RADAR_AXIS_CONFIG.length) - Math.PI / 2;
}

function isImageReady(img) {
  return img && img.dataset.ready === 'true';
}

function loadRadarIcons(onReady) {
  if (typeof Image === 'undefined') return;

  RADAR_AXIS_CONFIG.forEach(axis => {
    if (RADAR_ICON_IMAGES[axis.label]) return;
    const img = new Image();
    img.onload = () => {
      img.dataset.ready = 'true';
      if (typeof onReady === 'function') onReady();
    };
    img.src = axis.icon;
    RADAR_ICON_IMAGES[axis.label] = img;
  });
}

function drawChartIcon(ctx, label, cx, cy, size) {
  const img = RADAR_ICON_IMAGES[label];
  const drawSize = size * 1.55;

  if (img && img.dataset.ready === 'true') {
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.drawImage(img, cx - drawSize / 2, cy - drawSize / 2, drawSize, drawSize);
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.45, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// =============================================
// 風味標籤主題分組（對應 4 種色系與圖示）
// =============================================
const FLAVOR_THEMES = {
  // berry — 海軍藍 #2F3E4E
  '藍莓': 'berry', '黑醋栗': 'berry', '莓果': 'berry',
  '番茄': 'berry', '蘋果': 'berry', '水蜜桃': 'berry',

  // wine — 橄欖綠 #4D5A3A
  '葡萄酒': 'wine', '花香': 'wine', '茉莉': 'wine', '檸檬': 'wine',
  '佛手柑': 'wine', '柑橘': 'wine', '熱帶水果': 'wine',

  // wild — 古銅褐 #7A5A3A
  '野性': 'wild', '黑巧克力': 'wild', '巧克力': 'wild', '堅果': 'wild',
  '花生': 'wild', '焦糖': 'wild', '蜂蜜': 'wild',
  '泥土': 'wild', '醇厚': 'wild',

  // fermented — 森林綠 #4E6B56
  '發酵感': 'fermented', '草本': 'fermented', '杉木': 'fermented',
  '奶油': 'fermented', '柔和': 'fermented', '均衡': 'fermented', '低酸': 'fermented',
};

const FLAVOR_ICONS = {
  // 莓果：三顆莓果 + 葉
  berry: `<svg viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="6.8" cy="13.2" r="2.7" fill="none" stroke-width="1.1"/>
    <circle cx="13.2" cy="13.2" r="2.7" fill="none" stroke-width="1.1"/>
    <circle cx="10" cy="9" r="2.7" fill="none" stroke-width="1.1"/>
    <circle cx="6.8" cy="13.2" r="0.55" fill="currentColor" stroke="none"/>
    <circle cx="13.2" cy="13.2" r="0.55" fill="currentColor" stroke="none"/>
    <circle cx="10" cy="9" r="0.55" fill="currentColor" stroke="none"/>
    <path d="M9.4 6 Q11 3.2 13.5 4" stroke-width="0.9" fill="none"/>
    <path d="M11.5 4 L13.6 3" stroke-width="0.9" fill="none"/>
  </svg>`,

  // 葡萄串
  wine: `<svg viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="7" cy="10" r="1.7" fill="none" stroke-width="0.95"/>
    <circle cx="10.5" cy="10" r="1.7" fill="none" stroke-width="0.95"/>
    <circle cx="14" cy="10" r="1.7" fill="none" stroke-width="0.95"/>
    <circle cx="8.6" cy="13.2" r="1.7" fill="none" stroke-width="0.95"/>
    <circle cx="12.4" cy="13.2" r="1.7" fill="none" stroke-width="0.95"/>
    <circle cx="10.5" cy="16.4" r="1.7" fill="none" stroke-width="0.95"/>
    <path d="M10.5 7.5 L11.2 4.5 Q13 3.5 14.5 4.5" stroke-width="0.95" fill="none"/>
  </svg>`,

  // 山稜 + 太陽
  wild: `<svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M2.5 15 L7 8.5 L11 12 L13.5 9 L17.5 15 Z" stroke-width="1.1" fill="none" stroke-linejoin="round"/>
    <circle cx="14" cy="5.8" r="1.7" fill="none" stroke-width="0.9"/>
  </svg>`,

  // 葉片（雙葉 + 葉脈）
  fermented: `<svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 4.2 Q5.5 7 6.5 12.5 Q9 13.5 10 9.5" stroke-width="1.05" fill="none" stroke-linejoin="round"/>
    <path d="M10 4.2 Q14.5 7 13.5 12.5 Q11 13.5 10 9.5" stroke-width="1.05" fill="none" stroke-linejoin="round"/>
    <line x1="10" y1="4.2" x2="10" y2="16" stroke-width="0.95"/>
  </svg>`,
};

const REF_ART_ICONS = {
  water: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M34 18h28l-4 36H38L34 18Z"/>
    <path d="M37 28h22"/>
    <path d="M42 13c2-5 7-7 10-10 1 5-1 10-5 13"/>
  </svg>`,
  'apple-juice': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M31 18h28l5 8-5 28H33l-5-28 3-8Z"/>
    <path d="M34 18c4-8 16-9 21 0"/>
    <path d="M46 12c4-5 9-7 14-5-2 6-7 8-13 7"/>
    <path d="M36 30h20M35 38h22"/>
  </svg>`,
  orange: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <circle cx="47" cy="34" r="17"/>
    <circle cx="47" cy="34" r="6"/>
    <path d="M47 17v34M30 34h34M35 22l24 24M59 22 35 46"/>
    <path d="M48 17c5-8 13-10 20-6-3 7-10 10-18 8"/>
  </svg>`,
  passionfruit: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <ellipse cx="44" cy="35" rx="19" ry="16"/>
    <ellipse cx="48" cy="35" rx="11" ry="9"/>
    <circle cx="43" cy="33" r="1.8"/><circle cx="49" cy="38" r="1.8"/><circle cx="53" cy="32" r="1.8"/>
    <path d="M47 19c4-7 12-10 18-6-3 7-9 9-16 8"/>
  </svg>`,
  lemon: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M24 35c11-20 36-22 49-8-9 22-37 25-49 8Z"/>
    <path d="M33 34h31M48 21v26M37 25l21 18M58 25 37 43"/>
    <path d="M57 18c5-7 12-8 18-4-4 6-9 8-16 6"/>
  </svg>`,
  'green-tea': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M30 30h34v10c0 8-7 14-17 14s-17-6-17-14V30Z"/>
    <path d="M64 33h5c5 0 7 8 1 11-2 1-4 1-6 1"/>
    <path d="M27 54h42"/>
    <path d="M39 21c-2-5 3-8 0-13M50 21c-2-5 3-8 0-13M59 21c-2-5 3-8 0-13"/>
  </svg>`,
  'oat-water': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M36 18h26l-4 36H40L36 18Z"/>
    <path d="M40 28h18"/>
    <path d="M70 48c-8-9-8-21 0-31"/>
    <path d="M70 25c6 1 10 4 12 9-6 0-10-3-12-9ZM70 37c6 1 10 4 12 9-6 0-10-3-12-9Z"/>
  </svg>`,
  honey: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M33 26h26v22c0 5-4 8-13 8s-13-3-13-8V26Z"/>
    <path d="M36 18h20l3 8H33l3-8Z"/>
    <path d="M37 36h18"/>
    <path d="M66 14l15 15M70 10l15 15M62 18l15 15"/>
    <path d="M75 29c0 4-5 5-5 10"/>
    <circle cx="29" cy="18" r="3"/><circle cx="24" cy="23" r="3"/><circle cx="31" cy="25" r="3"/>
  </svg>`,
  banana: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M24 40c18 13 43 6 55-17-19 14-36 17-58 10 1 3 2 5 3 7Z"/>
    <path d="M21 33c2-4 6-5 10-3M75 21c3-1 6 1 7 4"/>
  </svg>`,
  maple: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M36 20h25l-4 35H40L36 20Z"/>
    <path d="M39 16h19"/>
    <path d="M42 33h14"/>
    <path d="M69 20c6 5 8 11 4 18-5-4-7-11-4-18Z"/>
    <path d="M69 30 59 45"/>
  </svg>`,
  sencha: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M30 32h35v8c0 8-7 14-18 14S30 48 30 40v-8Z"/>
    <path d="M65 35h6c4 0 6 7 1 10-2 1-4 1-7 1"/>
    <path d="M26 54h44"/>
    <path d="M39 23c8-8 18-9 28-3-9 7-19 8-28 3Z"/>
    <path d="M44 23c7 1 13 0 20-3"/>
  </svg>`,
  chocolate: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M29 20h38v30H29V20Z"/>
    <path d="M29 30h38M29 40h38M42 20v30M55 20v30"/>
    <path d="M64 20c7 4 8 11 3 17"/>
  </svg>`,
  matcha: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M29 31h38v9c0 8-8 14-19 14s-19-6-19-14v-9Z"/>
    <path d="M25 54h46"/>
    <path d="M36 22c5-7 16-10 26-5-7 8-17 10-26 5Z"/>
    <path d="M43 22c6 0 11-2 17-5"/>
    <path d="M69 17l8-7M73 21l8-7"/>
  </svg>`,
  'bitter-melon': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M27 35c8-16 29-23 44-10-6 18-27 27-44 10Z"/>
    <path d="M34 32c5-3 9-5 14-3s9 1 15-3"/>
    <circle cx="39" cy="39" r="2"/><circle cx="49" cy="35" r="2"/><circle cx="58" cy="40" r="2"/>
    <path d="M63 21c4-6 10-7 15-4-3 5-8 7-14 5"/>
  </svg>`,
  'barley-tea': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M34 16h28l-4 38H38L34 16Z"/>
    <path d="M38 29h21"/>
    <path d="M70 47c-9-10-9-22-1-33"/>
    <path d="M68 24c5-1 9 1 12 5-5 2-9 0-12-5ZM68 36c5-1 9 1 12 5-5 2-9 0-12-5Z"/>
  </svg>`,
  'oat-milk': `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M36 15h24l4 10v30H32V25l4-10Z"/>
    <path d="M36 15v10h28M39 35h18"/>
    <path d="M70 51c-9-9-8-22 0-32"/>
    <path d="M70 28c6 1 10 4 12 9-6 0-10-3-12-9Z"/>
  </svg>`,
  milk: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M39 12h18v11l6 9v23H33V32l6-9V12Z"/>
    <path d="M39 23h18M38 38h20"/>
    <path d="M64 47c8 0 11-12 2-16"/>
  </svg>`,
  cream: `<svg viewBox="0 0 96 64" aria-hidden="true">
    <path d="M31 48c2-11 31-11 34 0 1 6-8 9-17 9s-18-3-17-9Z"/>
    <path d="M42 43c-5-8 2-12 6-18 3 8 13 12 6 18"/>
    <path d="M48 25c-3-7 3-11 6-17 2 7 8 12 2 18"/>
  </svg>`,
};

const DIM_REF_ART_ICONS = {
  acid: `<svg viewBox="0 0 168 96" aria-hidden="true">
    <g class="ref-art__shade">
      <circle cx="85" cy="52" r="22"/>
      <circle cx="108" cy="50" r="18"/>
      <circle cx="63" cy="58" r="15"/>
    </g>
    <g class="ref-art__line">
      <circle cx="85" cy="52" r="22"/>
      <circle cx="85" cy="52" r="7"/>
      <path d="M85 30v44M63 52h44M69 36l32 32M101 36 69 68"/>
      <circle cx="108" cy="50" r="18"/>
      <path d="M108 32v36M90 50h36M96 38l25 25M121 38 96 63"/>
      <circle cx="63" cy="58" r="15"/>
      <path d="M63 43v30M48 58h30M53 48l20 20M73 48 53 68"/>
      <path d="M96 25c7-13 22-17 33-10-6 12-18 16-32 12"/>
      <path d="M104 20c8 0 15-1 23-5"/>
      <path d="M72 30c-5-11 5-19 16-17 1 10-6 17-16 17"/>
      <path d="M76 28c3-5 7-9 12-14"/>
    </g>
  </svg>`,
  sweet: `<svg viewBox="0 0 168 96" aria-hidden="true">
    <g class="ref-art__shade">
      <path d="M76 35h42v37c0 9-7 14-21 14S76 81 76 72V35Z"/>
      <circle cx="36" cy="43" r="8"/><circle cx="51" cy="43" r="8"/><circle cx="44" cy="57" r="8"/>
    </g>
    <g class="ref-art__line">
      <path d="M76 35h42v37c0 9-7 14-21 14S76 81 76 72V35Z"/>
      <path d="M81 22h32l5 13H76l5-13Z"/>
      <path d="M84 53h26M85 64h23"/>
      <path d="M90 35c0 8 14 8 14 0"/>
      <path d="M36 43m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0"/>
      <path d="M51 43m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0"/>
      <path d="M44 57m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0"/>
      <path d="M36 43h15M43 50l8-7"/>
      <path d="M124 25l26 26M130 17l26 26M118 33l26 26"/>
      <path d="M139 51c0 8-9 10-9 20"/>
      <path d="M143 61c0 5-5 7-5 13"/>
      <path d="M66 24c7-10 18-13 29-7-8 10-18 13-29 7"/>
      <path d="M74 24c7 0 13-2 20-7"/>
    </g>
  </svg>`,
  bitter: `<svg viewBox="0 0 168 96" aria-hidden="true">
    <g class="ref-art__shade">
      <path d="M48 55c-7-25 13-43 40-38 10 25-10 49-40 38Z"/>
      <path d="M95 68c-8-25 13-43 39-36 9 24-11 47-39 36Z"/>
    </g>
    <g class="ref-art__line">
      <path d="M48 55c-7-25 13-43 40-38 10 25-10 49-40 38Z"/>
      <path d="M58 22c9 10 16 22 20 36"/>
      <path d="M59 31c8-4 15-4 22 0M56 42c10-3 19-2 29 3"/>
      <path d="M95 68c-8-25 13-43 39-36 9 24-11 47-39 36Z"/>
      <path d="M106 37c8 11 14 22 17 35"/>
      <path d="M106 47c8-4 15-4 22 1M103 58c9-3 18-1 26 4"/>
      <path d="M84 20c6-13 20-19 32-14-4 13-17 19-31 16"/>
      <path d="M93 18c7-2 14-5 21-11"/>
      <path d="M120 30c5-10 17-14 27-10-4 10-14 14-26 12"/>
      <path d="M127 29c7-1 13-4 19-9"/>
    </g>
  </svg>`,
  body: `<svg viewBox="0 0 168 96" aria-hidden="true">
    <g class="ref-art__shade">
      <path d="M78 18c-18 16-23 39-15 68"/>
      <path d="M103 12c-18 21-23 45-13 75"/>
      <path d="M128 22c-15 18-19 39-12 62"/>
    </g>
    <g class="ref-art__line">
      <path d="M78 18c-18 16-23 39-15 68"/>
      <path d="M72 30c-12 0-20-5-25-15 13-2 23 4 25 15Z"/>
      <path d="M69 42c-12 2-22-2-29-11 13-4 24 1 29 11Z"/>
      <path d="M66 55c-12 3-22 0-31-7 12-6 24-3 31 7Z"/>
      <path d="M64 68c-11 4-22 2-32-4 11-7 23-6 32 4Z"/>
      <path d="M103 12c-18 21-23 45-13 75"/>
      <path d="M99 28c-13-1-21-7-25-18 14-1 24 7 25 18Z"/>
      <path d="M96 42c-12 1-22-4-28-14 14-3 24 3 28 14Z"/>
      <path d="M94 56c-12 3-23-1-31-9 13-5 25-1 31 9Z"/>
      <path d="M92 70c-11 4-22 2-32-5 12-7 24-5 32 5Z"/>
      <path d="M128 22c-15 18-19 39-12 62"/>
      <path d="M124 36c-11 0-19-5-24-14 12-2 22 4 24 14Z"/>
      <path d="M121 50c-11 2-20-2-27-10 12-4 23 0 27 10Z"/>
      <path d="M119 64c-10 4-20 2-29-4 10-7 21-5 29 4Z"/>
    </g>
  </svg>`,
};

function getFlavorTheme(flavor) {
  return FLAVOR_THEMES[flavor] || 'wild';
}

// =============================================
// 問題資料（入門模式專用）
// =============================================
const QUESTIONS = [
  {
    id: 'acid',
    text: '你能接受明顯的酸味嗎？',
    hint: '例如：清楚感受到的果酸，像柳橙汁那種明亮感',
    options: [
      { label: '可以接受', value: 'yes' },
      { label: '不喜歡酸味', value: 'no' },
    ],
  },
  {
    id: 'bitter',
    text: '你介意喝完後嘴裡還有持續的苦感嗎？',
    hint: '這裡指的是吞嚥後餘韻中殘留的苦，而非入口瞬間的苦',
    options: [
      { label: '不介意', value: 'no' },
      { label: '會介意', value: 'yes' },
    ],
  },
  {
    id: 'sweet',
    text: '你希望咖啡有一點自然的甜感？',
    hint: '天然甜感，不是加糖的甜——就像熟透水果本身帶的甜',
    options: [
      { label: '希望有甜感', value: 'want' },
      { label: '有沒有都可以', value: 'any' },
    ],
  },
  {
    id: 'body',
    text: '你希望咖啡喝起來有份量感，還是輕盈感？',
    hint: '就像全脂牛奶 vs 礦泉水的口感重量，與味道濃淡無關',
    options: [
      { label: '有份量感', value: 'heavy' },
      { label: '輕盈一點', value: 'light' },
    ],
  },
  {
    id: 'flavor',
    text: '你比較喜歡哪種香氣方向？',
    hint: '不需要完全符合，選比較接近你直覺的那個',
    options: [
      { label: '果香、花香（莓果、柑橘）', value: 'fruity' },
      { label: '沉穩系（堅果、巧克力）', value: 'nutty' },
    ],
  },
];

// =============================================
// 資料層（Data Layer）— 只負責「資料從哪來」
// 未來換 Sheets API 只需修改此函式
// =============================================
async function fetchBeans() {
  return BEANS;
}

// =============================================
// 邏輯層（Logic Layer）— 只管計算，不碰 DOM
// =============================================
function calcDistance(bean, pref) {
  return Math.sqrt(
    (bean.acid   - pref.acid)   ** 2 +
    (bean.sweet  - pref.sweet)  ** 2 +
    (bean.bitter - pref.bitter) ** 2 +
    (bean.body   - pref.body)   ** 2
  );
}

function calcMatch(distance) {
  // 最大可能距離：sqrt((5-1)² × 4) = 8
  const MAX_DIST = 8;
  return Math.max(0, Math.round((1 - distance / MAX_DIST) * 100));
}

function recommend(beans, pref, limit = 2) {
  return beans
    .map(b => {
      const dist = calcDistance(b, pref);
      return { ...b, distance: dist, match: calcMatch(dist) };
    })
    .sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id, 'en'))
    .slice(0, limit);
}

// 為輪播比較盤排序：[0]最推薦 / [1]次推薦 / [2..N] 其他依匹配度由高到低
// primaryResults 已含 distance + match，rest 用同一 pref 計算後接在後面
function buildCarouselOrder(beans, pref, primaryResults) {
  const primaryIds = new Set(primaryResults.map(b => b.id));
  const rest = beans
    .filter(b => !primaryIds.has(b.id))
    .map(b => {
      const dist = calcDistance(b, pref);
      return { ...b, distance: dist, match: calcMatch(dist) };
    })
    .sort((a, b) => a.distance - b.distance);
  return [...primaryResults, ...rest];
}

// 雷達 5 軸資料抽出工具
function beanToRadar(bean) {
  return [bean.acid, bean.sweet, bean.bitter, bean.body, bean.aftertaste];
}

const RADAR_FLAVOR_NOTES = {
  yirgacheffe: ['茉莉花', '檸檬皮', '佛手柑', '蜂蜜'],
  mandheling: ['黑巧克力', '草本辛香', '泥土氣息', '厚實尾韻'],
  gesha: ['白花香', '佛手柑', '蜂蜜甜', '茶感尾韻'],
  'blue-mountain': ['奶油堅果', '可可', '柔和果酸', '乾淨餘韻'],
  'kenya-aa': ['黑醋栗', '莓果酸', '柑橘皮', '果汁感'],
  colombia: ['焦糖', '蘋果酸', '堅果', '柔甜平衡'],
  'brazil-santos': ['花生', '可可', '奶油感', '低酸厚甜'],
  harrar: ['紅酒', '熟莓果', '葡萄發酵', '藍莓果皮'],
};

function getRadarFlavorNotes(bean) {
  if (!bean) return [];
  if (RADAR_FLAVOR_NOTES[bean.id]) return RADAR_FLAVOR_NOTES[bean.id];
  return (bean.tags || []).slice(0, 4);
}

function updateRadarFlavorNotes(bean) {
  const el = document.getElementById('radar-flavor-notes');
  if (!el) return;
  const notes = getRadarFlavorNotes(bean);
  el.innerHTML = `
    <span class="radar-flavor-notes__label">風味</span>
    <span class="radar-flavor-notes__list">
      ${notes.map(note => `<span class="radar-flavor-note">${escapeHtml(note)}</span>`).join('')}
    </span>
  `;
}

// 多邊形面積（雷達覆蓋面積，shoelace 公式）
// 用於計算「面積差距 %」
function calcRadarArea(values) {
  const n = values.length;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const a1 = getRadarAxisAngle(i);
    const a2 = getRadarAxisAngle((i + 1) % n);
    const x1 = values[i] * Math.cos(a1);
    const y1 = values[i] * Math.sin(a1);
    const x2 = values[(i + 1) % n] * Math.cos(a2);
    const y2 = values[(i + 1) % n] * Math.sin(a2);
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
}

// 排除法推薦（入門模式專用，屬於邏輯層）
const FRUITY_TAGS = ['果香','花香','莓果','柑橘','茉莉','佛手柑','水蜜桃','藍莓','黑醋栗'];
const NUTTY_TAGS  = ['堅果','巧克力','花生','焦糖','奶油','泥土'];

// 將問卷答案轉換為偏好分數（供推薦與輪播排序共用）
function answersToPref(answers) {
  return {
    acid:   answers.acid   === 'no'    ? 1 : 3,
    sweet:  answers.sweet  === 'want'  ? 4 : 3,
    bitter: answers.bitter === 'yes'   ? 1 : 3,
    body:   answers.body   === 'heavy' ? 4 : 2,
  };
}

function exclusionRecommend(beans, answers) {
  let pool = [...beans];

  // 硬排除：底線不能接受的維度
  if (answers.acid   === 'no')  pool = pool.filter(b => b.acid   <= 3);
  if (answers.bitter === 'yes') pool = pool.filter(b => b.bitter <= 3);

  const isFallback = pool.length === 0;
  if (isFallback) pool = [...beans];

  const pref = answersToPref(answers);

  const ranked = recommend(pool, pref, pool.length);

  if (isFallback) {
    return { results: ranked.slice(0, 1), isFallback };
  }

  let results = ranked;

  // Q5 標籤加權：只在距離相近的豆款中作為排序依據
  if (answers.flavor && ranked.length > 0) {
    const preferred = answers.flavor === 'fruity' ? FRUITY_TAGS : NUTTY_TAGS;
    const bestDistance = ranked[0].distance;
    const nearby = ranked.filter(bean => bean.distance <= bestDistance + 1);
    const remaining = ranked.filter(bean => bean.distance > bestDistance + 1);

    nearby.sort((a, b) => {
      const sa = a.tags.filter(t => preferred.includes(t)).length;
      const sb = b.tags.filter(t => preferred.includes(t)).length;
      return sb - sa || a.distance - b.distance || a.id.localeCompare(b.id, 'en');
    });

    results = [...nearby, ...remaining];
  }

  return { results: results.slice(0, 2), isFallback };
}

function getPreferences() {
  return {
    acid:   parseInt(document.getElementById('slider-acid').value),
    sweet:  parseInt(document.getElementById('slider-sweet').value),
    bitter: parseInt(document.getElementById('slider-bitter').value),
    body:   parseInt(document.getElementById('slider-body').value),
  };
}

// =============================================
// 呈現層（View Layer）— 只負責畫面顯示
// =============================================
let coffeeRadar = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function renderDots(score) {
  return Array.from({ length: 5 }, (_, i) =>
    `<svg class="bean-dot ${i < score ? 'bean-dot--filled' : ''}" viewBox="0 0 12 16" aria-hidden="true">
      <g transform="rotate(-14 6 8)">
        <ellipse cx="6" cy="8" rx="4.3" ry="7"/>
        <path class="bean-dot__groove" d="M6 1.8 Q3.6 5 4.2 8 Q4.8 11 6 14.2" fill="none"/>
      </g>
    </svg>`
  ).join('');
}

function getBeanPersonality(bean) {
  if (bean.acid >= 4 && bean.sweet >= 3) return '喜歡明亮果酸、想喝出層次感的人';
  if (bean.body >= 4 && bean.bitter >= 3) return '偏好厚實、可可、低酸風味的人';
  if (bean.sweet >= 4) return '喜歡圓潤甜感、希望咖啡好入口的人';
  if (bean.bitter <= 2 && bean.body <= 3) return '想從乾淨、輕盈風味開始的人';
  return '想要平衡、不想踩雷的日常飲用者';
}

function getRecommendReason(bean) {
  const topTags = bean.tags.slice(0, 2).join('、');
  if (bean.acid >= 4) return `它的 ${topTags} 很鮮明，酸感明亮但有風味支撐，不只是尖酸。`;
  if (bean.body >= 4) return `它的口感厚實，${topTags} 風味會讓咖啡喝起來更有份量。`;
  if (bean.sweet >= 4) return `它的甜感較明顯，${topTags} 讓整杯更圓潤、好親近。`;
  return `它的 ${topTags} 表現穩定，適合作為找到自己風味座標的第一杯。`;
}

function renderBeanCard(bean, rank) {
  const rankLabel = rank === 0 ? '最推薦' : '次推薦';
  const safeId = escapeHtml(bean.id);
  const safeName = escapeHtml(bean.name);
  const safeNameEn = escapeHtml(bean.nameEn);
  const safeOrigin = escapeHtml(bean.origin);
  const safeEstate = escapeHtml(bean.estate);
  const safeProcess = escapeHtml(bean.process);
  const safeTasting = escapeHtml(bean.tasting);
  const safeReason = escapeHtml(getRecommendReason(bean));
  const safePersonality = escapeHtml(getBeanPersonality(bean));
  return `
    <article class="bean-card ${rank === 0 ? 'bean-card--primary' : ''}" data-bean-id="${safeId}" aria-label="${safeName} 推薦結果">
      <div class="bean-card__header">
        <div class="bean-card__rank">${rankLabel}</div>
        <div class="bean-card__match">${bean.match}%<span class="match-label"> 匹配</span></div>
      </div>

      <div class="bean-card__body">
        <div class="bean-card__split">
          <div class="bean-card__split-left">
            <h3 class="bean-name">${safeName}</h3>
            <p class="bean-name-en">${safeNameEn}</p>

            <div class="bean-meta">
              <div class="bean-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#A83838" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle fill="#FFFFFF" cx="12" cy="9" r="2.5"/>
                </svg>
                <span class="bean-meta__text">${safeOrigin}</span>
              </div>
              <div class="bean-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <span class="bean-meta__text">${safeEstate}</span>
              </div>
            </div>

            <span class="process-tag">${safeProcess}</span>
          </div>

          <div class="bean-card__split-right">
            <div class="bean-card__tasting">
              <svg class="bean-card__leaf-decor" viewBox="0 0 100 80" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M88 8 Q72 18 58 28 Q44 40 32 56 Q24 66 16 72" stroke-width="0.7"/>
                <path d="M72 14 Q80 7 88 11 Q83 20 72 14 Z" stroke-width="0.55"/>
                <line x1="72" y1="14" x2="86" y2="11" stroke-width="0.4"/>
                <path d="M58 28 Q64 19 74 24 Q66 32 58 28 Z" stroke-width="0.55"/>
                <line x1="58" y1="28" x2="73" y2="24" stroke-width="0.4"/>
                <path d="M52 32 Q42 26 36 34 Q44 42 52 32 Z" stroke-width="0.55"/>
                <line x1="52" y1="32" x2="37" y2="34" stroke-width="0.4"/>
                <path d="M44 48 Q50 39 60 44 Q53 53 44 48 Z" stroke-width="0.55"/>
                <line x1="44" y1="48" x2="59" y2="44" stroke-width="0.4"/>
                <path d="M40 52 Q30 47 24 56 Q32 63 40 52 Z" stroke-width="0.55"/>
                <line x1="40" y1="52" x2="25" y2="56" stroke-width="0.4"/>
                <circle cx="50" cy="40" r="2.6" stroke-width="0.5"/>
                <circle cx="54.5" cy="44" r="2.6" stroke-width="0.5"/>
                <circle cx="45.5" cy="44" r="2.6" stroke-width="0.5"/>
              </svg>
              <p class="bean-card__tasting-text">${safeTasting}</p>
            </div>
            <div class="bean-card__guidance">
              <div class="guidance-item">
                <span class="guidance-item__label">為什麼推薦你</span>
                <p>${safeReason}</p>
              </div>
              <div class="guidance-item">
                <span class="guidance-item__label">適合的客人</span>
                <p>${safePersonality}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bean-card__scores-box">
          <div class="bean-card__scores">
            <div class="score-row">
              <span class="score-dim">酸度</span>
              <div class="score-dots" aria-label="酸度 ${bean.acid} 分">${renderDots(bean.acid)}</div>
            </div>
            <div class="score-row">
              <span class="score-dim">甜感</span>
              <div class="score-dots" aria-label="甜感 ${bean.sweet} 分">${renderDots(bean.sweet)}</div>
            </div>
            <div class="score-row">
              <span class="score-dim">苦度</span>
              <div class="score-dots" aria-label="苦度 ${bean.bitter} 分">${renderDots(bean.bitter)}</div>
            </div>
            <div class="score-row">
              <span class="score-dim">厚實</span>
              <div class="score-dots" aria-label="厚實度 ${bean.body} 分">${renderDots(bean.body)}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bean-card__tags">
        ${bean.tags.map(t => {
          const theme = getFlavorTheme(t);
          const safeTag = escapeHtml(t);
          return `
            <span class="flavor-tag flavor-tag--${theme}">
              <span class="flavor-tag__icon">${FLAVOR_ICONS[theme]}</span>
              <span class="flavor-tag__text">${safeTag}</span>
            </span>
          `;
        }).join('')}
      </div>
    </article>
  `;
}

function renderResults(results) {
  const grid = document.getElementById('results-grid');
  grid.innerHTML = results.map((bean, i) => renderBeanCard(bean, i)).join('');
}

// =============================================
// 純 Canvas 雷達圖（Route B）
// =============================================
class CoffeeRadar {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.labels = RADAR_AXIS_CONFIG.map(axis => axis.label);
    this.data       = [3, 3, 3, 3, 3];  // 上層：當前選中（active）
    this._baseData  = null;                    // 底層：對照基準（最推薦），null 時不繪製
    this._animFrom  = null;
    this._animTo    = null;
    this._animStart = null;
    this._animDur   = 500;
    this._animId    = null;
    this.resize();
  }

  resize() {
    const wrap = this.canvas.parentElement;
    const size = Math.min(wrap.clientWidth || 320, 480);
    this.canvas.width  = size;
    this.canvas.height = size;
    this.cx     = size / 2;
    this.cy     = size / 2;
    this.r      = size * 0.30;
    this.labelR = size * 0.455;
    this.iconR  = size * 0.355;
  }

  getColors() {
    return {
      gridLine: 'rgba(93, 58, 27, 0.20)',
      rimLine:  'rgba(93, 58, 27, 0.28)',
      axisLine: 'rgba(93, 58, 27, 0.18)',
      fill:     'rgba(238, 190, 116, 0.13)',
      glow:     [255, 224, 175],
      label:    '#4D2B12',
      icon:     'rgba(84,45,18,0.88)',
      tick:     'rgba(83,45,18,0.74)',
    };
  }

  polyPath(values) {
    const n = this.labels.length;
    const ctx = this.ctx;
    ctx.beginPath();
    values.forEach((v, i) => {
      const angle = getRadarAxisAngle(i);
      const dist  = (v / 5) * this.r;
      const x = this.cx + dist * Math.cos(angle);
      const y = this.cy + dist * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
  }

  getPoint(value, index) {
    const angle = getRadarAxisAngle(index);
    const dist = (value / 5) * this.r;
    return {
      x: this.cx + dist * Math.cos(angle),
      y: this.cy + dist * Math.sin(angle),
    };
  }

  updateHtmlIcons() {
    const layer = document.getElementById('radar-icon-layer');
    if (!layer) return;

    if (layer.children.length !== RADAR_AXIS_CONFIG.length) {
      layer.innerHTML = RADAR_AXIS_CONFIG.map(axis => (
        `<img class="radar-axis-img" data-axis="${axis.key}" src="${axis.icon}" alt="">`
      )).join('');
    }

    const iconSize = Math.max(26, Math.min(42, this.canvas.width * 0.072));
    [...layer.children].forEach((img, index) => {
      const axis = RADAR_AXIS_CONFIG[index];
      const scaledIconSize = iconSize * (axis.iconScale || 1);
      const angle = getRadarAxisAngle(index);
      const x = this.cx + this.iconR * Math.cos(angle);
      const y = this.cy + this.iconR * Math.sin(angle);
      img.style.left = `${(x / this.canvas.width) * 100}%`;
      img.style.top = `${(y / this.canvas.height) * 100}%`;
      img.style.setProperty('--radar-icon-size', `${scaledIconSize}px`);
    });
  }

  drawBitmapGlowPath(values) {
    const scale = 3;
    const offscreen = document.createElement('canvas');
    offscreen.width = this.canvas.width * scale;
    offscreen.height = this.canvas.height * scale;
    const glowCtx = offscreen.getContext('2d');
    const points = values.map((value, index) => {
      const point = this.getPoint(value, index);
      return { x: point.x * scale, y: point.y * scale };
    });

    const tracePath = () => {
      glowCtx.beginPath();
      points.forEach((point, index) => {
        index === 0 ? glowCtx.moveTo(point.x, point.y) : glowCtx.lineTo(point.x, point.y);
      });
      glowCtx.closePath();
    };

    glowCtx.lineCap = 'round';
    glowCtx.lineJoin = 'round';
    glowCtx.globalCompositeOperation = 'lighter';

    [
      { width: 13.5, blur: 23, color: 'rgba(255,192,96,0.075)', shadow: 'rgba(255,190,105,0.25)' },
      { width: 7.2, blur: 14, color: 'rgba(255,218,156,0.145)', shadow: 'rgba(255,218,160,0.35)' },
      { width: 4.0, blur: 7.5, color: 'rgba(255,245,218,0.28)', shadow: 'rgba(255,246,220,0.48)' },
      { width: 2.0, blur: 3.4, color: 'rgba(255,255,248,0.68)', shadow: 'rgba(255,255,245,0.68)' },
      { width: 0.85, blur: 1.0, color: 'rgba(255,255,255,0.98)', shadow: 'rgba(255,255,255,0.86)' },
    ].forEach(layer => {
      glowCtx.save();
      glowCtx.lineWidth = layer.width * scale;
      glowCtx.strokeStyle = layer.color;
      glowCtx.shadowBlur = layer.blur * scale;
      glowCtx.shadowColor = layer.shadow;
      tracePath();
      glowCtx.stroke();
      glowCtx.restore();
    });

    points.forEach(point => {
      const outerRadius = 14 * scale;
      const nodeGradient = glowCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, outerRadius);
      nodeGradient.addColorStop(0, 'rgba(255,255,255,1)');
      nodeGradient.addColorStop(0.22, 'rgba(255,255,250,0.94)');
      nodeGradient.addColorStop(0.46, 'rgba(255,224,168,0.34)');
      nodeGradient.addColorStop(1, 'rgba(255,205,135,0)');
      glowCtx.beginPath();
      glowCtx.arc(point.x, point.y, outerRadius, 0, Math.PI * 2);
      glowCtx.fillStyle = nodeGradient;
      glowCtx.fill();

      glowCtx.beginPath();
      glowCtx.arc(point.x, point.y, 4.0 * scale, 0, Math.PI * 2);
      glowCtx.fillStyle = 'rgba(255,255,255,0.98)';
      glowCtx.fill();
    });

    this.ctx.save();
    this.ctx.globalAlpha = 0.96;
    this.ctx.drawImage(offscreen, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  draw() {
    const { canvas, ctx, cx, cy, r, labelR, iconR } = this;
    const n = this.labels.length;
    const c = this.getColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. 同心多邊形格線（5 圈）
    //    只有當基準線或選中線「觸及最外圈」（任一軸值 = 5）時，淡化最外圈的深棕線
    //    避免資料線正好壓在邊界時，深色格線跟 LED / 香檳虛線打架
    const reachesRim =
      (this._baseData && this._baseData.some(v => v >= 4.95)) ||
      this.data.some(v => v >= 4.95);

    for (let ring = 1; ring <= 5; ring++) {
      const rr = (ring / 5) * r;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = getRadarAxisAngle(i);
        const x = cx + rr * Math.cos(a);
        const y = cy + rr * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 5
        ? (reachesRim ? 'rgba(93,58,27,0.16)' : c.rimLine)
        : c.gridLine;
      ctx.lineWidth = ring === 5 ? 0.9 : 0.72;
      ctx.stroke();
    }

    // 2. 刻度數字（沿第一軸旁）
    ctx.font = `${Math.max(9, canvas.width * 0.022)}px 'DM Sans', sans-serif`;
    ctx.fillStyle = c.tick;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let ring = 1; ring <= 5; ring++) {
      const rr = (ring / 5) * r;
      const a  = -Math.PI / 2 - 0.22;
      ctx.fillText(ring, cx + rr * Math.cos(a), cy + rr * Math.sin(a));
    }

    // 3. 放射軸線
    for (let i = 0; i < n; i++) {
      const a = getRadarAxisAngle(i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = c.axisLine;
      ctx.lineWidth = 0.72;
      ctx.stroke();
    }

    // === 角色分配 ===
    // 主角（LED 實線）：最推薦的對照基準（_baseData）
    // 比對（虛線）：當前選中的豆款（this.data）
    // 若沒有 baseline（單線模式 fallback），this.data 就是主角
    const protagonist = this._baseData || this.data;
    const hasComparator = !!this._baseData;

    // 4. 主角：多邊形填充
    this.polyPath(protagonist);
    ctx.fillStyle = c.fill;
    ctx.fill();

    // 5. 主角：高解析度 bitmap 光線。整體一次成形，避免 PNG 線段拼接感。
    this.drawBitmapGlowPath(protagonist);

    // 6.5 比對虛線（active）— 香檳金虛線、無發光、依差距漸隱
    if (hasComparator) {
      let dist2 = 0;
      for (let i = 0; i < this.data.length; i++) {
        dist2 += (this.data[i] - this._baseData[i]) ** 2;
      }
      const fade = Math.min(1, Math.sqrt(dist2) / 1.0);  // 距離 ≥1 完全顯示，0 時消失

      if (fade > 0.02) {
        ctx.save();
        ctx.setLineDash([7, 4]);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = `rgba(168,134,55,${0.65 * fade})`;
        this.polyPath(this.data);
        ctx.stroke();
        ctx.setLineDash([]);
        // 空心頂點（香檳金，無發光）
        this.data.forEach((v, i) => {
          const angle = getRadarAxisAngle(i);
          const dist  = (v / 5) * r;
          const px = cx + dist * Math.cos(angle);
          const py = cy + dist * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168,134,55,${0.85 * fade})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        });
        ctx.restore();
      }
    }

    // 7. 線條圖示 + 標籤文字
    const fontSize = Math.max(13, canvas.width * 0.034);
    ctx.textBaseline = 'middle';
    this.updateHtmlIcons();

    this.labels.forEach((label, i) => {
      const angle = getRadarAxisAngle(i);
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);

      ctx.font = `600 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = c.label;
      ctx.fillText(label, lx, ly);
    });
  }

  setData(newData) {
    if (this._animId) cancelAnimationFrame(this._animId);
    this._animFrom  = [...this.data];
    this._animTo    = newData;
    this._animStart = null;
    const step = (ts) => {
      if (!this._animStart) this._animStart = ts;
      const p    = Math.min((ts - this._animStart) / this._animDur, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      this.data  = this._animFrom.map((from, i) => from + (this._animTo[i] - from) * ease);
      this.draw();
      if (p < 1) {
        this._animId = requestAnimationFrame(step);
      } else {
        this.data    = [...this._animTo];
        this._animId = null;
      }
    };
    this._animId = requestAnimationFrame(step);
  }

  // 設定對照基準輪廓（不動畫，立即套用）。傳 null 可清除基準線。
  setBaseline(data) {
    this._baseData = data ? [...data] : null;
    if (!this._animId) this.draw();
  }
}

function ensureRadar() {
  if (!coffeeRadar) {
    const canvas = document.getElementById('radar-chart');
    coffeeRadar = new CoffeeRadar(canvas);
    loadRadarIcons(() => coffeeRadar.draw());
    new ResizeObserver(() => {
      coffeeRadar.resize();
      coffeeRadar.draw();
    }).observe(canvas.parentElement);
  }
  return coffeeRadar;
}

function renderChart(bean) {
  ensureRadar().setData(beanToRadar(bean));
  updateRadarFlavorNotes(bean);
}

// 雙線疊圖：底層 = 對照基準（最推薦），上層動畫切換到 active
function renderChartComparison(baseBean, activeBean) {
  const radar = ensureRadar();
  radar.setBaseline(beanToRadar(baseBean));
  radar.setData(beanToRadar(activeBean));
  updateRadarFlavorNotes(activeBean);
}

function showResultsSections(show) {
  document.getElementById('results-section').hidden    = !show;
  document.getElementById('chart-section').hidden      = !show;
  const cmp = document.getElementById('comparison-section');
  if (cmp) cmp.hidden = !show;
}

// =============================================
// 輪播比較盤（Comparison Carousel）
// =============================================
const carouselState = {
  ordered: [],         // 排序後的全部豆款（[0]=最推薦、[1]=次推薦、後續依匹配度）
  activeIdx: 0,        // 當前選中索引
  observer: null,      // IntersectionObserver 實例
  bound: false,        // 箭頭/鍵盤是否已綁定
};

function renderSpecimenCard(bean, idx) {
  const isBaseline = idx === 0;
  const ord = String(idx + 1).padStart(2, '0');
  const ariaLabel = `${bean.name}，匹配 ${bean.match}%，第 ${idx + 1} 款${isBaseline ? '（對照基準）' : ''}`;
  const safeAriaLabel = escapeHtml(ariaLabel);
  const safeProcess = escapeHtml(bean.process);
  const safeName = escapeHtml(bean.name);
  const safeNameEn = escapeHtml(bean.nameEn);
  const safeOrigin = escapeHtml(bean.origin);

  return `
    <article
      class="specimen-card${isBaseline ? ' specimen-card--baseline' : ''}"
      data-idx="${idx}"
      tabindex="0"
      role="button"
      aria-label="${safeAriaLabel}"
      aria-current="${idx === 0 ? 'true' : 'false'}"
    >
      ${isBaseline ? '<span class="specimen-card__rule" aria-hidden="true"></span>' : ''}
      <div class="specimen-card__top">
        <span class="specimen-card__ord">N°${ord}</span>
        <span class="specimen-card__process">·${safeProcess}</span>
      </div>
      <div class="specimen-card__name">
        <h4 class="specimen-card__zh">${safeName}</h4>
        <p class="specimen-card__en">${safeNameEn}</p>
      </div>
      <p class="specimen-card__origin">${safeOrigin}</p>
      <div class="specimen-card__match">
        <span class="specimen-card__match-num">${bean.match}</span>
        <span class="specimen-card__match-pct">％</span>
      </div>
      ${isBaseline ? '<span class="specimen-card__baseline-tag">對照基準 · BASELINE</span>' : ''}
    </article>
  `;
}

function renderCarouselCards(ordered) {
  const track = document.getElementById('bean-carousel');
  if (!track) return;
  track.innerHTML = ordered.map((bean, i) => renderSpecimenCard(bean, i)).join('');
}

// 切換選中卡片：同步雷達、卡片狀態、進度尺、箭頭
function selectCarouselIndex(idx, fromScroll = false) {
  const total = carouselState.ordered.length;
  if (total === 0) return;
  idx = Math.max(0, Math.min(total - 1, idx));
  const baseBean   = carouselState.ordered[0];
  const activeBean = carouselState.ordered[idx];
  carouselState.activeIdx = idx;

  // 卡片視覺狀態
  document.querySelectorAll('.specimen-card').forEach(card => {
    const cardIdx = parseInt(card.dataset.idx);
    const isActive = cardIdx === idx;
    card.classList.toggle('specimen-card--active', isActive);
    card.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  // 雷達雙線
  renderChartComparison(baseBean, activeBean);

  // 標題：在對照基準時顯示完整輪廓，比對其他款時顯示雙方名稱
  // 規則：最推薦（baseBean）是粗體主角，當前選中（activeBean）是次要對照名稱
  const titleEl = document.getElementById('chart-bean-name');
  if (titleEl) {
    const safeBaseName = escapeHtml(baseBean.name);
    const safeActiveName = escapeHtml(activeBean.name);
    titleEl.innerHTML = (baseBean.id === activeBean.id)
      ? `<strong>${safeBaseName}</strong> 的完整風味輪廓`
      : `<strong>${safeBaseName}</strong> 對照 ${safeActiveName}`;
  }

  // 進度尺
  const idxEl  = document.getElementById('carousel-index');
  const fillEl = document.getElementById('carousel-rule-fill');
  if (idxEl)  idxEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  if (fillEl) fillEl.style.width = `${((idx + 1) / total) * 100}%`;

  // 箭頭啟停
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.disabled = (idx === 0);
  if (nextBtn) nextBtn.disabled = (idx === total - 1);

  // 主動切換時捲動到中央
  if (!fromScroll) {
    const target = document.querySelector(`.specimen-card[data-idx="${idx}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

// 用 IntersectionObserver 偵測哪張卡片捲到了輪播中央
function setupCarouselObserver() {
  const track = document.getElementById('bean-carousel');
  if (!track) return;

  if (carouselState.observer) carouselState.observer.disconnect();

  carouselState.observer = new IntersectionObserver((entries) => {
    // 找出最接近中央的進入卡片
    let bestEntry = null;
    let bestRatio = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
        bestRatio = entry.intersectionRatio;
        bestEntry = entry;
      }
    });
    if (bestEntry) {
      const idx = parseInt(bestEntry.target.dataset.idx);
      if (idx !== carouselState.activeIdx) {
        selectCarouselIndex(idx, true);
      }
    }
  }, {
    root: track,
    rootMargin: '0% -42% 0% -42%',  // 只觀察輪播中央約 16% 的橫向區帶
    threshold: [0.4, 0.6, 0.8],
  });

  document.querySelectorAll('.specimen-card').forEach(card => {
    carouselState.observer.observe(card);
  });
}

function bindCarouselControls() {
  if (carouselState.bound) return;
  carouselState.bound = true;

  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  prev?.addEventListener('click', () => selectCarouselIndex(carouselState.activeIdx - 1));
  next?.addEventListener('click', () => selectCarouselIndex(carouselState.activeIdx + 1));

  const track = document.getElementById('bean-carousel');
  if (!track) return;

  // 鍵盤左右切換 + Enter / Space 點選
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectCarouselIndex(carouselState.activeIdx - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectCarouselIndex(carouselState.activeIdx + 1);
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('specimen-card')) {
      e.preventDefault();
      const idx = parseInt(e.target.dataset.idx);
      selectCarouselIndex(idx);
    }
  });

  // 點擊卡片直接選中
  track.addEventListener('click', (e) => {
    const card = e.target.closest('.specimen-card');
    if (!card) return;
    const idx = parseInt(card.dataset.idx);
    selectCarouselIndex(idx);
  });

  // 桌機滑鼠拖拉（手機原生 touch 已支援）
  let isDragging = false;
  let dragStartX = 0;
  let scrollStartX = 0;
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.pageX;
    scrollStartX = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    track.scrollLeft = scrollStartX - (e.pageX - dragStartX);
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
  });
}

// 對外主入口：依排序好的豆款重建輪播 + 雷達雙線
function renderComparison(orderedBeans) {
  carouselState.ordered = orderedBeans;
  renderCarouselCards(orderedBeans);
  bindCarouselControls();
  setupCarouselObserver();
  // 初次渲染（含滑桿改動觸發的重繪）：fromScroll=true → 不執行 scrollIntoView
  // 這樣移動滑桿時頁面不會自動跳到比較盤位置；輪播本身因為 innerHTML 重設自然歸位
  selectCarouselIndex(0, true);
}

function updateChartTitle(bean) {
  const title = document.getElementById('chart-bean-name');
  if (title) title.textContent = `${bean.name} 的完整風味輪廓`;
}

function updateSliderRef(dim, value) {
  const refs = SLIDER_REFS[dim];
  const ref  = refs[value - 1];
  const nameEl = document.getElementById(`ref-name-${dim}`);
  const descEl = document.getElementById(`ref-desc-${dim}`);
  const artEl  = document.getElementById(`ref-art-${dim}`);
  const valEl  = document.getElementById(`val-${dim}`);
  const slider = document.getElementById(`slider-${dim}`);

  if (nameEl) nameEl.textContent = ref.ref;
  if (descEl) descEl.textContent = ref.desc;
  if (artEl) {
    artEl.dataset.art = ref.art || '';
    artEl.dataset.score = String(value);
    artEl.style.backgroundImage = `url("assets/slider-ref/${dim}-${value}.png")`;
  }
  if (valEl)  valEl.textContent  = value;

  // 更新滑桿填充顏色
  if (slider) {
    const pct = ((value - 1) / 4) * 100;
    slider.style.setProperty('--fill', `${pct}%`);
  }
}

// =============================================
// 主流程 — 進階模式（滑桿）
// =============================================
async function update() {
  const beans   = await fetchBeans();
  const pref    = getPreferences();
  const results = recommend(beans, pref);
  const ordered = buildCarouselOrder(beans, pref, results);

  showResultsSections(true);
  renderResults(results);
  renderComparison(ordered);  // 同時負責雷達雙線、Δ 面板、卡片、標題
}

function bindSliders() {
  const dims = ['acid', 'sweet', 'bitter', 'body'];
  dims.forEach(dim => {
    const slider = document.getElementById(`slider-${dim}`);
    if (!slider) return;
    updateSliderRef(dim, parseInt(slider.value));
    slider.addEventListener('input', () => {
      updateSliderRef(dim, parseInt(slider.value));
      update();
    });
  });
}

// =============================================
// 入門模式流程（排除法問卷）
// =============================================
let quizState = { step: 0, answers: {} };

function renderProgressDots(step) {
  const container = document.getElementById('progress-dots');
  const textEl    = document.getElementById('progress-text');
  if (!container) return;

  container.innerHTML = QUESTIONS.map((_, i) => {
    let cls = 'progress-dot';
    if (i < step)  cls += ' progress-dot--done';
    if (i === step) cls += ' progress-dot--active';
    return `<span class="${cls}" aria-hidden="true"></span>`;
  }).join('');

  if (textEl) textEl.textContent = `第 ${step + 1} 題，共 ${QUESTIONS.length} 題`;
}

function renderQuestion(step) {
  const q   = QUESTIONS[step];
  const card = document.getElementById('question-card');
  const back = document.getElementById('quiz-back');
  if (!card) return;

  card.innerHTML = `
    <p class="question-number">Q${step + 1} / ${QUESTIONS.length}</p>
    <h3 class="question-text">${escapeHtml(q.text)}</h3>
    <p class="question-hint">${escapeHtml(q.hint)}</p>
    <div class="answer-btns">
      ${q.options.map(opt => {
        const safeQid = escapeHtml(q.id);
        const safeValue = escapeHtml(opt.value);
        const safeLabel = escapeHtml(opt.label);
        return `
        <button
          class="answer-btn${quizState.answers[q.id] === opt.value ? ' answer-btn--selected' : ''}"
          data-qid="${safeQid}"
          data-value="${safeValue}"
        >${safeLabel}</button>
      `;
      }).join('')}
    </div>
  `;

  renderProgressDots(step);

  if (back) back.disabled = (step === 0);

  // 綁定選項按鈕
  card.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleAnswer(btn.dataset.qid, btn.dataset.value);
    });
  });
}

function handleAnswer(qId, value) {
  quizState.answers[qId] = value;

  if (quizState.step < QUESTIONS.length - 1) {
    quizState.step++;
    renderQuestion(quizState.step);
  } else {
    showQuizResults();
  }
}

async function showQuizResults() {
  const beans = await fetchBeans();
  const { results, isFallback } = exclusionRecommend(beans, quizState.answers);
  const pref    = answersToPref(quizState.answers);
  const ordered = buildCarouselOrder(beans, pref, results);

  showResultsSections(true);

  const descEl = document.getElementById('results-desc');
  if (descEl) {
    descEl.textContent = isFallback
      ? '你的底線條件比較嚴格，以下是整體最接近的豆款，供你參考'
      : '根據你的底線，從 8 款精品豆中篩選出最適合的推薦';
  }

  if (isFallback) {
    const grid = document.getElementById('results-grid');
    if (grid) {
      const notice = document.createElement('p');
      notice.className = 'fallback-notice';
      notice.textContent = '⚠ 依你的底線條件找不到完全符合的豆款，以下為整體最接近的選項。';
      grid.before(notice);
    }
  }

  renderResults(results);
  renderComparison(ordered);
  renderRestartBtn();

  // 捲動到結果區
  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRestartBtn() {
  const nav = document.getElementById('quiz-back')?.parentElement;
  if (!nav || nav.querySelector('.restart-btn')) return;

  const btn = document.createElement('button');
  btn.className = 'restart-btn';
  btn.setAttribute('aria-label', '重新回答問題');
  btn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
    重新回答
  `;
  btn.addEventListener('click', resetQuiz);
  nav.appendChild(btn);
}

function resetQuiz() {
  quizState = { step: 0, answers: {} };
  showResultsSections(false);

  // 移除舊的 fallback notice 和 restart 按鈕
  document.querySelectorAll('.fallback-notice, .restart-btn').forEach(el => el.remove());

  renderQuestion(0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindQuizBack() {
  document.getElementById('quiz-back')?.addEventListener('click', () => {
    if (quizState.step > 0) {
      quizState.step--;
      renderQuestion(quizState.step);
    }
  });
}

// =============================================
// 模式切換
// =============================================
function switchMode(mode) {
  const quizEl   = document.getElementById('quiz-section');
  const sliderEl = document.getElementById('slider-section');
  const tabQuiz  = document.getElementById('tab-quiz');
  const tabSlide = document.getElementById('tab-slider');

  if (mode === 'quiz') {
    quizEl.hidden   = false;
    sliderEl.hidden = true;
    tabQuiz.setAttribute('aria-selected', 'true');
    tabQuiz.classList.add('tab-btn--active');
    tabSlide.setAttribute('aria-selected', 'false');
    tabSlide.classList.remove('tab-btn--active');
    // 若問卷未完成，隱藏結果區
    if (Object.keys(quizState.answers).length < QUESTIONS.length) {
      showResultsSections(false);
    }
  } else {
    quizEl.hidden   = true;
    sliderEl.hidden = false;
    tabQuiz.setAttribute('aria-selected', 'false');
    tabQuiz.classList.remove('tab-btn--active');
    tabSlide.setAttribute('aria-selected', 'true');
    tabSlide.classList.add('tab-btn--active');
    update();
  }
}

function bindModeTabs() {
  document.getElementById('tab-quiz')?.addEventListener('click',   () => switchMode('quiz'));
  document.getElementById('tab-slider')?.addEventListener('click', () => switchMode('slider'));
}

// =============================================
// 初始化
// =============================================
async function init() {
  bindModeTabs();
  bindSliders();
  bindQuizBack();

  // 預設顯示入門模式第 1 題
  renderQuestion(0);
}

document.addEventListener('DOMContentLoaded', init);
