/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // specifies the file types that we want to apply tailwind styles to
  theme: {
    extend: {},
    container: {
      padding: '10rem', // this is an example of overriding the default container padding (styles in TW)
    }
  },
  plugins: [],
}

