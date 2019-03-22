const VueLoaderPlugin = require('vue-loader/lib/plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin'),
  webpack = require('webpack'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  HashedModuleIdsPlugin = webpack.HashedModuleIdsPlugin,
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  NamedChunksPlugin = webpack.NamedChunksPlugin;
function resolve(dir) {
  return require('path').join(__dirname, '..', dir);
}

module.exports = {
  mode: 'production',
  devtool: '#source-map',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default'
  },
  resolve: {
    alias: {
      '@': './src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    }
  },
  externals: {
    'vue': {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(vue)$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              cacheBusting: false,
              transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: 'xlink:href'
              }
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 90,
            name: 'img/[name].[hash:3].[ext]'
          }
        }]
      }, {
        test: /\.(svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:3].[ext]'
          }
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'font/[name].[hash:3].[ext]'
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            resourceQuery: /\?vue/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              emitWarning: true,
              emitError: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: '[name].css',
        chunkFilename: '[name].css'
      }
    ),
    new OptimizeCssnanoPlugin(
      {
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      }
    ),
    new HashedModuleIdsPlugin(),
    new NamedChunksPlugin(),
    {
      apply (compiler) {
        compiler.hooks.emit.tapAsync('npm-package', (compilation, callback) => {
          let json = require('fs').readFileSync(resolve('./package.json'), { encoding: 'UTF-8' });
          json = JSON.parse(json);
          ['devDependencies', 'dependencies', 'scripts'].map(key => (delete json[key]));
          const extendData = {
            main: 'dist/z-loading.js',
            style: 'dist/z-loading.css'
          };
          Object.keys(extendData).map(key => {
            json[key] = extendData[key];
          });
          let jsonStr = JSON.stringify(json, null, 2);
          compilation.assets['package.json'] = {
            source: () => jsonStr,
            size: () => jsonStr.length
          };
          callback();
        });
      }
    }
    // new HtmlWebpackPlugin(
    //   {
    //     templateParameters: function () { /* omitted long function */ },
    //     minify: {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       removeAttributeQuotes: true,
    //       collapseBooleanAttributes: true,
    //       removeScriptTypeAttributes: true
    //     },
    //     template: '/Users/vok/Desktop/study/vue-ui-test/public/index.html'
    //   }
    // )
  ],
  entry: {
    'z-loading': [
      './src/index.js'
    ]
  }
};
