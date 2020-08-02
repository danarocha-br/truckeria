module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('tailwindcss')('./src/tailwind.js'),
    require('autoprefixer'),
  ],
};
