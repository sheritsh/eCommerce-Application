const config = {
  moduleNameMapper: {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "RelativeImageStub",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang=""></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
  verbose: true,
  collectCoverageFrom: [
    "./src/**/*.tsx",
    "!**/node_modules/**",
]
};

module.exports = config;
