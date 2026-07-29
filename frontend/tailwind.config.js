/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "#F6F6F2",
        ink: "#15161A",
        "ink-soft": "#4B4D57",
        line: "#DCDCD6",
        cobalt: "#2F5FFF",
        "cobalt-dark": "#1E3FCB",
        signal: "#B4FF39",
        surface: "#FFFFFF",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(21,22,26,0.06), 0 8px 24px -12px rgba(21,22,26,0.18)",
        "card-hover": "0 1px 0 rgba(21,22,26,0.06), 0 16px 32px -12px rgba(47,95,255,0.25)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
