/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['docs-gen'],
  moduleDirectories: [
    'node_modules',
    'src',
    'test',
  ]
}