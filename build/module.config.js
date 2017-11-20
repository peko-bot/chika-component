const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')
const fs = require('fs-extra')
const path = require('path')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__

debug('Creating configuration.')

const webpackConfig = {
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// 打包入口文件entry
// ------------------------------------

webpackConfig.entry = {}

const travel = (dir, callback) => {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else if (file.toLowerCase() === (dir.substr(dir.lastIndexOf('\\') + 1).toLowerCase() + '.js')) {
      let filename = dir.substr(dir.lastIndexOf('\\'))
      callback(pathname, filename)
    }
  })
}
try {
  travel(paths.client('assets/modules'), function (pathname, filename) {
    webpackConfig.entry[filename] = pathname
  })
} catch (error) {
  debug(error)
}

// ------------------------------------
// 打包输出文件output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].js',
  path: paths.modules('modules'),
  libraryTarget: 'amd'  
}

// ------------------------------------
// 不参与打包内容
// ------------------------------------
webpackConfig.externals = {
  'react': 'react',
  'react-dom': 'react-dom'
}

// ------------------------------------
// 插件plugins
// ------------------------------------
webpackConfig.plugins = [
  //new webpack.NoErrorsPlugin(),
  //new webpack.optimize.DedupePlugin(),
  //new webpack.optimize.CommonsChunkPlugin('common.js')
  //new ExtractTextPlugin("styles.css")
]
// 压缩
if(__DEV__){
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    )
}

// ------------------------------------
// 资源转换器loader
// ------------------------------------
// JavaScript  ,
webpackConfig.module.loaders = [{
  test: /\.js$/,
  exclude: /node_modules/, 
  loader: 'babel-loader',
  include: paths.client,
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}]

// ------------------------------------
// css
webpackConfig.module.loaders.push({
  test: /\.less$/,
  exclude: null,
  loaders: [
    'style',
    'css?-url',
    'postcss',
    'less'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  loaders: [
    'style',
    'css?-url',
    'postcss'
  ]
})
webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]
// ------------------------------------
// 图片
webpackConfig.module.loaders.push(  
  { test: /\.(png|jpe?g|gif|svg)$/,    loader: 'url?limit=1024&name=./assets/importImg/[name].[ext]' }
)

// ------------------------------------
// css单独打包

webpackConfig.module.loaders.filter((loader) =>
  loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
).forEach((loader) => {
  const first = loader.loaders[0]
  const rest = loader.loaders.slice(1)
  loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
  delete loader.loaders
})

webpackConfig.plugins.push(
  new ExtractTextPlugin('../style/[name].css')
)

module.exports = webpackConfig

