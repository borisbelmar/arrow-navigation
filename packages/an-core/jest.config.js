/** @returns {Promise<import('jest').Config>} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  watchPathIgnorePatterns: ['node_modules', 'dist', 'example', 'lib'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/**/dist.ts',
    '!src/**/stories.{ts,tsx}',
    '!src/**/types.{ts,tsx}',
    '!src/**/mock.{ts,tsx}',
    '!src/**/mocks.{ts,tsx}',
    '!src/**/mocks/**',
    '!src/**/stories/**',
    '!src/**/types/**'
  ]
}
