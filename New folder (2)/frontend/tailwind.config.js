/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-bg-page': '#F2F2F2', // Hintergrund der Seite
        'custom-bg-footer': '#F0EAE6',
        'custom-text-green': '#495A45', // Dunkelgrün für Texte
        'custom-text-lightgreen': '#B5CBA3', // Hellgrün für Akzente
        'custom-text-brown': '#333333', // Dunkelbraun für Überschriften
        'custom-text-grey': '#777777', // Grau für sekundären Text
        'custom-highlight-orange': '#E8B24E', // Orange für Highlights
        'custom-highlight-cherryred': '#B52E51' // Kirschrot für Warnungen
      },
      fontFamily: {
        custom: ['Open Sans', 'serif']
      },
      keyframes: {
        flyIn: {
          '0%': { opacity: '0', transform: 'translateX(250px)',  },
          '100%': { opacity: '0.9', transform: 'translateX(0)' },
        },
      },
      animation: {
        flyIn: 'flyIn 1500ms ease-out forwards',
      },
    }
  },
  plugins: []
};
