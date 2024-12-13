/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}","./public/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      'DarkCyanPastel': '#649EB9',
      'LightCyan': '#71B1CE',
      'SuperLightCyan': '#E4E9E8',
      'White': '#ffffff',
      'LightGrey': '#787878',
      'LightGrey002': '#B6B2B2',
      'LightYellow': '#FFEB58',
      'TextGrey': '#857E7E'
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'SoftGradient': 'linear-gradient(162deg, #D4E8F0, #ECF3E2,#F3EBFF)'
      },
      height: {
        '0.125': '0.03125rem',
        '0.25': '0.0625rem',
        '11/12': '91.66667%',
        '23/24': '95.88883%',
        '35/36': '97.22222%'
      },
      width: {
        '23/24': '95.88883%',
        '35/36': '97.22222%'
      },
      boxShadow: {
        '3xl': '0 10px 32.4px -4px rgba(0, 0, 0, 0.5)',
        'popup-non': '0 0 16.9px 0px rgba(0, 0, 0, 0.25)',

      }
    },
  },
  plugins: [],
}

