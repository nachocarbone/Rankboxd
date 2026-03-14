const TOTAL = 5;
const STORAGE_KEY = 'rankboxdHistory_v1';

/* ── I18N ── */
const LANG = {
  es: {
    history: 'Historial', subtitle: 'Ordenalas sin saber qué viene después',
    homeTitle: 'Cargá tu Letterboxd', step1title: 'Exportá tus datos',
    step1desc: 'Descargá tu historial desde Letterboxd', goBtn: 'Ir →',
    step2title: 'Subí el archivo watched.csv', step2desc: 'Está dentro del ZIP que descargaste',
    uploadBtn: 'Subir', loadingTitle: 'Cargando tu lista...',
    whichSpot: '¿En qué puesto?', yourRanking: 'Tu ranking',
    ratingQ: '¿Qué tan bueno quedó tu ranking?', saveBtn: 'Guardar en historial',
    playAgain: 'Jugar otra vez', changeList: 'Cambiar lista',
    saved: '✓ Guardado en el historial', historyTitle: 'Historial', clearAll: 'Borrar todo',
    back: '← Volver',
    noMovies: 'Todavía no guardaste ningún ranking.<br><br>Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.',
    confirmClear: '¿Borrar todo el historial? No se puede deshacer.',
    errMinMovies: (n, t) => `Se necesitan al menos ${n} películas. Tu archivo tiene ${t}.`,
    errFound: (n) => `${n} películas encontradas. Buscando pósteres...`,
    errPosters: (n, t) => `Solo se encontraron ${n} películas con póster. Se necesitan al menos ${t}.`,
    ready: (n) => `${n} películas listas. ¡A jugar!`,
    errConn: 'Error de conexión. Intentá de nuevo.',
    errStar: 'Elegí una puntuación primero ↑',
    downloadImg: '📥 Descargar imagen',
  },
  en: {
    history: 'History', subtitle: 'Rank them without knowing what comes next',
    homeTitle: 'Load your Letterboxd', step1title: 'Export your data',
    step1desc: 'Download your history from Letterboxd', goBtn: 'Go →',
    step2title: 'Upload the watched.csv file', step2desc: "It's inside the ZIP you downloaded",
    uploadBtn: 'Upload', loadingTitle: 'Loading your list...',
    whichSpot: 'Which spot?', yourRanking: 'Your ranking',
    ratingQ: 'How good was your ranking?', saveBtn: 'Save to history',
    playAgain: 'Play again', changeList: 'Change list',
    saved: '✓ Saved to history', historyTitle: 'History', clearAll: 'Clear all',
    back: '← Back',
    noMovies: "You haven't saved any ranking yet.<br><br>Play a round, rate it with stars<br>and save it to see it here.",
    confirmClear: 'Delete all history? This cannot be undone.',
    errMinMovies: (n, t) => `At least ${n} movies needed. Your file has ${t}.`,
    errFound: (n) => `${n} movies found. Fetching posters...`,
    errPosters: (n, t) => `Only ${n} movies with posters found. Need at least ${t}.`,
    ready: (n) => `${n} movies ready. Let's play!`,
    errConn: 'Connection error. Please try again.',
    errStar: 'Pick a rating first ↑',
    downloadImg: '📥 Download image',
  }
};

let currentLang = localStorage.getItem('rankboxdLang') || 'es';

function t(key, ...args) {
  const val = LANG[currentLang][key];
  return typeof val === 'function' ? val(...args) : (val || key);
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('rankboxdLang', lang);
  document.getElementById('langES').classList.toggle('active', lang === 'es');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (typeof LANG[currentLang][key] === 'string') el.innerHTML = LANG[currentLang][key];
  });
}

/* ── STATE ── */
let peliculasOriginal = [];
let peliculas, ranking, current, forcedCount, selectedStars, liked, alreadySaved, prevScreen;

