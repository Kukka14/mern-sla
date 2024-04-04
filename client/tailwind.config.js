/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        white: '#FFFFFF',
        black: '#000000',
        backgreen1: '#15270E',
        backgreen2: '#1A3111',
        textcolor1: '#8D9888',
        textcolor2: '#1A3111',
        backgreen3: '#FFBD3C',
        backgreen4: '#50A72C',
    
      },
    },
  },
  plugins: [],
}