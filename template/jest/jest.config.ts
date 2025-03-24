import type { Config } from 'jest'

export default {
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  }
} as Config
