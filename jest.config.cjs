// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {},
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
