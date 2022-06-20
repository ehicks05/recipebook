module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // todo: this was affecting the supabase auth widget:
    // require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
