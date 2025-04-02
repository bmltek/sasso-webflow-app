/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        jsx: 'react-jsx'
      }
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', { rootMode: 'upward' }]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vite$': '<rootDir>/src/test/mocks/vite.js'
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(@supabase|msw)/)'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/services/analytics/package.json',
    '<rootDir>/services/metrics/package.json'
  ],
  testTimeout: 10000,
  maxWorkers: 1,
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost',
    customExportConditions: ['node', 'node-addons']
  }
}; 