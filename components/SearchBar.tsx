// components/SearchBar.tsx

import { useRouter } from "next/router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {searchMedia} from "../lib/tmdb";

interface SearchBarProps {
    inputRef?: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ inputRef }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [type, setType] = useState<"all" | "movie" | "tv">("all");
    const router = useRouter();
    // const [results, setResults] = useState<any[]>([]);
    // const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/results?query=${encodeURIComponent(query)}&type=${type}`);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!query.trim()) return;
    //
    //     // setLoading(true);
    //     try {
    //         const res = await searchMedia(query, type);
    //         router.push(`/results?query=${encodeURIComponent(query)}&type=${type}`);
    //         // setResults(res.results || []);
    //     } catch (err) {
    //         console.error("Search failed:", err);
    //     } //finally {
    //         // setLoading(false);
    //     // }
    // };

    return (
        <form onSubmit={handleSubmit} className="flex w-full shadow-lg rounded-xl overflow-hidden">
            {/* Dropdown */}
            <div className="relative">
                <select
                    className="h-full bg-gray-800 text-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={type}
                    onChange={(e) => setType(e.target.value as "movie" | "tv")}
                >
                    <option value="movie">Filmy</option>
                    <option value="tv">Seriály</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none w-4 h-4" />
            </div>

            {/* Search input */}
            <input
                ref={inputRef}
                type="text"
                className="flex-grow bg-gray-900 text-white px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zadaj názov..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* Submit button */}
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-semibold transition-colors"
            >
                Hľadať
            </button>
        </form>
    );
}
