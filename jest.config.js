/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['docs-gen'],
  verbose: true,
  collectCoverage: true,
  silent: false,
  moduleDirectories: [
    'node_modules',
    'src',
    'test',
  ]
}