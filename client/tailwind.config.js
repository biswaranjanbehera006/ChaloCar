/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  theme: {
  extend: {
    animation: {
      bounceSide: 'bounceSide 1.5s ease-in-out infinite',
      tireSpin: 'tireSpin 1s linear infinite',
      pulseTrail: 'pulseTrail 1.2s ease-in-out infinite',
    },
    keyframes: {
      bounceSide: {
        '0%, 100%': { transform: 'translateY(0) translateX(0)' },
        '50%': { transform: 'translateY(-8px) translateX(-4px)' },
      },
      tireSpin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      pulseTrail: {
        '0%, 100%': { opacity: 0.2, transform: 'scale(0.95)' },
        '50%': { opacity: 0.6, transform: 'scale(1.05)' },
      },
    },
  },
}
  },
  plugins: [],
};
