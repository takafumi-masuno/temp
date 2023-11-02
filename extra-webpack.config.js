const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = (config, options) => {
  config.output.chunkLoadingGlobal = 'webpack4AthProJsonp';

  resolve.fallback;
  return config;
};

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};
