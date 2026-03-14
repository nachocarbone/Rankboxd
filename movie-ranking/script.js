const TOTAL = 5;
const STORAGE_KEY = 'rankboxdHistory_v1';
const STAR_LABELS = ['', '😬 Muy malo', '😐 Regular', '🙂 Bueno', '😄 Muy bueno', '🤩 ¡Perfecto!'];

/* ── STATE ── */
let peliculasOriginal = [];
let peliculas, ranking, current, forcedCount, selectedStars, alreadySaved, prevScreen;

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
  document.getElementById('usernameInput').value = '';
}

async function loadLetterboxd() {
  const input = document.getElementById('usernameInput');
  const username = input.value.trim().toLowerCase();
  const errorEl = document.getElementById('homeError');

  if (!username) {
    errorEl.textContent = 'Escribí tu usuario de Letterboxd.';
    return;
  }

  errorEl.textContent = '';
  showScreen('loadingScreen');
  document.getElementById('loadingText').textContent = 'Conectando con Letterboxd...';
  document.getElementById('loadingBar').style.width = '10%';

  try {
    const res = await fetch(`/api/letterboxd?username=${encodeURIComponent(username)}`);
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
    document.getElementById('loadingText').textContent = `${data.movies.length} películas cargadas. ¡A jugar!`;

    peliculasOriginal = data.movies;

    setTimeout(() => startGame(), 600);

  } catch (e) {
    showScreen('homeScreen');
    document.getElementById('homeError').textContent = 'Error de conexión. Intentá de nuevo.';
  }
}

// Allow pressing Enter on the input
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('usernameInput');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') loadLetterboxd();
    });
  }
});

/* ── GAME ── */
function startGame() {
  peliculas     = shuffle(peliculasOriginal).slice(0, TOTAL);
  ranking       = new Array(TOTAL).fill(null);
  current       = 0;
  forcedCount   = 0;
  selectedStars = 0;
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
  poster.classList.remove('fadeIn');
  void poster.offsetWidth;
  poster.src = movie.imagen;
  poster.classList.add('fadeIn');

  const titleEl = document.getElementById('title');
  titleEl.classList.remove('fadeIn');
  void titleEl.offsetWidth;
  titleEl.textContent = movie.titulo;
  titleEl.classList.add('fadeIn');

  updateCounter();
  drawButtons();
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
      html += `<div class="rankItem">
        <div class="rankNum">${i + 1}</div>
        <div class="emptySlot"></div>
        <span style="color:var(--muted);font-size:12px;">—</span>
      </div>`;
    } else {
      html += `<div class="rankItem filled slideLeft">
        <div class="rankNum">${i + 1}</div>
        <img src="${item.imagen}" alt="${item.titulo}">
        <div class="rankItemTitle">${item.titulo}</div>
      </div>`;
    }
  }
  document.getElementById('ranking').innerHTML = html;
}

function choose(pos) {
  const freeSlots = ranking.filter(r => r === null).length;
  if (freeSlots === 1) forcedCount++;

  ranking[pos - 1] = peliculas[current];
  current++;

  drawRanking();
  drawButtons();
  showMovie();
}

/* ── END SCREEN ── */
function endGame() {
  prevScreen = 'end';
  showScreen('endScreen');

  document.getElementById('resultBadge').style.display = 'none';
  document.getElementById('resultMsg').style.display = 'none';

  let html = '';
  for (let i = 0; i < TOTAL; i++) {
    const item = ranking[i];
    html += `<div class="finalItem fadeIn" style="animation-delay:${i * 0.07}s">
      <div class="finalNum">${i + 1}</div>
      <img src="${item.imagen}" alt="${item.titulo}">
      <div class="finalTitle">${item.titulo}</div>
    </div>`;
  }
  document.getElementById('finalRanking').innerHTML = html;

  selectedStars = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active', 'hov'));
  document.getElementById('ratingValue').textContent = '';
  document.getElementById('ratingValue').style.color = 'var(--star)';
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('savedMsg').classList.remove('show');
  alreadySaved = false;

  setupStars();
}

/* ── STAR RATING ── */
function setupStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.onmouseenter = () => {
      stars.forEach(s => s.classList.toggle('hov', +s.dataset.val <= +star.dataset.val));
    };
    star.onmouseleave = () => {
      stars.forEach(s => s.classList.remove('hov'));
    };
    star.onclick = () => {
      selectedStars = +star.dataset.val;
      stars.forEach(s => {
        s.classList.toggle('active', +s.dataset.val <= selectedStars);
        s.classList.remove('hov');
      });
      const rv = document.getElementById('ratingValue');
      rv.style.color = 'var(--star)';
      rv.textContent = STAR_LABELS[selectedStars];
    };
  });
}

/* ── SAVE TO HISTORY ── */
function saveToHistory() {
  if (alreadySaved) return;

  if (!selectedStars) {
    const rv = document.getElementById('ratingValue');
    rv.textContent = 'Elegí una puntuación primero ↑';
    rv.style.color = 'var(--accent)';
    setTimeout(() => { rv.style.color = 'var(--star)'; rv.textContent = ''; }, 2000);
    return;
  }

  const entry = {
    id:     Date.now(),
    date:   new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    stars:  selectedStars,
    movies: ranking.map(m => ({ titulo: m.titulo, imagen: m.imagen }))
  };

  const history = loadHistory();
  history.push(entry);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch (e) {}

  alreadySaved = true;
  document.getElementById('saveBtn').disabled = true;
  document.getElementById('savedMsg').classList.add('show');
}

/* ── HISTORY ── */
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function showHistory() {
  prevScreen = document.getElementById('endScreen').style.display !== 'none' ? 'end' : 'home';

  const history = loadHistory();
  history.sort((a, b) => b.stars !== a.stars ? b.stars - a.stars : b.id - a.id);

  const content = document.getElementById('historyContent');

  if (!history.length) {
    content.innerHTML = `<div class="historyEmpty">
      Todavía no guardaste ningún ranking.<br><br>
      Jugá una partida, puntuala con estrellas<br>y guardala para que aparezca acá.
    </div>`;
  } else {
    let html = '<div class="historyGrid">';
    history.forEach((entry, idx) => {
      const filled    = '★'.repeat(entry.stars);
      const empty     = '★'.repeat(5 - entry.stars);
      const starsHtml = `<span style="color:var(--star)">${filled}</span><span style="opacity:.2">${empty}</span>`;

      const postersHtml = entry.movies.map((m, i) => `
        <div class="cardPosterNum">
          <span class="cardPosterNumLabel">${i + 1}</span>
          <img src="${m.imagen}" alt="${m.titulo}" style="width:100%;max-width:48px;height:64px;object-fit:cover;border-radius:5px;">
        </div>`).join('');

      const listHtml = entry.movies.map((m, i) => `
        <div class="cardMovieItem">
          <span class="mn">${i + 1}</span>
          <span>${m.titulo}</span>
        </div>`).join('');

      html += `<div class="historyCard fadeIn" style="animation-delay:${idx * 0.05}s">
        <div class="cardTop">
          <div><div class="cardStars">${starsHtml}</div></div>
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
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  showHistory();
}

function goBack() {
  if (prevScreen === 'end') showScreen('endScreen');
  else showHome();
}

/* ── INIT ── */
setupStars();
showHome();
