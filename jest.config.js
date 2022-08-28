const esModules = ['@angular', 'tslib', 'rxjs'];

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  resolver: "jest-preset-angular/build/resolvers/ng-jest-resolver.js",
  coverageDirectory: '../../coverage/libs/TestApplication',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!.*\\\\.mjs$|${esModules.join('|')})`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
