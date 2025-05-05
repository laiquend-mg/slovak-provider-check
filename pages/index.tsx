//pages/index.tsx
import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import MediaCard from "../components/MediaCard";
import { getTrendingList, getWatchProviders } from "../lib/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [trending, setTrending] = useState<any[]>([]);
    const [providersMap, setProvidersMap] = useState<Record<number, any[]>>({});
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();

        getTrendingList().then(async (items) => {
            const providersPromises = items.map((item) =>
                getWatchProviders(item.id, item.title ? "movie" : "tv")
            );

            const providersResults = await Promise.all(providersPromises);

            const map: Record<number, any[]> = {};
            const filteredItems = items.filter((item, i) => {
                const sk = providersResults[i].results?.SK;
                if (sk?.flatrate) {
                    map[item.id] = sk.flatrate;
                    return true;
                }
                return false;
            });

            setTrending(filteredItems);
            setProvidersMap(map);
        });
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return;
        const scrollAmount = 220; // Adjust based on card width + spacing
        sliderRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <main>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Vyhľadaj film alebo seriál</h1>
            <p className="mb-8 text-center text-lg text-gray-300">Zisti, kde ho môžeš sledovať na Slovensku</p>
            <div className="w-full max-w-xl mx-auto mb-10">
                <SearchBar inputRef={inputRef} />
            </div>

            {trending.length > 0 && (
                <section className="w-full max-w-6xl mx-auto relative">
                    <h2 className="text-2xl font-semibold mb-6">🔥 Trendy tento týždeň</h2>

                    {/* Slider container */}
                    <div className="relative">
                        {/* Scrollable row */}
                        <div
                            ref={sliderRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-6 scroll-smooth"
                        >
                            {trending.map((item) => (
                                <div key={item.id} className="flex-shrink-0">
                                    <MediaCard
                                        item={item}
                                        type={item.title ? "movie" : "tv"}
                                        providers={providersMap[item.id]}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Chevron buttons positioned over the slider */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow transition"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow transition"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                </section>




            )}
        </main>
    );
}
