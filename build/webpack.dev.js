const merge = require('webpack-merge'),
  getBaseConfig = require('./webpack.base.js');
function resolve(dir) {
  return require('path').join(__dirname, '..', dir);
}
module.exports = merge(getBaseConfig(false), {
  devtool: '#source-map',
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  module: {
    rules: []
  },
  plugins: [],
  devServer: {
    contentBase: resolve('../'),
    port: 9000,
    quiet: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
});