/* ── UTILS ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── SCREENS ── */
function showScreen(id) {
  ['homeScreen','loadingScreen','gameScreen','endScreen','historyScreen'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  document.getElementById('counter').style.display = id === 'gameScreen' ? 'block' : 'none';
  const target = document.getElementById(id);
  target.style.display = id === 'gameScreen' ? 'grid' : 'block';
}

/* ── HOME ── */
function showHome() {
  showScreen('homeScreen');
  const err = document.getElementById('homeError');
  if (err) err.textContent = '';
  const input = document.getElementById('csvInput');
  if (input) input.value = '';
}

/* ── CSV ── */
async function handleCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const errorEl = document.getElementById('homeError');
  errorEl.textContent = '';
  const reader = new FileReader();
  reader.onload = async (e) => {
    const titles = parseLetterboxdCSV(e.target.result);
    if (titles.length < TOTAL) {
      errorEl.textContent = t('errMinMovies', TOTAL, titles.length);
      return;
    }
    showScreen('loadingScreen');
    document.getElementById('loadingText').textContent = t('errFound', titles.length);
    document.getElementById('loadingBar').style.width = '15%';
    try {
      const res = await fetch('/api/letterboxd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles: shuffle(titles).slice(0, 500) })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        showScreen('homeScreen');
        document.getElementById('homeError').textContent = data.error || t('errConn');
        return;
      }
      if (data.movies.length < TOTAL) {
        showScreen('homeScreen');
        document.getElementById('homeError').textContent = t('errPosters', data.movies.length, TOTAL);
        return;
      }
      document.getElementById('loadingBar').style.width = '100%';
      document.getElementById('loadingText').textContent = t('ready', data.movies.length);
      peliculasOriginal = data.movies;
      setTimeout(() => startGame(), 600);
    } catch (e) {
      showScreen('homeScreen');
      document.getElementById('homeError').textContent = t('errConn');
    }
  };
  reader.readAsText(file);
}

function parseLetterboxdCSV(text) {
  const lines = text.split('\n');
  const titles = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseCSVLine(line);
    if (cols.length >= 2 && cols[1]) {
      titles.push({ titulo: cols[1].trim(), year: cols[2] ? cols[2].trim() : '' });
    }
  }
  return titles;
}

function parseCSVLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (const ch of line) {
    if (ch === '"') inQ = !inQ;
    else if (ch === ',' && !inQ) { result.push(cur); cur = ''; }
    else cur += ch;
  }
  result.push(cur);
  return result;
}

/* ── GAME ── */
function startGame() {
  if (!peliculasOriginal.length) { showHome(); return; }
  peliculas = shuffle(peliculasOriginal).slice(0, TOTAL);
  ranking = new Array(TOTAL).fill(null);
  current = 0; forcedCount = 0; selectedStars = 0; liked = false; alreadySaved = false;
  showScreen('gameScreen');
  updateCounter(); showMovie(); drawRanking();
}

function updateCounter() {
  document.getElementById('countCurrent').textContent = Math.min(current + 1, TOTAL);
}

function showMovie() {
  if (current >= TOTAL) { endGame(); return; }
  const movie = peliculas[current];
  const poster = document.getElementById('poster');
  poster.classList.remove('fadeIn'); void poster.offsetWidth;
  poster.src = movie.imagen; poster.classList.add('fadeIn');
  const titleEl = document.getElementById('title');
  titleEl.classList.remove('fadeIn'); void titleEl.offsetWidth;
  titleEl.textContent = movie.titulo; titleEl.classList.add('fadeIn');
  updateCounter(); drawButtons();
}

function drawButtons() {
  const container = document.getElementById('buttons');
  container.innerHTML = '';
  for (let i = 1; i <= TOTAL; i++) {
    const btn = document.createElement('button');
    const occ = ranking[i - 1];
    btn.className = 'rankBtn ' + (occ ? 'occupied' : 'available');
    if (occ) {
      btn.innerHTML = `<div class="btnLabel"><span class="btnNum">${i}</span><img class="btnMini" src="${occ.imagen}"></div>`;
      btn.disabled = true;
    } else {
      btn.innerHTML = `<div class="btnLabel"><span class="btnNum">${i}</span></div>`;
      btn.onclick = () => choose(i);
    }
    container.appendChild(btn);
  }
}

