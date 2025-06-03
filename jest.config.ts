/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  
  coverageProvider: "v8",

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/test-utils$': '<rootDir>/src/components/test-utils/index.tsx',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: "jsdom",

};

export default createJestConfig(config);
