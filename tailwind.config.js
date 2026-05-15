/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0221",
        "card-bg": "#1a0b3b",
        "sidebar-bg": "#0a0118",
        cyan: "#00f5d4",
        magenta: "#fb5607",
        yellow: "#ffbe0b",
        purple: {
          light: "#9d4edd",
          deep: "#240046",
          dark: "#0d0221"
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 10s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