function drawRanking() {
  let html = '';
  for (let i = 0; i < TOTAL; i++) {
    const item = ranking[i];
    if (!item) {
      html += `<div class="rankItem"><div class="rankNum">${i+1}</div><div class="emptySlot"></div><span style="color:var(--muted);font-size:12px;">—</span></div>`;
    } else {
      html += `<div class="rankItem filled slideLeft"><div class="rankNum">${i+1}</div><img src="${item.imagen}" alt="${item.titulo}"><div class="rankItemTitle">${item.titulo}</div></div>`;
    }
  }
  document.getElementById('ranking').innerHTML = html;
}

function choose(pos) {
  const freeSlots = ranking.filter(r => r === null).length;
  if (freeSlots === 1) forcedCount++;
  ranking[pos - 1] = peliculas[current];
  current++;
  drawRanking(); drawButtons(); showMovie();
}

/* ── END ── */
function endGame() {
  prevScreen = 'end';
  showScreen('endScreen');
  document.getElementById('resultBadge').style.display = 'none';
  document.getElementById('resultMsg').style.display = 'none';
  let html = '';
  for (let i = 0; i < TOTAL; i++) {
    const item = ranking[i];
    html += `<div class="finalItem fadeIn" style="animation-delay:${i*0.07}s">
      <div class="finalNum">${i+1}</div>
      <img src="${item.imagen}" alt="${item.titulo}">
      <div class="finalTitle">${item.titulo}</div>
    </div>`;
  }
  document.getElementById('finalRanking').innerHTML = html;
  selectedStars = 0; liked = false;
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) likeBtn.classList.remove('liked');
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('savedMsg').classList.remove('show');
  alreadySaved = false;
  setupStars(); highlightStars(0);
}

/* ── STARS ── */
const STAR_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

function setupStars() {
  const wrap = document.getElementById('starsWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const c = document.createElement('span');
    c.className = 'starContainer'; c.dataset.i = i;

    // Base (gray) star
    const base = document.createElement('span');
    base.className = 'starSvgBase';
    base.innerHTML = STAR_SVG;

    // Fill (green) star — clipped via CSS width
    const fill = document.createElement('span');
    fill.className = 'starSvgFill';
    fill.innerHTML = STAR_SVG;

    // Hit zones
    const left = document.createElement('span');
    left.className = 'starLeft'; left.dataset.val = i - 0.5;
    const right = document.createElement('span');
    right.className = 'starRight'; right.dataset.val = i;

    c.appendChild(base); c.appendChild(fill);
    c.appendChild(left); c.appendChild(right);
    wrap.appendChild(c);

    [left, right].forEach(zone => {
      zone.onmouseenter = () => highlightStars(+zone.dataset.val);
      zone.onmouseleave = () => highlightStars(selectedStars);
      zone.onclick = () => { selectedStars = +zone.dataset.val; highlightStars(selectedStars); };
    });
  }
}

function highlightStars(val) {
  const wrap = document.getElementById('starsWrap');
  if (!wrap) return;
  wrap.querySelectorAll('.starContainer').forEach(c => {
    const i = +c.dataset.i;
    c.classList.remove('full', 'half');
    if (val >= i) c.classList.add('full');
    else if (val >= i - 0.5) c.classList.add('half');
  });
}

function toggleLike() {
  liked = !liked;
  const btn = document.getElementById('likeBtn');
  if (btn) btn.classList.toggle('liked', liked);
}

/* ── SAVE ── */
function saveToHistory() {
  if (alreadySaved) return;
  if (!selectedStars) {
    const wrap = document.getElementById('starsWrap');
    if (wrap) { wrap.style.outline = '1px solid var(--accent)'; wrap.style.borderRadius = '4px'; }
    setTimeout(() => { if (wrap) wrap.style.outline = ''; }, 2000);
    return;
  }
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    stars: selectedStars, liked,
    movies: ranking.map(m => ({ titulo: m.titulo, imagen: m.imagen }))
  };
  const history = loadHistory();
  history.push(entry);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch(e) {}
  alreadySaved = true;
  document.getElementById('saveBtn').disabled = true;
  document.getElementById('savedMsg').classList.add('show');
}

