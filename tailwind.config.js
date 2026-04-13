/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)", 
        ring: "var(--ring)",
        background: "var(--bg)",
        foreground: "var(--text)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--text)",
        },
        secondary: {
          DEFAULT: "var(--code-bg)",
          foreground: "var(--text)",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "var(--code-bg)",
          foreground: "var(--text)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--text)",
        },
      },
      fontFamily: {
        sans: ["var(--sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

