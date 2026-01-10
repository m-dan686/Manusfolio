/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                orange: 'var(--orange)',
                green: 'var(--green)',
                dark: 'var(--bg-dark)',
                light: 'var(--bg-light)',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
