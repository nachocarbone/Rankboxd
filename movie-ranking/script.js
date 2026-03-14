const TOTAL = 5;
const STORAGE_KEY = 'rankboxdHistory_v1';
// Star values: 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5

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
    document.getElementById('loadingText').textContent = `${titles.length} películas encontradas. Buscando pósteres...`;
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
        document.getElementById('homeError').textContent = `Solo se encontraron ${data.movies.length} películas con póster. Se necesitan al menos ${TOTAL}.`;
        return;
      }

      document.getElementById('loadingBar').style.width = '100%';
      document.getElementById('loadingText').textContent = `${data.movies.length} películas listas. ¡A jugar!`;

      peliculasOriginal = data.movies;
      setTimeout(() => startGame(), 600);

    } catch (e) {
      showScreen('homeScreen');
      document.getElementById('homeError').textContent = 'Error de conexión. Intentá de nuevo.';
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
const STAR_STEPS = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];

function setupStars() {
  const wrap = document.getElementById('starsWrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  // Build 5 star containers, each split into left half (x.5) and right half (x)
  for (let i = 1; i <= 5; i++) {
    const container = document.createElement('span');
    container.className = 'starContainer';
    container.dataset.full = i;

    // left half = i - 0.5
    const left = document.createElement('span');
    left.className = 'starHalf starLeft';
    left.dataset.val = i - 0.5;
    left.innerHTML = '★';

    // right half = i
    const right = document.createElement('span');
    right.className = 'starHalf starRight';
    right.dataset.val = i;
    right.innerHTML = '★';

    container.appendChild(left);
    container.appendChild(right);
    wrap.appendChild(container);
  }

  // Events
  wrap.querySelectorAll('.starHalf').forEach(half => {
    half.onmouseenter = () => highlightStars(+half.dataset.val);
    half.onmouseleave = () => highlightStars(selectedStars);
    half.onclick = () => {
      selectedStars = +half.dataset.val;
      highlightStars(selectedStars);
    };
  });
}

function highlightStars(val) {
  const wrap = document.getElementById('starsWrap');
  if (!wrap) return;
  wrap.querySelectorAll('.starHalf').forEach(half => {
    const hv = +half.dataset.val;
    if (val === 0) {
      half.classList.remove('active', 'activeHalf');
    } else if (hv <= val) {
      half.classList.add('active');
      half.classList.remove('activeHalf');
    } else if (hv === val + 0.5 && half.classList.contains('starLeft')) {
      half.classList.add('activeHalf');
      half.classList.remove('active');
    } else {
      half.classList.remove('active', 'activeHalf');
    }
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
  if (!confirm('¿Borrar todo el historial? No se puede deshacer.')) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  showHistory();
}

function goBack() {
  if (prevScreen === 'end') showScreen('endScreen');
  else showHome();
}

/* ── INIT ── */
setupStars();
showHome();
