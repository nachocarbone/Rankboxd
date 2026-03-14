const TOTAL = 5;
const STORAGE_KEY = 'rankboxdHistory_v1';
// Star values: 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5

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
    noMovies: 'Todavía no guardaste ningún ranking.<br><br>Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.',
    confirmClear: '¿Borrar todo el historial? No se puede deshacer.',
    errMinMovies: (n, t) => `Se necesitan al menos ${n} películas. Tu archivo tiene ${t}.`,
    errFound: (n) => `${n} películas encontradas. Buscando pósteres...`,
    errPosters: (n, t) => `Solo se encontraron ${n} películas con póster. Se necesitan al menos ${t}.`,
    ready: (n) => `${n} películas listas. ¡A jugar!`,
    errConn: 'Error de conexión. Intentá de nuevo.',
    errStar: 'Elegí una puntuación primero ↑',
    loadingText: 'Buscando pósteres...',
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
    noMovies: "You haven't saved any ranking yet.<br><br>Play a round, rate it with stars<br>and save it to see it here.",
    confirmClear: 'Delete all history? This cannot be undone.',
    errMinMovies: (n, t) => `At least ${n} movies needed. Your file has ${t}.`,
    errFound: (n) => `${n} movies found. Fetching posters...`,
    errPosters: (n, t) => `Only ${n} movies with posters found. Need at least ${t}.`,
    ready: (n) => `${n} movies ready. Let's play!`,
    errConn: 'Connection error. Please try again.',
    errStar: 'Pick a rating first ↑',
    loadingText: 'Fetching posters...',
  }
};

let currentLang = localStorage.getItem('rankboxdLang') || 'es';

function t(key, ...args) {
  const val = LANG[currentLang][key];
  return typeof val === 'function' ? val(...args) : val;
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
    if (LANG[currentLang][key] && typeof LANG[currentLang][key] === 'string') {
      el.innerHTML = LANG[currentLang][key];
    }
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


/* ── I18N ── */
let currentLang = 'es';

const TRANSLATIONS = {
  es: {
    subtitle: 'Ordenalas sin saber qué viene después',
    homeTitle: 'Cargá tu Letterboxd',
    step1Label: 'Exportá tus datos',
    step1Desc: 'Descargá tu historial desde Letterboxd',
    step1Btn: 'Ir →',
    step2Label: 'Subí el archivo watched.csv',
    step2Desc: 'Está dentro del ZIP que descargaste',
    step2Btn: 'Subir',
    loadingTitle: 'Cargando tu lista...',
    loadingReady: 'películas listas. ¡A jugar!',
    loadingSearching: 'películas encontradas. Buscando pósteres...',
    ratingLabel: '¿Qué tan bueno quedó tu ranking?',
    saveBtnText: 'Guardar en historial',
    playAgainText: 'Jugar otra vez',
    backHomeText: 'Cambiar lista',
    historialBtn: '📋 Historial',
    historialTitle: 'Historial',
    clearBtn: 'Borrar todo',
    backBtn: '← Volver',
    historyEmpty: 'Todavía no guardaste ningún ranking.<br><br>Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.',
    confirmClear: '¿Borrar todo el historial? No se puede deshacer.',
    errorMin: 'Se necesitan al menos',
    errorMovies: 'películas. Tu archivo tiene',
    errorFound: 'Solo se encontraron',
    errorWithPoster: 'películas con póster. Se necesitan al menos',
    errorConnection: 'Error de conexión. Intentá de nuevo.',
    errorLoad: 'Error al cargar. Intentá de nuevo.',
    rankLabel: '¿En qué puesto?',
    rankingLabel: 'Tu ranking',
    likeTitle: 'Me gustó',
    savedMsg: '✓ Guardado en el historial',
    needRating: 'Elegí una puntuación primero ↑',
  },
  en: {
    subtitle: 'Rank them without knowing what comes next',
    homeTitle: 'Load your Letterboxd',
    step1Label: 'Export your data',
    step1Desc: 'Download your history from Letterboxd',
    step1Btn: 'Go →',
    step2Label: 'Upload your watched.csv file',
    step2Desc: 'It's inside the ZIP you downloaded',
    step2Btn: 'Upload',
    loadingTitle: 'Loading your list...',
    loadingReady: 'movies ready. Let's play!',
    loadingSearching: 'movies found. Fetching posters...',
    ratingLabel: 'How good was your ranking?',
    saveBtnText: 'Save to history',
    playAgainText: 'Play again',
    backHomeText: 'Change list',
    historialBtn: '📋 History',
    historialTitle: 'History',
    clearBtn: 'Clear all',
    backBtn: '← Back',
    historyEmpty: 'You haven\'t saved any rankings yet.<br><br>Play a round, rate it with stars<br>and save it to see it here.',
    confirmClear: 'Delete all history? This cannot be undone.',
    errorMin: 'At least',
    errorMovies: 'movies are needed. Your file has',
    errorFound: 'Only',
    errorWithPoster: 'movies with posters found. Need at least',
    errorConnection: 'Connection error. Please try again.',
    errorLoad: 'Error loading. Please try again.',
    rankLabel: 'Which position?',
    rankingLabel: 'Your ranking',
    likeTitle: 'Liked it',
    savedMsg: '✓ Saved to history',
    needRating: 'Choose a rating first ↑',
  }
};

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['es'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.langBtn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });
  applyTranslations();
}

