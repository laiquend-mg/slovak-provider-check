// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-screen bg-brand text-white bg-gradient-to-tr from-zinc-900 via-black to-gray-900">
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <footer className="bg-brand-dark text-sm text-center text-white py-4">
                <Footer />
            </footer>
        </div>
    );
}

export default MyApp;
