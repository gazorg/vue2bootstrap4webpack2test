'use strict'
const path = require('path')
const config = require('../config')
const utils = require('./utils')
const  projectRoot = path.resolve(__dirname, '../')
const webpack = require ('webpack')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  stats: {
    errorDetails: true,
    reasons: true,
    source: true
  },
  entry: {
    app: ['bootstrap-loader', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'jquery': 'jquery/src/jquery'
    },
    modules: ["node_modules"]
  },
  module: { 
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader','postcss-loader' ]
      },
      {
	test: /\.(sass|scss)$/,
	loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // "file?name=[path][name].css!sass-loader"
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
      {
        test: /\.vue$/,
        enforce: "pre",
        loader: 'eslint-loader',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }, 
      {
        test: /\.js$/,
        enforce: "pre", 
        loader: 'eslint-loader',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }, 
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },      
      {
        test: /\.(ico|png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'window.Tether': "tether",
      'Tether': "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: {}
    })
  ] 
}
