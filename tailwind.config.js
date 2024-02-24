module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        "4xl": '0px 0px 12px 3px rgba(255,0,0,0.3);',
      },
      fontSize: {
        14: '14px',
      },
      margin:{
        68 :"205px",
      },
      backgroundColor: {
         'main-bg': '#F4F7FE',
         'main-dark-bg': '#0b1437',
        'secondary-dark-bg': '#111c44',
         'card-dark-bg': '#1b254b',
         'card-bg': '#f3f7fe',
        'light-gray': '#F7F7F7',
        'blue-bg' : '#008FFB',
        'brand-bg' : '#422AFB',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        100: '100px',
        130: '130px',
        150: '150px',
        200: '200px',
        270: '250px',
        340: '340px',
        350: '350px',
        400: '400px',
        450: '490px',
        500: '500px',
        670: '670px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      gap:{
      15: '60px'
      },
      height: {
        80: '80px',
        400: '400px',
        500: '500px',
        560: '560px'
      },
      minHeight: {
        590: '590px',
      },
      boxShadow: {
        "3xl": "14px 17px 40px 4px",
        inset: "inset 0px 18px 22px",
        darkinset: "0px 4px 4px inset",
      },
      colors: () => ({
        white: "#ffffff",
        lightPrimary: "#F4F7FE",
        blueSecondary: "#4318FF",
        brandLinear: "#868CFF",
        myblue: '#422AFB',
      }),
      
    },
  },
  
  plugins: [],
};