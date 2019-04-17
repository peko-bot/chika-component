const $ = require('dekko');
const chalk = require('chalk');

try {
  $('lib')
    .isDirectory()
    .hasFile('index.js')
    .hasDirectory('assets')
    .hasDirectory('component')
    .hasDirectory('utils');
  $('lib/component')
    .isDirectory()
    .hasDirectory('Container')
    .hasDirectory('MapBox')
    .hasDirectory('Swiper')
    .hasDirectory('Template')
    .hasDirectory('TransformManager')
    .hasDirectory('Upload');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
