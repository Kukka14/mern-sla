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
        'sideNavBackground': '#ECFFEB',
        'sideNavButton': '#2A491D',
        'sideNavText': '#485A41',
        'searchBarBackground': '#D9D9D9',
        'sectionBackground': '#D3FFC1',
        'sectionhr': '#7C9074',
        'sectiontext': '#4C6653',
        'buttonbackground': '#50A72C',
    
      },
    },
  },
  plugins: [],
}