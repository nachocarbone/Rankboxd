export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const TMDB_KEY = process.env.TMDB_KEY;
  if (!TMDB_KEY) return res.status(500).json({ error: 'TMDB_KEY no configurada' });

  // Popular movies endpoint
  if (req.method === 'GET' && req.query.popular) {
    try {
      const pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
      const results = await Promise.all(pages.map(p =>
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=${p}`)
          .then(r => r.json())
      ));
      const movies = results.flatMap(d => d.results || [])
        .filter(m => m.poster_path && m.vote_count > 1000)
        .map(m => ({
          titulo: m.title,
          imagen: `/api/letterboxd?img=${encodeURIComponent(m.poster_path)}`,
          tmdbId: m.id,
          rating: m.vote_average ? Math.round((m.vote_average / 2) * 10) / 10 : null,
        }));
      return res.status(200).json({ movies });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Image proxy endpoint
  if (req.method === 'GET' && req.query.img) {
    try {
      const imgRes = await fetch(`https://image.tmdb.org/t/p/w500${req.query.img}`);
      if (!imgRes.ok) return res.status(404).end();
      const buffer = await imgRes.arrayBuffer();
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.status(200).send(Buffer.from(buffer));
    } catch(e) {
      return res.status(500).end();
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { titles } = req.body;
  if (!titles || !Array.isArray(titles) || titles.length === 0)
    return res.status(400).json({ error: 'No se recibieron títulos' });

  try {
    const movies = await fetchPostersParallel(titles.slice(0, 500), TMDB_KEY, 10);
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function fetchPostersParallel(titles, tmdbKey, concurrency) {
  const movies = [];
  const queue = [...titles];

  async function worker() {
    while (queue.length > 0) {
      const { titulo, year } = queue.shift();
      try {
        const query = encodeURIComponent(titulo);
        let result = null;

        // Strategy 1: search with year — most precise
        if (year) {
          const urlWithYear = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}&year=${year}&language=en-US`;
          const resWithYear = await fetch(urlWithYear);
          const dataWithYear = await resWithYear.json();
          if (dataWithYear.results && dataWithYear.results.length > 0) {
            // Pick best match: prefer poster + year match
            const withPoster = dataWithYear.results.filter(m => m.poster_path);
            if (withPoster.length > 0) result = withPoster[0];
          }
        }

        // Strategy 2: search without year, then pick best year match
        if (!result) {
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}&language=en-US`;
          const r = await fetch(url);
          const data = await r.json();
          if (data.results && data.results.length > 0) {
            const withPoster = data.results.filter(m => m.poster_path);
            if (withPoster.length > 0) {
              if (year) {
                // Try to find year match within results
                const yearMatch = withPoster.find(m =>
                  m.release_date && m.release_date.startsWith(year)
                );
                result = yearMatch || withPoster[0];
              } else {
                result = withPoster[0];
              }
            }
          }
        }

        if (result) {
          movies.push({
            titulo,
            imagen: `/api/letterboxd?img=${encodeURIComponent(result.poster_path)}`,
            tmdbId: result.id,
            rating: result.vote_average ? Math.round((result.vote_average / 2) * 10) / 10 : null,
          });
        }
      } catch (e) { /* skip */ }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return movies;
}
