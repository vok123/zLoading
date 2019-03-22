const VueLoaderPlugin = require('vue-loader/lib/plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackI18n = require('wp-i18n-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isProduction = false) => ({
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
        use: [
          isProduction ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          } : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 30,
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'font/[name].[hash:3].[ext]'
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: ['.js', '.jsx', '.vue'],
              cache: true,
              emitWarning: true,
              emitError: false
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html'
    }),
    // 多语言处理插件
    new WebpackI18n.Plugin({
      sourcePath: require('path').join(__dirname, '..', 'examples/lang/config.json'),
      // 自动新增i18n对象语言列表
      languageList: ['cn', 'en'],
      // 设置默认将对于key设置为cn的值
      useLanguage: 'en',
      // 是否根据内容自动生成对象
      autoWriteAble: true,
      // 格式化对象空格数
      formatSpace: 2,
      // 是否展示未翻译的项
      showDetail: false,
      // 自动移除无用的key
      removeUnUseKeys: false
    })
  ],
  entry: './examples/index.js',
  resolve: {
    alias: {
      '@': './src',
      vue$: 'vue/dist/vue.esm.js'
    }
  }
});
