//components/Header.tsx
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4 px-6 shadow-md mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/">
                    <span className="text-xl font-bold tracking-wide">🎬 MovieDB</span>
                </Link>
                <nav className="space-x-4">
                    {/*<Link href="/" className="hover:underline">Domov</Link>*/}
                    {/*<Link href="/results?query=Inception" className="hover:underline">Výsledky</Link>*/}
                </nav>
            </div>
        </header>
    );
}