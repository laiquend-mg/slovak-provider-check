import Link from "next/link";
import ProviderList from "./ProviderList";

export default function MediaCard({ item, type, providers }: { item: any; type: "movie" | "tv"; providers?: any }) {
    const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    return (
        <Link href={`/${type}/${item.id}`}>
            <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-2xl flex flex-col h-[360px]">
                <div className="w-full aspect-[2/3] overflow-hidden bg-gray-700">
                    <img
                        src={posterUrl}
                        alt={item.title || item.name}
                        className="object-cover w-full h-full group-hover:opacity-90 transition duration-300"
                    />
                </div>
                <div className="p-4 flex-grow flex items-end">
                    <div className="min-h-[40px] w-full flex justify-left">
                        {providers?.length ? (
                            <ProviderList providers={providers} small />
                        ) : (
                            <span className="text-sm text-gray-400 text-left">Bez informácií o dostupnosti</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
