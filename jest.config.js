module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/polyfills.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary'],
  coveragePathIgnorePatterns: [
    '/src/app/app.routes.ts',
    '/src/app/app.config.server.ts',
    '/src/app/app.config.ts',
    '/src/main.server.ts',

],
};
