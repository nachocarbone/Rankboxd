export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const TMDB_KEY = process.env.TMDB_KEY;
  if (!TMDB_KEY) return res.status(500).json({ error: 'TMDB_KEY no configurada' });

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
        // Search with year first for precision, fallback without year
        let result = null;

        if (year) {
          const urlWithYear = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}&year=${year}&language=en-US`;
          const resWithYear = await fetch(urlWithYear);
          const dataWithYear = await resWithYear.json();
          if (dataWithYear.results && dataWithYear.results.length > 0 && dataWithYear.results[0].poster_path) {
            result = dataWithYear.results[0];
          }
        }

        // Fallback: search without year
        if (!result) {
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}&language=en-US`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.results && data.results.length > 0 && data.results[0].poster_path) {
            result = data.results[0];
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
