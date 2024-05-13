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
        backgreen3: '#E5AA27',
        backgreen3hover: '#CC9723',
        backgreen4: '#50A72C',
        backgreen4hover: '#489627',
        cartbackground: '#f5f5f5',
        carttableheader: '#316C42',
        herobelow: '#EDFFEB',
        carttablerow: '#CDCDCD',
        form: 'DCEADC',
        login: '#ACC1AC',
        profile : '#B0B1B9',

        
        'sideNavBackground': '#ECFFEB',
        'productAdminSideNavBar': '#ECFFEB',
        'sideNavBackgroundhover': '#afbeae',
        'mainAdminBackground': '#f9f6ee',        
        'sideNavButton': '#2A491D',
        'sideNavButtonhover': '#233e18',
        'sideNavText': '#485A41',
        'searchBarBackground': '#D9D9D9',
        'sectionBackground': '#D3FFC1',
        'sectionBackgroundHover': '#bde5ad',
        'sectionhr': '#7C9074',
        'sectiontext': '#4C6653',
        'buttonbackground': '#50A72C',
        'section1': '#bee6ae',
        'section2': '#d7ffc7',
        'tableHead': '#94b387'
        
      },
    },
  },
  plugins: [],
}