const { getJestProjects } = require('@nx/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/guards',
    '<rootDir>/libs/stores/app',
    '<rootDir>/libs/stores/line-station-search',
    '<rootDir>/libs/stores/search',
    '<rootDir>/libs/stores/city-search',
    '<rootDir>/libs/stores/property-detail',
    '<rootDir>/libs/stores/feature',
  ],
};
