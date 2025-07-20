/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        blackHoleSpin: 'blackHoleSpin 2s linear infinite',
      },
      keyframes: {
        blackHoleSpin: {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
