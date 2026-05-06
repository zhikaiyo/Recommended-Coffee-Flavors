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
let radarChart = null;

function renderDots(score) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="dot ${i < score ? 'filled' : ''}"></span>`
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
        <h3 class="bean-name">${bean.name}</h3>
        <p class="bean-name-en">${bean.nameEn}</p>

        <div class="bean-meta">
          <div class="bean-meta__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            ${bean.origin}
          </div>
          <div class="bean-meta__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
            ${bean.estate}
          </div>
        </div>

        <span class="process-tag">${bean.process}</span>
      </div>

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

      <div class="bean-card__tags">
        ${bean.tags.map(t => `<span class="flavor-tag">${t}</span>`).join('')}
      </div>
    </article>
  `;
}

function renderResults(results) {
  const grid = document.getElementById('results-grid');
  grid.innerHTML = results.map((bean, i) => renderBeanCard(bean, i)).join('');
}

function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    borderColor:      isDark ? 'rgba(196, 151, 106, 0.9)' : 'rgba(107, 63, 42, 0.9)',
    backgroundColor:  isDark ? 'rgba(196, 151, 106, 0.12)' : 'rgba(107, 63, 42, 0.08)',
    pointColor:       isDark ? '#C4976A' : '#6B3F2A',
    gridColor:        isDark ? 'rgba(196, 151, 106, 0.15)' : 'rgba(107, 63, 42, 0.12)',
    labelColor:       isDark ? '#C4A882' : '#5C3D2E',
    tickColor:        isDark ? 'rgba(196, 151, 106, 0.4)' : 'rgba(107, 63, 42, 0.3)',
  };
}

function renderChart(bean) {
  const ctx = document.getElementById('radar-chart').getContext('2d');
  const data = [bean.acid, bean.sweet, bean.bitter, bean.body, bean.aroma, bean.flavor, bean.aftertaste];
  const colors = getChartColors();

  if (radarChart) {
    radarChart.data.datasets[0].data = data;
    radarChart.data.datasets[0].label = bean.name;
    radarChart.data.datasets[0].borderColor = colors.borderColor;
    radarChart.data.datasets[0].backgroundColor = colors.backgroundColor;
    radarChart.data.datasets[0].pointBackgroundColor = colors.pointColor;
    radarChart.options.scales.r.grid.color = colors.gridColor;
    radarChart.options.scales.r.pointLabels.color = colors.labelColor;
    radarChart.options.scales.r.ticks.color = colors.tickColor;
    radarChart.update();
    return;
  }

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['酸度', '甜感', '苦度', '厚實度', '香氣', '風味', '餘韻'],
      datasets: [{
        label: bean.name,
        data,
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
        pointBackgroundColor: colors.pointColor,
        pointBorderColor: 'transparent',
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      }],
    },
    options: {
      animation: { duration: 400, easing: 'easeInOutQuart' },
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            display: true,
            color: colors.tickColor,
            font: { size: 10, family: "'DM Sans', sans-serif" },
            backdropColor: 'transparent',
          },
          grid: { color: colors.gridColor },
          angleLines: { color: colors.gridColor },
          pointLabels: {
            color: colors.labelColor,
            font: { size: 13, family: "'DM Sans', sans-serif", weight: '500' },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}：${ctx.raw} 分`,
          },
        },
      },
    },
  });
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
    if (radarChart) {
      const colors = getChartColors();
      radarChart.data.datasets[0].borderColor      = colors.borderColor;
      radarChart.data.datasets[0].backgroundColor  = colors.backgroundColor;
      radarChart.data.datasets[0].pointBackgroundColor = colors.pointColor;
      radarChart.options.scales.r.grid.color        = colors.gridColor;
      radarChart.options.scales.r.pointLabels.color = colors.labelColor;
      radarChart.options.scales.r.ticks.color       = colors.tickColor;
      radarChart.update();
    }
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
