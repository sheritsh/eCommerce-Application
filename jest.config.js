const config = {
  moduleNameMapper: {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "RelativeImageStub",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverageFrom: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "!**/node_modules/**",
  ],
  displayName: 'eCommerce testing',
};

module.exports = config;
