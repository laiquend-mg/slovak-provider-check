//lib/tmdb.ts
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function searchMedia(query: string, type: "all" | "movie" | "tv" = "all") {
    const headers = { Authorization: `Bearer ${process.env.TMDB_API_KEY}` };

    if (type === "all") {
        const [resMovie, resTV] = await Promise.all([
            fetch(`${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=sk-SK`, { headers }),
            fetch(`${TMDB_BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=sk-SK`, { headers }),
        ]);

        const [movieResults, tvResults] = await Promise.all([resMovie.json(), resTV.json()]);

        return {
            results: [...movieResults.results, ...tvResults.results], // prípadne zoradiť podľa popularity/dátumu
        };
    } else {
        const res = await fetch(`${TMDB_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}&language=sk-SK`, {
            headers,
        });
        return res.json();
    }
}

export async function getMediaDetails(id: number, type: "all" | "movie" | "tv" = "all") {
    let res;

    if (type === "all") {
        const [resMov, resTv] = await Promise.all([
            fetch(`${TMDB_BASE_URL}/movie/${id}?language=sk-SK&append_to_response=credits`, {
                headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
            }),
            fetch(`${TMDB_BASE_URL}/tv/${id}?language=sk-SK&append_to_response=credits`, {
                headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
            }),
        ]);

        const [movieJson, tvJson] = await Promise.all([resMov.json(), resTv.json()]);

        // Spojíme výsledky (tv prepíše konfliktné kľúče z movie)
        res = {
            ...movieJson,
            ...tvJson,
        };
    } else {
        const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}?language=sk-SK&append_to_response=credits`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        });

        res = await response.json();
    }

    return res;
}

export async function getWatchProviders(id: number, type: "movie" | "tv" = "movie") {
    const res = await fetch(`${TMDB_BASE_URL}/${type}/${id}/watch/providers`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
    });
    return res.json();
}

export async function getTrendingList(type: "movie" | "tv" = "movie") {
    try {
        const res = await fetch(`${TMDB_BASE_URL}/trending/${type}/week?language=sk-SK`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        });

        if (!res.ok) {
            console.error("TMDb trending fetch error:", res.status, res.statusText);
            return [];
        }

        const data = await res.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error("Trending fetch failed:", err);
        return [];
    }
}
