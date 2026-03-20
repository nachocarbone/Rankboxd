let TOTAL = 5; // updated by setDifficulty
const STORAGE_KEY = 'rankboxdHistory_v1';

/* ── I18N ── */
const LANG = {
  es: {
    history: 'Historial',
    subtitle: 'Tus películas. Tus juegos.',
    homeTitle: 'Cargá tu Letterboxd',
    step1title: 'Descargá tu historial de Letterboxd',
    step1desc: 'Tocá el botón — se descarga automático si estás logueado',
    goBtn: 'Descargar →',
    step2title: 'Subí el ZIP descargado',
    step2desc: 'El archivo .zip que descargaste de Letterboxd',
    uploadBtn: 'Subir',
    loadingTitle: 'Cargando tu lista...',
    whichSpot: '¿En qué puesto?',
    yourRanking: 'Tu ranking',
    ratingQ: 'Puntuación',
    liked: 'Me gustó',
    saveBtn: 'Guardar en historial',
    downloadImg: 'Compartir ranking',
    playAgain: 'Jugar otra vez',
    saved: '✓ Guardado en el historial',
    historyTitle: 'Historial',
    clearAll: 'Borrar todo',
    back: '← Volver',
    noMovies: 'Todavía no guardaste ningún ranking.<br><br>Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.',
    confirmClear: '¿Borrar todo el historial? No se puede deshacer.',
    chooseGame: 'Elegí un juego',
    game1name: 'Rank sin saber qué sigue',
    game1desc: 'Posicioná cada película sin saber qué viene después',
    comingSoon: 'Próximamente',
    game2name: 'Higher or Lower',
    game2desc: '¿Qué película tiene mejor rating?',
    streak: 'Racha',
    best: 'Mejor',
    higher: 'Mayor',
    lower: 'Menor',
    tie: 'Empate',
    holQuestion: '¿Cuál es su rating?',
    holNormalDesc: 'Los empates cuentan como acierto',
    holHardDesc: 'Elegí "Empate" o perdés la racha',
    gameOver: 'Game Over',
    skipMovie: 'No la vi',
    skipGame1: 'Saltar (no la vi)',
    chooseDiff: 'Elegí la dificultad',
    diffEasy: 'Fácil',
    diffEasyDesc: '5 películas — rápido y divertido',
    diffMedium: 'Medio',
    diffMediumDesc: '10 películas — un desafío real',
    diffHard: 'Difícil',
    diffHardDesc: '15 películas — solo para los valientes',
    errMinMovies: (n, t) => `Se necesitan al menos ${n} películas. Tu archivo tiene ${t}.`,
    errFound: (n) => `${n} películas encontradas. Buscando pósteres...`,
    errPosters: (n, t) => `Solo se encontraron ${n} películas con póster. Se necesitan al menos ${t}.`,
    ready: (n) => `${n} películas listas. ¡A jugar!`,
    errConn: 'Error de conexión. Intentá de nuevo.',
    orText: 'o',
    tryPopular: 'Jugar sin Letterboxd',
    tryPopularDesc: 'Jugá con cientos de películas famosas de todos los ratings',
    tryPopularBtn: 'Jugar ahora →',
    skipMovie: 'No la vi →',
    chooseDifficulty: 'Elegí la dificultad',
    easy: 'Fácil', easyDesc: '5 películas',
    medium: 'Medio', mediumDesc: '10 películas',
    hard: 'Difícil', hardDesc: '15 películas',
    // Tournament
    game3name: 'Torneo',
    game3desc: 'Bracket de 8, 16 o 32 películas. ¿Cuál es tu favorita?',
    tournamentSize: 'Tamaño del torneo',
    tournament8name: 'Cuartos',
    tournament8desc: '3 rondas — rápido',
    tournament16name: 'Épico',
    tournament16desc: '4 rondas — completo',
    tournament32name: 'Legendario',
    tournament32desc: '5 rondas — solo para cinéfilos',
    tournamentChampion: '¡Campeón!',
    tournamentRound: (r, total) => `Ronda ${r} de ${total}`,
    tournamentMatch: (m, total) => `Partido ${m} de ${total}`,
    roundNames: ['Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'],
    tournamentPickHint: 'Tocá la que preferís',
    downloadBracket: '⬇ Descargar bracket',
    skipOne: 'No la vi',
    tournamentDraw: 'Sorteando el bracket...',
  },
  en: {
    history: 'History',
    subtitle: 'Your films. Your games.',
    homeTitle: 'Load your Letterboxd',
    step1title: 'Download your Letterboxd history',
    step1desc: "Tap the button — downloads automatically if you're logged in",
    goBtn: 'Download →',
    step2title: 'Upload the downloaded ZIP',
    step2desc: 'The .zip file from Letterboxd',
    uploadBtn: 'Upload',
    loadingTitle: 'Loading your list...',
    whichSpot: 'Which spot?',
    yourRanking: 'Your ranking',
    ratingQ: 'Rated',
    liked: 'Liked',
    saveBtn: 'Save to history',
    downloadImg: 'Share ranking',
    playAgain: 'Play again',
    saved: '✓ Saved to history',
    historyTitle: 'History',
    clearAll: 'Clear all',
    back: '← Back',
    noMovies: "You haven't saved any ranking yet.<br><br>Play a round, rate it with stars<br>and save it to see it here.",
    confirmClear: 'Delete all history? This cannot be undone.',
    chooseGame: 'Choose a game',
    game1name: 'Rank Without Knowing',
    game1desc: 'Place each film without knowing what comes next',
    comingSoon: 'Coming soon',
    game2name: 'Higher or Lower',
    game2desc: 'Which film has a higher rating?',
    streak: 'Streak',
    best: 'Best',
    higher: 'Higher',
    lower: 'Lower',
    tie: 'Tie',
    holQuestion: 'What is its rating?',
    holNormalDesc: 'Ties count as correct',
    holHardDesc: 'Pick "Tie" or lose your streak',
    gameOver: 'Game Over',
    skipMovie: "Haven't seen it",
    skipGame1: "Skip (haven't seen it)",
    chooseDiff: 'Choose difficulty',
    diffEasy: 'Easy',
    diffEasyDesc: '5 films — quick and fun',
    diffMedium: 'Medium',
    diffMediumDesc: '10 films — a real challenge',
    diffHard: 'Hard',
    diffHardDesc: '15 films — only for the brave',
    errMinMovies: (n, t) => `At least ${n} movies needed. Your file has ${t}.`,
    errFound: (n) => `${n} movies found. Fetching posters...`,
    errPosters: (n, t) => `Only ${n} movies with posters found. Need at least ${t}.`,
    ready: (n) => `${n} movies ready. Let's play!`,
    errConn: 'Connection error. Please try again.',
    orText: 'or',
    tryPopular: 'Play without Letterboxd',
    tryPopularDesc: 'Play with hundreds of famous films across all ratings',
    tryPopularBtn: 'Play now →',
    skipMovie: "Haven't seen it →",
    chooseDifficulty: 'Choose difficulty',
    easy: 'Easy', easyDesc: '5 films',
    medium: 'Medium', mediumDesc: '10 films',
    hard: 'Hard', hardDesc: '15 films',
    // Tournament
    game3name: 'Tournament',
    game3desc: 'Bracket of 8, 16 or 32 films. Which one is your champion?',
    tournamentSize: 'Tournament size',
    tournament8name: 'Quick',
    tournament8desc: '3 rounds — fast',
    tournament16name: 'Epic',
    tournament16desc: '4 rounds — full bracket',
    tournament32name: 'Legendary',
    tournament32desc: '5 rounds — cinephiles only',
    tournamentChampion: 'Champion!',
    tournamentRound: (r, total) => `Round ${r} of ${total}`,
    tournamentMatch: (m, total) => `Match ${m} of ${total}`,
    roundNames: ['Round of 32', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Final'],
    tournamentPickHint: 'Tap the one you prefer',
    downloadBracket: '⬇ Download bracket',
    skipOne: "Haven't seen it",
    tournamentDraw: 'Drawing the bracket...',
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
let isPopularMode = false;
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
  ['homeScreen','loadingScreen','gameScreen','endScreen','historyScreen','gameMenuScreen','difficultyScreen','holScreen','holDiffScreen','holEndScreen','tournamentSizeScreen','tournamentScreen','tournamentEndScreen','tournamentDrawScreen'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  document.getElementById('counter').style.display = id === 'gameScreen' ? 'block' : 'none';
  const counterEl = document.getElementById('counter');
  if (counterEl) counterEl.innerHTML = `<span id="countCurrent">1</span>/${TOTAL}`;
  const totEl = document.getElementById('counterTotal');
  const histBtn = document.getElementById('historyBtnGame');
  if (histBtn) histBtn.style.display = (id === 'gameScreen' || id === 'endScreen') ? 'block' : 'none';

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

function showDifficulty() {
  showScreen('difficultyScreen');
  applyLang();
}

function setDifficulty(n) {
  TOTAL = n;
  startGame();
}

function showGameMenu() {
  showScreen('gameMenuScreen');
  applyLang();
}

function goToMenu() {
  if (peliculasOriginal.length) showGameMenu();
  else showHome();
}

/* ── POPULAR MOVIES ── */
async function loadPopularMovies() {
  const errorEl = document.getElementById('homeErrorDemo');
  if (errorEl) errorEl.textContent = '';
  showScreen('loadingScreen');
  document.getElementById('loadingText').textContent = 'Loading popular movies...';
  document.getElementById('loadingBar').style.width = '30%';
  try {
    const res = await fetch('/api/letterboxd?popular=1');
    const data = await res.json();
    if (!res.ok || data.error) {
      showHome();
      if (errorEl) errorEl.textContent = data.error || t('errConn');
      return;
    }
    document.getElementById('loadingBar').style.width = '100%';
    document.getElementById('loadingText').textContent = `${data.movies.length} movies ready!`;
    peliculasOriginal = data.movies;
    isPopularMode = true;
    setTimeout(() => showGameMenu(), 600);
  } catch(e) {
    showHome();
    if (errorEl) errorEl.textContent = t('errConn');
  }
}

/* ── FILE HANDLING ── */
async function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const errorEl = document.getElementById('homeError');
  errorEl.textContent = '';
  let csvText = null;
  if (file.name.endsWith('.zip')) {
    try {
      const zip = await JSZip.loadAsync(file);
      const csvFile = zip.file('watched.csv') || zip.file(/watched\.csv$/i)[0];
      if (!csvFile) { errorEl.textContent = 'No se encontró watched.csv en el ZIP.'; return; }
      csvText = await csvFile.async('string');
    } catch(e) { errorEl.textContent = 'Error al leer el ZIP. Intentá de nuevo.'; return; }
  } else {
    csvText = await file.text();
  }
  await processCSV(csvText);
}

async function processCSV(csvText) {
  const errorEl = document.getElementById('homeError');
  const titles = parseLetterboxdCSV(csvText);
  if (titles.length < TOTAL) { errorEl.textContent = t('errMinMovies', TOTAL, titles.length); return; }
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
    if (!res.ok || data.error) { showScreen('homeScreen'); document.getElementById('homeError').textContent = data.error || t('errConn'); return; }
    if (data.movies.length < TOTAL) { showScreen('homeScreen'); document.getElementById('homeError').textContent = t('errPosters', data.movies.length, TOTAL); return; }
    document.getElementById('loadingBar').style.width = '100%';
    document.getElementById('loadingText').textContent = t('ready', data.movies.length);
    peliculasOriginal = data.movies;
    isPopularMode = false;
    setTimeout(() => showGameMenu(), 600);
  } catch(e) { showScreen('homeScreen'); document.getElementById('homeError').textContent = t('errConn'); }
}

function parseLetterboxdCSV(text) {
  const lines = text.split('\n');
  const titles = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseCSVLine(line);
    if (cols.length >= 2 && cols[1]) titles.push({ titulo: cols[1].trim(), year: cols[2] ? cols[2].trim() : '' });
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
    if (!item) html += `<div class="rankItem"><div class="rankNum">${i+1}</div><div class="emptySlot"></div><span style="color:var(--muted);font-size:12px;">—</span></div>`;
    else html += `<div class="rankItem filled slideLeft"><div class="rankNum">${i+1}</div><img src="${item.imagen}" alt="${item.titulo}"><div class="rankItemTitle">${item.titulo}</div></div>`;
  }
  document.getElementById('ranking').innerHTML = html;
}

function skipMovie() {
  // Remove current movie from pool and show next
  peliculas = peliculas.filter((_, i) => i !== current);
  // Add a replacement from unused movies
  const used = new Set(peliculas.map(m => m.titulo));
  const available = peliculasOriginal.filter(m => !used.has(m.titulo));
  if (available.length > 0) {
    const replacement = available[Math.floor(Math.random() * available.length)];
    peliculas.splice(current, 0, replacement);
  }
  showMovie();
}

function choose(pos) {
  const freeSlots = ranking.filter(r => r === null).length;
  if (freeSlots === 1) forcedCount++;
  ranking[pos - 1] = peliculas[current];
  current++;
  drawRanking(); drawButtons(); showMovie();
}

function skipCurrentMovie() {
  // Replace current movie with a new one from the pool
  const remaining = peliculasOriginal.filter(m => !peliculas.includes(m));
  if (remaining.length > 0) {
    const newMovie = remaining[Math.floor(Math.random() * remaining.length)];
    peliculas[current] = newMovie;
  } else {
    // No more movies, just advance
    current++;
  }
  showMovie();
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
    const base = document.createElement('span');
    base.className = 'starSvgBase'; base.innerHTML = STAR_SVG;
    const fill = document.createElement('span');
    fill.className = 'starSvgFill'; fill.innerHTML = STAR_SVG;
    const left = document.createElement('span');
    left.className = 'starLeft'; left.dataset.val = i - 0.5;
    const right = document.createElement('span');
    right.className = 'starRight'; right.dataset.val = i;
    c.appendChild(base); c.appendChild(fill); c.appendChild(left); c.appendChild(right);
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
  prevScreen = document.getElementById('endScreen').style.display !== 'none' ? 'end' : 'menu';
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
  else if (prevScreen === 'menu') showGameMenu();
  else showHome();
}

/* ── SHARE ── */
async function loadImg(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
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
  const rowH = 88;
  const rowStart = 104;
  const footerExtra = 56;
  const canvasH = rowStart + ranking.length * rowH + footerExtra;
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = canvasH * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);
  ctx.fillStyle = '#14181c';
  ctx.fillRect(0, 0, W, canvasH);
  ctx.strokeStyle = '#00c030'; ctx.lineWidth = 32; ctx.globalAlpha = 0.07;
  ctx.beginPath(); ctx.arc(W + 40, -40, 160, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(W + 40, -40, 210, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(-40, canvasH + 40, 160, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(-40, canvasH + 40, 210, 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#00c030'; roundRect(ctx, 28, 32, 26, 6, 3);
  ctx.fillStyle = '#677988'; roundRect(ctx, 28, 46, 18, 6, 3);
  ctx.fillStyle = '#2c3440'; roundRect(ctx, 28, 60, 11, 6, 3);
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 26px Inter, DM Sans, sans-serif';
  ctx.fillText('rankboxd', 64, 66);
  ctx.fillStyle = '#00c030'; ctx.beginPath(); ctx.arc(192, 38, 4, 0, Math.PI * 2); ctx.fill();
  const starX = W - 140, starY = 32, starSize = 20;
  for (let i = 0; i < 5; i++) {
    const val = i + 1;
    const filled = val <= Math.floor(selectedStars);
    const half = !filled && val === Math.ceil(selectedStars) && selectedStars % 1 !== 0;
    drawStar(ctx, starX + i * (starSize + 4), starY, starSize, filled ? '#00c030' : '#2c3440');
    if (half) {
      ctx.save();
      ctx.beginPath(); ctx.rect(starX + i * (starSize + 4), starY, starSize / 2, starSize); ctx.clip();
      drawStar(ctx, starX + i * (starSize + 4), starY, starSize, '#00c030');
      ctx.restore();
    }
  }
  if (liked) { ctx.fillStyle = '#f78f1e'; ctx.font = '18px sans-serif'; ctx.fillText('♥', starX + 5 * (starSize + 4) + 4, starY + 15); }
  ctx.strokeStyle = '#2c3440'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(28, 88); ctx.lineTo(W - 28, 88); ctx.stroke();
  const posters = await Promise.all(ranking.map(m => loadImg(m.imagen)));
  for (let i = 0; i < ranking.length; i++) {
    const y = rowStart + i * rowH, m = ranking[i];
    ctx.fillStyle = '#00c030'; ctx.font = 'bold 28px Bebas Neue, DM Sans, sans-serif';
    ctx.fillText(String(i + 1), 28, y + 56);
    if (posters[i]) { ctx.save(); roundedImage(ctx, posters[i], 60, y + 8, 44, 64, 5); ctx.restore(); }
    else { ctx.fillStyle = '#2c3440'; roundRect(ctx, 60, y + 8, 44, 64, 5); }
    ctx.fillStyle = '#e0e0e0'; ctx.font = '600 14px DM Sans, sans-serif';
    ctx.fillText(m.titulo.length > 32 ? m.titulo.slice(0, 30) + '…' : m.titulo, 116, y + 44);
  }
  const footerY = rowStart + ranking.length * rowH + 8;
  ctx.strokeStyle = '#2c3440'; ctx.beginPath(); ctx.moveTo(28, footerY); ctx.lineTo(W - 28, footerY); ctx.stroke();
  ctx.fillStyle = '#677988'; ctx.font = '500 11px DM Sans, sans-serif';
  ctx.fillText('RANKBOXD.VERCEL.APP', 28, footerY + 20);
  const finalH = footerY + 36;
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = W * SCALE; finalCanvas.height = finalH * SCALE;
  finalCanvas.getContext('2d').drawImage(canvas, 0, 0);
  const link = document.createElement('a');
  link.download = 'rankboxd.png'; link.href = finalCanvas.toDataURL('image/png'); link.click();
}

function drawStar(ctx, x, y, size, color) {
  ctx.fillStyle = color; ctx.beginPath();
  const cx = x + size / 2, cy = y + size / 2, r = size / 2, ir = r * 0.45;
  for (let p = 0; p < 10; p++) {
    const angle = (p * Math.PI) / 5 - Math.PI / 2;
    const radius = p % 2 === 0 ? r : ir;
    if (p === 0) ctx.moveTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    else ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
  }
  ctx.closePath(); ctx.fill();
}

function roundedImage(ctx, img, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath(); ctx.clip(); ctx.drawImage(img, x, y, w, h);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath(); ctx.fill();
}


/* ── HIGHER OR LOWER ── */
let holMovies = [];
let holLeft = null;   // always stays on left
let holRight = null;  // challenger on right
let holStreak = 0;
let holBest = 0;
let holMode = 'normal';
let holUsed = [];

function startHigherOrLower() {
  showScreen('holDiffScreen');
  applyLang();
}

function holSkip() {
  // Skip current right movie, pick a new one
  holRight = holPickRandom();
  holFillCards();
}

function startHOLGame(mode) {
  holMode = mode;
  holStreak = 0;
  holBest = parseInt(localStorage.getItem('holBest') || '0');
  holUsed = [];

  holMovies = peliculasOriginal.filter(m => m.rating !== null && m.rating !== undefined);
  if (holMovies.length < 2) { alert('Need at least 2 rated movies.'); return; }

  showScreen('holScreen');
  applyLang();

  // Clean up any leftover elements from previous game
  const oldReveal = document.getElementById('holRevealRating');
  if (oldReveal) oldReveal.remove();
  const oldMystery = document.getElementById('holMysteryRating');
  if (oldMystery) oldMystery.remove();
  document.querySelectorAll('.holBtn').forEach(b => b.disabled = false);
  document.getElementById('holCardB').classList.remove('holCardRevealed');

  const tieBtn = document.getElementById('holTieBtn');
  if (tieBtn) tieBtn.style.display = holMode === 'hard' ? 'block' : 'none';

  updateHolStreak();

  // Pick two starting movies
  holLeft = holPickRandom();
  holRight = holPickRandom();
  holRenderCards(false);
}

function holPickRandom() {
  const pool = holMovies.filter(m => !holUsed.includes(m.titulo));
  if (pool.length === 0) { holUsed = []; return holPickRandom(); }
  const movie = pool[Math.floor(Math.random() * pool.length)];
  holUsed.push(movie.titulo);
  return movie;
}

function holRenderCards(animate) {
  if (animate) {
    const cardA = document.getElementById('holCardA');
    const cardB = document.getElementById('holCardB');
    // Fade out both, update content, fade in
    cardA.style.transition = 'opacity 0.2s';
    cardB.style.transition = 'opacity 0.2s';
    cardA.style.opacity = '0';
    cardB.style.opacity = '0';
    setTimeout(() => {
      holFillCards();
      cardA.style.opacity = '1';
      cardB.style.opacity = '1';
    }, 200);
  } else {
    holFillCards();
  }
}

function holFillCards() {
  // Left card — shows rating
  document.getElementById('holPosterA').src = holLeft.imagen;
  document.getElementById('holTitleA').textContent = holLeft.titulo;
  const ratingA = document.getElementById('holRatingA');
  ratingA.textContent = holLeft.rating + ' ★';
  ratingA.style.color = '#00c030';

  // Right card — mystery with ? ★
  document.getElementById('holPosterB').src = holRight.imagen;
  document.getElementById('holTitleB').textContent = holRight.titulo;

  // Reset reveal
  const oldReveal = document.getElementById('holRevealRating');
  if (oldReveal) oldReveal.remove();
  document.getElementById('holCardB').classList.remove('holCardRevealed');

  // Show ? ★ placeholder
  const cardBInfo = document.getElementById('holCardB').querySelector('.holCardInfo');
  cardBInfo.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.88))';
  let mystery = document.getElementById('holMysteryRating');
  if (!mystery) {
    mystery = document.createElement('div');
    mystery.id = 'holMysteryRating';
    mystery.className = 'holRating';
    cardBInfo.appendChild(mystery);
  }
  mystery.textContent = '? ★';
  mystery.style.color = '#677988';
  mystery.style.display = 'block';

  document.getElementById('holResult').textContent = '';
  document.getElementById('holResult').classList.remove('visible');
  // Reset VS in case it was changed
  const vsEl = document.querySelector('.holVS');
  if (vsEl && vsEl.innerHTML !== 'VS') {
    vsEl.innerHTML = 'VS';
    vsEl.style.color = '';
    vsEl.style.fontSize = '';
  }
  document.querySelectorAll('.holBtn').forEach(b => b.disabled = false);
}

function holChoose(choice) {
  if (!holLeft || !holRight) return;

  const rA = holLeft.rating;
  const rB = holRight.rating;
  const isTie = Math.abs(rA - rB) < 0.05;

  let correct = false;
  if (choice === 'higher') correct = rB > rA || (isTie && holMode === 'normal');
  else if (choice === 'lower') correct = rB < rA || (isTie && holMode === 'normal');
  else if (choice === 'tie') correct = isTie;

  // Hide mystery, prepare reveal element inside holButtons
  const mystery = document.getElementById('holMysteryRating');
  if (mystery) mystery.style.display = 'none';
  let revealEl = document.getElementById('holRevealRating');
  if (!revealEl) {
    revealEl = document.createElement('div');
    revealEl.id = 'holRevealRating';
    revealEl.className = 'holRating holRevealInButtons';
    const holButtons = document.getElementById('holButtons');
    holButtons.insertBefore(revealEl, holButtons.firstChild);
  }
  revealEl.textContent = '0.0 ★';
  revealEl.style.color = '#00c030';
  revealEl.style.opacity = '0';
  revealEl.style.transition = 'opacity 0.2s';

  document.getElementById('holCardB').classList.add('holCardRevealed');

  // Disable buttons during animation
  document.querySelectorAll('.holBtn').forEach(b => b.disabled = true);

  // Animate rating from 0.0 up to rB
  const ANIM_DURATION = 900;
  const steps = 40;
  const interval = ANIM_DURATION / steps;
  let step = 0;
  setTimeout(() => { revealEl.style.opacity = '1'; }, 50);
  const ratingTimer = setInterval(() => {
    step++;
    const cur = parseFloat((rB * step / steps).toFixed(1));
    revealEl.textContent = cur.toFixed(1) + ' ★';
    if (step >= steps) {
      clearInterval(ratingTimer);
      revealEl.textContent = rB + ' ★';
      showHolVSResult(correct);
    }
  }, interval);

  if (correct) {
    holStreak++;
    if (holStreak > holBest) {
      holBest = holStreak;
      localStorage.setItem('holBest', holBest);
    }
    updateHolStreak();
    setTimeout(() => {
      holLeft = holRight;
      holRight = holPickRandom();
      if (revealEl) revealEl.remove();
      const myst = document.getElementById('holMysteryRating');
      if (myst) myst.remove();
      resetHolVS();
      holRenderCards(true);
    }, ANIM_DURATION + 900);
  } else {
    setTimeout(() => holGameOver(), ANIM_DURATION + 900);
  }
}

function showHolVSResult(correct) {
  const vsEl = document.querySelector('.holVS');
  if (!vsEl) return;
  vsEl.style.transition = 'opacity 0.2s';
  vsEl.style.opacity = '0';
  setTimeout(() => {
    if (correct) {
      vsEl.innerHTML = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="24" fill="#00c030"/>
        <polyline points="14,27 22,35 38,18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>`;
    } else {
      vsEl.innerHTML = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="24" fill="#e63946"/>
        <line x1="17" y1="17" x2="35" y2="35" stroke="white" stroke-width="4" stroke-linecap="round"/>
        <line x1="35" y1="17" x2="17" y2="35" stroke="white" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
    }
    vsEl.style.fontSize = '';
    vsEl.style.opacity = '1';
  }, 200);
}

function resetHolVS() {
  const vsEl = document.querySelector('.holVS');
  if (!vsEl) return;
  vsEl.style.transition = 'opacity 0.15s';
  vsEl.style.opacity = '0';
  setTimeout(() => {
    vsEl.innerHTML = 'VS';
    vsEl.style.color = '';
    vsEl.style.fontSize = '';
    vsEl.style.opacity = '1';
  }, 150);
}

function updateHolStreak() {
  document.getElementById('holStreak').textContent = holStreak;
  document.getElementById('holBest').textContent = holBest;
}

function holGameOver() {
  showScreen('holEndScreen');
  document.getElementById('holEndStreak').textContent = `${t('streak')}: ${holStreak}`;
  document.getElementById('holEndBest').textContent = `${t('best')}: ${holBest}`;

  // Memes por rango de racha
  const memes = [
    // Racha 0-3: decepción / amateur
    {
      min: 0, max: 3,
      gifs: [
        { url: 'https://media1.tenor.com/m/z1ZEH5b9tlEAAAAd/nod-alright.gif', caption: 'bro really tried' },
        { url: 'https://media1.tenor.com/m/aJJ_j9ObY_MAAAAd/crying.gif', caption: 'keep it up...' },
      ]
    },
    // Racha 4-7: no está mal
    {
      min: 4, max: 7,
      gifs: [
        { url: 'https://media1.tenor.com/m/8YOhXSQEK_IAAAAd/so-so-not-bad.gif', caption: 'not bad, not bad...' },
        { url: 'https://media1.tenor.com/m/qTAtzIyTuoQAAAAd/maybe-could-be.gif', caption: 'could be worse' },
      ]
    },
    // Racha 8-14: Patrick Bateman + Willem Dafoe — respetable
    {
      min: 8, max: 14,
      gifs: [
        { url: 'https://media1.tenor.com/m/3yPBPC_dwe8AAAAd/leonardo-dicaprio-clapping.gif', caption: 'impressive' },
        { url: 'https://media1.tenor.com/m/5c-9XExEHKEAAAAd/willem-dafoe-american-psycho.gif', caption: 'Patrick approves' },
      ]
    },
    // Racha 15-24: Patrick Bateman + Brad Pitt bailando
    {
      min: 15, max: 24,
      gifs: [
        { url: 'https://media1.tenor.com/m/5lLcKZgmIhgAAAAd/american-psycho-patrick-bateman.gif', caption: 'you are built different' },
        { url: 'https://media1.tenor.com/m/ltOLW-Z5MTsAAAAd/brad-pitt-dance.gif', caption: 'Brad Pitt is proud' },
      ]
    },
    // Racha 25+: DiCaprio Wolf of Wall Street + Travolta
    {
      min: 25, max: Infinity,
      gifs: [
        { url: 'https://media1.tenor.com/m/Tye4rnEa7MwAAAAd/wolf-of-wall-street-jordan.gif', caption: 'absolute cinema connoisseur' },
        { url: 'https://media1.tenor.com/m/Z--n62lJzM4AAAAd/john-travolta-dancing.gif', caption: 'legendary streak' },
      ]
    },
  ];

  const tier = memes.find(m => holStreak >= m.min && holStreak <= m.max);
  if (tier) {
    const pick = tier.gifs[Math.floor(Math.random() * tier.gifs.length)];
    document.getElementById('holMemeGif').src = pick.url;
    document.getElementById('holMemeWrap').style.display = 'block';
  }
}

function restartHOL() {
  // Clean up any leftover reveal elements
  const old = document.getElementById('holRevealRating');
  if (old) old.remove();
  document.querySelectorAll('.holBtn').forEach(b => b.disabled = false);
  startHOLGame(holMode);
}

/* ── TOURNAMENT ── */
let tBracket    = [];
let tRoundIndex = 0;
let tMatchIndex = 0;
let tSize       = 8;
let tPicking    = false;
let tPool       = [];

function startTournament() {
  showScreen('tournamentSizeScreen');
  applyLang();
}

function startTournamentGame(size) {
  if (!peliculasOriginal.length) { showHome(); return; }
  tSize = size;
  tPool = shuffle(peliculasOriginal).slice(0, size);
  const firstRound = [];
  for (let i = 0; i < tPool.length; i += 2)
    firstRound.push({ a: tPool[i], b: tPool[i+1], winner: null });
  tBracket    = [firstRound];
  tRoundIndex = 0;
  tMatchIndex = 0;
  tPicking    = false;
  runBracketDraw(() => {
    showScreen('tournamentScreen');
    applyLang();
    renderTournamentMatch();
    renderTBrackets();
  });
}

function totalRounds() { return Math.log2(tSize); }

function getRoundName(roundIdx) {
  const names = LANG[currentLang].roundNames;
  const total = totalRounds();
  const offset = names.length - 1 - (total - 1 - roundIdx);
  return names[Math.max(0, offset)] || ('Round ' + (roundIdx + 1));
}

// How many matches belong to the left side in a given round
// Round 0: left = first half, right = second half
// Round 1: left = first quarter winners, etc.
// = tSize / 2^(r+2)  ... but minimum 1 for the final
function leftMatchCount(roundIdx) {
  const full = tSize / Math.pow(2, roundIdx + 1); // total matches in round
  return Math.max(1, Math.floor(full / 2));
}

/* ── BRACKET DRAW ANIMATION ── */
function runBracketDraw(onDone) {
  const screenEl   = document.getElementById('tournamentDrawScreen');
  const allScreens = ['homeScreen','loadingScreen','gameScreen','endScreen','historyScreen',
    'gameMenuScreen','difficultyScreen','holScreen','holDiffScreen','holEndScreen',
    'tournamentSizeScreen','tournamentScreen','tournamentEndScreen','tournamentDrawScreen'];
  allScreens.forEach(s => { const el = document.getElementById(s); if (el) el.style.display = 'none'; });
  screenEl.style.display = 'block';

  const canvas  = document.getElementById('tDrawCanvas');
  const SCALE   = Math.min(window.devicePixelRatio || 1, 2);
  // FIX 3: Larger cards, more breathing room
  const CARD_W  = 52, CARD_H = 74, V_GAP = 10, M_GAP = 18;
  const CHAMP_W = 90, CHAMP_H = 128;
  const PAD_V   = 40;
  const COL_GAP = 20;

  const totalR   = totalRounds();
  const half     = tPool.length / 4;   // matches per side in round 0

  const matchBlockH = CARD_H * 2 + V_GAP;
  const sideH       = half * (matchBlockH + M_GAP) - M_GAP;
  const H            = sideH + PAD_V * 2;
  const colW         = CARD_W + COL_GAP;
  const sideW        = totalR * colW;
  const totalW       = sideW * 2 + CHAMP_W + 60;

  canvas.width        = totalW * SCALE;
  canvas.height       = H * SCALE;
  canvas.style.width  = totalW + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  function clearCanvas() { ctx.fillStyle = '#14181c'; ctx.fillRect(0, 0, totalW, H); }

  function rr(x, y, w, h, r, fill, stroke, lw) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
    if (fill)   { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw||1.5; ctx.stroke(); }
  }

  function drawImg(img, x, y, w, h) {
    if (!img) { rr(x,y,w,h,3,'#2c3440','#3d4e5f'); return; }
    ctx.save(); rr(x,y,w,h,3,null,null); ctx.clip();
    ctx.drawImage(img, x, y, w, h); ctx.restore();
  }

  function slotX(side) {
    return side === 'left' ? 12 : totalW - 12 - CARD_W;
  }
  function slotY(mi) {
    const slotH = sideH / half;
    return PAD_V + slotH * mi + (slotH - matchBlockH) / 2;
  }

  // FIX 3: Preload WITHOUT waiting — start animation immediately, load as we go
  const imgCache = {};
  let animStarted = false;
  let loadedCount = 0;

  // Start animation immediately with placeholders
  setTimeout(startAnim, 50);

  // Load images in background
  tPool.forEach(m => {
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload  = () => { imgCache[m.titulo] = img; loadedCount++; };
    img.onerror = () => { loadedCount++; };
    img.src = m.imagen;
  });

  function startAnim() {
    const round0 = tBracket[0];
    const halfN  = round0.length / 2;

    const slots = [];
    for (let mi = 0; mi < halfN; mi++) {
      slots.push({ side:'left',  mi, slot:'a', movie: round0[mi].a });
      slots.push({ side:'left',  mi, slot:'b', movie: round0[mi].b });
      slots.push({ side:'right', mi, slot:'a', movie: round0[halfN + mi].a });
      slots.push({ side:'right', mi, slot:'b', movie: round0[halfN + mi].b });
    }
    for (let i = slots.length-1; i > 0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [slots[i],slots[j]] = [slots[j],slots[i]];
    }

    const revealed = new Set();
    let idx = 0;
    // FIX 3: Much faster — total ~1.2s for 8 films, ~1.8s for 32
    const totalTime = Math.min(1800, 400 + slots.length * 50);
    const delay     = totalTime / slots.length;

    function drawFrame() {
      clearCanvas();
      ['left','right'].forEach(side => {
        for (let mi = 0; mi < halfN; mi++) {
          const x  = slotX(side);
          const y  = slotY(mi);
          const yb = y + CARD_H + V_GAP;
          const m  = round0[side === 'left' ? mi : halfN + mi];
          const ka = `${side}_${mi}_a`, kb = `${side}_${mi}_b`;
          if (revealed.has(ka)) drawImg(imgCache[m.a.titulo], x, y,  CARD_W, CARD_H);
          else rr(x, y, CARD_W, CARD_H, 3, '#1e2830', '#2c3440');
          if (revealed.has(kb)) drawImg(imgCache[m.b.titulo], x, yb, CARD_W, CARD_H);
          else rr(x, yb, CARD_W, CARD_H, 3, '#1e2830', '#2c3440');
        }
      });
      const cx = totalW/2 - CHAMP_W/2, cy = H/2 - CHAMP_H/2;
      rr(cx, cy, CHAMP_W, CHAMP_H, 6, '#1e2830', '#3d4e5f');
      ctx.fillStyle='#3d4e5f'; ctx.font='22px sans-serif'; ctx.textAlign='center';
      ctx.fillText('🏆', totalW/2, cy + CHAMP_H/2 + 8);
    }

    function revealNext() {
      if (idx >= slots.length) { setTimeout(onDone, 400); return; }
      const s = slots[idx++];
      revealed.add(`${s.side}_${s.mi}_${s.slot}`);
      drawFrame();
      setTimeout(revealNext, delay);
    }
    drawFrame();
    setTimeout(revealNext, 100);
  }
}

/* ── MATCH RENDERING ── */
function renderTournamentMatch() {
  const round = tBracket[tRoundIndex];
  const match = round[tMatchIndex];
  document.getElementById('tournamentRoundLabel').textContent = getRoundName(tRoundIndex);
  document.getElementById('tournamentMatchLabel').textContent =
    t('tournamentMatch', tMatchIndex+1, round.length);

  document.getElementById('tPosterA').src        = match.a.imagen;
  document.getElementById('tTitleA').textContent = match.a.titulo;
  document.getElementById('tPosterB').src        = match.b.imagen;
  document.getElementById('tTitleB').textContent = match.b.titulo;

  ['A','B'].forEach(s => {
    document.getElementById('tPick'+s).style.opacity = '0';
    document.getElementById('tCard'+s).style.opacity = '1';
    document.getElementById('tCard'+s).style.borderColor = '';
    const btn = document.getElementById('tSkip'+s);
    if (btn) btn.style.display = isPopularMode ? 'block' : 'none';
  });
  const vsEl = document.getElementById('tVS');
  vsEl.innerHTML = 'VS'; vsEl.style.opacity = '1';
  tPicking = false;
}

function tournamentSkipOne(side) {
  if (tPicking) return;
  const match = tBracket[tRoundIndex][tMatchIndex];
  const used  = new Set(tBracket.flatMap(r => r.flatMap(m => [m.a.titulo, m.b.titulo])));
  const avail = peliculasOriginal.filter(m => !used.has(m.titulo));
  if (!avail.length) return;
  const rep = avail[Math.floor(Math.random()*avail.length)];
  if (side === 'A') match.a = rep; else match.b = rep;
  renderTournamentMatch();
  renderTBrackets();
}

function tournamentPick(side) {
  if (tPicking) return;
  tPicking = true;
  const match = tBracket[tRoundIndex][tMatchIndex];
  match.winner = side === 'A' ? match.a : match.b;

  const winCard  = document.getElementById(side === 'A' ? 'tCardA' : 'tCardB');
  const loseCard = document.getElementById(side === 'A' ? 'tCardB' : 'tCardA');
  winCard.style.borderColor = '#00c030';
  loseCard.style.opacity    = '0.3';

  const vsEl = document.getElementById('tVS');
  vsEl.style.transition = 'opacity 0.15s';
  vsEl.style.opacity = '0';
  setTimeout(() => {
    vsEl.innerHTML = '<svg viewBox="0 0 52 52" width="44" height="44"><circle cx="26" cy="26" r="24" fill="#00c030"/><polyline points="14,27 22,35 38,18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    vsEl.style.opacity = '1';
  }, 150);

  renderTBrackets();
  setTimeout(() => advanceTournament(), 900);
}

function advanceTournament() {
  const round = tBracket[tRoundIndex];
  tMatchIndex++;
  if (tMatchIndex >= round.length) {
    const winners = round.map(m => m.winner);
    if (winners.length === 1) { showTournamentEnd(winners[0]); return; }
    const next = [];
    for (let i = 0; i < winners.length; i += 2)
      next.push({ a: winners[i], b: winners[i+1], winner: null });
    tBracket.push(next);
    tRoundIndex++;
    tMatchIndex = 0;
  }
  renderTournamentMatch();
  renderTBrackets();
}

/* ── SIDE BRACKET SVG ──
   BUG FIX (Final): round.length=1 → left gets match, right gets same match (mirrored).
   This makes both sides "converge" to the final correctly.
   
   For each side:
     sideMatches[r] = matches whose INDEX in that round belong to this side
     Left:  indices 0 .. floor(len/2)-1  (or index 0 if len==1)
     Right: indices ceil(len/2) .. len-1  (or index 0 if len==1)
*/
function getSideMatches(roundIdx, side) {
  const round = tBracket[roundIdx];
  const len   = round.length;
  if (len === 1) return [round[0]];   // FINAL: both sides show the same match
  const half = len / 2;
  return side === 'left' ? round.slice(0, half) : round.slice(half);
}

function renderTBrackets() {
  const leftEl  = document.getElementById('tBracketLeft');
  const rightEl = document.getElementById('tBracketRight');
  if (!leftEl || !rightEl) return;
  leftEl.innerHTML  = buildSVGBracket('left');
  rightEl.innerHTML = buildSVGBracket('right');
}

function buildSVGBracket(side) {
  // FIX 3 (space): Larger cards and more spacing
  const CARD_W = 50, CARD_H = 70, V_GAP = 8, M_GAP = 14;
  const R_W    = 66;
  const PAD_T  = 12;

  const totalR    = totalRounds();
  const round0    = tBracket[0];
  const sideCount = round0.length / 2;   // matches per side in round 0

  const matchBlockH = CARD_H * 2 + V_GAP;
  const svgH        = PAD_T * 2 + sideCount * (matchBlockH + M_GAP) - M_GAP;
  const svgW        = totalR * R_W + 8;

  function matchTopY(roundIdx, matchIdx) {
    const n     = Math.max(1, sideCount / Math.pow(2, roundIdx));
    const slotH = (svgH - PAD_T * 2) / n;
    return PAD_T + slotH * matchIdx + (slotH - matchBlockH) / 2;
  }

  let svg = `<svg width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;">`;

  for (let r = 0; r < Math.min(tBracket.length, totalR); r++) {
    const sideMatches = getSideMatches(r, side);

    const x = side === 'left'
      ? r * R_W + 4
      : svgW - (r + 1) * R_W + 4;

    // Round label
    const isFinal = tBracket[r].length === 1;
    svg += `<text x="${x + CARD_W/2}" y="${PAD_T - 2}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="bold" fill="${r === tRoundIndex ? '#00c030' : '#3d4e5f'}" letter-spacing="1">${getRoundName(r).toUpperCase().slice(0,7)}</text>`;

    sideMatches.forEach((match, mi) => {
      const y   = matchTopY(r, mi);
      const yB  = y + CARD_H + V_GAP;
      const aWon = match.winner && match.winner.titulo === match.a.titulo;
      const bWon = match.winner && match.winner.titulo === match.b.titulo;
      const isCur = r === tRoundIndex && (() => {
        // Find the global index of this match in tBracket[r]
        const globalIdx = tBracket[r].indexOf(match);
        return globalIdx === tMatchIndex;
      })();

      const uid = `${side}_r${r}_m${mi}_${match.a.titulo.slice(0,4)}`;

      // Card A
      svg += `<g opacity="${match.winner && !aWon ? 0.28 : 1}">`;
      svg += `<clipPath id="cp_${uid}_a"><rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="3"/></clipPath>`;
      svg += `<rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="3" fill="#1c2228" stroke="${aWon ? '#00c030' : isCur ? '#3d4e5f' : '#252e38'}" stroke-width="${aWon ? 2 : 1}"/>`;
      svg += `<image href="${match.a.imagen}" x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cp_${uid}_a)"/>`;
      svg += `</g>`;

      // Card B
      svg += `<g opacity="${match.winner && !bWon ? 0.28 : 1}">`;
      svg += `<clipPath id="cp_${uid}_b"><rect x="${x}" y="${yB}" width="${CARD_W}" height="${CARD_H}" rx="3"/></clipPath>`;
      svg += `<rect x="${x}" y="${yB}" width="${CARD_W}" height="${CARD_H}" rx="3" fill="#1c2228" stroke="${bWon ? '#00c030' : isCur ? '#3d4e5f' : '#252e38'}" stroke-width="${bWon ? 2 : 1}"/>`;
      svg += `<image href="${match.b.imagen}" x="${x}" y="${yB}" width="${CARD_W}" height="${CARD_H}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cp_${uid}_b)"/>`;
      svg += `</g>`;

      // Connector line to next round (only if winner and next round exists)
      if (match.winner && r + 1 < tBracket.length) {
        const nextRound    = tBracket[r + 1];
        const nextMatches  = getSideMatches(r + 1, side);
        const nextMi       = Math.floor(mi / 2);
        if (nextMi < nextMatches.length) {
          const nextMatch  = nextMatches[nextMi];
          const nextGlobal = tBracket[r+1].indexOf(nextMatch);
          // For the final (nextRound.length==1), both sides connect to mi=0
          const effectiveMi = nextRound.length === 1 ? 0 : nextMi;
          const nextY      = matchTopY(r + 1, effectiveMi);
          const nextMidY   = nextY + matchBlockH / 2;
          const winnerMidY = aWon ? y + CARD_H/2 : yB + CARD_H/2;
          const thisEdge   = side === 'left' ? x + CARD_W : x;
          const nextX      = side === 'left' ? (r+1)*R_W+4 : svgW-(r+2)*R_W+4;
          const nextEdge   = side === 'left' ? nextX : nextX + CARD_W;
          const midX       = (thisEdge + nextEdge) / 2;
          svg += `<path d="M${thisEdge},${winnerMidY} H${midX} V${nextMidY} H${nextEdge}" stroke="#00c030" stroke-width="1.5" stroke-opacity="0.65" fill="none"/>`;
        }
      }
    });
  }

  svg += '</svg>';
  return svg;
}

/* ── END SCREEN CANVAS ── */
function showTournamentEnd(champion) {
  showScreen('tournamentEndScreen');
  document.getElementById('tournamentWinnerName').textContent = champion.titulo;
  document.getElementById('tournamentWinnerPoster').src = champion.imagen;
  applyLang();
  setTimeout(() => drawBracketCanvas(champion), 150);
}

async function drawBracketCanvas(champion) {
  const canvas = document.getElementById('tBracketCanvas');
  if (!canvas) return;

  const SCALE    = 2;
  const CARD_W   = 44, CARD_H = 62, V_GAP = 8, M_GAP = 14;
  const R_W      = 62;
  const PAD_X    = 32, PAD_Y = 32;
  const CHAMP_W  = 96, CHAMP_H = 136;
  const LINE     = '#00c030';

  const totalR    = totalRounds();
  const round0    = tBracket[0];
  const half      = round0.length / 2;
  const sideCount = half;

  const matchBlockH = CARD_H * 2 + V_GAP;
  const sideH       = sideCount * (matchBlockH + M_GAP) - M_GAP;
  const H            = sideH + PAD_Y * 2;
  const W            = PAD_X * 2 + totalR * R_W * 2 + CHAMP_W + 24;

  canvas.width        = W * SCALE;
  canvas.height       = H * SCALE;
  canvas.style.width  = Math.min(W, window.innerWidth - 32) + 'px';
  canvas.style.height = 'auto';

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);
  ctx.fillStyle = '#14181c';
  ctx.fillRect(0, 0, W, H);

  // Preload all images
  const allM = tBracket.flatMap(r => r.flatMap(m => [m.a, m.b, m.winner].filter(Boolean)));
  const uniq  = [...new Map(allM.map(m => [m.titulo, m])).values()];
  const imgs  = {};
  await Promise.all(uniq.map(m => new Promise(res => {
    const i = new Image(); i.crossOrigin = 'anonymous';
    i.onload = () => { imgs[m.titulo] = i; res(); };
    i.onerror = res;
    i.src = m.imagen;
  })));

  function clipRR(x,y,w,h) {
    ctx.beginPath();
    const r=3;
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }
  function clipRR6(x,y,w,h) {
    ctx.beginPath();
    const r=6;
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }

  function drawImg(img,x,y,w,h) {
    ctx.save(); clipRR(x,y,w,h); ctx.clip();
    if (img) ctx.drawImage(img,x,y,w,h);
    else { ctx.fillStyle='#2c3440'; ctx.fill(); }
    ctx.restore();
  }
  function strokeBox(x,y,w,h,clr,lw) {
    clipRR(x,y,w,h); ctx.strokeStyle=clr; ctx.lineWidth=lw; ctx.stroke();
  }

  function matchTopY(r, mi) {
    const n = Math.max(1, sideCount / Math.pow(2, r));
    const slotH = sideH / n;
    return PAD_Y + slotH * mi + (slotH - matchBlockH) / 2;
  }

  function drawSide(isLeft) {
    for (let r = 0; r < tBracket.length; r++) {
      const sideM = getSideMatches(r, isLeft ? 'left' : 'right');
      const x     = isLeft ? PAD_X + r*R_W : W - PAD_X - CARD_W - r*R_W;

      ctx.fillStyle = '#3d4e5f';
      ctx.font = 'bold 7px DM Sans,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(getRoundName(r).slice(0,7).toUpperCase(), x+CARD_W/2, PAD_Y-10);

      sideM.forEach((match, mi) => {
        // For the final (len=1), center the single match
        const effectiveMi = tBracket[r].length === 1 ? 0 : mi;
        const y  = matchTopY(r, effectiveMi);
        const yB = y + CARD_H + V_GAP;
        const aWon = match.winner && match.winner.titulo === match.a.titulo;
        const bWon = match.winner && match.winner.titulo === match.b.titulo;

        ctx.globalAlpha = match.winner && !aWon ? 0.28 : 1;
        drawImg(imgs[match.a.titulo], x, y, CARD_W, CARD_H);
        if (aWon) strokeBox(x, y, CARD_W, CARD_H, LINE, 2);

        ctx.globalAlpha = match.winner && !bWon ? 0.28 : 1;
        drawImg(imgs[match.b.titulo], x, yB, CARD_W, CARD_H);
        if (bWon) strokeBox(x, yB, CARD_W, CARD_H, LINE, 2);
        ctx.globalAlpha = 1;

        // Connector to next round
        if (match.winner && r+1 < tBracket.length) {
          const nextSideM = getSideMatches(r+1, isLeft ? 'left' : 'right');
          const nmi       = tBracket[r+1].length === 1 ? 0 : Math.floor(mi/2);
          if (nmi < nextSideM.length) {
            const ny    = matchTopY(r+1, nmi);
            const nMidY = ny + matchBlockH/2;
            const winY  = aWon ? y+CARD_H/2 : yB+CARD_H/2;
            const edgeX = isLeft ? x+CARD_W : x;
            const nx    = isLeft ? PAD_X+(r+1)*R_W : W-PAD_X-CARD_W-(r+1)*R_W;
            const nEdge = isLeft ? nx : nx+CARD_W;
            const midX  = (edgeX+nEdge)/2;
            ctx.strokeStyle = LINE; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(edgeX,winY); ctx.lineTo(midX,winY);
            ctx.lineTo(midX,nMidY); ctx.lineTo(nEdge,nMidY);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
    }
  }

  drawSide(true);
  drawSide(false);

  // Champion center
  const cx = W/2 - CHAMP_W/2, cy = H/2 - CHAMP_H/2;
  ctx.shadowColor = '#00c030'; ctx.shadowBlur = 22;
  ctx.save(); clipRR6(cx,cy,CHAMP_W,CHAMP_H); ctx.clip();
  const ci = imgs[champion.titulo];
  if (ci) ctx.drawImage(ci,cx,cy,CHAMP_W,CHAMP_H);
  else { ctx.fillStyle='#2c3440'; ctx.fill(); }
  ctx.restore();
  ctx.shadowBlur = 0;
  clipRR6(cx,cy,CHAMP_W,CHAMP_H); ctx.strokeStyle=LINE; ctx.lineWidth=2.5; ctx.stroke();
  ctx.font='14px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🏆', W/2, cy-6);
  ctx.fillStyle='#fff'; ctx.font='bold 8px DM Sans,sans-serif';
  ctx.fillText(champion.titulo.slice(0,24), W/2, cy+CHAMP_H+13);
  ctx.fillStyle='#3d4e5f'; ctx.font='7px DM Sans,sans-serif';
  ctx.fillText('RANKBOXD.VERCEL.APP', W/2, H-6);
}

async function downloadBracket() {
  const canvas = document.getElementById('tBracketCanvas');
  if (!canvas) return;
  const a = document.createElement('a');
  a.download = 'rankboxd-bracket.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

/* ── EPIC INTRO ── */
function runIntro() {
  const overlay = document.getElementById('introOverlay');
  const logoEl = document.getElementById('introLogo');
  const tagEl = document.getElementById('introTagline');
  const postersEl = document.getElementById('introPosters');
  if (!overlay) return;
  // Start visible immediately — no delay
  overlay.style.opacity = '1';

  // Poster images — use placeholder colored rects until real posters exist
  // We'll create flying poster cards with CSS animation
  const colors = ['#1e2830','#1a2535','#222c35','#1c2a30','#202830'];
  const count = 18;
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    const w = 60 + Math.random() * 40;
    const h = w * 1.45;
    const startX = Math.random() * 110 - 5; // % of vw
    const startY = 110 + Math.random() * 30; // start below screen
    const endX = startX + (Math.random() - 0.5) * 30;
    const endY = -30 - Math.random() * 40;
    const delay = Math.random() * 1.8;
    const dur = 1.8 + Math.random() * 1.2;
    const rot = (Math.random() - 0.5) * 30;
    card.style.cssText = `
      position:absolute;
      width:${w}px; height:${h}px;
      left:${startX}vw; top:${startY}vh;
      background:${colors[i % colors.length]};
      border:1px solid #2c3440;
      border-radius:6px;
      opacity:0;
      animation: tCardFly ${dur}s ease-in ${delay}s forwards;
      transform: rotate(${rot}deg);
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    postersEl.appendChild(card);
  }

  // After 1.5s start showing logo
  setTimeout(() => {
    logoEl.style.opacity = '1';
    logoEl.style.transform = 'scale(1)';
    tagEl.style.opacity = '1';
  }, 500);

  // After 3.2s flash green and fade out
  setTimeout(() => {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
  }, 1800);
}

// Inject keyframe for poster flying
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tCardFly {
      0%   { opacity:0; transform: translateY(0) rotate(var(--rot, 0deg)) scale(0.8); }
      15%  { opacity:0.7; }
      85%  { opacity:0.5; }
      100% { opacity:0; transform: translateY(-130vh) rotate(var(--rot, 0deg)) scale(1.1); }
    }
  `;
  document.head.appendChild(style);
})();

/* ── PRIVACY ── */
function showPrivacy() {
  document.getElementById('privacyOverlay').classList.add('show');
  document.getElementById('privacyModal').classList.add('show');
}

function hidePrivacy() {
  document.getElementById('privacyOverlay').classList.remove('show');
  document.getElementById('privacyModal').classList.remove('show');
}

/* ── INIT ── */
setupStars();
setLang(currentLang);
showHome();
runIntro();
