//components/ProviderList.tsx
export default function ProviderList({ providers, small = false }: { providers: any[]; small?: boolean }) {
    return (
        <div className="flex flex-wrap items-center " style={{ gap: '16px' }}>
            {providers.map((provider) => (
                <div key={provider.provider_id} className="flex flex-warp gap-2">
                    <img
                        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                        alt={provider.provider_name}
                        title={provider.provider_name}
                        className={small ? 'w-6 h-6' : 'w-12 h-12'}
                    />
                    {/*<span className="text-sm">{provider.provider_name}</span>*/}
                </div>
            ))}
        </div>
    );
}