function applyTranslations() {
  // Static elements
  const map = {
    subtitle: '[data-i18n="subtitle"]',
    homeTitle: '[data-i18n="homeTitle"]',
    ratingLabel: '[data-i18n="ratingLabel"]',
  };
  for (const [key, sel] of Object.entries(map)) {
    const el = document.querySelector(sel);
    if (el) el.textContent = t(key);
  }
  // Buttons
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn && !saveBtn.disabled) saveBtn.textContent = t('saveBtnText');
  const histBtn = document.querySelector('.historyBtn');
  if (histBtn) histBtn.textContent = t('historialBtn');
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) likeBtn.title = t('likeTitle');
  // Labels
  document.querySelectorAll('.buttonsSection .label').forEach(el => el.textContent = t('rankLabel'));
  document.querySelectorAll('.rankingSection .label').forEach(el => el.textContent = t('rankingLabel'));
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
  document.getElementById('homeError').textContent = '';
  const input = document.getElementById('csvInput');
  if (input) input.value = '';
}

/* ── CSV HANDLING ── */
async function handleCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const errorEl = document.getElementById('homeError');
  errorEl.textContent = '';

  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = e.target.result;
    const titles = parseLetterboxdCSV(text);

    if (titles.length < TOTAL) {
      errorEl.textContent = `Se necesitan al menos ${TOTAL} películas. Tu archivo tiene ${titles.length}.`;
      return;
    }

    showScreen('loadingScreen');
    document.getElementById('loadingText').textContent = t('errFound', titles.length);
    document.getElementById('loadingBar').style.width = '15%';

    try {
      const res = await fetch('/api/letterboxd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles: shuffle(titles).slice(0, 200) })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        showScreen('homeScreen');
        document.getElementById('homeError').textContent = data.error || 'Error al cargar. Intentá de nuevo.';
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
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

/* ── GAME ── */
function startGame() {
  if (!peliculasOriginal.length) { showHome(); return; }
  peliculas     = shuffle(peliculasOriginal).slice(0, TOTAL);
  ranking       = new Array(TOTAL).fill(null);
  current       = 0;
  forcedCount   = 0;
  selectedStars = 0;
  liked         = false;
  alreadySaved  = false;

  showScreen('gameScreen');
  updateCounter();
  showMovie();
  drawRanking();
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
  selectedStars = 0;
  liked = false;
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) likeBtn.classList.remove('liked');
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('savedMsg').classList.remove('show');
  alreadySaved = false;
  setupStars();
  highlightStars(0);
}

/* ── STARS ── */
function setupStars() {
  const wrap = document.getElementById('starsWrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    const c = document.createElement('span');
    c.className = 'starContainer';
    c.dataset.i = i;

    // Base star (gray background)
    const base = document.createElement('span');
    base.className = 'starBase';
    base.textContent = '★';

    // Colored fill (clipped to show partial)
    const fill = document.createElement('span');
    fill.className = 'starFill';
    fill.textContent = '★';

    // Left half hitzone (i - 0.5)
    const left = document.createElement('span');
    left.className = 'starLeft';
    left.dataset.val = i - 0.5;

    // Right half hitzone (i)
    const right = document.createElement('span');
    right.className = 'starRight';
    right.dataset.val = i;

    c.appendChild(base);
    c.appendChild(fill);
    c.appendChild(left);
    c.appendChild(right);
    wrap.appendChild(c);

    // Events on hitzones
    [left, right].forEach(zone => {
      zone.onmouseenter = () => highlightStars(+zone.dataset.val);
      zone.onmouseleave = () => highlightStars(selectedStars);
      zone.onclick = () => {
        selectedStars = +zone.dataset.val;
        highlightStars(selectedStars);
      };
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
    setTimeout(() => { if(wrap) wrap.style.outline = ''; }, 2000);
    return;
  }
  const entry = {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    stars: selectedStars,
    liked: liked,
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
    content.innerHTML = `<div class="historyEmpty">Todavía no guardaste ningún ranking.<br><br>Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.</div>`;
  } else {
    let html = '<div class="historyGrid">';
    history.forEach((entry, idx) => {
      const starsHtml = `<span style="color:var(--star)">${'★'.repeat(entry.stars)}</span><span style="opacity:.2">${'★'.repeat(5-entry.stars)}</span>`;
      const postersHtml = entry.movies.map((m,i) => `
        <div class="cardPosterNum">
          <span class="cardPosterNumLabel">${i+1}</span>
          <img src="${m.imagen}" alt="${m.titulo}" style="width:100%;max-width:48px;height:64px;object-fit:cover;border-radius:5px;">
        </div>`).join('');
      const listHtml = entry.movies.map((m,i) => `
        <div class="cardMovieItem"><span class="mn">${i+1}</span><span>${m.titulo}</span></div>`).join('');
      const heartHtml = entry.liked ? '<span class="cardLike">♥</span>' : '';
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

/* ── INIT ── */
setupStars();
setLang(currentLang);
showHome();

/* ── SHARE ── */
async function shareRanking() {
  // Build share card content
  const starsEl = document.getElementById('shareCardStars');
  const moviesEl = document.getElementById('shareCardMovies');

  // Stars
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(selectedStars)) {
      starsHtml += '<span style="color:#00c030;font-size:18px;">★</span>';
    } else if (i === Math.ceil(selectedStars) && selectedStars % 1 !== 0) {
      starsHtml += '<span style="color:#00c030;font-size:18px;">½</span>';
    } else {
      starsHtml += '<span style="color:#2c3440;font-size:18px;">★</span>';
    }
  }
  if (liked) starsHtml += '<span style="color:#f78f1e;font-size:16px;margin-left:6px;">♥</span>';
  starsEl.innerHTML = starsHtml;

  // Movies
  let moviesHtml = '';
  for (let i = 0; i < ranking.length; i++) {
    const m = ranking[i];
    moviesHtml += `
      <div class="shareMovieRow">
        <span class="shareMovieNum">${i + 1}</span>
        <img src="${m.imagen}" class="shareMovieImg" crossorigin="anonymous">
        <span class="shareMovieTitle">${m.titulo}</span>
      </div>`;
  }
  moviesEl.innerHTML = moviesHtml;

  // Wait for images to load
  const imgs = document.querySelectorAll('#shareCard img');
  await Promise.all([...imgs].map(img => new Promise(resolve => {
    if (img.complete) resolve();
    else { img.onload = resolve; img.onerror = resolve; }
  })));

  // Capture
  const card = document.getElementById('shareCard');
  card.style.left = '-9999px';

  try {
    const canvas = await html2canvas(card.querySelector('.shareCardInner'), {
      backgroundColor: '#14181c',
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = 'rankboxd.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    alert('Error al generar la imagen. Intentá de nuevo.');
  }
}
