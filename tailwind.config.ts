import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'grit-black':  '#0D0D0D',
        'grit-orange': '#F5520C',
        'grit-sand':   '#C9A96E',
        'grit-white':  '#F2EDE6',
        'grit-grey':   '#1A1A1A',
        'grit-muted':  '#6B6B6B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
