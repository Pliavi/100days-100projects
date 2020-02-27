var tailwindcss = require("tailwindcss");
var autoprefixer = require("autoprefixer");
var purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.pug"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});
var cssnano = require("cssnano")({ preset: "default" });

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
  ]
};
