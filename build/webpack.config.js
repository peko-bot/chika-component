const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('../config')
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// 入口
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
  app: [APP_ENTRY,hotMiddlewareScript],
  vendor: config.compiler_vendors
}

// ------------------------------------
// 出口
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: '[chunkhash].js',
  path: paths.dist()
}

// ------------------------------------
// 插件
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
		  NODE_ENV: '"production"'
	  }
  }),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    filename: 'index.html',
    favicon: paths.client('config/favicon.ico'),
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
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
// 资源转换器
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}]

// ------------------------------------
// 样式转换器
// ------------------------------------
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test: /\.less$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'less?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

// webpackConfig.sassLoader = {
//   includePaths: paths.client('styles')
// }

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

//文件转换器
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpe?g|gif)$/,    loader: 'url?limit=8192' }
)

// ------------------------------------
// css单独打包插件配置
// ------------------------------------
//if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true
    })
  )
//}

module.exports = webpackConfig
