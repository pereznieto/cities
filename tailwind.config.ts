import type { Config } from 'tailwindcss'
import { DefaultColors } from 'tailwindcss/types/generated/colors'
import colors from 'tailwindcss/colors'

const pulseColors: readonly (keyof DefaultColors)[] = ['orange', 'red', 'green']

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements/js/**/*.js',
  ],
  theme: {
    extend: {
      animation: {
        redden: 'redden 5s ease-in-out',
        ...pulseColors.reduce(
          (animations, color) => ({ ...animations, [`pulse-${color}`]: `pulse-${color} 2s infinite` }),
          {},
        ),
      },
      keyframes: {
        redden: {
          '0%, 50%': { backgroundColor: colors.orange[500] },
          '100%': { backgroundColor: colors.red[600] },
        },
        ...pulseColors.reduce(
          (keyframes, color) => ({
            ...keyframes,
            [`pulse-${color}`]: {
              '0%': { boxShadow: `0 0 0 0 ${colors[color][500]}50` },
              '70%': { boxShadow: `0 0 0 ${color === 'orange' ? '20' : '10'}px ${colors[color][500]}00` },
              '100%': { boxShadow: `0 0 0 0 ${colors[color][500]}00` },
            },
          }),
          {},
        ),
      },
    },
  },
  safelist: [
    {
      // Should match app/components/Button.tsx > Props['color']
      pattern: /bg-(green|sky)-(400|500|600|700)/,
    },
  ],
  plugins: [require('tw-elements/plugin.cjs')],
}
export default config
