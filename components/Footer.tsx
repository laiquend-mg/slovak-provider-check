//components/Footer.tsx
export default function Footer() {
    return (
        <footer className="text-center text-sm text-gray-400 mt-10 mb-4 px-4">
            <p className="mb-2">
                Tento projekt využíva údaje z&nbsp;
                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                >
                    TMDB
                </a>{" "}
                a&nbsp;
                <a
                    href="https://www.justwatch.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                >
                    JustWatch
                </a>.
            </p>

            <div className="flex justify-center items-center gap-4 mt-3">
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="TMDB Logo"
                    className="h-6"
                />
                <img
                    src="https://www.justwatch.com/appassets/img/logo/JustWatch-logo-large.webp"
                    alt="JustWatch Logo"
                    className="h-6"
                />
            </div>
        </footer>
    );
}