/* ── HISTORY ── */
function loadHistory() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch(e) { return []; }
}

function showHistory() {
  prevScreen = document.getElementById('endScreen').style.display !== 'none' ? 'end' : 'home';
  const history = loadHistory();
  history.sort((a,b) => b.stars !== a.stars ? b.stars - a.stars : b.id - a.id);
  const content = document.getElementById('historyContent');
  if (!history.length) {
    content.innerHTML = `<div class="historyEmpty">${t('noMovies')}</div>`;
  } else {
    let html = '<div class="historyGrid">';
    history.forEach((entry, idx) => {
      const filled = Math.floor(entry.stars);
      const half = entry.stars % 1 !== 0;
      let starsHtml = '<span style="color:#00c030">' + '★'.repeat(filled) + (half ? '½' : '') + '</span>';
      starsHtml += '<span style="opacity:.2">' + '★'.repeat(5 - Math.ceil(entry.stars)) + '</span>';
      const heartHtml = entry.liked ? '<span class="cardLike">♥</span>' : '';
      const postersHtml = entry.movies.map((m,i) => `
        <div class="cardPosterNum">
          <span class="cardPosterNumLabel">${i+1}</span>
          <img src="${m.imagen}" alt="${m.titulo}" style="width:100%;max-width:48px;height:64px;object-fit:cover;border-radius:5px;">
        </div>`).join('');
      const listHtml = entry.movies.map((m,i) => `
        <div class="cardMovieItem"><span class="mn">${i+1}</span><span>${m.titulo}</span></div>`).join('');
      html += `<div class="historyCard fadeIn" style="animation-delay:${idx*0.05}s">
        <div class="cardTop">
          <div><div class="cardStars">${starsHtml}${heartHtml}</div></div>
          <div class="cardMeta"><span class="cardDate">${entry.date}</span></div>
        </div>
        <div class="cardPosters" style="display:flex;gap:6px;margin-bottom:12px;">${postersHtml}</div>
        <div class="cardMovieList">${listHtml}</div>
      </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
  }
  showScreen('historyScreen');
}

function clearHistory() {
  if (!confirm(t('confirmClear'))) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  showHistory();
}

function goBack() {
  if (prevScreen === 'end') showScreen('endScreen');
  else showHome();
}

/* ── SHARE ── */
async function loadImg(url) {
  return new Promise((resolve) => {
    const img = new Image();
    // No crossOrigin needed - images are proxied through our own server
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Retry with crossOrigin if first attempt fails
      const img2 = new Image();
      img2.crossOrigin = 'anonymous';
      img2.onload = () => resolve(img2);
      img2.onerror = () => resolve(null);
      img2.src = url + '?retry=1';
    };
    img.src = url;
  });
}

async function shareRanking() {
  const W = 400, SCALE = 2;
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = 620 * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // Background
  ctx.fillStyle = '#14181c';
  ctx.fillRect(0, 0, W, 620);

  // Decorative arcs top-right
  ctx.strokeStyle = '#00c030';
  ctx.lineWidth = 32;
  ctx.globalAlpha = 0.07;
  ctx.beginPath(); ctx.arc(W + 40, -40, 160, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(W + 40, -40, 210, 0, Math.PI * 2); ctx.stroke();
  // Decorative arcs bottom-left
  ctx.beginPath(); ctx.arc(-40, 660, 160, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(-40, 660, 210, 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 1;

  // Header: logo bars
  ctx.fillStyle = '#00c030';
  roundRect(ctx, 28, 32, 26, 6, 3);
  ctx.fillStyle = '#677988';
  roundRect(ctx, 28, 46, 18, 6, 3);
  ctx.fillStyle = '#2c3440';
  roundRect(ctx, 28, 60, 11, 6, 3);

  // Logo text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Inter, DM Sans, sans-serif';
  ctx.fillText('rankboxd', 64, 66);

  // Green dot
  ctx.fillStyle = '#00c030';
  ctx.beginPath(); ctx.arc(192, 38, 4, 0, Math.PI * 2); ctx.fill();

  // Stars in header
  const starX = W - 140;
  const starY = 32;
  const starSize = 20;
  for (let i = 0; i < 5; i++) {
    const val = i + 1;
    const filled = val <= Math.floor(selectedStars);
    const half = !filled && val === Math.ceil(selectedStars) && selectedStars % 1 !== 0;
    drawStar(ctx, starX + i * (starSize + 4), starY, starSize, filled ? '#00c030' : '#2c3440');
    if (half) {
      // clip left half green
      ctx.save();
      ctx.beginPath();
      ctx.rect(starX + i * (starSize + 4), starY, starSize / 2, starSize);
      ctx.clip();
      drawStar(ctx, starX + i * (starSize + 4), starY, starSize, '#00c030');
      ctx.restore();
    }
  }
  if (liked) {
    ctx.fillStyle = '#f78f1e';
    ctx.font = '18px sans-serif';
    ctx.fillText('♥', starX + 5 * (starSize + 4) + 4, starY + 15);
  }

  // Divider
  ctx.strokeStyle = '#2c3440';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 1;
  ctx.beginPath(); ctx.moveTo(28, 88); ctx.lineTo(W - 28, 88); ctx.stroke();

  // Load all posters
  const posters = await Promise.all(ranking.map(m => loadImg(m.imagen)));

  // Movie rows
  const rowStart = 104;
  const rowH = 88;
  for (let i = 0; i < ranking.length; i++) {
    const y = rowStart + i * rowH;
    const m = ranking[i];

    // Number
    ctx.fillStyle = '#00c030';
    ctx.font = 'bold 28px Bebas Neue, DM Sans, sans-serif';
    ctx.fillText(String(i + 1), 28, y + 56);

    // Poster
    const posterX = 60, posterW = 44, posterH = 64;
    if (posters[i]) {
      ctx.save();
      roundedImage(ctx, posters[i], posterX, y + 8, posterW, posterH, 5);
      ctx.restore();
    } else {
      ctx.fillStyle = '#2c3440';
      roundRect(ctx, posterX, y + 8, posterW, posterH, 5);
    }

    // Title
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '600 14px DM Sans, sans-serif';
    const title = m.titulo.length > 32 ? m.titulo.slice(0, 30) + '…' : m.titulo;
    ctx.fillText(title, 116, y + 44);
  }

  // Bottom divider
  const footerY = rowStart + ranking.length * rowH + 8;
  ctx.strokeStyle = '#2c3440';
  ctx.beginPath(); ctx.moveTo(28, footerY); ctx.lineTo(W - 28, footerY); ctx.stroke();

  // Footer URL
  ctx.fillStyle = '#677988';
  ctx.font = '500 11px DM Sans, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('RANKBOXD.VERCEL.APP', 28, footerY + 20);

  // Resize canvas to content
  const finalH = footerY + 36;
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = W * SCALE;
  finalCanvas.height = finalH * SCALE;
  finalCanvas.getContext('2d').drawImage(canvas, 0, 0);

  const link = document.createElement('a');
  link.download = 'rankboxd.png';
  link.href = finalCanvas.toDataURL('image/png');
  link.click();
}

function drawStar(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const cx = x + size / 2, cy = y + size / 2, r = size / 2, ir = r * 0.45;
  for (let p = 0; p < 10; p++) {
    const angle = (p * Math.PI) / 5 - Math.PI / 2;
    const radius = p % 2 === 0 ? r : ir;
    if (p === 0) ctx.moveTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    else ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
}

function roundedImage(ctx, img, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x, y, w, h);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

/* ── INIT ── */