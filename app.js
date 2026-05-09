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

function recommend(beans, pref) {
  return beans
    .map(b => {
      const dist = calcDistance(b, pref);
      return { ...b, distance: dist, match: calcMatch(dist) };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
}

// 排除法推薦（入門模式專用，屬於邏輯層）
const FRUITY_TAGS = ['果香','花香','莓果','柑橘','茉莉','佛手柑','水蜜桃','藍莓','黑醋栗'];
const NUTTY_TAGS  = ['堅果','巧克力','花生','焦糖','奶油','泥土'];

function exclusionRecommend(beans, answers) {
  let pool = [...beans];

  // 硬排除：底線不能接受的維度
  if (answers.acid   === 'no')  pool = pool.filter(b => b.acid   <= 3);
  if (answers.bitter === 'yes') pool = pool.filter(b => b.bitter <= 3);

  const isFallback = pool.length === 0;
  if (isFallback) pool = [...beans];

  // 將問卷答案轉換為偏好分數，送入既有的 recommend()
  const pref = {
    acid:   answers.acid   === 'no'    ? 1 : 3,
    sweet:  answers.sweet  === 'want'  ? 4 : 3,
    bitter: answers.bitter === 'yes'   ? 1 : 3,
    body:   answers.body   === 'heavy' ? 4 : 2,
  };

  let results = recommend(pool, pref);

  // Q5 標籤加權：在距離相近時作為排序依據
  if (answers.flavor) {
    const preferred = answers.flavor === 'fruity' ? FRUITY_TAGS : NUTTY_TAGS;
    results = [...results].sort((a, b) => {
      const sa = a.tags.filter(t => preferred.includes(t)).length;
      const sb = b.tags.filter(t => preferred.includes(t)).length;
      return sb - sa || a.distance - b.distance;
    });
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

function renderBeanCard(bean, rank) {
  const rankLabel = rank === 0 ? '最推薦' : '次推薦';
  return `
    <article class="bean-card ${rank === 0 ? 'bean-card--primary' : ''}" aria-label="${bean.name} 推薦結果">
      <div class="bean-card__header">
        <div class="bean-card__rank">${rankLabel}</div>
        <div class="bean-card__match">${bean.match}%<span class="match-label"> 匹配</span></div>
      </div>

      <div class="bean-card__body">
        <div class="bean-card__split">
          <div class="bean-card__split-left">
            <h3 class="bean-name">${bean.name}</h3>
            <p class="bean-name-en">${bean.nameEn}</p>

            <div class="bean-meta">
              <div class="bean-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#A83838" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle fill="#FFFFFF" cx="12" cy="9" r="2.5"/>
                </svg>
                <span class="bean-meta__text">${bean.origin}</span>
              </div>
              <div class="bean-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <span class="bean-meta__text">${bean.estate}</span>
              </div>
            </div>

            <span class="process-tag">${bean.process}</span>
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
              <p class="bean-card__tasting-text">${bean.tasting}</p>
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
          return `
            <span class="flavor-tag flavor-tag--${theme}">
              <span class="flavor-tag__icon">${FLAVOR_ICONS[theme]}</span>
              <span class="flavor-tag__text">${t}</span>
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
    this.labels = ['酸度', '甜感', '苦度', '厚實度', '香氣', '風味', '餘韻'];
    this.data   = [3, 3, 3, 3, 3, 3, 3];
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
    this.r      = size * 0.26;
    this.labelR = size * 0.47;
    this.iconR  = size * 0.37;
  }

  getColors() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      gridLine: dark ? 'rgba(212,174,80,0.18)' : 'rgba(140,100,40,0.28)',
      axisLine: dark ? 'rgba(212,174,80,0.22)' : 'rgba(130,90,35,0.35)',
      fill:     dark ? 'rgba(212,174,80,0.12)'  : 'rgba(220,185,110,0.18)',
      glow:     dark ? [255, 218, 140] : [255, 200, 130],
      label:    dark ? '#D8BC78' : '#3A1E05',
      icon:     dark ? 'rgba(212,174,80,0.85)' : 'rgba(110,70,15,0.80)',
      tick:     dark ? 'rgba(212,174,80,0.55)' : 'rgba(80,48,10,0.82)',
    };
  }

  polyPath(values) {
    const n = this.labels.length;
    const ctx = this.ctx;
    ctx.beginPath();
    values.forEach((v, i) => {
      const angle = (2 * Math.PI * i / n) - Math.PI / 2;
      const dist  = (v / 5) * this.r;
      const x = this.cx + dist * Math.cos(angle);
      const y = this.cy + dist * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
  }

  draw() {
    const { canvas, ctx, cx, cy, r, labelR, iconR } = this;
    const n = this.labels.length;
    const c = this.getColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. 同心多邊形格線（5 圈）
    for (let ring = 1; ring <= 5; ring++) {
      const rr = (ring / 5) * r;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = (2 * Math.PI * i / n) - Math.PI / 2;
        const x = cx + rr * Math.cos(a);
        const y = cy + rr * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = c.gridLine;
      ctx.lineWidth = 0.8;
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
      const a = (2 * Math.PI * i / n) - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.strokeStyle = c.axisLine;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // 4. 資料多邊形填充
    this.polyPath(this.data);
    ctx.fillStyle = c.fill;
    ctx.fill();

    // 5. 多重發光邊線（外暈淺黃橘漸層、核心線 LED 白色發光）
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // 淺黃橘：比金色更暖更亮，像暖色燈源暈散出去的色調
    const outerRgb = isDark ? '255,200,100' : '255,178,72';
    const [gr, gg, gb] = isDark ? [255, 200, 100] : [255, 178, 72];
    [
      // 外暈：淺黃橘，由寬到窄逐層加深，模擬向外淡出的漸層光暈
      { lw: 18,  a: 0.020, white: false },
      { lw: 11,  a: 0.060, white: false },
      { lw: 6.0, a: 0.140, white: false },
      // LED bloom：白色擴散層，由外到內愈來愈亮
      { lw: 5.0, a: 0.18,  white: true  },
      { lw: 3.0, a: 0.42,  white: true  },
      { lw: 1.6, a: 0.76,  white: true  },
      // LED 核心白線：極亮，模擬燈管通電瞬間的銳利白光
      { lw: 0.8, a: 1.0,   white: true  },
    ].forEach(({ lw, a, white }) => {
      this.polyPath(this.data);
      ctx.strokeStyle = white ? `rgba(255,255,255,${a})` : `rgba(${outerRgb},${a})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    });

    // 6. 發光頂點（外暈淺黃橘，實心點純白 LED）
    this.data.forEach((v, i) => {
      const angle = (2 * Math.PI * i / n) - Math.PI / 2;
      const dist  = (v / 5) * r;
      const px = cx + dist * Math.cos(angle);
      const py = cy + dist * Math.sin(angle);
      // 外暈（淺黃橘漸層）
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 7);
      grad.addColorStop(0,   `rgba(${gr},${gg},${gb},0.70)`);
      grad.addColorStop(0.5, `rgba(${gr},${gg},${gb},0.25)`);
      grad.addColorStop(1,   `rgba(${gr},${gg},${gb},0)`);
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // 白色 LED 實心點
      ctx.beginPath();
      ctx.arc(px, py, 3.0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,1.0)';
      ctx.fill();
    });

    // 7. 線條圖示 + 標籤文字
    const iconSize = Math.max(10, canvas.width * 0.036);
    const fontSize = Math.max(11, canvas.width * 0.030);
    ctx.textBaseline = 'middle';

    this.labels.forEach((label, i) => {
      const angle = (2 * Math.PI * i / n) - Math.PI / 2;
      const ix = cx + iconR * Math.cos(angle);
      const iy = cy + iconR * Math.sin(angle);
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);

      ctx.strokeStyle = c.icon;
      ctx.lineWidth = 1.2;
      drawChartIcon(ctx, label, ix, iy, iconSize);

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
}

function renderChart(bean) {
  const canvas = document.getElementById('radar-chart');
  const data = [bean.acid, bean.sweet, bean.bitter, bean.body, bean.aroma, bean.flavor, bean.aftertaste];

  if (!coffeeRadar) {
    coffeeRadar = new CoffeeRadar(canvas);
    new ResizeObserver(() => {
      coffeeRadar.resize();
      coffeeRadar.draw();
    }).observe(canvas.parentElement);
  }

  coffeeRadar.setData(data);
}

function showResultsSections(show) {
  document.getElementById('results-section').hidden = !show;
  document.getElementById('chart-section').hidden   = !show;
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
  const valEl  = document.getElementById(`val-${dim}`);
  const slider = document.getElementById(`slider-${dim}`);

  if (nameEl) nameEl.textContent = ref.ref;
  if (descEl) descEl.textContent = ref.desc;
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

  showResultsSections(true);
  renderResults(results);
  renderChart(results[0]);
  updateChartTitle(results[0]);
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
    <h3 class="question-text">${q.text}</h3>
    <p class="question-hint">${q.hint}</p>
    <div class="answer-btns">
      ${q.options.map(opt => `
        <button
          class="answer-btn${quizState.answers[q.id] === opt.value ? ' answer-btn--selected' : ''}"
          data-qid="${q.id}"
          data-value="${opt.value}"
        >${opt.label}</button>
      `).join('')}
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
  renderChart(results[0]);
  updateChartTitle(results[0]);
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
// 主題切換
// =============================================
function bindThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const root = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    if (coffeeRadar) coffeeRadar.draw();
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  icon.innerHTML = theme === 'dark'
    ? `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>`
    : `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`;
}

// =============================================
// 初始化
// =============================================
async function init() {
  bindThemeToggle();
  bindModeTabs();
  bindSliders();
  bindQuizBack();

  // 預設顯示入門模式第 1 題
  renderQuestion(0);
}

document.addEventListener('DOMContentLoaded', init);
