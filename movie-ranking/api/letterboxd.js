export default async function handler(req, res) {
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
    const titles = await scrapeLetterboxd(username.toLowerCase().trim());

    if (!titles.length) {
      return res.status(404).json({ 
        error: 'No se encontraron películas. Verificá que el usuario exista y su perfil sea público.' 
      });
    }

    const movies = await fetchPosters(titles.slice(0, 200), TMDB_KEY);

    return res.status(200).json({ movies, total: titles.length });

  } catch (e) {
    console.error('Error:', e.message);
    return res.status(500).json({ error: `Error: ${e.message}` });
  }
}

async function scrapeLetterboxd(username) {
  const titles = [];
  let page = 1;
  const maxPages = 10;

  while (page <= maxPages) {
    const url = `https://letterboxd.com/${username}/films/page/${page}/`;
    
    let response;
    try {
      response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0',
        }
      });
    } catch(e) {
      console.error(`Fetch error page ${page}:`, e.message);
      break;
    }

    if (response.status === 404) {
      // User doesn't exist
      break;
    }

    if (!response.ok) {
      console.error(`Bad response page ${page}: ${response.status}`);
      break;
    }

    const html = await response.text();

    // Try multiple regex patterns to extract film names
    const patterns = [
      /data-film-slug="[^"]*"[^>]*>\s*<img[^>]+alt="([^"]+)"/g,
      /<img[^>]+class="[^"]*image[^"]*"[^>]+alt="([^"]+)"/g,
      /alt="([^"]+)" class="image"/g,
    ];

    let found = 0;
    for (const pattern of patterns) {
      const matches = [...html.matchAll(pattern)];
      for (const match of matches) {
        const name = match[1].trim();
        if (name && name !== 'Film poster' && !titles.includes(name)) {
          titles.push(name);
          found++;
        }
      }
      if (found > 0) break;
    }

    if (found === 0) break;

    // Check if there's a next page
    if (!html.includes('class="next"') && !html.includes('rel="next"')) break;
    page++;

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 300));
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
      // skip this movie
    }
  }

  return movies;
}
