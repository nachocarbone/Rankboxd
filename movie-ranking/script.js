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
  // Build all rounds upfront (empty winners) so we can draw the full bracket
  tBracket = buildFullBracketStructure(tPool);
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

// Build the full bracket structure with all rounds pre-allocated
function buildFullBracketStructure(pool) {
  const rounds = [];
  let current = [];
  for (let i = 0; i < pool.length; i += 2)
    current.push({ a: pool[i], b: pool[i+1], winner: null });
  rounds.push(current);
  while (current.length > 1) {
    const next = [];
    for (let i = 0; i < current.length; i += 2)
      next.push({ a: null, b: null, winner: null }); // placeholders
    rounds.push(next);
    current = next;
  }
  return rounds;
}

function totalRounds() { return Math.log2(tSize); }

function getRoundName(roundIdx) {
  const names = LANG[currentLang].roundNames;
  const total = totalRounds();
  const offset = names.length - 1 - (total - 1 - roundIdx);
  return names[Math.max(0, offset)] || ('Round ' + (roundIdx + 1));
}

/* ─────────────────────────────────────────────────────
   BRACKET LAYOUT ENGINE
   Mirrors the reference image:
   - tSize/2 matches in round 0 split equally left/right
   - Each subsequent round has half the matches, centered vertically
   - Lines connect pairs from one round to the next
   - Champion slot in the dead center
   ───────────────────────────────────────────────────── */

// Returns layout params for a given tournament size
function getBracketLayout(tSz) {
  const totalR  = Math.log2(tSz);   // rounds per side (3 for 8, 4 for 16, 5 for 32)
  const half    = tSz / 4;          // matches per side in round 0

  // Card sizes scale with tournament size so it fits on screen
  const CARD_W  = tSz <= 8  ? 54 : tSz <= 16 ? 46 : 38;
  const CARD_H  = tSz <= 8  ? 76 : tSz <= 16 ? 65 : 54;
  const V_GAP   = tSz <= 8  ? 10 : tSz <= 16 ? 8  : 6;   // gap between A and B card
  const M_GAP   = tSz <= 8  ? 20 : tSz <= 16 ? 14 : 10;  // gap between matches
  const R_GAP   = tSz <= 8  ? 18 : tSz <= 16 ? 14 : 12;  // horizontal gap between columns

  const matchH  = CARD_H * 2 + V_GAP;
  const sideH   = half * (matchH + M_GAP) - M_GAP;

  const CHAMP_W = CARD_W * 2 + R_GAP;
  const CHAMP_H = Math.round(CHAMP_W * 1.42);

  const colW    = CARD_W + R_GAP;
  const sideW   = totalR * colW;
  const PAD_X   = 16;
  const PAD_Y   = 36;
  const totalW  = PAD_X * 2 + sideW * 2 + CHAMP_W;
  const totalH  = PAD_Y * 2 + Math.max(sideH, CHAMP_H + 40);

  return { totalR, half, CARD_W, CARD_H, V_GAP, M_GAP, R_GAP, matchH,
           sideH, CHAMP_W, CHAMP_H, colW, sideW, PAD_X, PAD_Y, totalW, totalH };
}

// Get the Y position of a match's top edge for a given round & match index (on one side)
function getMatchTopY(mi, roundIdx, L) {
  // In round r, there are L.half / 2^r matches per side
  const n     = Math.max(1, L.half / Math.pow(2, roundIdx));
  const slotH = L.sideH / n;
  const y0    = L.PAD_Y + (L.totalH - L.PAD_Y*2 - L.sideH) / 2; // center vertically
  return y0 + slotH * mi + (slotH - L.matchH) / 2;
}

// Get X of the left edge of a card column for a given round on a given side
function getColX(roundIdx, side, L) {
  if (side === 'left')
    return L.PAD_X + roundIdx * L.colW;
  else
    return L.totalW - L.PAD_X - L.CARD_W - roundIdx * L.colW;
}

