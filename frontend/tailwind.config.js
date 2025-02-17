/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // specifies the file types that we want to apply tailwind styles to
  theme: {
    extend: {
      colors: {
        light: '',
        dark: '',
      }
    },
    container: {
      padding: {
      md: '10rem',
      } // this is an example of overriding the default container 
    }
  },
  plugins: [],
}

