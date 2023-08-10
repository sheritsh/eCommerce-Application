module.exports = {
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  presets: [
    ["@babel/preset-env",
      { "targets": { "node": "current" } }
    ],
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
    "@babel/preset-typescript", 
  ],
};