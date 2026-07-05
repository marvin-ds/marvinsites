/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleo:    '#0B1F33',
        confianca:   '#2563EB',
        conversao:   '#FF6B2C',
        resultado:   '#16A34A',
        gelo:        '#F8FAFC',
        nevoa:       '#E5E7EB',
        grafite:     '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
