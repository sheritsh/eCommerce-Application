const config = {
  moduleNameMapper: {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "RelativeImageStub",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    "./src/**/*.tsx",
    "!**/node_modules/**",
  ],
  transformIgnorePatterns: [],
};

module.exports = config;
