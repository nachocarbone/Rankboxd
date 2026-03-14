export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const TMDB_KEY = process.env.TMDB_KEY;
  if (!TMDB_KEY) return res.status(500).json({ error: 'TMDB_KEY no configurada' });

  const { titles } = req.body;
  if (!titles || !Array.isArray(titles) || titles.length === 0)
    return res.status(400).json({ error: 'No se recibieron títulos' });

  try {
    // Fetch all posters in parallel with concurrency limit of 10
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
        const yearParam = year ? `&year=${year}` : '';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}${yearParam}&language=en-US`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0 && data.results[0].poster_path) {
          movies.push({
            titulo,
            imagen: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
          });
        }
      } catch (e) { /* skip */ }
    }
  }

  // Run N workers in parallel
  await Promise.all(Array.from({ length: concurrency }, worker));
  return movies;
}
