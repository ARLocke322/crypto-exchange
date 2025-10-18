/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff",
                foreground: "#111827",
                muted: "#f3f4f6",
                "muted-foreground": "#6b7280",
                primary: "#4F46E5",

            },
        },
    },

    plugins: [],
}
