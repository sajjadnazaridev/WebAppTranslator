/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,css,js}"],
  theme: {
    extend: {
      colors: {
        colorDarkBackground: '#040711',
        colorDarkPrimary: '#394150',
        colorDarkSecondary: '#4D5562',
        colorLightSecondary: '#CDD5E0',
        colorLightBackground: '#F9FAFB',
        colorPrimaryAccent: '#3662E3',
        colorSecondaryAccent: '#7CA9F3',
        colorDarkOverlay: '#212936cc',
        colorLightOverlay: '#121826cc',

      },
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "1280px",
    },
  },
  plugins: [],
}
