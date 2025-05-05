//tailwind.config.js
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#0d253f',
                    light: '#01b4e4',
                    dark: '#032541',
                },
            },
        },
    },
    plugins: [],
};