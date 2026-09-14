/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },

    extend: {
      colors: {
        lotus: {
          midnight: "#0B1F3A",
          blue: "#2457A6",
          indigo: "#5B4B8A",
          champagne: "#D6B773",
          ivory: "#FAF7F0",
          mist: "#E8EFF6",
          blush: "#D9A6AE",
          sage: "#8FA695",
        },
      },

      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        telugu: ["var(--font-telugu)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },

      maxWidth: {
        "8xl": "1440px",
      },

      letterSpacing: {
        editorial: "0.01em",
        wide: "0.08em",
      },

      borderRadius: {
        lotus: "2px",
      },

      boxShadow: {
        soft: "0 12px 40px rgba(11, 31, 58, 0.08)",
        card: "0 8px 30px rgba(11, 31, 58, 0.06)",
      },

      transitionTimingFunction: {
        "lotus-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },

  plugins: [],
};