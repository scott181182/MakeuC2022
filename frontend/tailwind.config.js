const colors = {
    "primary": "#7cad3e",
    "secondary": "#d3d6cd",
    "accent": "#199EF3",
    "neutral": "#173042",
    "base-100": "#fefeff",
    "info": "#3abff8",
    "success": "#36d399",
    "warning": "#fbbd23",
    "error": "#f87272"
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.tsx",
        "./components/**/*.tsx"
    ],
    theme: {
        container: {
            center: true
        },
        extend: {
            colors,
        },
    },
    plugins: [
        require("daisyui")
    ],
    daisyui: {
        themes: [
            {
                blueskies: colors
            }
        ]
    }
};
