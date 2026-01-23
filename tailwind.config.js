/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                zekton: ['Zekton', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                background: {
                    deep: '#020617',
                    slate: '#0f172a',
                    card: 'rgba(30, 41, 59, 0.7)',
                },
                primary: {
                    DEFAULT: '#06b6d4',
                    glow: 'rgba(6, 182, 212, 0.4)',
                }
            }
        },
    },
    plugins: [],
}