/* ── BRACKET DRAW ANIMATION ── */
function runBracketDraw(onDone) {
  const screenEl   = document.getElementById('tournamentDrawScreen');
  const allScreens = ['homeScreen','loadingScreen','gameScreen','endScreen','historyScreen',
    'gameMenuScreen','difficultyScreen','holScreen','holDiffScreen','holEndScreen',
    'tournamentSizeScreen','tournamentScreen','tournamentEndScreen','tournamentDrawScreen'];
  allScreens.forEach(s => { const el = document.getElementById(s); if (el) el.style.display='none'; });
  screenEl.style.display = 'block';

  const canvas = document.getElementById('tDrawCanvas');
  const SCALE  = Math.min(window.devicePixelRatio || 1, 2);
  const L      = getBracketLayout(tSize);

  canvas.width        = L.totalW * SCALE;
  canvas.height       = L.totalH * SCALE;
  canvas.style.width  = Math.min(L.totalW, window.innerWidth - 32) + 'px';
  canvas.style.height = 'auto';

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // ── drawing helpers ──
  function clearBg() {
    ctx.fillStyle = '#14181c';
    ctx.fillRect(0, 0, L.totalW, L.totalH);
  }

  function rrPath(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }

  function drawPlaceholder(x, y, w, h) {
    rrPath(x,y,w,h,3);
    ctx.fillStyle = '#1e2830'; ctx.fill();
    ctx.strokeStyle = '#2c3440'; ctx.lineWidth = 1; ctx.stroke();
  }

  function drawPosterClipped(img, x, y, w, h, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha || 1;
    rrPath(x,y,w,h,3); ctx.clip();
    if (img) ctx.drawImage(img, x, y, w, h);
    else { ctx.fillStyle = '#2c3440'; ctx.fill(); }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawConnectorLines(L) {
    // Draw ALL the bracket lines (empty, just structure)
    ctx.strokeStyle = '#2c3440';
    ctx.lineWidth   = 1.5;
    ['left','right'].forEach(side => {
      for (let r = 0; r < L.totalR - 1; r++) {
        const nMatches = Math.max(1, L.half / Math.pow(2, r));
        for (let mi = 0; mi < nMatches; mi++) {
          const x      = getColX(r, side, L);
          const y      = getMatchTopY(mi, r, L);
          const xNext  = getColX(r+1, side, L);
          const miNext = Math.floor(mi / 2);
          const yNext  = getMatchTopY(miNext, r+1, L);
          // midpoint Y of this match (between A and B)
          const midY   = y + L.matchH / 2;
          // midpoint Y of the next match slot center
          const nextCY = yNext + L.matchH / 2;
          const edgeX  = side === 'left' ? x + L.CARD_W : x;
          const nEdge  = side === 'left' ? xNext : xNext + L.CARD_W;
          const connX  = (edgeX + nEdge) / 2;
          ctx.beginPath();
          ctx.moveTo(edgeX, midY);
          ctx.lineTo(connX, midY);
          ctx.lineTo(connX, nextCY);
          ctx.lineTo(nEdge, nextCY);
          ctx.stroke();
        }
      }
      // Final connector from last round → champion
      const rLast  = L.totalR - 1;
      const xLast  = getColX(rLast, side, L);
      const yLast  = getMatchTopY(0, rLast, L);
      const midY   = yLast + L.matchH / 2;
      const edgeX  = side === 'left' ? xLast + L.CARD_W : xLast;
      const champX = L.totalW/2 + (side === 'left' ? -L.CHAMP_W/2 : L.CHAMP_W/2);
      const champY = L.totalH/2;
      ctx.beginPath();
      ctx.moveTo(edgeX, midY);
      ctx.lineTo(champX, midY);
      ctx.lineTo(champX, champY);
      ctx.stroke();
    });
  }

  function drawFullBracketEmpty(L) {
    clearBg();
    drawConnectorLines(L);
    // Draw all empty slots
    ['left','right'].forEach(side => {
      for (let r = 0; r < L.totalR; r++) {
        const n = Math.max(1, L.half / Math.pow(2, r));
        for (let mi = 0; mi < n; mi++) {
          const x = getColX(r, side, L);
          const y = getMatchTopY(mi, r, L);
          drawPlaceholder(x, y, L.CARD_W, L.CARD_H);
          drawPlaceholder(x, y + L.CARD_H + L.V_GAP, L.CARD_W, L.CARD_H);
        }
      }
    });
    // Champion slot
    const cx = L.totalW/2 - L.CHAMP_W/2;
    const cy = L.totalH/2 - L.CHAMP_H/2;
    rrPath(cx, cy, L.CHAMP_W, L.CHAMP_H, 6);
    ctx.fillStyle = '#1e2830'; ctx.fill();
    ctx.strokeStyle = '#3d4e5f'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#3d4e5f'; ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🏆', L.totalW/2, L.totalH/2 + 8);
  }

  // Preload round-0 posters
  const imgs = {};
  let loaded = 0;
  setTimeout(startAnim, 30); // start immediately with placeholders
  tPool.forEach(m => {
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload  = () => { imgs[m.titulo] = img; loaded++; };
    img.onerror = () => loaded++;
    img.src = m.imagen;
  });

  function startAnim() {
    const half = tPool.length / 2;
    // Build reveal slots: only round 0 posters, both sides, shuffled
    const slots = [];
    for (let mi = 0; mi < half/2; mi++) {
      const mL = tBracket[0][mi];
      const mR = tBracket[0][half/2 + mi];
      slots.push({ side:'left',  mi, slot:'a', m: mL.a });
      slots.push({ side:'left',  mi, slot:'b', m: mL.b });
      slots.push({ side:'right', mi, slot:'a', m: mR.a });
      slots.push({ side:'right', mi, slot:'b', m: mR.b });
    }
    for (let i = slots.length-1; i > 0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [slots[i],slots[j]] = [slots[j],slots[i]];
    }

    const revealed = {};
    let idx = 0;
    const totalMs = Math.min(1600, 300 + slots.length * 45);
    const delay   = totalMs / slots.length;

    function drawFrame() {
      drawFullBracketEmpty(L);
      // Paint revealed posters over the placeholders
      slots.forEach(s => {
        const key = `${s.side}_${s.mi}_${s.slot}`;
        if (!revealed[key]) return;
        const x = getColX(0, s.side, L);
        const y = getMatchTopY(s.mi, 0, L) + (s.slot === 'b' ? L.CARD_H + L.V_GAP : 0);
        drawPosterClipped(imgs[s.m.titulo], x, y, L.CARD_W, L.CARD_H);
      });
    }

    function step() {
      if (idx >= slots.length) { setTimeout(onDone, 350); return; }
      revealed[`${slots[idx].side}_${slots[idx].mi}_${slots[idx].slot}`] = true;
      idx++;
      drawFrame();
      setTimeout(step, delay);
    }

    drawFrame();
    setTimeout(step, 80);
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
  const used  = new Set(tBracket.flatMap(r => r.flatMap(m =>
    [m.a && m.a.titulo, m.b && m.b.titulo].filter(Boolean))));
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

  // Propagate winner to next round as a participant
  if (tRoundIndex + 1 < tBracket.length) {
    const nextMatchIdx = Math.floor(tMatchIndex / 2);
    const nextMatch    = tBracket[tRoundIndex + 1][nextMatchIdx];
    if (tMatchIndex % 2 === 0) nextMatch.a = match.winner;
    else                       nextMatch.b = match.winner;
  }

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
    tRoundIndex++;
    tMatchIndex = 0;
  }
  renderTournamentMatch();
  renderTBrackets();
}

/* ── SIDE BRACKET SVG (live during game) ──
   Draws the full bracket with all rounds visible from the start.
   Uses the same layout engine as the canvas.
*/
function renderTBrackets() {
  const leftEl  = document.getElementById('tBracketLeft');
  const rightEl = document.getElementById('tBracketRight');
  if (!leftEl || !rightEl) return;
  const svg = buildFullBracketSVG();
  // Split the SVG into left and right halves visually using viewBox
  const L = getBracketLayout(tSize);
  // We render the whole bracket as ONE svg, split into two panels
  leftEl.innerHTML  = buildSideSVG('left', L);
  rightEl.innerHTML = buildSideSVG('right', L);
}

function buildSideSVG(side, L) {
  const panelW = L.PAD_X + L.sideW + 8;
  const H      = L.totalH;

  // For right side, we flip the coordinate system via transform
  const flipX  = side === 'right' ? L.totalW : 0;
  const scale  = side === 'right' ? -1 : 1;

  let svg = `<svg width="${panelW}" height="${H}" viewBox="0 0 ${panelW} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;">`;

  // For right side, mirror by adjusting coordinates
  const xOffset = side === 'right' ? L.totalW - panelW : 0;

  for (let r = 0; r < L.totalR; r++) {
    const nMatches = Math.max(1, L.half / Math.pow(2, r));
    const fullRound = tBracket[r] || [];
    const startMi   = side === 'left' ? 0 : L.half; // global match index offset

    for (let mi = 0; mi < nMatches; mi++) {
      const globalMi = side === 'left' ? mi : L.half + mi;
      const match     = fullRound[globalMi] || { a: null, b: null, winner: null };
      const rawX      = getColX(r, side, L) - xOffset;
      const x         = rawX;
      const y         = getMatchTopY(mi, r, L);
      const yB        = y + L.CARD_H + L.V_GAP;

      const aWon = match.winner && match.a && match.winner.titulo === match.a.titulo;
      const bWon = match.winner && match.b && match.winner.titulo === match.b.titulo;
      const isCur = r === tRoundIndex && globalMi === tMatchIndex;

      const uid = `sv_${side}_r${r}_m${mi}`;

      // Card A
      svg += cardSVG(match.a, x, y, L.CARD_W, L.CARD_H, aWon,
        match.winner && !aWon, isCur && !match.winner, uid+'_a');
      // Card B
      svg += cardSVG(match.b, x, yB, L.CARD_W, L.CARD_H, bWon,
        match.winner && !bWon, isCur && !match.winner, uid+'_b');

      // Connector to next round
      if (r < L.totalR - 1) {
        const miNext  = Math.floor(mi / 2);
        const nMatNext= Math.max(1, L.half / Math.pow(2, r+1));
        const xNext   = getColX(r+1, side, L) - xOffset;
        const yNext   = getMatchTopY(miNext, r+1, L);
        const midY    = y + L.matchH / 2;
        const nextCY  = yNext + L.matchH / 2;
        const edgeX   = side === 'left' ? x + L.CARD_W : x;
        const nEdge   = side === 'left' ? xNext : xNext + L.CARD_W;
        const connX   = (edgeX + nEdge) / 2;
        const lineClr = match.winner ? '#00c030' : '#2c3440';
        const lineOp  = match.winner ? 0.7 : 0.5;
        svg += `<path d="M${edgeX},${midY} H${connX} V${nextCY} H${nEdge}" stroke="${lineClr}" stroke-width="1.5" stroke-opacity="${lineOp}" fill="none"/>`;
      }

      // Round label (only for mi=0)
      if (mi === 0) {
        const lx = getColX(r, side, L) - xOffset + L.CARD_W/2;
        const lc = r === tRoundIndex ? '#00c030' : '#3d4e5f';
        svg += `<text x="${lx}" y="14" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="bold" fill="${lc}" letter-spacing="0.5">${getRoundName(r).toUpperCase().slice(0,7)}</text>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}

function cardSVG(movie, x, y, w, h, won, lost, current, uid) {
  const alpha  = lost ? '0.28' : '1';
  const border = won ? '#00c030' : current ? '#4a5568' : '#252e38';
  const bw     = won ? 2 : 1;
  let s = `<g opacity="${alpha}">`;
  s += `<clipPath id="${uid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/></clipPath>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#1c2228" stroke="${border}" stroke-width="${bw}"/>`;
  if (movie && movie.imagen) {
    s += `<image href="${movie.imagen}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${uid})"/>`;
  }
  if (won) {
    // Small green tick in corner
    const tx = x + w - 8, ty = y + 8;
    s += `<circle cx="${tx}" cy="${ty}" r="6" fill="#00c030"/>`;
    s += `<polyline points="${tx-3},${ty} ${tx},${ty+3} ${tx+4},${ty-3}" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  }
  s += '</g>';
  return s;
}

/* ── END SCREEN: full canvas bracket ── */
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

  const SCALE = 2;
  const L     = getBracketLayout(tSize);

  canvas.width        = L.totalW * SCALE;
  canvas.height       = L.totalH * SCALE;
  canvas.style.width  = Math.min(L.totalW, window.innerWidth - 32) + 'px';
  canvas.style.height = 'auto';

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);
  ctx.fillStyle = '#14181c';
  ctx.fillRect(0, 0, L.totalW, L.totalH);

  // Preload all images
  const allM = tBracket.flatMap(r => r.flatMap(m =>
    [m.a, m.b, m.winner].filter(x => x && x.imagen)));
  const uniq = [...new Map(allM.map(m => [m.titulo, m])).values()];
  const imgs = {};
  await Promise.all(uniq.map(m => new Promise(res => {
    const i = new Image(); i.crossOrigin = 'anonymous';
    i.onload = () => { imgs[m.titulo] = i; res(); };
    i.onerror = res;
    i.src = m.imagen;
  })));

  function rrPath(x,y,w,h,r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }
  function drawCard(img, x, y, w, h, alpha) {
    ctx.save(); ctx.globalAlpha = alpha || 1;
    rrPath(x,y,w,h,3); ctx.clip();
    if (img) ctx.drawImage(img,x,y,w,h);
    else { ctx.fillStyle='#2c3440'; ctx.fill(); }
    ctx.restore(); ctx.globalAlpha=1;
  }
  function strokeCard(x,y,w,h,clr,lw) {
    rrPath(x,y,w,h,3); ctx.strokeStyle=clr; ctx.lineWidth=lw; ctx.stroke();
  }

  // Draw connector lines for all rounds
  ['left','right'].forEach(side => {
    for (let r = 0; r < L.totalR; r++) {
      const nM = Math.max(1, L.half / Math.pow(2, r));
      const round = tBracket[r] || [];
      for (let mi = 0; mi < nM; mi++) {
        const globalMi = side === 'left' ? mi : L.half + mi;
        const match = round[globalMi];
        const x   = getColX(r, side, L);
        const y   = getMatchTopY(mi, r, L);
        const midY = y + L.matchH/2;

        // Connector to next round
        if (r < L.totalR - 1) {
          const miN  = Math.floor(mi/2);
          const xN   = getColX(r+1, side, L);
          const yN   = getMatchTopY(miN, r+1, L);
          const nextCY = yN + L.matchH/2;
          const edgeX = side==='left' ? x+L.CARD_W : x;
          const nEdge = side==='left' ? xN : xN+L.CARD_W;
          const connX = (edgeX+nEdge)/2;
          const hasW  = match && match.winner;
          ctx.strokeStyle = hasW ? '#00c030' : '#2c3440';
          ctx.lineWidth   = 1.5;
          ctx.globalAlpha = hasW ? 0.7 : 0.4;
          ctx.beginPath();
          ctx.moveTo(edgeX,midY); ctx.lineTo(connX,midY);
          ctx.lineTo(connX,nextCY); ctx.lineTo(nEdge,nextCY);
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          // Final → champion
          const edgeX  = side==='left' ? x+L.CARD_W : x;
          const champX = side==='left' ? L.totalW/2-L.CHAMP_W/2 : L.totalW/2+L.CHAMP_W/2;
          const champMY = L.totalH/2;
          const hasW   = match && match.winner;
          ctx.strokeStyle = hasW ? '#00c030' : '#2c3440';
          ctx.lineWidth   = 1.5;
          ctx.globalAlpha = hasW ? 0.7 : 0.4;
          ctx.beginPath();
          ctx.moveTo(edgeX, midY); ctx.lineTo(champX, midY);
          ctx.lineTo(champX, champMY);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  });

  // Draw all cards
  ['left','right'].forEach(side => {
    for (let r = 0; r < L.totalR; r++) {
      const nM    = Math.max(1, L.half / Math.pow(2, r));
      const round = tBracket[r] || [];

      // Round label
      const lx = getColX(r, side, L) + L.CARD_W/2;
      ctx.fillStyle = '#3d4e5f'; ctx.font='bold 7px DM Sans,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(getRoundName(r).slice(0,7).toUpperCase(), lx, L.PAD_Y - 14);

      for (let mi = 0; mi < nM; mi++) {
        const globalMi = side === 'left' ? mi : L.half + mi;
        const match    = round[globalMi] || { a:null, b:null, winner:null };
        const x  = getColX(r, side, L);
        const y  = getMatchTopY(mi, r, L);
        const yB = y + L.CARD_H + L.V_GAP;
        const aWon = match.winner && match.a && match.winner.titulo === match.a.titulo;
        const bWon = match.winner && match.b && match.winner.titulo === match.b.titulo;

        drawCard(match.a ? imgs[match.a.titulo] : null, x, y,  L.CARD_W, L.CARD_H, match.winner&&!aWon?0.25:1);
        if (aWon) strokeCard(x, y, L.CARD_W, L.CARD_H, '#00c030', 2);

        drawCard(match.b ? imgs[match.b.titulo] : null, x, yB, L.CARD_W, L.CARD_H, match.winner&&!bWon?0.25:1);
        if (bWon) strokeCard(x, yB, L.CARD_W, L.CARD_H, '#00c030', 2);
      }
    }
  });

  // Champion
  const cx = L.totalW/2 - L.CHAMP_W/2;
  const cy = L.totalH/2 - L.CHAMP_H/2;
  ctx.shadowColor='#00c030'; ctx.shadowBlur=24;
  ctx.save(); rrPath(cx,cy,L.CHAMP_W,L.CHAMP_H,6); ctx.clip();
  const ci = imgs[champion.titulo];
  if (ci) ctx.drawImage(ci,cx,cy,L.CHAMP_W,L.CHAMP_H);
  else { ctx.fillStyle='#2c3440'; ctx.fill(); }
  ctx.restore();
  ctx.shadowBlur=0;
  strokeCard(cx,cy,L.CHAMP_W,L.CHAMP_H,'#00c030',2.5);
  ctx.font='16px sans-serif'; ctx.textAlign='center';
  ctx.fillText('🏆', L.totalW/2, cy-8);
  ctx.fillStyle='#fff'; ctx.font=`bold ${Math.max(8,L.CARD_W/6)}px DM Sans,sans-serif`;
  ctx.fillText(champion.titulo.slice(0,26), L.totalW/2, cy+L.CHAMP_H+14);
  ctx.fillStyle='#3d4e5f'; ctx.font='7px DM Sans,sans-serif';
  ctx.fillText('RANKBOXD.VERCEL.APP', L.totalW/2, L.totalH-8);
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
