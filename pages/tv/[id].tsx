//pages/tv/[id].tsx
import { getMediaDetails, getWatchProviders } from "../../lib/tmdb";
import ProviderList from "../../components/ProviderList";

export async function getServerSideProps({ params }: any) {
    const [details, providers] = await Promise.all([
        getMediaDetails(params.id, "tv"),
        getWatchProviders(params.id, "tv"),
    ]);

    return { props: { details, providers } };
}

export default function TVDetail({ details, providers }: any) {
    const sk = providers.results?.SK;

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-left">{details.title}</h1>

            {/* Content: Image + Text */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <img
                    src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                    alt={details.title || details.name}
                    className="w-full max-w-xs mx-auto md:mx-0 rounded-xl shadow-lg"
                />

                <p className="text-gray-200 text-lg">{details.overview}</p>
            </div>

            {/* Availability section */}
            <div className="mt-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Dostupnosť na Slovensku</h2>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Streamovacie služby na Slovensku</h3>
                    <h3 className="text-lg font-semibold text-right">Možnosť zakúpenia</h3>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    {sk?.flatrate ? (
                        <ProviderList providers={sk.flatrate} />
                    ) : (
                        <p className="text-gray-400">Nie je dostupné cez predplatné.</p>
                    )}
                    {sk?.buy ? (
                        <ProviderList providers={sk.buy} />
                    ) : (
                        <p className="text-gray-400">Nie je dostupné zakúpenie.</p>
                    )}
                </div>
            </div>
        </main>
    );
}