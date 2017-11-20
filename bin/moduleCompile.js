const fs = require('fs-extra')
const debug = require('debug')('app:bin:build')
const webpackCompiler = require('../build/webpack-compiler')
const webpackConfig = require('../build/module.config')
const config = require('../config')

const paths = config.utils_paths
const path = require('path')
const compile = () => {
  debug('Starting compiler.')
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
      debug('Copying config assets to dist folder.')
      fs.copySync(paths.client('config'), paths.modules('config'))
      debug('Copying data assets to dist folder.')
      fs.copySync(paths.client('data'), paths.modules('data'))
      debug('Copying font assets to dist folder.')
      fs.copySync(paths.client('font'), paths.modules('font'))
      debug('Copying assets/frame assets to dist folder.')
      fs.copySync(paths.client('assets/frame'), paths.modules('plugins'))
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
          // let filetype = pathname.substring(pathname.indexOf('assets'), pathname.lastIndexOf('\\'))
          // if (pathname.indexOf('\\asset\\') !== -1) {
          //   let pathDir = pathname.substring(pathname.indexOf('\\asset\\') + 1, pathname.lastIndexOf('\\'))
          //   fs.copySync(paths.client(filetype), paths.modules(pathDir))
          // }
          fs.copySync(paths.client(pathname),paths.modules('assets'))
        })
      } catch (error) {
        debug(error)
      }
    })
    .then(() => {
      debug('Compilation completed successfully.')
    })
    .catch((err) => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()
