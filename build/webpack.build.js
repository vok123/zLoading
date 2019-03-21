const merge = require('webpack-merge'),
  getBaseConfig = require('./webpack.base.js'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin');
function resolve(dir) {
  return require('path').join(__dirname, '..', dir);
}
module.exports = merge(getBaseConfig(true), {
  devtool: '#source-map',
  output: {
    path: resolve('static'),
    filename: '[name].[chunkhash].js',
    publicPath: '',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 5
  },
  module: {
    rules: []
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:4].css',
      chunkFilename: 'css/[name].[chunkhash:4].css'
    })
  ]
});
