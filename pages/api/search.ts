//pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, type = "movie" } = req.query;

    const tmdbRes = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query as string)}&language=sk-SK`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
    });

    const data = await tmdbRes.json();
    res.status(200).json(data);
}