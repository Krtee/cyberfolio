/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'extra-tight': '0.75',
      }
    },
    colors: {
      'cement': '#B7B7B7',
      
      'black': '#0D0D0D',
      "darkred": "#EB0202",
    }
  },
  plugins: [],
}

