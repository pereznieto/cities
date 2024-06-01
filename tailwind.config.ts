import type { Config } from "tailwindcss"
import { DefaultColors } from "tailwindcss/types/generated/colors";
import colors from 'tailwindcss/colors'

const pulseColors: readonly (keyof DefaultColors)[] = ['orange', 'red', 'green']

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        redden: 'redden 5s ease-in-out',
        ...(pulseColors.reduce((animations, color) => ({ ...animations, [`pulse-${color}`]: `pulse-${color} 2s infinite` }), {})),
      },
      keyframes: {
        redden: {
          '0%, 50%': { backgroundColor: colors.orange[500] },
          '100%': { backgroundColor: colors.red[600] },
        },
        ...(pulseColors.reduce((keyframes, color) => ({ ...keyframes, [`pulse-${color}`]: {
          '0%': { boxShadow: `0 0 0 0 ${colors[color][500]}50` },
          '70%': { boxShadow: `0 0 0 20px ${colors[color][500]}00` },
          '100%': { boxShadow: `0 0 0 0 ${colors[color][500]}00` },
        } }), {})),
      },
    },
  },
  plugins: [],
};
export default config;
