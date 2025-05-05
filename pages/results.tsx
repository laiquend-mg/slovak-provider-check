//pages/results.tsx
import { useRouter } from "next/router";
import useSWR from "swr";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getWatchProviders } from "../lib/tmdb";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Results() {
    const router = useRouter();
    const { query, type = "movie" } = router.query;
    const q = query as string;
    const t = type as "movie" | "tv";

    const { data } = useSWR(() => q ? `/api/search?query=${q}&type=${t}` : null, fetcher);
    const [providersMap, setProvidersMap] = useState<Record<number, any[]>>({});

    useEffect(() => {
        if (!data?.results) return;
        const fetchProviders = async () => {
            const promises = data.results.map((item: any) => getWatchProviders(item.id, t));
            const results = await Promise.all(promises);
            const map: Record<number, any[]> = {};
            data.results.forEach((item: any, i: number) => {
                const sk = results[i].results?.SK;
                if (sk?.flatrate) map[item.id] = sk.flatrate;
            });
            setProvidersMap(map);
        };
        fetchProviders();
    }, [data]);

    return (
        <div className="p-6">
            <div className="max-w-xl mx-auto mb-8">
                <SearchBar />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Výsledky: {q}</h1>
            <div className="px-[50px]">
                <div className="grid gap-6 justify-items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                    {data?.results?.map((item: any) => (
                        <MediaCard key={item.id} item={item} type={t} providers={providersMap[item.id]} />
                    ))}
                </div>
            </div>
        </div>
    );
}