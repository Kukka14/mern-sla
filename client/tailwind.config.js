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

        
        'sideNavBackground': '#ECFFEB',
        'productAdminSideNavBar': '#ECFFEB',
        'sideNavBackgroundhover': '#afbeae',
        'mainAdminBackground': '#f9f6ee',        
        'sideNavButton': '#2A491D',
        'sideNavButtonhover': '#233e18',
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