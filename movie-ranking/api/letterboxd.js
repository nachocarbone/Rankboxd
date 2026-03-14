export default async function handler(req, res) {
  // Allow CORS from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Username requerido' });
  }

  const TMDB_KEY = process.env.TMDB_KEY;
  if (!TMDB_KEY) {
    return res.status(500).json({ error: 'TMDB_KEY no configurada' });
  }

  try {
    // Scrape Letterboxd films page by page
    const titles = await scrapeLetterboxd(username);
    if (!titles.length) {
      return res.status(404).json({ error: 'No se encontraron películas. ¿El usuario existe y tiene películas públicas?' });
    }

    // Fetch posters from TMDB (up to 150 movies, then shuffle to pick 5 in frontend)
    const movies = await fetchPosters(titles.slice(0, 150), TMDB_KEY);

    return res.status(200).json({ movies });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Error al obtener datos de Letterboxd.' });
  }
}

async function scrapeLetterboxd(username) {
  const titles = [];
  let page = 1;
  const maxPages = 8; // up to ~800 movies

  while (page <= maxPages) {
    const url = `https://letterboxd.com/${username}/films/page/${page}/`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MovieRankingBot/1.0)' }
    });

    if (!response.ok) break;

    const html = await response.text();

    // Extract film slugs and names from the HTML
    const matches = [...html.matchAll(/data-film-slug="([^"]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"/g)];

    if (!matches.length) break;

    for (const match of matches) {
      const name = match[2].trim();
      if (name && !titles.includes(name)) {
        titles.push(name);
      }
    }

    // Check if there's a next page
    if (!html.includes('class="next"')) break;
    page++;
  }

  return titles;
}

async function fetchPosters(titles, tmdbKey) {
  const movies = [];

  for (const titulo of titles) {
    try {
      const query = encodeURIComponent(titulo);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}&language=en-US`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0 && data.results[0].poster_path) {
        movies.push({
          titulo,
          imagen: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
        });
      }
    } catch (e) {
      // skip
    }
  }

  return movies;
}
