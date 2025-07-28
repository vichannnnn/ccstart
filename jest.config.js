module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.test.js'],
  collectCoverageFrom: [
    'bin/**/*.js',
    '!bin/**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};