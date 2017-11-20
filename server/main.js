const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const fs = require('fs-extra')

const app = express()
const paths = config.utils_paths

// ------------------------------------
// webpack 中间件
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // 静态资源文件
  app.use('/config',express.static(paths.client('config')))
  app.use('/data',express.static(paths.client('data')))
  app.use('/font',express.static(paths.client('font')))
  const travel = (dir, callback) => {
    fs.readdirSync(dir).forEach(function (file) {
      let pathname = path.join(dir, file)
      if (fs.statSync(pathname).isDirectory()) {
        if(file === 'assets'){
          callback(pathname)
        }else{
          travel(pathname, callback)
        }
      }
    })
  }
  try {
    travel(paths.client('assets'), function (pathname) {
      app.use('/assets',express.static(paths.client(pathname)))
    })
  } catch (error) {
    debug(error)
  }

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )
  app.use(express.static(paths.dist()))
}

module.exports = app
