const colors = {
    "primary": "#0082f0",
    "secondary": "#b9defe",
    "accent": "#d1436d",
    "neutral": "#3D4451",
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
