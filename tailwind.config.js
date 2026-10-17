/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Stratigrafia" — e nxjerrë nga ngjyra e markës #256D7B
        bedrock: { DEFAULT: '#0E2A30', 2: '#143840', 3: '#1C4750' },
        brand: { DEFAULT: '#256D7B', dark: '#1A4F5A', light: '#3C8796' },
        glacier: '#7FC8D9',
        stone: { DEFAULT: '#F3F5F4', 2: '#E7ECEB', line: '#D3DCDB' },
        slate: { ink: '#3F5559', mute: '#6B7F82' },
        signal: { DEFAULT: '#F2B705', dark: '#D9A300' },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '84rem',
      },
      keyframes: {
        'gauge-pulse': { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        'gauge-pulse': 'gauge-pulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
