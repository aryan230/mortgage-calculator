/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#d7da2f",
        error: "#d73328",
        slate: {
          100: "#F2F7FC",
          300: "#D5E4F2",
          500: "#7A93AA",
          700: "#4D6B88",
          900: "#193549",
        },
      },
    },
  },
  plugins: [],
};
