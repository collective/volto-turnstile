module.exports = {
  roots: ['../../../src'],
  testMatch: ['<rootDir>/../../../src/**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    '../../../src/**/*.{js,jsx,ts,tsx}',
    '!../../../src/**/*.d.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(volto-slate|@plone/volto)/)'],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};
