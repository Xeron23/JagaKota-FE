/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // change this config
    // colors: {
    //   primary: '#1D4ED8',
    //   secondary: '#64748B',
    // },
    // spacing: {
    //   '128': '32rem',
    // },
    // fontFamily: {
    //   sans: ['Inter', 'sans-serif'],
    // },
    extend: {
      animation: {
          'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [],
}

