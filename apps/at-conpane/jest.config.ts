/* eslint-disable */
module.exports = {
  displayName: 'at-conpane',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  preset: '../../jest.preset.js',
  globals: {},
  coverageDirectory: '../../coverage/apps/at-conpane',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',

        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
